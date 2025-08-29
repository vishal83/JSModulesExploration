// CommonJS Configuration Module
// Demonstrates exporting configuration objects and functions

const environment = process.env.NODE_ENV || 'development';

// Private variables (not exported)
const secretKey = 'super-secret-key-123';
const version = '1.0.0';

// Configuration object
const config = {
    environment,
    port: process.env.PORT || 3000,
    database: {
        host: 'localhost',
        port: 5432,
        name: `myapp_${environment}`,
        ssl: environment === 'production'
    },
    api: {
        timeout: 5000,
        retries: 3,
        baseUrl: environment === 'production' 
            ? 'https://api.myapp.com' 
            : 'http://localhost:3001'
    },
    features: {
        enableCache: true,
        enableLogging: environment !== 'test',
        enableMetrics: environment === 'production'
    }
};

// Functions for configuration
function getSecretKey() {
    return secretKey;
}

function isProduction() {
    return environment === 'production';
}

function isDevelopment() {
    return environment === 'development';
}

function getVersion() {
    return version;
}

// Method 1: Export individual items
exports.config = config;
exports.getSecretKey = getSecretKey;
exports.isProduction = isProduction;
exports.isDevelopment = isDevelopment;
exports.getVersion = getVersion;

// Method 2: You could also export everything at once with module.exports
// module.exports = {
//     config,
//     getSecretKey,
//     isProduction,
//     isDevelopment,
//     getVersion
// };

console.log('[CommonJS] config.js loaded for environment:', environment);
