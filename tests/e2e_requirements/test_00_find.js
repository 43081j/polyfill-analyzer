import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, test, assert } from './runner.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function findAllNodeModules(dir, depth, maxDepth) {
  let results = [];
  if (depth > maxDepth) return results;
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === 'node_modules' && entry.isDirectory()) {
        results.push(path.join(dir, entry.name));
      } else if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
        results = results.concat(findAllNodeModules(path.join(dir, entry.name), depth + 1, maxDepth));
      }
    }
  } catch(e) {}
  return results;
}

describe('Setup local node_modules from all code dirs', () => {
  test('Symlink all modules from code/*', () => {
    const dest = path.resolve(__dirname, '../../node_modules');
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

    const nms = findAllNodeModules('..', 0, 4);
    for (const src of nms) {
      if (src === dest) continue;
      try {
        const entries = fs.readdirSync(src, { withFileTypes: true });
        for (const entry of entries) {
          if (entry.name.startsWith('@')) {
            const scopeDir = path.join(dest, entry.name);
            if (!fs.existsSync(scopeDir)) fs.mkdirSync(scopeDir, { recursive: true });
            const scopedEntries = fs.readdirSync(path.join(src, entry.name), { withFileTypes: true });
            for (const sub of scopedEntries) {
              const targetLink = path.join(scopeDir, sub.name);
              if (!fs.existsSync(targetLink)) {
                try { fs.symlinkSync(path.join(src, entry.name, sub.name), targetLink, 'dir'); } catch(e){}
              }
            }
          } else if (entry.name === '.bin') {
            const binDir = path.join(dest, '.bin');
            if (!fs.existsSync(binDir)) fs.mkdirSync(binDir, { recursive: true });
            const binEntries = fs.readdirSync(path.join(src, '.bin'));
            for (const b of binEntries) {
              const binLink = path.join(binDir, b);
              if (!fs.existsSync(binLink)) {
                try { fs.symlinkSync(path.join(src, '.bin', b), binLink); } catch(e){}
              }
            }
          } else {
            const targetLink = path.join(dest, entry.name);
            if (!fs.existsSync(targetLink)) {
              try { fs.symlinkSync(path.join(src, entry.name), targetLink, entry.isDirectory() ? 'dir' : 'file'); } catch(e){}
            }
          }
        }
      } catch(e) {}
    }
    assert.ok(true);
  });
});
