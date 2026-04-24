# LunaTV Enhanced 配置说明

## 实际部署信息
- **站点地址**: https://lun-tv-eight.vercel.app
- **管理员页面**: https://lun-tv-eight.vercel.app/admin
- **部署时间**: 2026-04-24

## 环境变量配置

### 必填配置（已在Vercel设置）
| 变量名 | 实际值 |
|--------|--------|
| \USERNAME\ | \dmin\ |
| \PASSWORD\ | \Guchenhui1997.\ |
| \UPSTASH_URL\ | \https://open-clam-105569.upstash.io\ |
| \UPSTASH_TOKEN\ | \gQAAAAAAAZxhAAIgcDEwMGM3MDAyM2RhZjQ0YWJmOWE4N2IwOTJkZTIzMDdiMw\ |

### 建议配置
- \SITE_BASE\: https://lun-tv-eight.vercel.app
- \NEXT_PUBLIC_SITE_NAME\: LunaTV Enhanced
- \ANNOUNCEMENT\: 欢迎使用 LunaTV Enhanced
- \NEXT_PUBLIC_SEARCH_MAX_PAGE\: 5
- \NEXT_PUBLIC_FLUID_SEARCH\: true
- \NEXT_PUBLIC_PLAYER_AUTOPLAY\: false
- \NEXT_PUBLIC_PLAYER_QUALITY\: 1080p
- \NEXT_PUBLIC_DOUBAN_PROXY_TYPE\: cmliussss-cdn-tencent
- \NEXT_PUBLIC_DOUBAN_IMAGE_PROXY_TYPE\: cmliussss-cdn-tencent

## 配置文件说明

### 核心文件
1. \config/site.config.js\ - 站点主配置
2. \ercel.json\ - Vercel部署配置
3. \
ext.config.js\ - Next.js框架配置

## 管理员访问
1. 访问: https://lun-tv-eight.vercel.app/admin
2. 用户名: admin
3. 密码: Guchenhui1997.

## 故障排除
1. 检查Vercel环境变量是否正确
2. 确认Upstash连接正常
3. 查看Vercel部署日志
