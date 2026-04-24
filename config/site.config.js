// config/site.config.js 
/**
 * LunaTV Enhanced 站点配置文件
 * 集中管理所有站点配置，便于维护和扩展
 */

const siteConfig = {
  // ========== 元信息配置 ==========
  meta: {
    title: process.env.NEXT_PUBLIC_SITE_NAME || 'LunaTV Enhanced',
    description: '一个强大的视频资源管理平台',
    keywords: '视频,影视,播放器,资源管理,在线观看',
    author: 'LunaTV Team',
    version: '1.0.0',
    language: 'zh-CN',
  },

  // ========== 站点基础配置 ==========
  site: {
    url: process.env.SITE_BASE ||  'https://lun-tv-eight.vercel.app',
    name: process.env.NEXT_PUBLIC_SITE_NAME || 'LunaTV Enhanced',
    announcement: process.env.ANNOUNCEMENT || '欢迎使用 LunaTV Enhanced',
    timezone: 'Asia/Shanghai',
    copyright: `©  LunaTV Enhanced`,
  },

  // ========== 功能配置 ==========
  features: {
    // 搜索功能
    search: {
      enabled: true,
      maxPages: parseInt(process.env.NEXT_PUBLIC_SEARCH_MAX_PAGE) || 5,
      fluidSearch: process.env.NEXT_PUBLIC_FLUID_SEARCH === 'true',
      timeout: 10000, // 10秒超时
    },

    // 播放器功能
    player: {
      enabled: true,
      autoplay: process.env.NEXT_PUBLIC_PLAYER_AUTOPLAY === 'true',
      defaultQuality: process.env.NEXT_PUBLIC_PLAYER_QUALITY || '1080p',
      qualities: ['360p', '480p', '720p', '1080p', '4k'],
      enableDanmaku: process.env.NEXT_PUBLIC_ENABLE_DANMAKU !== 'false',
      enableSpeedControl: true,
      enableSubtitle: true,
    },

    // 缓存功能
    cache: {
      enabled: true,
      ttl: parseInt(process.env.NEXT_PUBLIC_CACHE_TTL) || 3600, // 1小时
      maxSize: 100, // 最大缓存条目数
      strategy: 'memory-first', // 缓存策略
    },

    // 代理功能
    proxy: {
      doubanProxyType: process.env.NEXT_PUBLIC_DOUBAN_PROXY_TYPE || 'cmliussss-cdn-tencent',
      doubanImageProxyType: process.env.NEXT_PUBLIC_DOUBAN_IMAGE_PROXY_TYPE || 'cmliussss-cdn-tencent',
    },
  },

  // ========== API 配置 ==========
  api: {
    enabled: true,
    key: process.env.API_KEY || 'luna_7f3d9a2c5b8e1f4a6c9d0e2b5a8f3c1d',
    liveSources: {
      requireKey: true,
      allowedOrigins: ['*']
    }
  },

  // ========== UI/UX 配置 ==========
  ui: {
    // 主题配置
    theme: {
      default: 'dark', // dark, light, auto
      allowSwitch: true,
      colors: {
        primary: '#1890ff',
        secondary: '#52c41a',
        background: '#141414',
        surface: '#1f1f1f',
        text: '#ffffff',
      },
    },

    // 布局配置
    layout: {
      showHeader: true,
      showSidebar: true,
      showFooter: true,
      sidebarWidth: 240,
      headerHeight: 64,
    },

    // 响应式断点
    breakpoints: {
      mobile: 768,
      tablet: 1024,
      desktop: 1280,
    },
  },

  // ========== 性能配置 ==========
  performance: {
    // 图片优化
    imageOptimization: true,
    imageQuality: 80,
    imageFormats: ['webp', 'avif'],

    // 懒加载
    lazyLoading: true,
    lazyOffset: 100, // 提前100px加载

    // 预加载
    prefetch: process.env.NEXT_PUBLIC_ENABLE_PREFETCH !== 'false',
    prefetchStrategy: 'viewport',

    // 压缩
    compression: true,
    gzip: true,
    brotli: true,
  },

  // ========== 安全配置 ==========
  security: {
    // 速率限制
    rateLimit: {
      enabled: process.env.NEXT_PUBLIC_ENABLE_RATELIMIT !== 'false',
      windowMs: 60000, // 1分钟
      max: parseInt(process.env.NEXT_PUBLIC_MAX_REQUESTS_PER_MINUTE) || 60,
    },

    // CORS配置
    cors: {
      enabled: true,
      origins: ['*'], // 生产环境应限制为具体域名
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
    },

    // 安全头
    headers: {
      xFrameOptions: 'DENY',
      xContentTypeOptions: 'nosniff',
      xXSSProtection: '1; mode=block',
      referrerPolicy: 'strict-origin-when-cross-origin',
      contentSecurityPolicy: "default-src 'self'",
    },

    // 输入验证
    validation: {
      maxInputLength: 500,
      maxFileSize: 10 * 1024 * 1024, // 10MB
      allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif'],
    },
  },

  // ========== 第三方服务配置 ==========
  services: {
    // 存储服务
    storage: {
      type: process.env.NEXT_PUBLIC_STORAGE_TYPE || 'upstash',
      upstash: {
        url: process.env.UPSTASH_URL,
        token: process.env.UPSTASH_TOKEN,
      },
    },

    // 分析服务（可选）
    analytics: {
      enabled: false,
      googleAnalyticsId: '',
      umamiId: '',
    },

    // 监控服务（可选）
    monitoring: {
      enabled: false,
      sentryDsn: '',
    },
  },

  // ========== 开发环境覆盖 ==========
  // 开发环境的特殊配置
  ...(process.env.NODE_ENV === 'development' && {
    site: {
      url: 'http://localhost:3000',
    },
    features: {
      cache: {
        ttl: 300, // 开发环境缩短缓存时间
      },
    },
    security: {
      rateLimit: {
        max: 1000, // 开发环境放宽限制
      },
    },
  }),
};

// 导出配置
module.exports = siteConfig;

// 配置验证（开发环境）
if (process.env.NODE_ENV === 'development') {
  const requiredFields = [
    'meta.title',
    'site.url',
    'services.storage.type',
  ];

  requiredFields.forEach(field => {
    const keys = field.split('.');
    let value = siteConfig;
    for (const key of keys) {
      value = value[key];
      if (value === undefined) {
        console.warn(`⚠️ 配置警告:  未定义`);
        break;
      }
    }
  });
}



