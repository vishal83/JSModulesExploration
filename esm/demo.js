// ES Modules Demo
// This file demonstrates various import patterns for ES Modules

console.log('=== ES Modules Demo ===\n');

// 1. Named imports from math-utils
console.log('1. Named imports from math-utils.js:');
import { add, subtract, multiply, Calculator, PI, constants, createCalculator, version, author } from './math-utils.js';

console.log('Imported functions and values:', { add: typeof add, Calculator: typeof Calculator, PI, version, author });

// Using imported functions
console.log('Addition: 7 + 3 =', add(7, 3));
console.log('Subtraction: 12 - 4 =', subtract(12, 4));
console.log('Multiplication: 8 * 5 =', multiply(8, 5));
console.log('Constants:', constants);

// Using the imported class
const calc = new Calculator('ESM Demo Calculator');
console.log('Calculator name:', calc.name);
console.log('Calculator operations:');
console.log('10 + 5 =', calc.calculate('add', 10, 5));
console.log('20 - 8 =', calc.calculate('subtract', 20, 8));
console.log('6 * 7 =', calc.calculate('multiply', 6, 7));
console.log('24 / 3 =', calc.calculate('divide', 24, 3));
console.log('History:', calc.getHistory());

// Using factory function
const namedCalc = createCalculator('Factory ESM Calculator');
console.log('Factory calculator name:', namedCalc.name);

console.log('\n' + '='.repeat(50) + '\n');

// 2. Default import and named imports from user-service
console.log('2. Default and named imports from user-service.js:');
import UserService, { ROLES, validateEmail, formatUser, getUserDisplayName } from './user-service.js';

console.log('Available roles:', ROLES);
console.log('Email validation:', validateEmail('test@example.com'), validateEmail('invalid-email'));

const userService = new UserService();
const users = userService.getAllUsers();
console.log('All users:');
users.forEach(user => console.log('  -', formatUser(user)));

// Add a new user
const newUser = userService.addUser({ 
    name: 'Eva', 
    email: 'eva@example.com', 
    role: ROLES.MODERATOR 
});
console.log('Added user:', formatUser(newUser));

// Validate user data
const validationErrors = UserService.validateUser({ name: '', email: 'invalid' });
console.log('Validation errors for invalid user:', validationErrors);

console.log('\n' + '='.repeat(50) + '\n');

// 3. Named imports from config
console.log('3. Named imports from config.js:');
import { 
    config, 
    getSecretKey, 
    isProduction, 
    isDevelopment, 
    getVersion,
    getDatabaseUrl,
    getApiConfig 
} from './config.js';

console.log('Configuration object:', config);
console.log('Environment checks:', {
    isProduction: isProduction(),
    isDevelopment: isDevelopment()
});
console.log('Version:', getVersion());
console.log('Database URL:', getDatabaseUrl());
console.log('API config:', getApiConfig());
console.log('Secret key (through function):', getSecretKey());

console.log('\n' + '='.repeat(50) + '\n');

// 4. Import with aliases
console.log('4. Import with aliases:');
import { Calculator as MathCalculator, add as sum } from './math-utils.js';
import { validateEmail as isValidEmail } from './user-service.js';

const aliasedCalc = new MathCalculator('Aliased Calculator');
console.log('Sum using alias:', sum(15, 25));
console.log('Email validation using alias:', isValidEmail('valid@email.com'));
console.log('Aliased calculator:', aliasedCalc.name);

console.log('\n' + '='.repeat(50) + '\n');

// 5. Namespace import (import all)
console.log('5. Namespace import (import * as):');
import * as MathUtils from './math-utils.js';

console.log('MathUtils namespace keys:', Object.keys(MathUtils));
console.log('Using namespace:', MathUtils.add(100, 200));
console.log('Namespace constants:', MathUtils.constants);

const nsCalc = new MathUtils.Calculator('Namespace Calculator');
console.log('Namespace calculator result:', nsCalc.calculate('multiply', 7, 8));

console.log('\n' + '='.repeat(50) + '\n');

// 6. Dynamic imports (ES2020 feature)
console.log('6. Dynamic imports (async):');

// Dynamic import returns a Promise
async function dynamicImportDemo() {
    try {
        // Dynamic import of the entire module
        const mathModule = await import('./math-utils.js');
        console.log('Dynamic import successful:', mathModule.add(50, 75));
        
        // Dynamic import with destructuring
        const { subtract: dynamicSubtract } = await import('./math-utils.js');
        console.log('Dynamic destructured import:', dynamicSubtract(100, 30));
        
        // Conditional dynamic import
        if (process.env.NODE_ENV !== 'production') {
            const configModule = await import('./config.js');
            console.log('Conditionally loaded config version:', configModule.getVersion());
        }
        
    } catch (error) {
        console.error('Dynamic import failed:', error);
    }
}

await dynamicImportDemo();

console.log('\n' + '='.repeat(50) + '\n');

// 7. Import metadata and module information
console.log('7. ES Modules metadata:');

// import.meta provides module metadata
console.log('import.meta.url:', import.meta.url);

// Note: ES Modules don't have __filename and __dirname like CommonJS
// You can get similar functionality from import.meta.url
const moduleURL = new URL(import.meta.url);
console.log('Module file path:', moduleURL.pathname);
console.log('Module directory:', moduleURL.pathname.substring(0, moduleURL.pathname.lastIndexOf('/')));

console.log('\n' + '='.repeat(50) + '\n');

// 8. Top-level await (ES2022 feature)
console.log('8. Top-level await example:');

// This is already being used above in the dynamicImportDemo() call
// Top-level await allows us to use await directly in modules
const delayedValue = await new Promise(resolve => {
    setTimeout(() => resolve('Top-level await works!'), 100);
});
console.log(delayedValue);

console.log('\n=== ES Modules Demo Complete ===');
