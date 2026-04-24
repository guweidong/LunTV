# fix-all-configs.ps1
Write-Host "正在修复所有配置文件..." -ForegroundColor Cyan

# 1. 修复 vercel.json
Write-Host "修复 vercel.json..." -ForegroundColor Yellow
$vercelFixed = @"
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "functions": {
    "api/**/*.js": {
      "maxDuration": 10,
      "memory": 1024
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
"@
$vercelFixed | Out-File -FilePath "vercel.json" -Encoding UTF8
Write-Host "✅ vercel.json 已修复" -ForegroundColor Green

# 2. 修复 CONFIGURATION.md
Write-Host "修复 CONFIGURATION.md..." -ForegroundColor Yellow
$docFixed = @"
# LunaTV Enhanced 配置说明

## 实际部署信息
- **站点地址**: https://lun-tv-eight.vercel.app
- **管理员页面**: https://lun-tv-eight.vercel.app/admin
- **部署时间**: 2026-04-24

## 环境变量配置

### 必填配置（已在Vercel设置）
| 变量名 | 实际值 |
|--------|--------|
| \`USERNAME\` | \`admin\` |
| \`PASSWORD\` | \`Guchenhui1997.\` |
| \`UPSTASH_URL\` | \`https://open-clam-105569.upstash.io\` |
| \`UPSTASH_TOKEN\` | \`gQAAAAAAAZxhAAIgcDEwMGM3MDAyM2RhZjQ0YWJmOWE4N2IwOTJkZTIzMDdiMw\` |

### 建议配置
- \`SITE_BASE\`: https://lun-tv-eight.vercel.app
- \`NEXT_PUBLIC_SITE_NAME\`: LunaTV Enhanced
- \`ANNOUNCEMENT\`: 欢迎使用 LunaTV Enhanced
- \`NEXT_PUBLIC_SEARCH_MAX_PAGE\`: 5
- \`NEXT_PUBLIC_FLUID_SEARCH\`: true
- \`NEXT_PUBLIC_PLAYER_AUTOPLAY\`: false
- \`NEXT_PUBLIC_PLAYER_QUALITY\`: 1080p
- \`NEXT_PUBLIC_DOUBAN_PROXY_TYPE\`: cmliussss-cdn-tencent
- \`NEXT_PUBLIC_DOUBAN_IMAGE_PROXY_TYPE\`: cmliussss-cdn-tencent

## 配置文件说明

### 核心文件
1. \`config/site.config.js\` - 站点主配置
2. \`vercel.json\` - Vercel部署配置
3. \`next.config.js\` - Next.js框架配置

## 管理员访问
1. 访问: https://lun-tv-eight.vercel.app/admin
2. 用户名: admin
3. 密码: Guchenhui1997.

## 故障排除
1. 检查Vercel环境变量是否正确
2. 确认Upstash连接正常
3. 查看Vercel部署日志
"@
$docFixed | Out-File -FilePath "docs\CONFIGURATION.md" -Encoding UTF8
Write-Host "✅ CONFIGURATION.md 已修复" -ForegroundColor Green

# 3. 修复 site.config.js 中的多余空格
Write-Host "修复 site.config.js..." -ForegroundColor Yellow
$siteConfig = Get-Content "config\site.config.js" -Raw -Encoding UTF8
# 修复多余空格
$siteConfig = $siteConfig -replace "  'https://lun-tv-eight\.vercel\.app'", " 'https://lun-tv-eight.vercel.app'"
$siteConfig | Out-File -FilePath "config\site.config.js" -Encoding UTF8
Write-Host "✅ site.config.js 已修复" -ForegroundColor Green

# 4. 创建 .env.example（如果不存在）
Write-Host "检查 .env.example..." -ForegroundColor Yellow
if (-not (Test-Path ".env.example")) {
    $envContent = @"
# LunaTV Enhanced 环境变量配置模板

# ========== 管理员账号 ==========
USERNAME=admin
PASSWORD=Guchenhui1997.

# ========== Upstash Redis 配置 ==========
UPSTASH_URL=https://open-clam-105569.upstash.io
UPSTASH_TOKEN=gQAAAAAAAZxhAAIgcDEwMGM3MDAyM2RhZjQ0YWJmOWE4N2IwOTJkZTIzMDdiMw

# ========== 站点配置 ==========
SITE_BASE=https://lun-tv-eight.vercel.app
NEXT_PUBLIC_SITE_NAME=LunaTV Enhanced
ANNOUNCEMENT=欢迎使用 LunaTV Enhanced

# ========== 功能配置 ==========
NEXT_PUBLIC_SEARCH_MAX_PAGE=5
NEXT_PUBLIC_FLUID_SEARCH=true
NEXT_PUBLIC_PLAYER_AUTOPLAY=false
NEXT_PUBLIC_PLAYER_QUALITY=1080p
NEXT_PUBLIC_ENABLE_DANMAKU=true

# ========== 代理配置 ==========
NEXT_PUBLIC_DOUBAN_PROXY_TYPE=cmliussss-cdn-tencent
NEXT_PUBLIC_DOUBAN_IMAGE_PROXY_TYPE=cmliussss-cdn-tencent
"@
    $envContent | Out-File -FilePath ".env.example" -Encoding UTF8
    Write-Host "✅ .env.example 已创建" -ForegroundColor Green
} else {
    Write-Host "✅ .env.example 已存在" -ForegroundColor Green
}

Write-Host "`n✅ 所有配置文件修复完成！" -ForegroundColor Green
Write-Host "`n修复内容总结：" -ForegroundColor Cyan
Write-Host "1. vercel.json: 修复路由dest参数" -ForegroundColor White
Write-Host "2. CONFIGURATION.md: 修复拼写错误和格式" -ForegroundColor White
Write-Host "3. site.config.js: 修复多余空格" -ForegroundColor White
Write-Host "4. .env.example: 确保存在" -ForegroundColor White
