#!/usr/bin/env node
import { generate } from '../dist/bundlers/generate.js';

generate().then((res) => {
  console.log(`Bundle generation complete: ${res.success}/${res.total} succeeded.`);
  if (res.failed > 0) {
    console.log(`Errors encountered: ${res.failed}`);
  }
}).catch((err) => {
  console.error('Fatal error in generator:', err);
  process.exit(1);
});
