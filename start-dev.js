const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting NovaStore Full-Stack Dev Environment...\n');

// 1. Start backend server
const server = spawn(process.execPath, [path.join(__dirname, 'server/server.js')], {
  stdio: 'pipe',
  env: { ...process.env, PORT: '5000' }
});

server.stdout.on('data', data => {
  process.stdout.write(`\x1b[34m[SERVER]\x1b[0m ${data}`);
});

server.stderr.on('data', data => {
  process.stderr.write(`\x1b[31m[SERVER ERROR]\x1b[0m ${data}`);
});

// 2. Start frontend client Vite dev server
const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const client = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.join(__dirname, 'client'),
  stdio: 'pipe',
  shell: true,
  env: { ...process.env }
});

client.stdout.on('data', data => {
  process.stdout.write(`\x1b[32m[CLIENT]\x1b[0m ${data}`);
});

client.stderr.on('data', data => {
  process.stderr.write(`\x1b[33m[CLIENT LOG]\x1b[0m ${data}`);
});

// Clean termination handling
function shutdown() {
  console.log('\n🛑 Shutting down dev servers...');
  server.kill();
  client.kill();
  process.exit();
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
