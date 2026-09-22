import fs from 'node:fs';
import path from 'node:path';

export interface SourceLocationMapping {
  sourceFile: string;
  originalLine: number; // 1-indexed
  originalColumn: number; // 1-indexed
  name?: string;
  sourceLineSnippet?: string;
}

export interface OneToOneMapping {
  featureId: string;
  featureName: string;
  /** The detected polyfill or helper definition in the minified bundle */
  minifiedPolyfill: {
    line: number; // 1-indexed
    column: number; // 1-indexed
    byteOffset: number;
    snippet: string;
    implementationOrigin?: string; // e.g., "node_modules/core-js/modules/es.array.at.js:10"
  };
  /** The 1:1 preceding source code usage that triggered or relies on this transform/polyfill */
  precedingSource: {
    sourceFile: string;
    line: number; // 1-indexed
    column: number; // 1-indexed
    sourceSnippet: string;
    minifiedUsageSnippet?: string;
    minifiedUsageLocation?: { line: number; column: number };
  }[];
}

interface RawSourceMap {
  version: number;
  sources: string[];
  names?: string[];
  mappings: string;
  sourcesContent?: (string | null)[];
  sourceRoot?: string;
}

interface DecodedSegment {
  genCol: number; // 0-indexed
  sourceIdx: number;
  origLine: number; // 0-indexed
  origCol: number; // 0-indexed
  nameIdx?: number;
}

const BASE64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const BASE64_MAP = new Map<string, number>();
for (let i = 0; i < BASE64_CHARS.length; i++) {
  BASE64_MAP.set(BASE64_CHARS[i], i);
}

function decodeVLQ(str: string, startIndex: number): { value: number; nextIndex: number } {
  let result = 0;
  let shift = 0;
  let idx = startIndex;
  let continuation = true;

  while (continuation && idx < str.length) {
    const char = str[idx++];
    const digit = BASE64_MAP.get(char);
    if (digit === undefined) break;
    continuation = (digit & 32) !== 0;
    const value = digit & 31;
    result += value << shift;
    shift += 5;
  }

  const isNegative = (result & 1) === 1;
  const shifted = result >> 1;
  return {
    value: isNegative ? -shifted : shifted,
    nextIndex: idx,
  };
}

export class SourceMapConsumer {
  private rawMap: RawSourceMap;
  private mapDir: string;
  private lines: DecodedSegment[][] = [];

  constructor(rawMap: RawSourceMap, mapFilePath?: string) {
    this.rawMap = rawMap;
    this.mapDir = mapFilePath ? path.dirname(mapFilePath) : process.cwd();
    this.decodeMappings();
  }

