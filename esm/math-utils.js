// ES Modules Math Utilities
// Demonstrates various export patterns in ES Modules

// Method 1: Named exports (inline)
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// Method 2: Function declaration export
export function multiply(a, b) {
    return a * b;
}

// Method 3: Exporting a class
export class Calculator {
    constructor(name = 'ESMCalculator') {
        this.name = name;
        this.history = [];
    }

    calculate(operation, a, b) {
        let result;
        switch(operation) {
            case 'add':
                result = this.add(a, b);
                break;
            case 'subtract': 
                result = this.subtract(a, b);
                break;
            case 'multiply':
                result = this.multiply(a, b);
                break;
            case 'divide':
                result = this.divide(a, b);
                break;
            default:
                throw new Error(`Unknown operation: ${operation}`);
        }
        
        this.history.push(`${a} ${operation} ${b} = ${result}`);
        return result;
    }

    add(a, b) { return a + b; }
    subtract(a, b) { return a - b; }
    multiply(a, b) { return a * b; }
    divide(a, b) { 
        if (b === 0) throw new Error('Division by zero');
        return a / b; 
    }

    getHistory() {
        return this.history;
    }

    clearHistory() {
        this.history = [];
    }
}

// Method 4: Exporting constants
export const PI = 3.14159;
export const E = 2.71828;

// Method 5: Exporting an object
export const constants = {
    GOLDEN_RATIO: 1.618,
    SPEED_OF_LIGHT: 299792458,
    GRAVITY: 9.81
};

// Method 6: Export with different name (alias)
const createCalculatorInstance = (name) => new Calculator(name);
export { createCalculatorInstance as createCalculator };

// Method 7: Variables declared first, then exported
const version = '2.0.0';
const author = 'ES Modules Team';

export { version, author };

// Method 8: Re-exporting (if we had other modules to re-export from)
// export { someFunction } from './other-module.js';

console.log('[ES Modules] math-utils.js loaded');
