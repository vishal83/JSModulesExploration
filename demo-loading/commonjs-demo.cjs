// CommonJS Loading Behavior Demo
console.log('🚀 [CommonJS Demo] Script started');
console.log('⏰ [CommonJS Demo] Time before require:', new Date().toISOString().split('T')[1]);

console.log('📞 [CommonJS Demo] About to require slow module...');

// This line BLOCKS - nothing after it runs until the module is loaded
const slowModule = require('./slow-module-cjs.cjs');

console.log('⏰ [CommonJS Demo] Time after require:', new Date().toISOString().split('T')[1]);
console.log('✅ [CommonJS Demo] require() completed, got:', slowModule.message);
console.log('🏁 [CommonJS Demo] Script finished');

// Key Point: The console.log above only runs AFTER the module is fully loaded