  static fromBundleFile(bundleFilePath: string): SourceMapConsumer | null {
    const externalMapPath = `${bundleFilePath}.map`;
    if (fs.existsSync(externalMapPath)) {
      try {
        const content = fs.readFileSync(externalMapPath, 'utf8');
        return new SourceMapConsumer(JSON.parse(content), externalMapPath);
      } catch (_) {}
    }

    try {
      const code = fs.readFileSync(bundleFilePath, 'utf8');
      const inlineMatch = code.match(/\/\/# sourceMappingURL=data:application\/json;(?:charset=utf-8;)?base64,([A-Za-z0-9+/=]+)/);
      if (inlineMatch && inlineMatch[1]) {
        const jsonStr = Buffer.from(inlineMatch[1], 'base64').toString('utf8');
        return new SourceMapConsumer(JSON.parse(jsonStr), bundleFilePath);
      }
    } catch (_) {}

    return null;
  }

  private decodeMappings(): void {
    const mappings = this.rawMap.mappings || '';
    const lineStrings = mappings.split(';');

    let sourceIdx = 0;
    let origLine = 0;
    let origCol = 0;
    let nameIdx = 0;

    for (let lineNum = 0; lineNum < lineStrings.length; lineNum++) {
      const lineStr = lineStrings[lineNum];
      const segments: DecodedSegment[] = [];
      let genCol = 0;

      if (lineStr.length > 0) {
        const parts = lineStr.split(',');
        for (const part of parts) {
          if (!part) continue;
          let idx = 0;

          const colDelta = decodeVLQ(part, idx);
          genCol += colDelta.value;
          idx = colDelta.nextIndex;

          if (idx < part.length) {
            const srcDelta = decodeVLQ(part, idx);
            sourceIdx += srcDelta.value;
            idx = srcDelta.nextIndex;

            const lineDelta = decodeVLQ(part, idx);
            origLine += lineDelta.value;
            idx = lineDelta.nextIndex;

            const origColDelta = decodeVLQ(part, idx);
            origCol += origColDelta.value;
            idx = origColDelta.nextIndex;

            let currentNameIdx: number | undefined = undefined;
            if (idx < part.length) {
              const nameDelta = decodeVLQ(part, idx);
              nameIdx += nameDelta.value;
              currentNameIdx = nameIdx;
            }

            segments.push({
              genCol,
              sourceIdx,
              origLine,
              origCol,
              nameIdx: currentNameIdx,
            });
          }
        }
      }
      this.lines.push(segments);
    }
  }

  /**
   * Look up original source location for a 0-indexed generated line and column.
   */
  public originalPositionFor(genLine0: number, genCol0: number): SourceLocationMapping | null {
    if (genLine0 < 0 || genLine0 >= this.lines.length) return null;
    const segments = this.lines[genLine0];
    if (!segments || segments.length === 0) return null;

    let bestSeg = segments[0];
    for (const seg of segments) {
      if (seg.genCol <= genCol0) {
        bestSeg = seg;
      } else {
        break;
      }
    }

    const rawSource = this.rawMap.sources[bestSeg.sourceIdx];
    if (!rawSource) return null;

    const cleanSource = rawSource.replace(/^webpack:\/\/[^/]*\//, '').replace(/^\.\//, '');
    const name = bestSeg.nameIdx !== undefined && this.rawMap.names ? this.rawMap.names[bestSeg.nameIdx] : undefined;
    const snippet = this.getSourceLineSnippet(bestSeg.sourceIdx, bestSeg.origLine);

    return {
      sourceFile: cleanSource,
      originalLine: bestSeg.origLine + 1,
      originalColumn: bestSeg.origCol + 1,
      name,
      sourceLineSnippet: snippet,
    };
  }

  public getSourceLineSnippet(sourceIdx: number, origLine0: number): string | undefined {
    let content: string | null | undefined = this.rawMap.sourcesContent?.[sourceIdx];
    if (!content) {
      const sourcePath = this.rawMap.sources[sourceIdx];
      if (sourcePath) {
        const resolved = path.resolve(this.mapDir, sourcePath);
        if (fs.existsSync(resolved)) {
          try {
            content = fs.readFileSync(resolved, 'utf8');
          } catch (_) {}
        }
      }
    }
    if (!content) return undefined;
    const lines = content.split(/\r?\n/);
    if (origLine0 >= 0 && origLine0 < lines.length) {
      let line = lines[origLine0].trim();
      // If Babel mapped a constructor-hoisted class field initializer to the class header or comment line,
      // look ahead up to 3 lines for the actual field declaration
      if (line.startsWith('//') || line.startsWith('/*') || line.startsWith('*') || /^(?:export\s+)?class\s+/.test(line)) {
        for (let offset = 1; offset <= 3 && origLine0 + offset < lines.length; offset++) {
          const nextLine = lines[origLine0 + offset].trim();
          if (nextLine && !nextLine.startsWith('//') && !nextLine.startsWith('/*') && !nextLine.startsWith('*')) {
            return nextLine;
          }
        }
      }
      return line;
    }
    return undefined;
  }

  /**
   * Returns all decoded segments that map to user source code (excluding node_modules / bundler runtime).
   */
  public getUserSourceSegments(): Array<{
    genLine0: number;
    genCol0: number;
    sourceFile: string;
    originalLine: number;
    originalColumn: number;
    sourceLineSnippet: string;
  }> {
    const results: Array<{
      genLine0: number;
      genCol0: number;
      sourceFile: string;
      originalLine: number;
      originalColumn: number;
      sourceLineSnippet: string;
    }> = [];

    for (let lineIdx = 0; lineIdx < this.lines.length; lineIdx++) {
      for (const seg of this.lines[lineIdx]) {
        const src = this.rawMap.sources[seg.sourceIdx] || '';
        if (
          src.includes('node_modules') ||
          src.includes('webpack/runtime') ||
          src.includes('polyfill-shim') ||
          src.startsWith('<')
        ) {
          continue;
        }
        const snippet = this.getSourceLineSnippet(seg.sourceIdx, seg.origLine);
        if (snippet) {
          results.push({
            genLine0: lineIdx,
            genCol0: seg.genCol,
            sourceFile: src.replace(/^webpack:\/\/[^/]*\//, '').replace(/^\.\//, ''),
            originalLine: seg.origLine + 1,
            originalColumn: seg.origCol + 1,
            sourceLineSnippet: snippet,
          });
        }
      }
    }
    return results;
  }
}
