// Comparison Demo - Shows the key difference in behavior
const { spawn } = require('child_process');

console.log('🔍 COMPARISON: CommonJS vs ES Modules Loading Behavior\n');

async function runDemo() {
    console.log('1️⃣ CommonJS (Synchronous/Blocking):');
    console.log('   - require() STOPS execution until module loads');
    console.log('   - Code runs line-by-line');
    console.log('   - Notice the timestamps:\n');
    
    await runCommand('node', ['commonjs-demo.cjs']);
    
    console.log('\n' + '='.repeat(60) + '\n');
    
    console.log('2️⃣ ES Modules (Asynchronous/Hoisted):');
    console.log('   - import statements are HOISTED (processed first)');
    console.log('   - Module loads BEFORE any code runs');
    console.log('   - Notice the loading happens FIRST:\n');
    
    await runCommand('node', ['esm-demo.js']);
    
    console.log('\n' + '='.repeat(60) + '\n');
    
    console.log('📚 KEY INSIGHT:');
    console.log('CommonJS: Code → require() → WAIT → continue');
    console.log('ES Modules: Parse → load imports → THEN run code');
    console.log('\nThis is why ES modules are "non-blocking" - they don\'t');
    console.log('interrupt code execution because loading happens BEFORE execution!');
}

function runCommand(command, args) {
    return new Promise((resolve, reject) => {
        const child = spawn(command, args, { stdio: 'inherit' });
        child.on('close', (code) => {
            if (code === 0) resolve();
            else reject(new Error(`Command failed with code ${code}`));
        });
    });
}

runDemo().catch(console.error);
