// ES Modules Configuration
// Demonstrates various export patterns and module organization

// Environment setup - browser compatible
// Note: 'process' is a Node.js global that doesn't exist in browsers
// We check if it exists before trying to use it
const environment = (typeof process !== 'undefined' && process.env) 
    ? process.env.NODE_ENV || 'development'  // Node.js environment
    : 'browser';  // Browser environment

// Private constants (not exported)
const secretKey = 'esm-super-secret-key-456';
const version = '2.0.0';

// Configuration object
const config = {
    environment,
    port: (typeof process !== 'undefined' && process.env) 
        ? process.env.PORT || 3000 
        : 3000,
    database: {
        host: (typeof process !== 'undefined' && process.env) 
            ? process.env.DB_HOST || 'localhost' 
            : 'localhost',
        port: (typeof process !== 'undefined' && process.env) 
            ? parseInt(process.env.DB_PORT) || 5432 
            : 5432,
        name: `myapp_esm_${environment}`,
        ssl: environment === 'production',
        maxConnections: environment === 'production' ? 20 : 5
    },
    api: {
        timeout: 5000,
        retries: 3,
        baseUrl: environment === 'production' 
            ? 'https://api.myapp.com/v2' 
            : 'http://localhost:3001/v2',
        rateLimiting: {
            enabled: environment === 'production',
            requestsPerHour: 1000
        }
    },
    features: {
        enableCache: true,
        enableLogging: environment !== 'test',
        enableMetrics: environment === 'production',
        enableWebSockets: true
    },
    security: {
        corsEnabled: environment !== 'production',
        allowedOrigins: environment === 'production' 
            ? ['https://myapp.com'] 
            : ['http://localhost:3000', 'http://localhost:3001']
    }
};

// Utility functions
const getSecretKey = () => secretKey;

const isProduction = () => environment === 'production';

const isDevelopment = () => environment === 'development';

const isTest = () => environment === 'test';

const getVersion = () => version;

const getDatabaseUrl = () => {
    const { host, port, name } = config.database;
    return `postgresql://${host}:${port}/${name}`;
};

const getApiConfig = () => ({ ...config.api });

// Named exports - individual items
export { config };
export { getSecretKey };
export { isProduction, isDevelopment, isTest };
export { getVersion };

// Named exports - grouped
export { getDatabaseUrl, getApiConfig };

// You can also export everything at once:
// export { 
//     config, 
//     getSecretKey, 
//     isProduction, 
//     isDevelopment, 
//     isTest,
//     getVersion,
//     getDatabaseUrl,
//     getApiConfig 
// };

// Or create a default export object:
const configModule = {
    config,
    getSecretKey,
    isProduction,
    isDevelopment,
    isTest,
    getVersion,
    getDatabaseUrl,
    getApiConfig
};

// Uncomment this if you want a default export instead:
// export default configModule;

console.log('[ES Modules] config.js loaded for environment:', environment);
