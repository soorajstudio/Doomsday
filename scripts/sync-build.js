import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const assetsDir = path.resolve('assets');
const rootSeqDir = path.resolve('sequence');
const publicDir = path.resolve('public');

if (!fs.existsSync(distDir)) {
  console.error('dist directory does not exist.');
  process.exit(1);
}

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// 1. Copy dist/assets/app.js and app.css to root assets/
const distAssets = path.join(distDir, 'assets');
if (fs.existsSync(path.join(distAssets, 'app.js'))) {
  fs.copyFileSync(path.join(distAssets, 'app.js'), path.join(assetsDir, 'app.js'));
  console.log('✓ Copied dist/assets/app.js -> assets/app.js');
}

if (fs.existsSync(path.join(distAssets, 'app.css'))) {
  fs.copyFileSync(path.join(distAssets, 'app.css'), path.join(assetsDir, 'app.css'));
  console.log('✓ Copied dist/assets/app.css -> assets/app.css');
}

// 2. Ensure dist has index.html pointing to ./assets/app.js & app.css
const rootIndexHtml = path.resolve('index.html');
const distIndexHtml = path.join(distDir, 'index.html');
if (fs.existsSync(rootIndexHtml)) {
  fs.copyFileSync(rootIndexHtml, distIndexHtml);
  console.log('✓ Copied index.html -> dist/index.html');
}

// 3. Ensure sequence is in root and dist
const publicSeqDir = path.join(publicDir, 'sequence');
if (fs.existsSync(publicSeqDir)) {
  if (!fs.existsSync(rootSeqDir)) {
    fs.mkdirSync(rootSeqDir, { recursive: true });
  }
  fs.cpSync(publicSeqDir, rootSeqDir, { recursive: true });
  console.log('✓ Synced sequence to root sequence/');

  const distSeqDir = path.join(distDir, 'sequence');
  if (!fs.existsSync(distSeqDir)) {
    fs.mkdirSync(distSeqDir, { recursive: true });
  }
  fs.cpSync(publicSeqDir, distSeqDir, { recursive: true });
  console.log('✓ Synced sequence to dist/sequence/');
}

// 4. Ensure dist has all public assets
if (fs.existsSync(publicDir)) {
  fs.cpSync(publicDir, distDir, { recursive: true });
  console.log('✓ Synced public assets into dist');
}

console.log('✓ Build synchronization 100% complete!');
