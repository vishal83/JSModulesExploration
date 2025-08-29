// Simple test runner for the modules exploration
// This demonstrates testing both CommonJS and ES Modules

console.log('🧪 Running Module Tests\n');

// Test CommonJS modules
console.log('Testing CommonJS modules...');

try {
    // Test math-utils
    const mathUtils = require('../commonjs/math-utils');
    
    console.log('✓ CommonJS math-utils import successful');
    
    // Test basic functions
    const addResult = mathUtils.add(2, 3);
    console.assert(addResult === 5, `Expected 5, got ${addResult}`);
    console.log('✓ add function works');
    
    const subtractResult = mathUtils.subtract(10, 4);
    console.assert(subtractResult === 6, `Expected 6, got ${subtractResult}`);
    console.log('✓ subtract function works');
    
    // Test Calculator class
    const calc = new mathUtils.Calculator('Test Calculator');
    const calcResult = calc.calculate('multiply', 3, 4);
    console.assert(calcResult === 12, `Expected 12, got ${calcResult}`);
    console.log('✓ Calculator class works');
    
    // Test constants
    console.assert(mathUtils.PI === 3.14159, `Expected 3.14159, got ${mathUtils.PI}`);
    console.log('✓ Constants export works');

    // Test user-service
    const UserService = require('../commonjs/user-service');
    const userService = new UserService();
    const users = userService.getAllUsers();
    console.assert(Array.isArray(users), 'Expected users to be an array');
    console.assert(users.length === 3, `Expected 3 users, got ${users.length}`);
    console.log('✓ UserService class works');
    
    // Test config
    const config = require('../commonjs/config');
    console.assert(typeof config.config === 'object', 'Expected config to be an object');
    console.assert(typeof config.getVersion === 'function', 'Expected getVersion to be a function');
    console.log('✓ Config module works');
    
    console.log('✅ All CommonJS tests passed!\n');
    
} catch (error) {
    console.error('❌ CommonJS tests failed:', error.message);
}

// Test ES Modules using dynamic import
async function testESModules() {
    console.log('Testing ES Modules...');
    
    try {
        // Test math-utils
        const mathUtils = await import('../esm/math-utils.js');
        
        console.log('✓ ES Modules math-utils import successful');
        
        // Test basic functions
        const addResult = mathUtils.add(5, 7);
        console.assert(addResult === 12, `Expected 12, got ${addResult}`);
        console.log('✓ add function works');
        
        const multiplyResult = mathUtils.multiply(6, 8);
        console.assert(multiplyResult === 48, `Expected 48, got ${multiplyResult}`);
        console.log('✓ multiply function works');
        
        // Test Calculator class
        const calc = new mathUtils.Calculator('ESM Test Calculator');
        const calcResult = calc.calculate('divide', 20, 4);
        console.assert(calcResult === 5, `Expected 5, got ${calcResult}`);
        console.log('✓ Calculator class works');
        
        // Test constants
        console.assert(mathUtils.PI === 3.14159, `Expected 3.14159, got ${mathUtils.PI}`);
        console.log('✓ Constants export works');

        // Test user-service
        const userServiceModule = await import('../esm/user-service.js');
        const UserService = userServiceModule.default;
        const { ROLES, validateEmail } = userServiceModule;
        
        const userService = new UserService();
        const users = userService.getAllUsers();
        console.assert(Array.isArray(users), 'Expected users to be an array');
        console.assert(users.length === 3, `Expected 3 users, got ${users.length}`);
        console.log('✓ UserService class works');
        
        console.assert(typeof ROLES === 'object', 'Expected ROLES to be an object');
        console.assert(ROLES.ADMIN === 'admin', 'Expected ROLES.ADMIN to be admin');
        console.log('✓ Named exports work');
        
        console.assert(validateEmail('test@example.com') === true, 'Expected valid email to return true');
        console.assert(validateEmail('invalid') === false, 'Expected invalid email to return false');
        console.log('✓ Email validation works');
        
        // Test config
        const configModule = await import('../esm/config.js');
        console.assert(typeof configModule.config === 'object', 'Expected config to be an object');
        console.assert(typeof configModule.getVersion === 'function', 'Expected getVersion to be a function');
        console.log('✓ Config module works');
        
        console.log('✅ All ES Modules tests passed!\n');
        
    } catch (error) {
        console.error('❌ ES Modules tests failed:', error.message);
    }
}

// Test interoperability
async function testInteroperability() {
    console.log('Testing interoperability...');
    
    try {
        // Test CommonJS module
        const cjsModule = require('../interoperability/commonjs-module');
        console.assert(typeof cjsModule.simpleFunction === 'function', 'Expected simpleFunction to be a function');
        console.log('✓ CommonJS interop module loads');
        
        // Test ES Module
        const esmModule = await import('../interoperability/esm-module.mjs');
        console.assert(typeof esmModule.esmFunction === 'function', 'Expected esmFunction to be a function');
        console.assert(typeof esmModule.default === 'object', 'Expected default export to be an object');
        console.log('✓ ES Module interop module loads');
        
        // Test cross-module functionality
        const cjsResult = cjsModule.simpleFunction('test');
        const esmResult = esmModule.esmFunction('test');
        
        console.assert(cjsResult.includes('CommonJS'), 'Expected CommonJS in result');
        console.assert(esmResult.includes('ES Module'), 'Expected ES Module in result');
        console.log('✓ Cross-module communication works');
        
        console.log('✅ All interoperability tests passed!\n');
        
    } catch (error) {
        console.error('❌ Interoperability tests failed:', error.message);
    }
}

// Run all tests
async function runAllTests() {
    try {
        await testESModules();
        await testInteroperability();
        
        console.log('🎉 All tests completed!');
        console.log('\nTest Summary:');
        console.log('- CommonJS modules: ✅');
        console.log('- ES Modules: ✅');  
        console.log('- Interoperability: ✅');
        
    } catch (error) {
        console.error('❌ Test suite failed:', error.message);
        process.exit(1);
    }
}

runAllTests();
