import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class SkipTestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'SkipTestError';
  }
}

export class AssertionError extends Error {
  constructor(message, actual, expected) {
    super(message);
    this.name = 'AssertionError';
    this.actual = actual;
    this.expected = expected;
  }
}

export const assert = {
  ok(value, message = 'Expected value to be truthy') {
    if (!value) {
      throw new AssertionError(message, value, true);
    }
  },
  strictEqual(actual, expected, message = `Expected ${actual} to equal ${expected}`) {
    if (actual !== expected) {
      throw new AssertionError(message, actual, expected);
    }
  },
  deepStrictEqual(actual, expected, message = 'Expected deep equality') {
    const actStr = JSON.stringify(actual);
    const expStr = JSON.stringify(expected);
    if (actStr !== expStr) {
      throw new AssertionError(`${message}: actual ${actStr} vs expected ${expStr}`, actual, expected);
    }
  },
  throws(fn, expectedError, message = 'Expected function to throw') {
    let threw = false;
    try {
      fn();
    } catch (err) {
      threw = true;
      if (expectedError && !err.message.includes(expectedError) && !(err instanceof expectedError)) {
        throw new AssertionError(`Expected error matching ${expectedError}, got ${err.message}`, err.message, expectedError);
      }
    }
    if (!threw) {
      throw new AssertionError(message, 'no exception', 'exception');
    }
  },
  fail(message = 'Test failed explicitly') {
    throw new AssertionError(message);
  },
  skip(message = 'Test skipped') {
    throw new SkipTestError(message);
  },
  existsSync(filePath, message) {
    if (!fs.existsSync(filePath)) {
      throw new AssertionError(message || `Expected file or directory to exist: ${filePath}`, 'not found', filePath);
    }
  },
  skipIfMissing(filePath, message) {
    if (!fs.existsSync(filePath)) {
      throw new SkipTestError(message || `Skipped: Required artifact missing (${filePath})`);
    }
  }
};

const suites = [];
let currentSuite = null;

export function describe(name, fn) {
  const suite = { name, tests: [] };
  suites.push(suite);
  const prevSuite = currentSuite;
  currentSuite = suite;
  fn();
  currentSuite = prevSuite;
}

export function test(name, fn) {
  if (!currentSuite) {
    describe('Default Suite', () => {
      currentSuite.tests.push({ name, fn });
    });
  } else {
    currentSuite.tests.push({ name, fn });
  }
}

export async function run() {
  const startTime = Date.now();
  let passed = 0;
  let failed = 0;
  let skipped = 0;
  const failures = [];

  console.log('\n==================================================');
  console.log('  POLYFILL ANALYZER - E2E REQUIREMENT TEST SUITE  ');
  console.log('==================================================\n');

  for (const suite of suites) {
    console.log(`--- Suite: ${suite.name} ---`);
    for (const t of suite.tests) {
      try {
        await t.fn();
        console.log(`  ✅ PASS | ${t.name}`);
        passed++;
      } catch (err) {
        if (err instanceof SkipTestError || err.name === 'SkipTestError') {
          console.log(`  ⚠️ SKIP | ${t.name} (${err.message})`);
          skipped++;
        } else {
          console.log(`  ❌ FAIL | ${t.name} -> ${err.message}`);
          failed++;
          failures.push({ suite: suite.name, test: t.name, error: err });
        }
      }
    }
    console.log('');
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log('==================================================');
  console.log(`Summary: ${passed} Passed | ${failed} Failed | ${skipped} Skipped`);
  console.log(`Total Tests: ${passed + failed + skipped} | Duration: ${duration}s`);
  console.log('==================================================\n');

  if (failures.length > 0) {
    console.log('Failure Details:');
    for (const f of failures) {
      console.log(`\n[${f.suite}] ${f.test}:`);
      console.log(`  Error: ${f.error.message}`);
      if (f.error.stack && !f.error instanceof AssertionError) {
        console.log(`  Stack: ${f.error.stack}`);
      }
    }
    console.log('');
  }

  return { passed, failed, skipped, total: passed + failed + skipped, failures };
}

// Automatic discovery and execution if run directly from CLI
if (process.argv[1] === __filename || process.argv[1].endsWith('runner.js')) {
  (async () => {
    const testDir = __dirname;
    const files = fs.readdirSync(testDir).filter(f => f.startsWith('test_') && f.endsWith('.js'));
    for (const file of files) {
      await import(path.join(testDir, file));
    }
    const result = await run();
    // In progressive testability mode, we don't want CI crash if tests skip or fail gracefully during early milestones,
    // but standard test runners exit 1 on failures unless --tolerant flag is passed.
    const tolerant = process.argv.includes('--tolerant') || process.argv.includes('--dry-run');
    if (result.failed > 0 && !tolerant) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  })();
}
