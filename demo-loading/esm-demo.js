// ES Modules Loading Behavior Demo

// IMPORTANT: These import statements are HOISTED!
// They are processed BEFORE any of the code below runs
// All imports are resolved in parallel before ANY code executes
import { message, getValue } from './slow-module-esm.mjs';

console.log('🚀 [ES Module Demo] Script started');
console.log('⏰ [ES Module Demo] Time when script executes:', new Date().toISOString().split('T')[1]);

// By the time this line runs, the import above is already resolved
console.log('✅ [ES Module Demo] Import already resolved, got:', message);
console.log('🏁 [ES Module Demo] Script finished');

// Key Point: The import was processed BEFORE any of this code ran
// The module loading happened in parallel during the "parsing" phase
