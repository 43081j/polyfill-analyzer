import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../../dist/bundles');
const srcDir = path.resolve(__dirname, '../../src/bundlers/outputs');

export function syncArchives(): void {
  const bundlers = ['rollup', 'esbuild', 'webpack', 'swc'];
  const isValidArtifact = (file: string) => file === 'README.md' || /^es(?:_\w+|\d{4})_es5\.js(\.map)?$/.test(file);
  const isJunkFile = (file: string) => file.endsWith('.tmp') || file.startsWith('eslint.config_');

  for (const b of bundlers) {
    const distB = path.join(distDir, b);
    const srcB = path.join(srcDir, b);
    fs.mkdirSync(srcB, { recursive: true });
    fs.mkdirSync(distB, { recursive: true });

    // Remove leftover temporary or junk files from both archive directories
    for (const dir of [distB, srcB]) {
      if (fs.existsSync(dir)) {
        for (const file of fs.readdirSync(dir)) {
          if (isJunkFile(file)) {
            try { fs.unlinkSync(path.join(dir, file)); } catch (_) {}
          }
        }
      }
    }

    if (fs.existsSync(distB)) {
      for (const file of fs.readdirSync(distB)) {
        if (isValidArtifact(file)) {
          try { fs.copyFileSync(path.join(distB, file), path.join(srcB, file)); } catch (_) {}
        }
      }
    }
    if (fs.existsSync(srcB)) {
      for (const file of fs.readdirSync(srcB)) {
        if (isValidArtifact(file)) {
          try { fs.copyFileSync(path.join(srcB, file), path.join(distB, file)); } catch (_) {}
        }
      }
    }
  }
}
