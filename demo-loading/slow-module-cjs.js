// Slow CommonJS module to demonstrate blocking behavior
console.log('🔄 [CommonJS] slow-module-cjs.js: Starting to load...');

// Simulate slow initialization
const start = Date.now();
while (Date.now() - start < 1000) {
    // Busy wait for 1 second to simulate slow loading
}

console.log('✅ [CommonJS] slow-module-cjs.js: Finished loading after 1 second');

module.exports = {
    message: 'I am a slow CommonJS module',
    loadTime: '1 second',
    getValue: () => 'CommonJS value'
};
