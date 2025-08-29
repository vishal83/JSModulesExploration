// CommonJS module for interoperability testing
// This module will be imported by ES Modules

// Simple exports
exports.simpleFunction = (message) => {
    return `CommonJS says: ${message}`;
};

exports.numbers = [1, 2, 3, 4, 5];

// Class export
class CommonJSClass {
    constructor(name) {
        this.name = name;
        this.type = 'CommonJS';
    }

    greet() {
        return `Hello from ${this.name}, I'm a ${this.type} module!`;
    }

    getInfo() {
        return {
            name: this.name,
            type: this.type,
            moduleSystem: 'CommonJS'
        };
    }
}

exports.CommonJSClass = CommonJSClass;

// Object export
exports.commonData = {
    version: '1.0.0',
    author: 'CommonJS Developer',
    features: ['require', 'module.exports', 'exports'],
    synchronous: true
};

// Function that uses CommonJS-specific features
exports.getModuleInfo = () => {
    return {
        filename: __filename,
        dirname: __dirname,
        moduleExports: Object.keys(module.exports),
        isCommonJS: true
    };
};

// Default export using module.exports (this will be the default import in ES modules)
module.exports.default = {
    message: 'This is the default export from CommonJS',
    timestamp: Date.now(),
    process: () => 'Processing in CommonJS'
};

console.log('[Interop] CommonJS module loaded');
