// CommonJS Demo
// This file demonstrates how to use require() to import CommonJS modules

console.log('=== CommonJS Modules Demo ===\n');

// 1. Importing from math-utils (exports.* pattern)
console.log('1. Importing from math-utils.js (exports.* pattern):');
const mathUtils = require('./math-utils');
console.log('Available exports:', Object.keys(mathUtils));

// Using individual functions
console.log('Addition: 5 + 3 =', mathUtils.add(5, 3));
console.log('Subtraction: 10 - 4 =', mathUtils.subtract(10, 4));
console.log('Multiplication: 6 * 7 =', mathUtils.multiply(6, 7));

// Using constants
console.log('PI:', mathUtils.PI);
console.log('Constants:', mathUtils.constants);

// Using the Calculator class
const calc = new mathUtils.Calculator('Demo Calculator');
console.log('Calculator operations:');
console.log('8 + 2 =', calc.calculate('add', 8, 2));
console.log('15 - 5 =', calc.calculate('subtract', 15, 5));
console.log('4 * 3 =', calc.calculate('multiply', 4, 3));
console.log('20 / 4 =', calc.calculate('divide', 20, 4));
console.log('Calculator history:', calc.getHistory());

// Creating calculator with factory function
const namedCalc = mathUtils.createCalculator('Factory Calculator');
console.log('Named calculator:', namedCalc.name);

console.log('\n' + '='.repeat(50) + '\n');

// 2. Importing from user-service (module.exports = Class pattern)
console.log('2. Importing from user-service.js (module.exports = Class pattern):');
const UserService = require('./user-service');
const userService = new UserService();

console.log('All users:', userService.getAllUsers());
console.log('User with ID 2:', userService.getUserById(2));

// Add a new user
const newUser = userService.addUser({ 
    name: 'Diana', 
    email: 'diana@example.com' 
});
console.log('Added user:', newUser);
console.log('Updated user list:', userService.getAllUsers());

// Update user
const updatedUser = userService.updateUser(1, { name: 'Alice Smith' });
console.log('Updated user:', updatedUser);

console.log('\n' + '='.repeat(50) + '\n');

// 3. Importing from config (mixed exports pattern)
console.log('3. Importing from config.js (mixed exports pattern):');
const { config, getSecretKey, isProduction, isDevelopment, getVersion } = require('./config');

console.log('Configuration:', config);
console.log('Is production?', isProduction());
console.log('Is development?', isDevelopment());
console.log('Version:', getVersion());
// Note: We can't access secretKey directly, only through getSecretKey()
console.log('Secret key (through function):', getSecretKey());

console.log('\n' + '='.repeat(50) + '\n');

// 4. Demonstrating require() behavior
console.log('4. CommonJS require() behavior:');

// require() caches modules - same instance returned
const mathUtils1 = require('./math-utils');
const mathUtils2 = require('./math-utils');
console.log('Same instance?', mathUtils1 === mathUtils2); // true

// You can access the require cache
console.log('Cached modules:', Object.keys(require.cache));

// Module metadata
console.log('Current module filename:', __filename);
console.log('Current module dirname:', __dirname);
console.log('Module object keys:', Object.keys(module));

console.log('\n' + '='.repeat(50) + '\n');

// 5. Dynamic imports (CommonJS style)
console.log('5. Dynamic require() examples:');

// Conditional require
if (process.env.NODE_ENV === 'development') {
    // This would only load in development
    // const devTools = require('./dev-tools');
    console.log('Would load dev tools in development mode');
}

// Dynamic module path
const moduleName = 'math-utils';
const dynamicImport = require(`./${moduleName}`);
console.log('Dynamic import works:', dynamicImport.add(1, 1) === 2);

// Function to load module dynamically
function loadModule(name) {
    try {
        return require(`./${name}`);
    } catch (error) {
        console.log(`Failed to load module ${name}:`, error.message);
        return null;
    }
}

console.log('Loading existing module:', loadModule('config') ? 'Success' : 'Failed');
console.log('Loading non-existent module:', loadModule('nonexistent') ? 'Success' : 'Failed');

console.log('\n=== CommonJS Demo Complete ===');
