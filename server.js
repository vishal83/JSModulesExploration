// Simple HTTP Server for JavaScript Modules Exploration
// Serves files so you can test ES Modules in browsers

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;

// MIME types for different file extensions
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.mjs': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// Simple routing
const routes = {
    '/': '/browser/index.html',
    '/browser': '/browser/index.html',
    '/esm-demo': '/browser/esm-demo.html',
    '/loading-demo': '/browser/loading-demo.html',
    '/dynamic-demo': '/browser/dynamic-demo.html',
    '/interop-demo': '/browser/interop-demo.html'
};

const server = http.createServer((req, res) => {
    // Parse URL
    const parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;
    
    // Handle routing
    if (routes[pathname]) {
        pathname = routes[pathname];
    }
    
    // Prevent directory traversal
    const sanitizedPath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
    const filePath = path.join(__dirname, sanitizedPath);
    
    // Security check - ensure we're serving from our directory
    if (!filePath.startsWith(__dirname)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Forbidden');
        return;
    }
    
    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // File not found
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>404 - Not Found</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 40px; }
                        .error { color: #d32f2f; }
                        .nav { margin-top: 20px; }
                        .nav a { display: inline-block; margin-right: 15px; padding: 8px 16px; 
                                background: #1976d2; color: white; text-decoration: none; border-radius: 4px; }
                    </style>
                </head>
                <body>
                    <h1 class="error">404 - File Not Found</h1>
                    <p>The requested file <code>${pathname}</code> was not found.</p>
                    <div class="nav">
                        <a href="/">🏠 Home</a>
                        <a href="/esm-demo">📦 ES Modules Demo</a>
                        <a href="/loading-demo">⚡ Loading Demo</a>
                    </div>
                </body>
                </html>
            `);
            return;
        }
        
        // Get file stats
        fs.stat(filePath, (err, stats) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            
            // If it's a directory, try to serve index.html
            if (stats.isDirectory()) {
                const indexPath = path.join(filePath, 'index.html');
                fs.access(indexPath, fs.constants.F_OK, (err) => {
                    if (err) {
                        // Directory listing (simple)
                        fs.readdir(filePath, (err, files) => {
                            if (err) {
                                res.writeHead(500, { 'Content-Type': 'text/plain' });
                                res.end('Internal Server Error');
                                return;
                            }
                            
                            const html = `
                                <!DOCTYPE html>
                                <html>
                                <head>
                                    <title>Directory: ${pathname}</title>
                                    <style>
                                        body { font-family: Arial, sans-serif; margin: 40px; }
                                        .file { margin: 8px 0; }
                                        .file a { text-decoration: none; color: #1976d2; }
                                        .file a:hover { text-decoration: underline; }
                                    </style>
                                </head>
                                <body>
                                    <h1>📁 Directory: ${pathname}</h1>
                                    ${files.map(file => `
                                        <div class="file">
                                            <a href="${path.join(pathname, file)}">${file}</a>
                                        </div>
                                    `).join('')}
                                </body>
                                </html>
                            `;
                            
                            res.writeHead(200, { 'Content-Type': 'text/html' });
                            res.end(html);
                        });
                        return;
                    }
                    
                    // Serve index.html from directory
                    serveFile(indexPath, res);
                });
                return;
            }
            
            // Serve the file
            serveFile(filePath, res);
        });
    });
});

function serveFile(filePath, res) {
    const ext = path.extname(filePath).toLowerCase();
    const mimeType = mimeTypes[ext] || 'application/octet-stream';
    
    // Set CORS headers for ES modules
    const headers = {
        'Content-Type': mimeType,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    };
    
    // Cache control for development
    if (ext === '.js' || ext === '.mjs') {
        headers['Cache-Control'] = 'no-cache';
    }
    
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
            return;
        }
        
        res.writeHead(200, headers);
        res.end(content);
    });
}

server.listen(PORT, () => {
    console.log(`
🚀 JavaScript Modules Exploration Server Started!

📍 Server running at: http://localhost:${PORT}

🌐 Available pages:
   • Home Page:      http://localhost:${PORT}/
   • ES Modules:     http://localhost:${PORT}/esm-demo
   • Loading Demo:   http://localhost:${PORT}/loading-demo
   • Dynamic Demo:   http://localhost:${PORT}/dynamic-demo
   • Browser Tests:  http://localhost:${PORT}/browser

📁 File serving from: ${__dirname}

🔧 To stop server: Ctrl+C
    `);
});

// Handle server errors
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use. Try a different port:`);
        console.error(`   PORT=3001 npm run serve`);
    } else {
        console.error('❌ Server error:', err.message);
    }
    process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Shutting down server...');
    server.close(() => {
        console.log('✅ Server stopped');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    console.log('\n👋 Received SIGTERM, shutting down gracefully...');
    server.close(() => {
        console.log('✅ Server stopped');
        process.exit(0);
    });
});
