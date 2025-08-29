// Main entry point for JS Modules Exploration
// This demonstrates how to run examples from both module systems

console.log('🚀 JavaScript Modules Exploration\n');

async function main() {
    console.log('Choose what to explore:');
    console.log('1. CommonJS Examples');
    console.log('2. ES Modules Examples'); 
    console.log('3. Interoperability Examples');
    console.log('4. Run All Examples\n');

    // For demo purposes, we'll run all examples
    const choice = process.argv[2] || '4';

    switch(choice) {
        case '1':
            await runCommonJSDemo();
            break;
        case '2':
            await runESModulesDemo();
            break;
        case '3':
            await runInteropDemo();
            break;
        case '4':
        default:
            await runAllDemos();
            break;
    }
}

async function runCommonJSDemo() {
    console.log('\n📦 Running CommonJS Demo...\n');
    try {
        // Use child_process to run the CommonJS demo
        const { spawn } = require('child_process');
        
        return new Promise((resolve, reject) => {
            const demo = spawn('node', ['commonjs/demo.js'], { 
                stdio: 'inherit',
                cwd: __dirname 
            });
            
            demo.on('close', (code) => {
                if (code === 0) {
                    resolve();
                } else {
                    reject(new Error(`CommonJS demo failed with code ${code}`));
                }
            });
        });
    } catch (error) {
        console.error('Error running CommonJS demo:', error.message);
    }
}

async function runESModulesDemo() {
    console.log('\n🔧 Running ES Modules Demo...\n');
    try {
        const { spawn } = require('child_process');
        
        return new Promise((resolve, reject) => {
            const demo = spawn('node', ['esm/demo.js'], { 
                stdio: 'inherit',
                cwd: __dirname 
            });
            
            demo.on('close', (code) => {
                if (code === 0) {
                    resolve();
                } else {
                    reject(new Error(`ES Modules demo failed with code ${code}`));
                }
            });
        });
    } catch (error) {
        console.error('Error running ES Modules demo:', error.message);
    }
}

async function runInteropDemo() {
    console.log('\n🔄 Running Interoperability Demo...\n');
    try {
        const { spawn } = require('child_process');
        
        return new Promise((resolve, reject) => {
            const demo = spawn('node', ['interoperability/demo.js'], { 
                stdio: 'inherit',
                cwd: __dirname 
            });
            
            demo.on('close', (code) => {
                if (code === 0) {
                    resolve();
                } else {
                    reject(new Error(`Interoperability demo failed with code ${code}`));
                }
            });
        });
    } catch (error) {
        console.error('Error running Interoperability demo:', error.message);
    }
}

async function runAllDemos() {
    console.log('🎯 Running all demos in sequence...\n');
    
    try {
        await runCommonJSDemo();
        console.log('\n✅ CommonJS demo completed\n');
        
        await runESModulesDemo();
        console.log('\n✅ ES Modules demo completed\n');
        
        await runInteropDemo();
        console.log('\n✅ Interoperability demo completed\n');
        
        console.log('🎉 All demos completed successfully!');
        
    } catch (error) {
        console.error('❌ Demo failed:', error.message);
    }
}

// Show usage information
function showUsage() {
    console.log(`
Usage: node index.js [option]

Options:
  1    Run CommonJS examples only
  2    Run ES Modules examples only  
  3    Run interoperability examples only
  4    Run all examples (default)

Examples:
  node index.js 1    # Run CommonJS demo
  node index.js      # Run all demos
  
You can also run individual demos directly:
  npm run demo:commonjs     # CommonJS examples
  npm run demo:esm-native   # ES Modules examples
  npm run demo:interop      # Interoperability examples
  npm run demo:all          # All examples
`);
}

// Show usage if help is requested
if (process.argv.includes('--help') || process.argv.includes('-h')) {
    showUsage();
    process.exit(0);
}

// Run the main function
main().catch(error => {
    console.error('❌ Application error:', error.message);
    process.exit(1);
});
