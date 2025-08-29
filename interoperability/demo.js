// Interoperability Demo
// Shows how CommonJS and ES Modules can work together

console.log('=== CommonJS and ES Modules Interoperability Demo ===\n');

// This file is CommonJS (because the root package.json has "type": "commonjs")
// But we can still use dynamic imports to load ES Modules

console.log('1. CommonJS importing CommonJS (traditional require):');

// Traditional CommonJS import
const { 
    simpleFunction, 
    CommonJSClass, 
    commonData, 
    getModuleInfo 
} = require('./commonjs-module');

console.log('Simple function:', simpleFunction('Hello World'));
console.log('Common data:', commonData);

const cjsInstance = new CommonJSClass('CommonJS Instance');
console.log('Class greeting:', cjsInstance.greet());
console.log('Module info:', getModuleInfo());

console.log('\n' + '='.repeat(50) + '\n');

console.log('2. CommonJS importing ES Module (using dynamic import):');

// Dynamic import allows CommonJS to import ES Modules
async function importESModule() {
    try {
        // Import the entire ES module
        const esmModule = await import('./esm-module.mjs');
        
        console.log('ES Module imported successfully');
        console.log('ESM function:', esmModule.esmFunction('Hello from CommonJS'));
        console.log('ESM data:', esmModule.esmData);
        console.log('ESM info:', esmModule.getESMInfo());
        
        // Using the default export
        console.log('Default export message:', esmModule.default.message);
        console.log('Default export process result:', await esmModule.default.process());
        
        // Using named exports
        const esmInstance = new esmModule.ESMClass('ESM Instance from CommonJS');
        console.log('ESM class greeting:', esmInstance.greet());
        console.log('ESM async greeting:', await esmInstance.asyncGreet());
        
        // Using utility function
        const processedData = await esmModule.processData({ test: 'data' });
        console.log('Processed data:', processedData);
        
        return esmModule;
        
    } catch (error) {
        console.error('Failed to import ES module:', error);
        return null;
    }
}

// Main async function to handle all async operations
async function runDemo() {
    // Execute the dynamic import
    const esmModule = await importESModule();

    console.log('\n' + '='.repeat(50) + '\n');

    console.log('3. Demonstrating differences in module loading:');

    // CommonJS modules are loaded synchronously
    console.log('CommonJS loading (synchronous):');
    console.time('CommonJS require');
    const cjsModule2 = require('./commonjs-module');
    console.timeEnd('CommonJS require');
    console.log('Same instance?', cjsModule2 === require('./commonjs-module')); // true - cached

    // ES Modules are loaded asynchronously via dynamic import
    console.log('\nES Module loading (asynchronous):');
    console.time('ES Module dynamic import');
    const esmModule2 = await import('./esm-module.mjs');
    console.timeEnd('ES Module dynamic import');

    console.log('\n' + '='.repeat(50) + '\n');

    console.log('4. Working with both module systems:');

    // Create instances from both module systems
    const cjsWorker = new CommonJSClass('CJS Worker');
    if (esmModule) {
        const esmWorker = new esmModule.ESMClass('ESM Worker');
        
        console.log('CJS Worker info:', cjsWorker.getInfo());
        console.log('ESM Worker info:', esmWorker.getInfo());
        
        // Combine functionality
        const combinedResult = {
            cjsGreeting: cjsWorker.greet(),
            esmGreeting: esmWorker.greet(),
            cjsData: commonData,
            esmData: esmModule.esmData,
            timestamp: Date.now()
        };
        
        console.log('Combined result:', combinedResult);
    }

    console.log('\n' + '='.repeat(50) + '\n');

    console.log('5. Module system comparison:');

    const comparison = {
        CommonJS: {
            loadingType: 'Synchronous',
            syntax: 'require() / module.exports',
            fileExtension: '.js (when package.json type is commonjs or not set)',
            caching: 'Modules cached after first require',
            dynamicImports: 'Possible but requires dynamic import()',
            this_binding: 'exports object',
            __filename: typeof __filename !== 'undefined',
            __dirname: typeof __dirname !== 'undefined',
            topLevelAwait: false
        },
        ESModules: {
            loadingType: 'Asynchronous (static imports are hoisted)',
            syntax: 'import / export',
            fileExtension: '.mjs or .js (when package.json type is module)',
            caching: 'Modules are singleton, cached after first import',
            dynamicImports: 'Native support with import()',
            this_binding: 'undefined',
            import_meta: true,
            topLevelAwait: true
        }
    };

    console.log('Feature comparison:');
    console.table(comparison);

    console.log('\n' + '='.repeat(50) + '\n');

    console.log('6. Best practices for interoperability:');

    console.log(`
Best Practices:
1. Use dynamic import() to load ES modules from CommonJS
2. ES modules can import CommonJS modules directly
3. CommonJS modules appear as default export in ES modules
4. Be aware of async nature of ES module imports
5. Use appropriate file extensions (.mjs for ES modules, .cjs for CommonJS)
6. Configure package.json "type" field appropriately
7. Use import.meta instead of __filename/__dirname in ES modules
8. Test both module systems if your library needs to support both
`);

    console.log('\n=== Interoperability Demo Complete ===');
}

// Run the demo
runDemo().catch(error => {
    console.error('Demo failed:', error);
    process.exit(1);
});