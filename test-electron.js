// Script de teste para verificar se Electron está configurado
const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuração do Electron...\n');

// Verificar arquivos necessários
const files = [
  'public/electron.js',
  'public/preload.js',
  'package.json'
];

let allOk = true;

files.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} - OK`);
  } else {
    console.log(`❌ ${file} - NÃO ENCONTRADO`);
    allOk = false;
  }
});

// Verificar package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

console.log('\n📦 Verificando package.json:');
console.log(`✅ main: ${packageJson.main}`);
console.log(`✅ homepage: ${packageJson.homepage}`);
console.log(`✅ Scripts Electron:`);
console.log(`   - electron:dev: ${packageJson.scripts['electron:dev'] ? '✅' : '❌'}`);
console.log(`   - electron:build:win: ${packageJson.scripts['electron:build:win'] ? '✅' : '❌'}`);

// Verificar dependências
console.log('\n📚 Dependências:');
const deps = packageJson.devDependencies || {};
console.log(`   - electron: ${deps.electron ? '✅ ' + deps.electron : '❌'}`);
console.log(`   - electron-builder: ${deps['electron-builder'] ? '✅ ' + deps['electron-builder'] : '❌'}`);
console.log(`   - concurrently: ${deps.concurrently ? '✅ ' + deps.concurrently : '❌'}`);

if (allOk) {
  console.log('\n🎉 Tudo configurado corretamente!');
  console.log('\n📝 Próximos passos:');
  console.log('   1. npm run electron:dev     - Testar em desenvolvimento');
  console.log('   2. npm run electron:build:win - Gerar executável');
} else {
  console.log('\n⚠️  Alguns arquivos estão faltando!');
}
