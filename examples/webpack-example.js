// This simulates what Webpack would create from your ES modules
// Instead of separate files, everything gets bundled together

// ===== FROM math-utils.js =====
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;

class Calculator {
    constructor(name = 'BundledCalculator') {
        this.name = name;
        this.history = [];
    }
    
    calculate(operation, a, b) {
        let result;
        switch(operation) {
            case 'add': result = add(a, b); break;
            case 'subtract': result = subtract(a, b); break;
            case 'multiply': result = multiply(a, b); break;
            default: throw new Error(`Unknown operation: ${operation}`);
        }
        this.history.push(`${a} ${operation} ${b} = ${result}`);
        return result;
    }
}

const PI = 3.14159;

// ===== FROM user-service.js =====
class UserService {
    constructor() {
        this.users = [
            { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' },
            { id: 2, name: 'Bob', email: 'bob@example.com', role: 'user' }
        ];
    }
    
    getAllUsers() {
        return [...this.users];
    }
    
    getUserById(id) {
        return this.users.find(user => user.id === id);
    }
}

const ROLES = {
    ADMIN: 'admin',
    USER: 'user',
    MODERATOR: 'moderator'
};

// ===== FROM config.js =====
const config = {
    environment: 'production', // Webpack would likely set this
    port: 3000,
    database: {
        host: 'localhost',
        port: 5432,
        name: 'myapp_production'
    }
};

// ===== WEBPACK MODULE SYSTEM =====
// Webpack wraps everything in its own module system

const __webpack_modules__ = {
    // Module 0: math-utils
    0: {
        exports: { add, subtract, multiply, Calculator, PI }
    },
    // Module 1: user-service  
    1: {
        exports: { default: UserService, ROLES }
    },
    // Module 2: config
    2: {
        exports: { config }
    }
};

// Webpack runtime - simplified version
function __webpack_require__(moduleId) {
    return __webpack_modules__[moduleId].exports;
}

// ===== YOUR APPLICATION CODE BECOMES =====
// Instead of: import { add } from './math-utils.js';
const { add: bundledAdd } = __webpack_require__(0);

// Instead of: import UserService from './user-service.js';
const { default: BundledUserService } = __webpack_require__(1);

// Instead of: import { config } from './config.js'; 
const { config: bundledConfig } = __webpack_require__(2);

// Usage remains the same
console.log('🏷️ This is how your code works when BUNDLED:');
console.log('Math: 5 + 3 =', bundledAdd(5, 3));

const userService = new BundledUserService();
console.log('Users:', userService.getAllUsers().length);

console.log('Environment:', bundledConfig.environment);

// Export for use in HTML
window.WebpackExample = {
    add: bundledAdd,
    UserService: BundledUserService,
    config: bundledConfig,
    Calculator,
    ROLES
};
