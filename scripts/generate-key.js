// 生成 API Key
const crypto = require('crypto');
// 生成随机 
Keyfunction generateKey() { 
  return 'luna_' + crypto.randomBytes(32).toString('hex').substring(0, 32);
}

const apiKey = generateKey();
console.log('新 API Key:', apiKey);
console.log('添加到 Vercel 环境变量: API_KEY=' + apiKey);
// 同时保存到文件
const fs = require('fs');
fs.writeFileSync('.env.local', `API_KEY=${apiKey}
`);
console.log('已保存到 .env.local');
