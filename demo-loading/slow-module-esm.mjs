// Slow ES Module to demonstrate non-blocking behavior
console.log('🔄 [ES Module] slow-module-esm.mjs: Starting to load...');

// Simulate slow initialization
const start = Date.now();
while (Date.now() - start < 1000) {
    // Busy wait for 1 second to simulate slow loading
}

console.log('✅ [ES Module] slow-module-esm.mjs: Finished loading after 1 second');

export const message = 'I am a slow ES Module';
export const loadTime = '1 second';
export const getValue = () => 'ES Module value';

export default {
    message,
    loadTime,
    getValue
};
