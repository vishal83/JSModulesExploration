// ES Module for interoperability testing
// This module will be imported by CommonJS (through dynamic import)

// Named exports
export const esmFunction = (message) => {
    return `ES Module says: ${message}`;
};

export const esmNumbers = [10, 20, 30, 40, 50];

// Class export
export class ESMClass {
    constructor(name) {
        this.name = name;
        this.type = 'ES Module';
    }

    greet() {
        return `Hello from ${this.name}, I'm an ${this.type}!`;
    }

    getInfo() {
        return {
            name: this.name,
            type: this.type,
            moduleSystem: 'ES Modules'
        };
    }

    async asyncGreet() {
        await new Promise(resolve => setTimeout(resolve, 100));
        return `Async hello from ${this.name}!`;
    }
}

// Object export
export const esmData = {
    version: '2.0.0',
    author: 'ES Module Developer',
    features: ['import', 'export', 'dynamic import', 'top-level await'],
    asynchronous: true,
    staticAnalysis: true
};

// Function that uses ES Module-specific features
export const getESMInfo = () => {
    return {
        url: import.meta.url,
        isESModule: true,
        supportsTopLevelAwait: true,
        supportsDynamicImport: true
    };
};

// Utility function
export const processData = async (data) => {
    // Simulate async processing
    await new Promise(resolve => setTimeout(resolve, 50));
    return {
        processed: true,
        originalData: data,
        processedAt: new Date().toISOString(),
        processedBy: 'ES Module'
    };
};

// Default export
const defaultExport = {
    message: 'This is the default export from ES Module',
    timestamp: Date.now(),
    process: async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
        return 'Async processing in ES Module';
    }
};

export default defaultExport;

console.log('[Interop] ES Module loaded');
