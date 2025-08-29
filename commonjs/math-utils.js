// CommonJS Math Utilities
// Demonstrates various export patterns in CommonJS

// Method 1: Direct exports assignment
exports.add = (a, b) => a + b;
exports.subtract = (a, b) => a - b;

// Method 2: Building exports object
exports.multiply = function(a, b) {
    return a * b;
};

// Method 3: Exporting a class
class Calculator {
    constructor(name = 'BasicCalculator') {
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

exports.Calculator = Calculator;

// Method 4: Exporting constants
exports.PI = 3.14159;
exports.E = 2.71828;

// Method 5: Exporting an object
exports.constants = {
    GOLDEN_RATIO: 1.618,
    SPEED_OF_LIGHT: 299792458,
    GRAVITY: 9.81
};

// Method 6: Function that returns configured object
exports.createCalculator = (name) => new Calculator(name);

// Note: In CommonJS, 'exports' is a reference to 'module.exports'
// If you assign directly to module.exports, it will override the exports reference
console.log('[CommonJS] math-utils.js loaded');
