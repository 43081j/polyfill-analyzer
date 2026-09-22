#!/usr/bin/env node
import '../dist/cli/index.js';
import { runCli } from '../dist/cli/index.js';

if (!process.argv[1].endsWith('dist/cli/index.js')) {
  runCli();
}
