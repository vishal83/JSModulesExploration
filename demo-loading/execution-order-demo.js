// ES Modules Execution Order Demo
// This shows how imports are hoisted and resolved before ANY code runs

console.log('🎯 [Step 4] Script execution starts');

// This import is HOISTED - it's processed FIRST, before any console.log above
import { message } from './slow-module-esm.mjs';

console.log('🎯 [Step 5] After import statement (import already resolved)');
console.log('🎯 [Step 6] Imported message:', message);
console.log('🎯 [Step 7] Script execution ends');

// Execution order in ES Modules:
// Step 1: Parse file, find all imports (hoisting)
// Step 2: Load all imported modules in parallel
// Step 3: Wait for all imports to resolve
// Step 4-7: Execute the script code sequentially
