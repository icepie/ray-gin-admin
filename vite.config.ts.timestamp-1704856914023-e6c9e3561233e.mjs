// vite.config.ts
import { defineConfig } from "file:///home/icepie/Projects/ray-gin-admin/node_modules/.pnpm/vite@5.0.10_@types+node@20.5.1_sass@1.69.5/node_modules/vite/dist/node/index.js";

// cfg.ts
import path from "node:path";

// vite-plugins/index.ts
var htmlTitlePlugin = (title) => {
  return {
    name: "html-transform",
    transformIndexHtml: (html) => {
      return html.replace(/<title>(.*?)<\/title>/, `<title>${title}</title>`);
    }
  };
};
var mixinCSSPlugin = (options) => {
  if (!Array.isArray(options)) {
    throw TypeError(
      "mixinCSSPlugin: The mixinCSSPlugin argument must be an array!"
    );
  }
  const mixinString = options.reduce((pre, curr) => {
    const temp = `@import "${curr}";`;
    return pre += temp;
  }, "");
  return mixinString;
};

// src/app-config/designConfig.ts
var APP_THEME = {
  /**
   *
   * 系统主题颜色预设色盘
   * 支持 RGBA、RGB、十六进制
   */
  appThemeColors: [
    "#2d8cf0",
    "#0960bd",
    "#536dfe",
    "#ff5c93",
    "#ee4f12",
    "#9c27b0",
    "#ff9800",
    "#18A058"
  ],
  /** 系统主题色 */
  appPrimaryColor: {
    /** 主题色 */
    primaryColor: "#2d8cf0",
    /** 主题辅助色(用于整体 hover、active 等之类颜色) */
    primaryFadeColor: "rgba(45, 140, 240, 0.3)"
  },
  /**
   *
   * 配置系统 naive-ui 主题色
   * 官网文档地址: <https://www.naiveui.com/zh-CN/dark/docs/customize-theme>
   *
   * 注意:
   *   - appPrimaryColor common 配置优先级大于该配置
   *
   * 如果需要定制化整体组件样式, 配置示例
   * 具体自行查看官网, 还有模式更佳丰富的 peers 主题变量配置
   * 地址: <https://www.naiveui.com/zh-CN/dark/docs/customize-theme#%E4%BD%BF%E7%94%A8-peers-%E4%B8%BB%E9%A2%98%E5%8F%98%E9%87%8F>
   *
   * @example
   * ```
   * const themeOverrides: GlobalThemeOverrides = {
   *   common: {
   *     primaryColor: '#FF0000',
   *   },
   *   Button: {
   *     textColor: '#FF0000',
   *   },
   * }
   * ```
   */
  appNaiveUIThemeOverrides: {},
  /**
   *
   * 配置 echart 主题颜色
   * 约定配置时以：主题名称为文件名，其文件夹下两个主题风格的 json 文件。并且暗色主题必须为 xxx-dark.json
   *
   * [文档地址](https://xiaodaigua-ray.github.io/ray-template-doc/ray-template-docs/advanced/echart-themes.html)
   */
  echartTheme: "macarons"
};

// src/app-config/appConfig.ts
var PRE_LOADING_CONFIG = {
  title: "Ray Template",
  tagColor: "#ff6700",
  titleColor: "#2d8cf0"
};
var SIDE_BAR_LOGO = {
  icon: "ray",
  title: "Ray Template",
  url: "/dashboard",
  jumpType: "station"
};

// cfg.ts
var __vite_injected_original_dirname = "/home/icepie/Projects/ray-gin-admin";
var config = {
  /** 公共基础路径配置, 如果为空则会默认以 '/' 填充 */
  base: "/ray-template/",
  /** 配置首屏加载信息 */
  preloadingConfig: PRE_LOADING_CONFIG,
  /** 默认主题色(不可省略, 必填), 也用于 ejs 注入 */
  appPrimaryColor: APP_THEME.appPrimaryColor,
  sideBarLogo: SIDE_BAR_LOGO,
  /**
   *
   * 预处理全局需要注入的 css 文件
   *
   * 预设:
   *   - ./src/styles/mixins.scss
   *   - ./src/styles/setting.scss
   *   - ./src/styles/theme.scss
   *
   * 如果需要删除或者修改, 需要同步修改目录下的 css 文件
   */
  mixinCSS: mixinCSSPlugin([
    "./src/styles/mixins.scss",
    "./src/styles/setting.scss"
  ]),
  /**
   *
   * 版权信息
   *
   * 也可以当作页底设置, 看实际业务需求
   */
  copyright: "Copyright \xA9 2022-present Ray",
  /**
   *
   * 浏览器标题
   */
  title: htmlTitlePlugin(PRE_LOADING_CONFIG.title || "Ray Template"),
  /**
   *
   * 配置 HMR 特定选项(端口、主机、路径和协议)
   */
  server: {
    host: "0.0.0.0",
    port: 9527,
    open: false,
    strictPort: false,
    fs: {
      strict: false,
      allow: []
    },
    proxy: {
      "^/api": {
        target: "http://localhost",
        changeOrigin: true,
        rewrite: (path3) => path3.replace(/^\/api/, "")
      }
    }
  },
  /**
   *
   * 打包相关配置
   */
  buildOptions: (mode) => {
    const outDirMap = {
      test: "dist/test-dist",
      development: "dist/development-dist",
      production: "dist/production-dist",
      report: "dist/report-dist"
    };
    const dirPath = outDirMap[mode] || "dist/test-dist";
    if (mode === "production") {
      return {
        outDir: dirPath,
        sourcemap: false,
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        }
      };
    } else {
      return {
        outDir: dirPath,
        sourcemap: true,
        terserOptions: {
          compress: {
            drop_console: false,
            drop_debugger: false
          }
        }
      };
    }
  },
  /**
   *
   * 预设别名
   * - `@`: `src` 根目录
   * - `@api`: `src/axios/api` 根目录
   * - `@images`: `src/assets/images` 根目录
   */
  alias: [
    {
      find: "@",
      replacement: path.resolve(__vite_injected_original_dirname, "./src")
    },
    {
      find: "@api",
      replacement: path.resolve(__vite_injected_original_dirname, "./src/axios/api")
    },
    {
      find: "@images",
      replacement: path.resolve(__vite_injected_original_dirname, "./src/assets/images")
    },
    {
      find: "@mock",
      replacement: path.resolve(__vite_injected_original_dirname, "./mock")
    }
  ]
};
var cfg_default = config;

// package.json
var package_default = {
  name: "ray-template",
  private: false,
  version: "4.5.0",
  type: "module",
  engines: {
    node: "^18.0.0 || >=20.0.0",
    pnpm: ">=8.0.0"
  },
  scripts: {
    dev: "vite",
    build: "vue-tsc --noEmit && vite build",
    preview: "vite preview",
    test: "vue-tsc --noEmit && vite build --mode test",
    "dev-build": "vue-tsc --noEmit && vite build --mode development",
    report: "vue-tsc --noEmit && vite build --mode report",
    prepare: "husky install"
  },
  husky: {
    hooks: {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{js,json}": [
      "prettier --write"
    ],
    "*.ts?(x)": [
      "eslint src",
      "prettier --parser=typescript --write"
    ]
  },
  dependencies: {
    "@vueuse/core": "^10.7.0",
    "awesome-qr": "2.1.5-rc.0",
    axios: "^1.6.3",
    clipboard: "^2.0.11",
    "crypto-js": "^4.2.0",
    "currency.js": "^2.0.4",
    dayjs: "^1.11.10",
    "dom-to-image": "2.6.0",
    echarts: "^5.4.3",
    interactjs: "1.10.26",
    "lodash-es": "^4.17.21",
    mockjs: "1.1.0",
    "naive-ui": "^2.36.0",
    pinia: "^2.1.7",
    "pinia-plugin-persistedstate": "^3.2.0",
    "print-js": "^1.6.0",
    vue: "^3.4.4",
    "vue-hooks-plus": "1.8.5",
    "vue-i18n": "^9.8.0",
    "vue-router": "^4.2.5",
    xlsx: "^0.18.5"
  },
  devDependencies: {
    "@babel/core": "^7.23.7",
    "@babel/eslint-parser": "^7.23.3",
    "@commitlint/cli": "^17.8.1",
    "@commitlint/config-conventional": "^17.8.1",
    "@interactjs/types": "1.10.21",
    "@intlify/unplugin-vue-i18n": "^1.5.0",
    "@types/crypto-js": "^4.2.1",
    "@types/dom-to-image": "2.6.7",
    "@types/lodash-es": "^4.17.12",
    "@types/mockjs": "1.0.7",
    "@typescript-eslint/eslint-plugin": "^6.16.0",
    "@typescript-eslint/parser": "^6.16.0",
    "@vitejs/plugin-vue": "^5.0.2",
    "@vitejs/plugin-vue-jsx": "^3.1.0",
    "@vue-hooks-plus/resolvers": "1.2.4",
    "@vue/eslint-config-prettier": "^8.0.0",
    "@vue/eslint-config-typescript": "^11.0.3",
    autoprefixer: "^10.4.16",
    depcheck: "^1.4.7",
    eslint: "^8.56.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-config-standard-with-typescript": "^39.1.1",
    "eslint-plugin-import": "^2.29.0",
    "eslint-plugin-n": "^16.5.0",
    "eslint-plugin-prettier": "^5.0.1",
    "eslint-plugin-promise": "^6.1.1",
    "eslint-plugin-vue": "^9.19.2",
    husky: "8.0.3",
    "lint-staged": "^15.2.0",
    postcss: "^8.4.32",
    "postcss-px-to-viewport-8-plugin": "1.2.2",
    prettier: "^3.1.1",
    "rollup-plugin-visualizer": "^5.10.0",
    sass: "1.69.5",
    "svg-sprite-loader": "^6.0.11",
    typescript: "^5.3.3",
    "unplugin-auto-import": "^0.16.7",
    "unplugin-vue-components": "^0.25.2",
    vite: "^5.0.10",
    "vite-plugin-cdn2": "0.15.2",
    "vite-plugin-compression": "^0.5.1",
    "vite-plugin-ejs": "^1.7.0",
    "vite-plugin-eslint": "1.8.1",
    "vite-plugin-imp": "^2.4.0",
    "vite-plugin-inspect": "^0.7.42",
    "vite-plugin-mock-dev-server": "1.3.4",
    "vite-plugin-svg-icons": "^2.0.1",
    "vite-svg-loader": "^4.0.0",
    "vue-tsc": "^1.8.27"
  },
  description: "<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->",
  main: "index.ts",
  repository: {
    type: "git",
    url: "git+https://github.com/XiaoDaiGua-Ray/xiaodaigua-ray.github.io.git"
  },
  keywords: [
    "ray-template",
    "vue3-tsx-vite-pinia",
    "ray template",
    "vite",
    "vue3",
    "admin template",
    "\u4E2D\u540E\u53F0\u6A21\u677F"
  ],
  license: "MIT",
  author: {
    name: "Ray",
    url: "https://github.com/XiaoDaiGua-Ray"
  },
  bugs: {
    url: "https://github.com/XiaoDaiGua-Ray/xiaodaigua-ray.github.io/issues"
  },
  homepage: "https://github.com/XiaoDaiGua-Ray/xiaodaigua-ray.github.io#readme"
};

// vite.plugin.config.ts
import path2 from "node:path";
import vue from "file:///home/icepie/Projects/ray-gin-admin/node_modules/.pnpm/@vitejs+plugin-vue@5.0.2_vite@5.0.10_vue@3.4.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import viteVueJSX from "file:///home/icepie/Projects/ray-gin-admin/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.0.10_vue@3.4.4/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import viteVeI18nPlugin from "file:///home/icepie/Projects/ray-gin-admin/node_modules/.pnpm/@intlify+unplugin-vue-i18n@1.5.0_vue-i18n@9.8.0/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
import viteInspect from "file:///home/icepie/Projects/ray-gin-admin/node_modules/.pnpm/vite-plugin-inspect@0.7.42_vite@5.0.10/node_modules/vite-plugin-inspect/dist/index.mjs";
import viteSvgLoader from "file:///home/icepie/Projects/ray-gin-admin/node_modules/.pnpm/vite-svg-loader@4.0.0/node_modules/vite-svg-loader/index.js";
import vitePluginImp from "file:///home/icepie/Projects/ray-gin-admin/node_modules/.pnpm/vite-plugin-imp@2.4.0_vite@5.0.10/node_modules/vite-plugin-imp/dist/index.mjs";
import { visualizer } from "file:///home/icepie/Projects/ray-gin-admin/node_modules/.pnpm/rollup-plugin-visualizer@5.10.0/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import viteCompression from "file:///home/icepie/Projects/ray-gin-admin/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@5.0.10/node_modules/vite-plugin-compression/dist/index.mjs";
import { ViteEjsPlugin as viteEjsPlugin } from "file:///home/icepie/Projects/ray-gin-admin/node_modules/.pnpm/vite-plugin-ejs@1.7.0_vite@5.0.10/node_modules/vite-plugin-ejs/index.js";
import viteAutoImport from "file:///home/icepie/Projects/ray-gin-admin/node_modules/.pnpm/unplugin-auto-import@0.16.7_@vueuse+core@10.7.0/node_modules/unplugin-auto-import/dist/vite.js";
import viteEslint from "file:///home/icepie/Projects/ray-gin-admin/node_modules/.pnpm/vite-plugin-eslint@1.8.1_eslint@8.56.0_vite@5.0.10/node_modules/vite-plugin-eslint/dist/index.mjs";
import mockDevServerPlugin from "file:///home/icepie/Projects/ray-gin-admin/node_modules/.pnpm/vite-plugin-mock-dev-server@1.3.4_vite@5.0.10/node_modules/vite-plugin-mock-dev-server/dist/index.js";
import { createSvgIconsPlugin } from "file:///home/icepie/Projects/ray-gin-admin/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.0.10/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import unpluginViteComponents from "file:///home/icepie/Projects/ray-gin-admin/node_modules/.pnpm/unplugin-vue-components@0.25.2_vue@3.4.4/node_modules/unplugin-vue-components/dist/vite.mjs";
import { cdn as viteCDNPlugin } from "file:///home/icepie/Projects/ray-gin-admin/node_modules/.pnpm/vite-plugin-cdn2@0.15.2/node_modules/vite-plugin-cdn2/dist/index.mjs";
import { NaiveUiResolver } from "file:///home/icepie/Projects/ray-gin-admin/node_modules/.pnpm/unplugin-vue-components@0.25.2_vue@3.4.4/node_modules/unplugin-vue-components/dist/resolvers.mjs";
var __vite_injected_original_dirname2 = "/home/icepie/Projects/ray-gin-admin";
function onlyReportOptions(mode) {
  return [
    visualizer({
      gzipSize: true,
      // 搜集 `gzip` 压缩包
      brotliSize: true,
      // 搜集 `brotli` 压缩包
      emitFile: false,
      // 生成文件在根目录下
      filename: "visualizer.html",
      open: mode === "report" ? true : false
      // 以默认服务器代理打开文件
    })
  ];
}
function onlyBuildOptions(mode) {
  return [
    viteCDNPlugin({
      url: "https://www.staticfile.org/",
      // modules 顺序 vue, vue-demi 必须保持当前顺序加载，否则会出现加载错误问题
      modules: [
        {
          name: "vue",
          global: "Vue",
          resolve: "https://cdn.staticfile.org/vue/3.3.11/vue.global.min.js"
        },
        {
          name: "vue-demi",
          global: "VueDemi",
          resolve: "https://cdn.staticfile.org/vue-demi/0.14.6/index.iife.min.js"
        },
        {
          name: "naive-ui",
          global: "naive",
          resolve: "https://cdn.staticfile.org/naive-ui/2.35.0/index.min.js"
        },
        {
          name: "pinia",
          global: "Pinia",
          resolve: "https://cdn.staticfile.org/pinia/2.1.7/pinia.iife.min.js"
        },
        {
          name: "vue-router",
          global: "VueRouter",
          resolve: "https://cdn.staticfile.org/vue-router/4.2.5/vue-router.global.min.js"
        },
        {
          name: "vue-i18n",
          global: "VueI18n",
          resolve: "https://cdn.staticfile.org/vue-i18n/9.8.0/vue-i18n.global.min.js"
        },
        {
          name: "echarts",
          global: "echarts",
          resolve: "https://cdn.staticfile.org/echarts/5.4.3/echarts.min.js"
        },
        {
          name: "xlsx",
          global: "XLSX",
          resolve: "https://cdn.staticfile.org/xlsx/0.18.5/xlsx.full.min.js"
        },
        {
          name: "axios",
          global: "axios",
          resolve: "https://cdn.staticfile.org/axios/1.6.2/axios.min.js"
        }
      ]
    })
  ];
}
function onlyDevOptions(mode) {
  return [];
}
function baseOptions(mode) {
  const { title, appPrimaryColor, preloadingConfig } = cfg_default;
  return [
    vue(),
    viteVueJSX(),
    title,
    viteVeI18nPlugin({
      runtimeOnly: true,
      compositionOnly: true,
      forceStringify: true,
      defaultSFCLang: "json",
      include: [path2.resolve(__vite_injected_original_dirname2, "../locales/**")]
    }),
    viteAutoImport({
      eslintrc: {
        enabled: true,
        filepath: "./unplugin/.eslintrc-auto-import.json"
      },
      include: [
        /\.[tj]sx?$/,
        // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/,
        // .vue
        /\.md$/
        // .md
      ],
      dts: "./unplugin/auto-imports.d.ts",
      imports: [
        "vue",
        "vue-router",
        "pinia",
        {
          "naive-ui": [
            "useDialog",
            "useMessage",
            "useNotification",
            "useLoadingBar"
          ]
        }
      ],
      resolvers: [NaiveUiResolver()]
    }),
    unpluginViteComponents({
      dts: "./unplugin/components.d.ts",
      resolvers: [NaiveUiResolver()],
      types: [
        {
          from: "vue-router",
          names: ["RouterLink", "RouterView"]
        }
      ]
    }),
    viteCompression(),
    viteSvgLoader({
      defaultImport: "url"
      // 默认以 url 形式导入 svg
    }),
    viteEslint({
      lintOnStart: true,
      failOnError: true,
      failOnWarning: true,
      fix: true,
      exclude: ["dist/**", "**/node_modules/**", "vite-env.d.ts", "*.md"],
      include: ["src/**/*.{vue,js,jsx,ts,tsx}"],
      cache: true
    }),
    vitePluginImp({
      libList: [
        {
          libName: "lodash-es",
          libDirectory: "",
          camel2DashComponentName: false
        },
        {
          libName: "@vueuse",
          libDirectory: "",
          camel2DashComponentName: false
        }
      ]
    }),
    viteEjsPlugin({
      preloadingConfig,
      appPrimaryColor
    }),
    viteInspect(),
    // 仅适用于开发模式(检查 `Vite` 插件的中间状态)
    mockDevServerPlugin({
      include: ["mock/**/*.mock.ts"],
      exclude: [
        "**/node_modules/**",
        "**/test/**",
        "**/cypress/**",
        "src/**",
        "**/.vscode/**",
        "**/.git/**",
        "**/dist/**",
        "mock/shared/**"
      ],
      reload: true,
      build: true
    }),
    createSvgIconsPlugin({
      iconDirs: [path2.resolve(process.cwd(), "src/icons")],
      symbolId: "icon-[dir]-[name]",
      inject: "body-last",
      customDomId: "__svg__icons__dom__"
    })
  ];
}
function vite_plugin_config_default(mode) {
  const plugins = mode === "development" ? onlyDevOptions(mode) : onlyBuildOptions(mode);
  const reportPlugins = mode === "report" ? onlyReportOptions(mode) : [];
  return [...baseOptions(mode), ...plugins, ...reportPlugins];
}

// vite.config.ts
var vite_config_default = defineConfig(({ mode }) => {
  const { dependencies, devDependencies, name, version } = package_default;
  const {
    server,
    buildOptions,
    alias,
    copyright,
    sideBarLogo,
    mixinCSS,
    appPrimaryColor,
    base
  } = cfg_default;
  const __APP_CFG__ = {
    pkg: { dependencies, devDependencies, name, version },
    layout: {
      copyright,
      sideBarLogo
    },
    appPrimaryColor
  };
  return {
    base: base || "/",
    define: {
      __APP_CFG__: JSON.stringify(__APP_CFG__),
      __DEV__: mode === "development"
    },
    resolve: {
      alias
    },
    plugins: vite_plugin_config_default(mode),
    optimizeDeps: {
      include: [
        "vue",
        "vue-router",
        "pinia",
        "vue-i18n",
        "naive-ui",
        "@vueuse/core",
        "vue-demi",
        "dayjs",
        "echarts",
        "xlsx",
        "axios",
        "print-js",
        "clipboard",
        "lodash-es",
        "vue-hooks-plus",
        "interactjs",
        "awesome-qr",
        "pinia-plugin-persistedstate",
        "currency.js",
        "mockjs"
      ]
    },
    esbuild: {
      pure: ["console.log"]
    },
    build: {
      ...buildOptions(mode),
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            const isUtils = () => id.includes("src/utils/");
            const isHooks = () => id.includes("src/hooks/template") || id.includes("src/hooks/web");
            const isNodeModules = () => id.includes("node_modules");
            const index = id.includes("pnpm") ? 1 : 0;
            if (isUtils()) {
              return "utils";
            }
            if (isHooks()) {
              return "hooks";
            }
            if (isNodeModules()) {
              return id.toString().split("node_modules/")[1].split("/")[index].toString();
            }
          }
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: mixinCSS
        }
      },
      modules: {
        localsConvention: "camelCaseOnly"
      }
    },
    server: {
      ...server
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiY2ZnLnRzIiwgInZpdGUtcGx1Z2lucy9pbmRleC50cyIsICJzcmMvYXBwLWNvbmZpZy9kZXNpZ25Db25maWcudHMiLCAic3JjL2FwcC1jb25maWcvYXBwQ29uZmlnLnRzIiwgInBhY2thZ2UuanNvbiIsICJ2aXRlLnBsdWdpbi5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9pY2VwaWUvUHJvamVjdHMvcmF5LWdpbi1hZG1pblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvaWNlcGllL1Byb2plY3RzL3JheS1naW4tYWRtaW4vdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvaWNlcGllL1Byb2plY3RzL3JheS1naW4tYWRtaW4vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuXG5pbXBvcnQgY29uZmlnIGZyb20gJy4vY2ZnJ1xuaW1wb3J0IHBrZyBmcm9tICcuL3BhY2thZ2UuanNvbidcbmltcG9ydCB2aXRlUGx1Z2lucyBmcm9tICcuL3ZpdGUucGx1Z2luLmNvbmZpZydcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcbiAgY29uc3QgeyBkZXBlbmRlbmNpZXMsIGRldkRlcGVuZGVuY2llcywgbmFtZSwgdmVyc2lvbiB9ID0gcGtnXG4gIGNvbnN0IHtcbiAgICBzZXJ2ZXIsXG4gICAgYnVpbGRPcHRpb25zLFxuICAgIGFsaWFzLFxuICAgIGNvcHlyaWdodCxcbiAgICBzaWRlQmFyTG9nbyxcbiAgICBtaXhpbkNTUyxcbiAgICBhcHBQcmltYXJ5Q29sb3IsXG4gICAgYmFzZSxcbiAgfSA9IGNvbmZpZ1xuXG4gIGNvbnN0IF9fQVBQX0NGR19fID0ge1xuICAgIHBrZzogeyBkZXBlbmRlbmNpZXMsIGRldkRlcGVuZGVuY2llcywgbmFtZSwgdmVyc2lvbiB9LFxuICAgIGxheW91dDoge1xuICAgICAgY29weXJpZ2h0LFxuICAgICAgc2lkZUJhckxvZ28sXG4gICAgfSxcbiAgICBhcHBQcmltYXJ5Q29sb3IsXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGJhc2U6IGJhc2UgfHwgJy8nLFxuICAgIGRlZmluZToge1xuICAgICAgX19BUFBfQ0ZHX186IEpTT04uc3RyaW5naWZ5KF9fQVBQX0NGR19fKSxcbiAgICAgIF9fREVWX186IG1vZGUgPT09ICdkZXZlbG9wbWVudCcsXG4gICAgfSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczogYWxpYXMsXG4gICAgfSxcbiAgICBwbHVnaW5zOiB2aXRlUGx1Z2lucyhtb2RlKSxcbiAgICBvcHRpbWl6ZURlcHM6IHtcbiAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgJ3Z1ZScsXG4gICAgICAgICd2dWUtcm91dGVyJyxcbiAgICAgICAgJ3BpbmlhJyxcbiAgICAgICAgJ3Z1ZS1pMThuJyxcbiAgICAgICAgJ25haXZlLXVpJyxcbiAgICAgICAgJ0B2dWV1c2UvY29yZScsXG4gICAgICAgICd2dWUtZGVtaScsXG4gICAgICAgICdkYXlqcycsXG4gICAgICAgICdlY2hhcnRzJyxcbiAgICAgICAgJ3hsc3gnLFxuICAgICAgICAnYXhpb3MnLFxuICAgICAgICAncHJpbnQtanMnLFxuICAgICAgICAnY2xpcGJvYXJkJyxcbiAgICAgICAgJ2xvZGFzaC1lcycsXG4gICAgICAgICd2dWUtaG9va3MtcGx1cycsXG4gICAgICAgICdpbnRlcmFjdGpzJyxcbiAgICAgICAgJ2F3ZXNvbWUtcXInLFxuICAgICAgICAncGluaWEtcGx1Z2luLXBlcnNpc3RlZHN0YXRlJyxcbiAgICAgICAgJ2N1cnJlbmN5LmpzJyxcbiAgICAgICAgJ21vY2tqcycsXG4gICAgICBdLFxuICAgIH0sXG4gICAgZXNidWlsZDoge1xuICAgICAgcHVyZTogWydjb25zb2xlLmxvZyddLFxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgIC4uLmJ1aWxkT3B0aW9ucyhtb2RlKSxcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgbWFudWFsQ2h1bmtzOiAoaWQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlzVXRpbHMgPSAoKSA9PiBpZC5pbmNsdWRlcygnc3JjL3V0aWxzLycpXG4gICAgICAgICAgICBjb25zdCBpc0hvb2tzID0gKCkgPT5cbiAgICAgICAgICAgICAgaWQuaW5jbHVkZXMoJ3NyYy9ob29rcy90ZW1wbGF0ZScpIHx8IGlkLmluY2x1ZGVzKCdzcmMvaG9va3Mvd2ViJylcbiAgICAgICAgICAgIGNvbnN0IGlzTm9kZU1vZHVsZXMgPSAoKSA9PiBpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJylcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gaWQuaW5jbHVkZXMoJ3BucG0nKSA/IDEgOiAwXG5cbiAgICAgICAgICAgIGlmIChpc1V0aWxzKCkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICd1dGlscydcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzSG9va3MoKSkge1xuICAgICAgICAgICAgICByZXR1cm4gJ2hvb2tzJ1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNOb2RlTW9kdWxlcygpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBpZFxuICAgICAgICAgICAgICAgIC50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgLnNwbGl0KCdub2RlX21vZHVsZXMvJylbMV1cbiAgICAgICAgICAgICAgICAuc3BsaXQoJy8nKVxuICAgICAgICAgICAgICAgIFtpbmRleF0udG9TdHJpbmcoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgY3NzOiB7XG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgIHNjc3M6IHtcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogbWl4aW5DU1MsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgbW9kdWxlczoge1xuICAgICAgICBsb2NhbHNDb252ZW50aW9uOiAnY2FtZWxDYXNlT25seScsXG4gICAgICB9LFxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICAuLi5zZXJ2ZXIsXG4gICAgfSxcbiAgfVxufSlcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvaWNlcGllL1Byb2plY3RzL3JheS1naW4tYWRtaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2ljZXBpZS9Qcm9qZWN0cy9yYXktZ2luLWFkbWluL2NmZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9pY2VwaWUvUHJvamVjdHMvcmF5LWdpbi1hZG1pbi9jZmcudHNcIjsvKipcbiAqXG4gKiBAYXV0aG9yIFJheSA8aHR0cHM6Ly9naXRodWIuY29tL1hpYW9EYWlHdWEtUmF5PlxuICpcbiAqIEBkYXRlIDIwMjMtMDQtMDZcbiAqXG4gKiBAd29ya3NwYWNlIHJheS10ZW1wbGF0ZVxuICpcbiAqIEByZW1hcmsgXHU0RUNBXHU1OTI5XHU0RTVGXHU2NjJGXHU1MTQzXHU2QzE0XHU2RUUxXHU2RUUxXHU2NEI4XHU0RUUzXHU3ODAxXHU3Njg0XHU0RTAwXHU1OTI5XG4gKi9cblxuLyoqXG4gKlxuICogXHU3Q0ZCXHU3RURGXHU5MTREXHU3RjZFXHU2NTg3XHU0RUY2XHU1MTY1XHU1M0UzXG4gKlxuICogXHU5MTREXHU3RjZFXHU4MzAzXHU1NkY0OlxuICogICAtIFx1Njc4NFx1NUVGQTogXHU1RjAwXHU1M0QxXHU2Nzg0XHU1RUZBXHUzMDAxXHU2MjUzXHU1MzA1XHU2Nzg0XHU1RUZBXHUzMDAxXHU5ODg0XHU4OUM4XHU2Nzg0XHU1RUZBXHUzMDAxXHU0RjUzXHU3OUVGXHU1MjA2XHU2NzkwXHU2Nzg0XHU1RUZBXHU3QjQ5XG4gKiAgIC0gXHU3Q0ZCXHU3RURGOiBcdTY4MzlcdThERUZcdTc1MzFcdTMwMDFcdTY4MDdcdTk4OThcdTMwMDFcdTZENEZcdTg5QzhcdTU2NjhcdTY4MDdcdTk4OThcdTMwMDFcdTUyMkJcdTU0MERcdTdCNDlcbiAqICAgLSBcdThCRjdcdTZDNDI6IFx1NEVFM1x1NzQwNlx1OTE0RFx1N0Y2RVxuICpcbiAqIFx1NTk4Mlx1Njc5Q1x1OTcwMFx1ODk4MVx1NjVCMFx1NTg5RVx1NzZGOFx1NTE3M1x1NTE4NVx1NUJCOSwgXHU5NzAwXHU4OTgxXHU1NzI4IHNyYy90eXBlcy9tb2R1bGVzL2NmZy50cyBcdTRFMkRcdThGREJcdTg4NENcdTdDN0JcdTU3OEJcdTkxNERcdTdGNkVcbiAqIGBgYFxuICogaW50ZXJmYWNlIENvbmZpZyAvLyBjb25maWcgXHU1MTg1XHU1QkI5XHU3QzdCXHU1NzhCXHU5MTREXHU3RjZFXG4gKlxuICogaW50ZXJmYWNlIEFwcENvbmZpZyAvLyBfX0FQUF9DRkdfXyBcdTUxODVcdTVCQjlcdTkxNERcdTdGNkVcbiAqIGBgYFxuICpcbiAqIF9fQVBQX0NGR19fIFx1OEJGNFx1NjYwRVxuICogYGBgXG4gKiBcdThCRTVcdTVDNUVcdTYwMjdcdTY2MkZcdTc1MjhcdTRFOEVcdTUxNjhcdTVDNDBcdTZDRThcdTUxNjVcdTc2ODRcdTkxNERcdTdGNkVcdTY1QjlcdTZDRDVcbiAqXG4gKiBjb25zdCB7IGFwcFByaW1hcnlDb2xvciB9ID0gX19BUFBfQ0ZHX19cbiAqXG4gKiBcdTRFRTVcdTRFMEFcdTRGOEJcdTVCNTBcdTVDNTVcdTc5M0EsIFx1NEVDRSBfX0FQUF9DRkdfXyBcdTRFMkRcdTg5RTNcdTY3ODRcdTUzRDZcdTUxRkEgYXBwUHJpbWFyeUNvbG9yIFx1NjgzOVx1OERFRlx1NzUzMVx1OTE0RFx1N0Y2RVx1NEZFMVx1NjA2RlxuICogX19BUFBfQ0ZHX18gXHU0RjFBXHU4OEFCXHU2MzAyXHU4RjdEXHU0RThFXHU1MTY4XHU1QzQwXHU1M0Q4XHU5MUNGIGB3aW5kb3dgIFx1NEUwQih2aXRlIGRlZmluZSBcdTlFRDhcdThCQTRcdTY2MkZcdTYzMDJcdThGN0RcdTRFOEUgd2luZG93IFx1NEUwQilcbiAqIGBgYFxuICovXG5cbmltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCdcblxuaW1wb3J0IHsgaHRtbFRpdGxlUGx1Z2luLCBtaXhpbkNTU1BsdWdpbiB9IGZyb20gJy4vdml0ZS1wbHVnaW5zL2luZGV4J1xuaW1wb3J0IHsgQVBQX1RIRU1FIH0gZnJvbSAnLi9zcmMvYXBwLWNvbmZpZy9kZXNpZ25Db25maWcnXG5pbXBvcnQgeyBQUkVfTE9BRElOR19DT05GSUcsIFNJREVfQkFSX0xPR08gfSBmcm9tICcuL3NyYy9hcHAtY29uZmlnL2FwcENvbmZpZydcblxuaW1wb3J0IHR5cGUgeyBBcHBDb25maWdFeHBvcnQgfSBmcm9tICdAL3R5cGVzJ1xuaW1wb3J0IHR5cGUgeyBCdWlsZE9wdGlvbnMgfSBmcm9tICd2aXRlJ1xuXG5jb25zdCBjb25maWc6IEFwcENvbmZpZ0V4cG9ydCA9IHtcbiAgLyoqIFx1NTE2Q1x1NTE3MVx1NTdGQVx1Nzg0MFx1OERFRlx1NUY4NFx1OTE0RFx1N0Y2RSwgXHU1OTgyXHU2NzlDXHU0RTNBXHU3QTdBXHU1MjE5XHU0RjFBXHU5RUQ4XHU4QkE0XHU0RUU1ICcvJyBcdTU4NkJcdTUxNDUgKi9cbiAgYmFzZTogJy9yYXktdGVtcGxhdGUvJyxcbiAgLyoqIFx1OTE0RFx1N0Y2RVx1OTk5Nlx1NUM0Rlx1NTJBMFx1OEY3RFx1NEZFMVx1NjA2RiAqL1xuICBwcmVsb2FkaW5nQ29uZmlnOiBQUkVfTE9BRElOR19DT05GSUcsXG4gIC8qKiBcdTlFRDhcdThCQTRcdTRFM0JcdTk4OThcdTgyNzIoXHU0RTBEXHU1M0VGXHU3NzAxXHU3NTY1LCBcdTVGQzVcdTU4NkIpLCBcdTRFNUZcdTc1MjhcdTRFOEUgZWpzIFx1NkNFOFx1NTE2NSAqL1xuICBhcHBQcmltYXJ5Q29sb3I6IEFQUF9USEVNRS5hcHBQcmltYXJ5Q29sb3IsXG4gIHNpZGVCYXJMb2dvOiBTSURFX0JBUl9MT0dPLFxuICAvKipcbiAgICpcbiAgICogXHU5ODg0XHU1OTA0XHU3NDA2XHU1MTY4XHU1QzQwXHU5NzAwXHU4OTgxXHU2Q0U4XHU1MTY1XHU3Njg0IGNzcyBcdTY1ODdcdTRFRjZcbiAgICpcbiAgICogXHU5ODg0XHU4QkJFOlxuICAgKiAgIC0gLi9zcmMvc3R5bGVzL21peGlucy5zY3NzXG4gICAqICAgLSAuL3NyYy9zdHlsZXMvc2V0dGluZy5zY3NzXG4gICAqICAgLSAuL3NyYy9zdHlsZXMvdGhlbWUuc2Nzc1xuICAgKlxuICAgKiBcdTU5ODJcdTY3OUNcdTk3MDBcdTg5ODFcdTUyMjBcdTk2NjRcdTYyMTZcdTgwMDVcdTRGRUVcdTY1MzksIFx1OTcwMFx1ODk4MVx1NTQwQ1x1NkI2NVx1NEZFRVx1NjUzOVx1NzZFRVx1NUY1NVx1NEUwQlx1NzY4NCBjc3MgXHU2NTg3XHU0RUY2XG4gICAqL1xuICBtaXhpbkNTUzogbWl4aW5DU1NQbHVnaW4oW1xuICAgICcuL3NyYy9zdHlsZXMvbWl4aW5zLnNjc3MnLFxuICAgICcuL3NyYy9zdHlsZXMvc2V0dGluZy5zY3NzJyxcbiAgXSksXG4gIC8qKlxuICAgKlxuICAgKiBcdTcyNDhcdTY3NDNcdTRGRTFcdTYwNkZcbiAgICpcbiAgICogXHU0RTVGXHU1M0VGXHU0RUU1XHU1RjUzXHU0RjVDXHU5ODc1XHU1RTk1XHU4QkJFXHU3RjZFLCBcdTc3MEJcdTVCOUVcdTk2NDVcdTRFMUFcdTUyQTFcdTk3MDBcdTZDNDJcbiAgICovXG4gIGNvcHlyaWdodDogJ0NvcHlyaWdodCBcdTAwQTkgMjAyMi1wcmVzZW50IFJheScsXG4gIC8qKlxuICAgKlxuICAgKiBcdTZENEZcdTg5QzhcdTU2NjhcdTY4MDdcdTk4OThcbiAgICovXG4gIHRpdGxlOiBodG1sVGl0bGVQbHVnaW4oUFJFX0xPQURJTkdfQ09ORklHLnRpdGxlIHx8ICdSYXkgVGVtcGxhdGUnKSxcbiAgLyoqXG4gICAqXG4gICAqIFx1OTE0RFx1N0Y2RSBITVIgXHU3Mjc5XHU1QjlBXHU5MDA5XHU5ODc5KFx1N0FFRlx1NTNFM1x1MzAwMVx1NEUzQlx1NjczQVx1MzAwMVx1OERFRlx1NUY4NFx1NTQ4Q1x1NTM0Rlx1OEJBRSlcbiAgICovXG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6ICcwLjAuMC4wJyxcbiAgICBwb3J0OiA5NTI3LFxuICAgIG9wZW46IGZhbHNlLFxuICAgIHN0cmljdFBvcnQ6IGZhbHNlLFxuICAgIGZzOiB7XG4gICAgICBzdHJpY3Q6IGZhbHNlLFxuICAgICAgYWxsb3c6IFtdLFxuICAgIH0sXG4gICAgcHJveHk6IHtcbiAgICAgICdeL2FwaSc6IHtcbiAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdCcsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgLyoqXG4gICAqXG4gICAqIFx1NjI1M1x1NTMwNVx1NzZGOFx1NTE3M1x1OTE0RFx1N0Y2RVxuICAgKi9cbiAgYnVpbGRPcHRpb25zOiAobW9kZTogc3RyaW5nKTogQnVpbGRPcHRpb25zID0+IHtcbiAgICBjb25zdCBvdXREaXJNYXAgPSB7XG4gICAgICB0ZXN0OiAnZGlzdC90ZXN0LWRpc3QnLFxuICAgICAgZGV2ZWxvcG1lbnQ6ICdkaXN0L2RldmVsb3BtZW50LWRpc3QnLFxuICAgICAgcHJvZHVjdGlvbjogJ2Rpc3QvcHJvZHVjdGlvbi1kaXN0JyxcbiAgICAgIHJlcG9ydDogJ2Rpc3QvcmVwb3J0LWRpc3QnLFxuICAgIH1cbiAgICBjb25zdCBkaXJQYXRoID0gb3V0RGlyTWFwW21vZGVdIHx8ICdkaXN0L3Rlc3QtZGlzdCdcblxuICAgIGlmIChtb2RlID09PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG91dERpcjogZGlyUGF0aCxcbiAgICAgICAgc291cmNlbWFwOiBmYWxzZSxcbiAgICAgICAgdGVyc2VyT3B0aW9uczoge1xuICAgICAgICAgIGNvbXByZXNzOiB7XG4gICAgICAgICAgICBkcm9wX2NvbnNvbGU6IHRydWUsXG4gICAgICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG91dERpcjogZGlyUGF0aCxcbiAgICAgICAgc291cmNlbWFwOiB0cnVlLFxuICAgICAgICB0ZXJzZXJPcHRpb25zOiB7XG4gICAgICAgICAgY29tcHJlc3M6IHtcbiAgICAgICAgICAgIGRyb3BfY29uc29sZTogZmFsc2UsXG4gICAgICAgICAgICBkcm9wX2RlYnVnZ2VyOiBmYWxzZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgLyoqXG4gICAqXG4gICAqIFx1OTg4NFx1OEJCRVx1NTIyQlx1NTQwRFxuICAgKiAtIGBAYDogYHNyY2AgXHU2ODM5XHU3NkVFXHU1RjU1XG4gICAqIC0gYEBhcGlgOiBgc3JjL2F4aW9zL2FwaWAgXHU2ODM5XHU3NkVFXHU1RjU1XG4gICAqIC0gYEBpbWFnZXNgOiBgc3JjL2Fzc2V0cy9pbWFnZXNgIFx1NjgzOVx1NzZFRVx1NUY1NVxuICAgKi9cbiAgYWxpYXM6IFtcbiAgICB7XG4gICAgICBmaW5kOiAnQCcsXG4gICAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgfSxcbiAgICB7XG4gICAgICBmaW5kOiAnQGFwaScsXG4gICAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2F4aW9zL2FwaScpLFxuICAgIH0sXG4gICAge1xuICAgICAgZmluZDogJ0BpbWFnZXMnLFxuICAgICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9hc3NldHMvaW1hZ2VzJyksXG4gICAgfSxcbiAgICB7XG4gICAgICBmaW5kOiAnQG1vY2snLFxuICAgICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL21vY2snKSxcbiAgICB9LFxuICBdLFxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25maWdcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvaWNlcGllL1Byb2plY3RzL3JheS1naW4tYWRtaW4vdml0ZS1wbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9pY2VwaWUvUHJvamVjdHMvcmF5LWdpbi1hZG1pbi92aXRlLXBsdWdpbnMvaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvaWNlcGllL1Byb2plY3RzL3JheS1naW4tYWRtaW4vdml0ZS1wbHVnaW5zL2luZGV4LnRzXCI7LyoqXG4gKlxuICogQHBhcmFtIHRpdGxlIFx1NkQ0Rlx1ODlDOFx1NTY2OCB0aXRsZSBcdTU0MERcdTc5RjBcbiAqL1xuZXhwb3J0IGNvbnN0IGh0bWxUaXRsZVBsdWdpbiA9ICh0aXRsZTogc3RyaW5nKSA9PiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogJ2h0bWwtdHJhbnNmb3JtJyxcbiAgICB0cmFuc2Zvcm1JbmRleEh0bWw6IChodG1sOiBzdHJpbmcpID0+IHtcbiAgICAgIHJldHVybiBodG1sLnJlcGxhY2UoLzx0aXRsZT4oLio/KTxcXC90aXRsZT4vLCBgPHRpdGxlPiR7dGl0bGV9PC90aXRsZT5gKVxuICAgIH0sXG4gIH1cbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIG9wdGlvbnMgXHU5ODg0XHU1OTA0XHU3NDA2IGNzcyBcdTY1ODdcdTRFRjZcbiAqIEByZXR1cm5zIGFkZGl0aW9uYWxEYXRhIHN0cmluZ1xuICpcbiAqIEByZW1hcmsgXHU4Rjg1XHU1MkE5XHU1OTA0XHU3NDA2XHU5NzAwXHU4OTgxXHU1MTY4XHU1QzQwXHU2Q0U4XHU1MTY1XHU3Njg0IGNzcyBcdTY4MzdcdTVGMEZcdTY1ODdcdTRFRjYsIFx1NEYxQVx1NTcyOFx1Njc4NFx1NUVGQVx1NjcxRlx1OTVGNFx1NUI4Q1x1NjIxMFx1NkNFOFx1NTE2NVxuICovXG5leHBvcnQgY29uc3QgbWl4aW5DU1NQbHVnaW4gPSAob3B0aW9ucz86IHN0cmluZ1tdKSA9PiB7XG4gIGlmICghQXJyYXkuaXNBcnJheShvcHRpb25zKSkge1xuICAgIHRocm93IFR5cGVFcnJvcihcbiAgICAgICdtaXhpbkNTU1BsdWdpbjogVGhlIG1peGluQ1NTUGx1Z2luIGFyZ3VtZW50IG11c3QgYmUgYW4gYXJyYXkhJyxcbiAgICApXG4gIH1cblxuICBjb25zdCBtaXhpblN0cmluZyA9IG9wdGlvbnMucmVkdWNlKChwcmUsIGN1cnIpID0+IHtcbiAgICBjb25zdCB0ZW1wID0gYEBpbXBvcnQgXCIke2N1cnJ9XCI7YFxuXG4gICAgcmV0dXJuIChwcmUgKz0gdGVtcClcbiAgfSwgJycpXG5cbiAgcmV0dXJuIG1peGluU3RyaW5nIGFzIHN0cmluZ1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9pY2VwaWUvUHJvamVjdHMvcmF5LWdpbi1hZG1pbi9zcmMvYXBwLWNvbmZpZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvaWNlcGllL1Byb2plY3RzL3JheS1naW4tYWRtaW4vc3JjL2FwcC1jb25maWcvZGVzaWduQ29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2ljZXBpZS9Qcm9qZWN0cy9yYXktZ2luLWFkbWluL3NyYy9hcHAtY29uZmlnL2Rlc2lnbkNvbmZpZy50c1wiOy8qKlxuICpcbiAqIEBhdXRob3IgUmF5IDxodHRwczovL2dpdGh1Yi5jb20vWGlhb0RhaUd1YS1SYXk+XG4gKlxuICogQGRhdGUgMjAyMy0wNS0xOVxuICpcbiAqIEB3b3Jrc3BhY2UgcmF5LXRlbXBsYXRlXG4gKlxuICogQHJlbWFyayBcdTRFQ0FcdTU5MjlcdTRFNUZcdTY2MkZcdTUxNDNcdTZDMTRcdTZFRTFcdTZFRTFcdTY0QjhcdTRFRTNcdTc4MDFcdTc2ODRcdTRFMDBcdTU5MjlcbiAqL1xuXG4vKiogXHU3Q0ZCXHU3RURGXHU5ODlDXHU4MjcyXHU5OENFXHU2ODNDXHU5MTREXHU3RjZFXHU1MTY1XHU1M0UzICovXG5cbmltcG9ydCB0eXBlIHsgQXBwVGhlbWUgfSBmcm9tICdAL3R5cGVzJ1xuXG5leHBvcnQgY29uc3QgQVBQX1RIRU1FOiBBcHBUaGVtZSA9IHtcbiAgLyoqXG4gICAqXG4gICAqIFx1N0NGQlx1N0VERlx1NEUzQlx1OTg5OFx1OTg5Q1x1ODI3Mlx1OTg4NFx1OEJCRVx1ODI3Mlx1NzZEOFxuICAgKiBcdTY1MkZcdTYzMDEgUkdCQVx1MzAwMVJHQlx1MzAwMVx1NTM0MVx1NTE2RFx1OEZEQlx1NTIzNlxuICAgKi9cbiAgYXBwVGhlbWVDb2xvcnM6IFtcbiAgICAnIzJkOGNmMCcsXG4gICAgJyMwOTYwYmQnLFxuICAgICcjNTM2ZGZlJyxcbiAgICAnI2ZmNWM5MycsXG4gICAgJyNlZTRmMTInLFxuICAgICcjOWMyN2IwJyxcbiAgICAnI2ZmOTgwMCcsXG4gICAgJyMxOEEwNTgnLFxuICBdLFxuICAvKiogXHU3Q0ZCXHU3RURGXHU0RTNCXHU5ODk4XHU4MjcyICovXG4gIGFwcFByaW1hcnlDb2xvcjoge1xuICAgIC8qKiBcdTRFM0JcdTk4OThcdTgyNzIgKi9cbiAgICBwcmltYXJ5Q29sb3I6ICcjMmQ4Y2YwJyxcbiAgICAvKiogXHU0RTNCXHU5ODk4XHU4Rjg1XHU1MkE5XHU4MjcyKFx1NzUyOFx1NEU4RVx1NjU3NFx1NEY1MyBob3Zlclx1MzAwMWFjdGl2ZSBcdTdCNDlcdTRFNEJcdTdDN0JcdTk4OUNcdTgyNzIpICovXG4gICAgcHJpbWFyeUZhZGVDb2xvcjogJ3JnYmEoNDUsIDE0MCwgMjQwLCAwLjMpJyxcbiAgfSxcbiAgLyoqXG4gICAqXG4gICAqIFx1OTE0RFx1N0Y2RVx1N0NGQlx1N0VERiBuYWl2ZS11aSBcdTRFM0JcdTk4OThcdTgyNzJcbiAgICogXHU1Qjk4XHU3RjUxXHU2NTg3XHU2ODYzXHU1NzMwXHU1NzQwOiA8aHR0cHM6Ly93d3cubmFpdmV1aS5jb20vemgtQ04vZGFyay9kb2NzL2N1c3RvbWl6ZS10aGVtZT5cbiAgICpcbiAgICogXHU2Q0U4XHU2MTBGOlxuICAgKiAgIC0gYXBwUHJpbWFyeUNvbG9yIGNvbW1vbiBcdTkxNERcdTdGNkVcdTRGMThcdTUxNDhcdTdFQTdcdTU5MjdcdTRFOEVcdThCRTVcdTkxNERcdTdGNkVcbiAgICpcbiAgICogXHU1OTgyXHU2NzlDXHU5NzAwXHU4OTgxXHU1QjlBXHU1MjM2XHU1MzE2XHU2NTc0XHU0RjUzXHU3RUM0XHU0RUY2XHU2ODM3XHU1RjBGLCBcdTkxNERcdTdGNkVcdTc5M0FcdTRGOEJcbiAgICogXHU1MTc3XHU0RjUzXHU4MUVBXHU4ODRDXHU2N0U1XHU3NzBCXHU1Qjk4XHU3RjUxLCBcdThGRDhcdTY3MDlcdTZBMjFcdTVGMEZcdTY2RjRcdTRGNzNcdTRFMzBcdTVCQ0NcdTc2ODQgcGVlcnMgXHU0RTNCXHU5ODk4XHU1M0Q4XHU5MUNGXHU5MTREXHU3RjZFXG4gICAqIFx1NTczMFx1NTc0MDogPGh0dHBzOi8vd3d3Lm5haXZldWkuY29tL3poLUNOL2RhcmsvZG9jcy9jdXN0b21pemUtdGhlbWUjJUU0JUJEJUJGJUU3JTk0JUE4LXBlZXJzLSVFNCVCOCVCQiVFOSVBMiU5OCVFNSU4RiU5OCVFOSU4NyU4Rj5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogYGBgXG4gICAqIGNvbnN0IHRoZW1lT3ZlcnJpZGVzOiBHbG9iYWxUaGVtZU92ZXJyaWRlcyA9IHtcbiAgICogICBjb21tb246IHtcbiAgICogICAgIHByaW1hcnlDb2xvcjogJyNGRjAwMDAnLFxuICAgKiAgIH0sXG4gICAqICAgQnV0dG9uOiB7XG4gICAqICAgICB0ZXh0Q29sb3I6ICcjRkYwMDAwJyxcbiAgICogICB9LFxuICAgKiB9XG4gICAqIGBgYFxuICAgKi9cbiAgYXBwTmFpdmVVSVRoZW1lT3ZlcnJpZGVzOiB7fSxcbiAgLyoqXG4gICAqXG4gICAqIFx1OTE0RFx1N0Y2RSBlY2hhcnQgXHU0RTNCXHU5ODk4XHU5ODlDXHU4MjcyXG4gICAqIFx1N0VBNlx1NUI5QVx1OTE0RFx1N0Y2RVx1NjVGNlx1NEVFNVx1RkYxQVx1NEUzQlx1OTg5OFx1NTQwRFx1NzlGMFx1NEUzQVx1NjU4N1x1NEVGNlx1NTQwRFx1RkYwQ1x1NTE3Nlx1NjU4N1x1NEVGNlx1NTkzOVx1NEUwQlx1NEUyNFx1NEUyQVx1NEUzQlx1OTg5OFx1OThDRVx1NjgzQ1x1NzY4NCBqc29uIFx1NjU4N1x1NEVGNlx1MzAwMlx1NUU3Nlx1NEUxNFx1NjY5N1x1ODI3Mlx1NEUzQlx1OTg5OFx1NUZDNVx1OTg3Qlx1NEUzQSB4eHgtZGFyay5qc29uXG4gICAqXG4gICAqIFtcdTY1ODdcdTY4NjNcdTU3MzBcdTU3NDBdKGh0dHBzOi8veGlhb2RhaWd1YS1yYXkuZ2l0aHViLmlvL3JheS10ZW1wbGF0ZS1kb2MvcmF5LXRlbXBsYXRlLWRvY3MvYWR2YW5jZWQvZWNoYXJ0LXRoZW1lcy5odG1sKVxuICAgKi9cbiAgZWNoYXJ0VGhlbWU6ICdtYWNhcm9ucycsXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL2ljZXBpZS9Qcm9qZWN0cy9yYXktZ2luLWFkbWluL3NyYy9hcHAtY29uZmlnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9pY2VwaWUvUHJvamVjdHMvcmF5LWdpbi1hZG1pbi9zcmMvYXBwLWNvbmZpZy9hcHBDb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvaWNlcGllL1Byb2plY3RzL3JheS1naW4tYWRtaW4vc3JjL2FwcC1jb25maWcvYXBwQ29uZmlnLnRzXCI7LyoqXG4gKlxuICogQGF1dGhvciBSYXkgPGh0dHBzOi8vZ2l0aHViLmNvbS9YaWFvRGFpR3VhLVJheT5cbiAqXG4gKiBAZGF0ZSAyMDIzLTA1LTIzXG4gKlxuICogQHdvcmtzcGFjZSByYXktdGVtcGxhdGVcbiAqXG4gKiBAcmVtYXJrIFx1NEVDQVx1NTkyOVx1NEU1Rlx1NjYyRlx1NTE0M1x1NkMxNFx1NkVFMVx1NkVFMVx1NjRCOFx1NEVFM1x1NzgwMVx1NzY4NFx1NEUwMFx1NTkyOVxuICovXG5cbi8qKiBcdTdDRkJcdTdFREZcdTkxNERcdTdGNkUgKi9cblxuaW1wb3J0IHR5cGUgeyBMYXlvdXRTaWRlQmFyTG9nbywgUHJlbG9hZGluZ0NvbmZpZyB9IGZyb20gJ0AvdHlwZXMnXG5pbXBvcnQgdHlwZSB7IEFwcE1lbnVDb25maWcsIEFwcEtlZXBBbGl2ZSB9IGZyb20gJ0AvdHlwZXMnXG5cbi8qKlxuICpcbiAqIFx1N0NGQlx1N0VERlx1N0YxM1x1NUI1OFxuICpcbiAqIFx1OEJGNFx1NjYwRTpcbiAqICAgLSBzZXR1cEtlZXBBbGl2ZTogXHU2NjJGXHU1NDI2XHU1NDJGXHU3NTI4XHU3Q0ZCXHU3RURGXHU5ODc1XHU5NzYyXHU3RjEzXHU1QjU4LCBcdThCQkVcdTdGNkVcdTRFM0EgZmFsc2UgXHU1MjE5XHU1MTczXHU5NUVEXHU3Q0ZCXHU3RURGXHU5ODc1XHU5NzYyXHU3RjEzXHU1QjU4XG4gKiAgIC0ga2VlcEFsaXZlRXhjbHVkZTogXHU2MzkyXHU5NjY0XHU1NEVBXHU0RTlCXHU5ODc1XHU5NzYyXHU0RTBEXHU3RjEzXHU1QjU4XG4gKiAgIC0gbWF4S2VlcEFsaXZlTGVuZ3RoOiBcdTY3MDBcdTU5MjdcdTdGMTNcdTVCNThcdTk4NzVcdTk3NjJcdTY1NzBcdTkxQ0ZcbiAqL1xuZXhwb3J0IGNvbnN0IEFQUF9LRUVQX0FMSVZFOiBSZWFkb25seTxBcHBLZWVwQWxpdmU+ID0ge1xuICBzZXR1cEtlZXBBbGl2ZTogdHJ1ZSxcbiAga2VlcEFsaXZlRXhjbHVkZTogW10sXG4gIG1heEtlZXBBbGl2ZUxlbmd0aDogNSxcbn1cblxuLyoqXG4gKlxuICogXHU5OTk2XHU1QzRGXHU1MkEwXHU4RjdEXHU0RkUxXHU2MDZGXHU5MTREXHU3RjZFXG4gKiBcdTUxNzZcdTRFMkQgdGl0bGUgXHU1QzVFXHU2MDI3XHU0RjFBXHU2NjJGXHU5RUQ4XHU4QkE0XHU3Njg0XHU2RDRGXHU4OUM4XHU1NjY4XHU2ODA3XHU5ODk4XHVGRjA4XHU1MjFEXHU1OUNCXHU1MzE2XHU2NUY2XHVGRjA5XG4gKi9cbmV4cG9ydCBjb25zdCBQUkVfTE9BRElOR19DT05GSUc6IFByZWxvYWRpbmdDb25maWcgPSB7XG4gIHRpdGxlOiAnUmF5IFRlbXBsYXRlJyxcbiAgdGFnQ29sb3I6ICcjZmY2NzAwJyxcbiAgdGl0bGVDb2xvcjogJyMyZDhjZjAnLFxufVxuXG4vKipcbiAqXG4gKiBpY29uOiBMT0dPIFx1NTZGRVx1NjgwNywgXHU0RjlEXHU4RDU2IGBSSWNvbmAgXHU1QjlFXHU3M0IwKFx1NTk4Mlx1Njc5Q1x1NEUzQVx1N0E3QVx1NTIxOVx1NEUwRFx1NEYxQVx1NkUzMlx1NjdEM1x1NTZGRVx1NjgwNylcbiAqIHRpdGxlOiBMT0dPIFx1NjgwN1x1OTg5OFxuICogdXJsOiBcdTcwQjlcdTUxRkJcdThERjNcdThGNkNcdTU3MzBcdTU3NDAsIFx1NTk4Mlx1Njc5Q1x1NEUwRFx1OTE0RFx1N0Y2RVx1OEJFNVx1NUM1RVx1NjAyNywgXHU1MjE5XHU0RTBEXHU0RjFBXHU4OUU2XHU1M0QxXHU4REYzXHU4RjZDXG4gKiBqdW1wVHlwZTogXHU4REYzXHU4RjZDXHU3QzdCXHU1NzhCKHN0YXRpb246IFx1OTg3OVx1NzZFRVx1NTE4NVx1OERGM1x1OEY2Qywgb3V0c2lkZVN0YXRpb246IFx1NjVCMFx1OTg3NVx1OTc2Mlx1NjI1M1x1NUYwMClcbiAqXG4gKiBcdTU5ODJcdTY3OUNcdTRFMERcdThCQkVcdTdGNkVcdThCRTVcdTVDNUVcdTYwMjdcdTYyMTZcdTgwMDVcdTRFM0FcdTdBN0EsIFx1NTIxOVx1NEUwRFx1NEYxQVx1NkUzMlx1NjdEMyBMT0dPXG4gKi9cbmV4cG9ydCBjb25zdCBTSURFX0JBUl9MT0dPOiBMYXlvdXRTaWRlQmFyTG9nbyB8IHVuZGVmaW5lZCA9IHtcbiAgaWNvbjogJ3JheScsXG4gIHRpdGxlOiAnUmF5IFRlbXBsYXRlJyxcbiAgdXJsOiAnL2Rhc2hib2FyZCcsXG4gIGp1bXBUeXBlOiAnc3RhdGlvbicsXG59XG5cbi8qKlxuICpcbiAqIFx1N0NGQlx1N0VERlx1ODNEQ1x1NTM1NVx1NjI5OFx1NTNFMFx1OTE0RFx1N0Y2RVxuICpcbiAqIG1lbnVDb2xsYXBzZWRXaWR0aCBcdTkxNERcdTdGNkVcdTRFQzVcdTVGNTMgbWVudUNvbGxhcHNlZE1vZGUgXHU0RTNBIHdpZHRoIFx1OThDRVx1NjgzQ1x1NjVGNlx1NjI0RFx1NjcwOVx1NjU0OFxuICpcbiAqIG1lbnVDb2xsYXBzZWRNb2RlOlxuICogICAtIHRyYW5zZm9ybTogXHU4RkI5XHU2ODBGXHU1QzA2XHU1M0VBXHU0RjFBXHU3OUZCXHU1MkE4XHU1QjgzXHU3Njg0XHU0RjREXHU3RjZFXHU4MDBDXHU0RTBEXHU0RjFBXHU2NTM5XHU1M0Q4XHU1QkJEXHU1RUE2XG4gKiAgIC0gd2lkdGg6IFNpZGVyIFx1NzY4NFx1NTE4NVx1NUJCOVx1NUJCRFx1NUVBNlx1NUMwNlx1NEYxQVx1ODhBQlx1NUI5RVx1OTY0NVx1NjUzOVx1NTNEOFxuICogbWVudUNvbGxhcHNlZEljb25TaXplIFx1OTE0RFx1N0Y2RVx1ODNEQ1x1NTM1NVx1NjcyQVx1NjI5OFx1NTNFMFx1NjVGNlx1NTZGRVx1NjgwN1x1NzY4NFx1NTkyN1x1NUMwRlxuICogbWVudUNvbGxhcHNlZEluZGVudCBcdTkxNERcdTdGNkVcdTgzRENcdTUzNTVcdTZCQ0ZcdTdFQTdcdTc2ODRcdTdGMjlcdThGREJcbiAqIG1lbnVBY2NvcmRpb24gXHU2MjRCXHU5OENFXHU3NDM0XHU2QTIxXHU1RjBGXG4gKi9cbmV4cG9ydCBjb25zdCBBUFBfTUVOVV9DT05GSUc6IFJlYWRvbmx5PEFwcE1lbnVDb25maWc+ID0ge1xuICBtZW51Q29sbGFwc2VkV2lkdGg6IDY0LFxuICBtZW51Q29sbGFwc2VkTW9kZTogJ3dpZHRoJyxcbiAgbWVudUNvbGxhcHNlZEljb25TaXplOiAyMixcbiAgbWVudUNvbGxhcHNlZEluZGVudDogMjQsXG4gIG1lbnVBY2NvcmRpb246IGZhbHNlLFxufVxuXG4vKipcbiAqXG4gKiBcdTdDRkJcdTdFREZcdTlFRDhcdThCQTRcdTdGMTNcdTVCNTgga2V5IFx1OTE0RFx1N0Y2RVxuICogXHU0RUM1XHU2NkI0XHU5NzMyXHU5MEU4XHU1MjA2XHU3Q0ZCXHU3RURGXHU4M0I3XHU1M0Q2XHU3RjEzXHU1QjU4XHU5MTREXHU3RjZFLCBcdTUxNzZcdTRGNTkga2V5IFx1NjY4Mlx1NEUwRFx1NUYwMFx1NjUzRVxuICpcbiAqIFx1OEJGNFx1NjYwRTpcbiAqICAgLSBzaWduaW5nOiBcdTc2N0JcdTk2NDZcdTRGRTFcdTYwNkZcdTdGMTNcdTVCNTgga2V5XG4gKiAgIC0gbG9jYWxlTGFuZ3VhZ2U6IFx1NTZGRFx1OTY0NVx1NTMxNlx1OUVEOFx1OEJBNFx1N0YxM1x1NUI1OCBrZXlcbiAqICAgLSB0b2tlbjogdG9rZW4ga2V5XG4gKi9cbmV4cG9ydCBjb25zdCBBUFBfQ0FUQ0hfS0VZID0ge1xuICBzaWduaW5nOiAnc2lnbmluZycsXG4gIGxvY2FsZUxhbmd1YWdlOiAnbG9jYWxlTGFuZ3VhZ2UnLFxuICB0b2tlbjogJ3Rva2VuJyxcbn0gYXMgY29uc3RcbiIsICJ7XG4gIFwibmFtZVwiOiBcInJheS10ZW1wbGF0ZVwiLFxuICBcInByaXZhdGVcIjogZmFsc2UsXG4gIFwidmVyc2lvblwiOiBcIjQuNS4wXCIsXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuICBcImVuZ2luZXNcIjoge1xuICAgIFwibm9kZVwiOiBcIl4xOC4wLjAgfHwgPj0yMC4wLjBcIixcbiAgICBcInBucG1cIjogXCI+PTguMC4wXCJcbiAgfSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImRldlwiOiBcInZpdGVcIixcbiAgICBcImJ1aWxkXCI6IFwidnVlLXRzYyAtLW5vRW1pdCAmJiB2aXRlIGJ1aWxkXCIsXG4gICAgXCJwcmV2aWV3XCI6IFwidml0ZSBwcmV2aWV3XCIsXG4gICAgXCJ0ZXN0XCI6IFwidnVlLXRzYyAtLW5vRW1pdCAmJiB2aXRlIGJ1aWxkIC0tbW9kZSB0ZXN0XCIsXG4gICAgXCJkZXYtYnVpbGRcIjogXCJ2dWUtdHNjIC0tbm9FbWl0ICYmIHZpdGUgYnVpbGQgLS1tb2RlIGRldmVsb3BtZW50XCIsXG4gICAgXCJyZXBvcnRcIjogXCJ2dWUtdHNjIC0tbm9FbWl0ICYmIHZpdGUgYnVpbGQgLS1tb2RlIHJlcG9ydFwiLFxuICAgIFwicHJlcGFyZVwiOiBcImh1c2t5IGluc3RhbGxcIlxuICB9LFxuICBcImh1c2t5XCI6IHtcbiAgICBcImhvb2tzXCI6IHtcbiAgICAgIFwicHJlLWNvbW1pdFwiOiBcImxpbnQtc3RhZ2VkXCIsXG4gICAgICBcImNvbW1pdC1tc2dcIjogXCJjb21taXRsaW50IC1FIEhVU0tZX0dJVF9QQVJBTVNcIlxuICAgIH1cbiAgfSxcbiAgXCJsaW50LXN0YWdlZFwiOiB7XG4gICAgXCIqLntqcyxqc29ufVwiOiBbXG4gICAgICBcInByZXR0aWVyIC0td3JpdGVcIlxuICAgIF0sXG4gICAgXCIqLnRzPyh4KVwiOiBbXG4gICAgICBcImVzbGludCBzcmNcIixcbiAgICAgIFwicHJldHRpZXIgLS1wYXJzZXI9dHlwZXNjcmlwdCAtLXdyaXRlXCJcbiAgICBdXG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkB2dWV1c2UvY29yZVwiOiBcIl4xMC43LjBcIixcbiAgICBcImF3ZXNvbWUtcXJcIjogXCIyLjEuNS1yYy4wXCIsXG4gICAgXCJheGlvc1wiOiBcIl4xLjYuM1wiLFxuICAgIFwiY2xpcGJvYXJkXCI6IFwiXjIuMC4xMVwiLFxuICAgIFwiY3J5cHRvLWpzXCI6IFwiXjQuMi4wXCIsXG4gICAgXCJjdXJyZW5jeS5qc1wiOiBcIl4yLjAuNFwiLFxuICAgIFwiZGF5anNcIjogXCJeMS4xMS4xMFwiLFxuICAgIFwiZG9tLXRvLWltYWdlXCI6IFwiMi42LjBcIixcbiAgICBcImVjaGFydHNcIjogXCJeNS40LjNcIixcbiAgICBcImludGVyYWN0anNcIjogXCIxLjEwLjI2XCIsXG4gICAgXCJsb2Rhc2gtZXNcIjogXCJeNC4xNy4yMVwiLFxuICAgIFwibW9ja2pzXCI6IFwiMS4xLjBcIixcbiAgICBcIm5haXZlLXVpXCI6IFwiXjIuMzYuMFwiLFxuICAgIFwicGluaWFcIjogXCJeMi4xLjdcIixcbiAgICBcInBpbmlhLXBsdWdpbi1wZXJzaXN0ZWRzdGF0ZVwiOiBcIl4zLjIuMFwiLFxuICAgIFwicHJpbnQtanNcIjogXCJeMS42LjBcIixcbiAgICBcInZ1ZVwiOiBcIl4zLjQuNFwiLFxuICAgIFwidnVlLWhvb2tzLXBsdXNcIjogXCIxLjguNVwiLFxuICAgIFwidnVlLWkxOG5cIjogXCJeOS44LjBcIixcbiAgICBcInZ1ZS1yb3V0ZXJcIjogXCJeNC4yLjVcIixcbiAgICBcInhsc3hcIjogXCJeMC4xOC41XCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGJhYmVsL2NvcmVcIjogXCJeNy4yMy43XCIsXG4gICAgXCJAYmFiZWwvZXNsaW50LXBhcnNlclwiOiBcIl43LjIzLjNcIixcbiAgICBcIkBjb21taXRsaW50L2NsaVwiOiBcIl4xNy44LjFcIixcbiAgICBcIkBjb21taXRsaW50L2NvbmZpZy1jb252ZW50aW9uYWxcIjogXCJeMTcuOC4xXCIsXG4gICAgXCJAaW50ZXJhY3Rqcy90eXBlc1wiOiBcIjEuMTAuMjFcIixcbiAgICBcIkBpbnRsaWZ5L3VucGx1Z2luLXZ1ZS1pMThuXCI6IFwiXjEuNS4wXCIsXG4gICAgXCJAdHlwZXMvY3J5cHRvLWpzXCI6IFwiXjQuMi4xXCIsXG4gICAgXCJAdHlwZXMvZG9tLXRvLWltYWdlXCI6IFwiMi42LjdcIixcbiAgICBcIkB0eXBlcy9sb2Rhc2gtZXNcIjogXCJeNC4xNy4xMlwiLFxuICAgIFwiQHR5cGVzL21vY2tqc1wiOiBcIjEuMC43XCIsXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvZXNsaW50LXBsdWdpblwiOiBcIl42LjE2LjBcIixcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9wYXJzZXJcIjogXCJeNi4xNi4wXCIsXG4gICAgXCJAdml0ZWpzL3BsdWdpbi12dWVcIjogXCJeNS4wLjJcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLXZ1ZS1qc3hcIjogXCJeMy4xLjBcIixcbiAgICBcIkB2dWUtaG9va3MtcGx1cy9yZXNvbHZlcnNcIjogXCIxLjIuNFwiLFxuICAgIFwiQHZ1ZS9lc2xpbnQtY29uZmlnLXByZXR0aWVyXCI6IFwiXjguMC4wXCIsXG4gICAgXCJAdnVlL2VzbGludC1jb25maWctdHlwZXNjcmlwdFwiOiBcIl4xMS4wLjNcIixcbiAgICBcImF1dG9wcmVmaXhlclwiOiBcIl4xMC40LjE2XCIsXG4gICAgXCJkZXBjaGVja1wiOiBcIl4xLjQuN1wiLFxuICAgIFwiZXNsaW50XCI6IFwiXjguNTYuMFwiLFxuICAgIFwiZXNsaW50LWNvbmZpZy1wcmV0dGllclwiOiBcIl45LjEuMFwiLFxuICAgIFwiZXNsaW50LWNvbmZpZy1zdGFuZGFyZC13aXRoLXR5cGVzY3JpcHRcIjogXCJeMzkuMS4xXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLWltcG9ydFwiOiBcIl4yLjI5LjBcIixcbiAgICBcImVzbGludC1wbHVnaW4tblwiOiBcIl4xNi41LjBcIixcbiAgICBcImVzbGludC1wbHVnaW4tcHJldHRpZXJcIjogXCJeNS4wLjFcIixcbiAgICBcImVzbGludC1wbHVnaW4tcHJvbWlzZVwiOiBcIl42LjEuMVwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi12dWVcIjogXCJeOS4xOS4yXCIsXG4gICAgXCJodXNreVwiOiBcIjguMC4zXCIsXG4gICAgXCJsaW50LXN0YWdlZFwiOiBcIl4xNS4yLjBcIixcbiAgICBcInBvc3Rjc3NcIjogXCJeOC40LjMyXCIsXG4gICAgXCJwb3N0Y3NzLXB4LXRvLXZpZXdwb3J0LTgtcGx1Z2luXCI6IFwiMS4yLjJcIixcbiAgICBcInByZXR0aWVyXCI6IFwiXjMuMS4xXCIsXG4gICAgXCJyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXJcIjogXCJeNS4xMC4wXCIsXG4gICAgXCJzYXNzXCI6IFwiMS42OS41XCIsXG4gICAgXCJzdmctc3ByaXRlLWxvYWRlclwiOiBcIl42LjAuMTFcIixcbiAgICBcInR5cGVzY3JpcHRcIjogXCJeNS4zLjNcIixcbiAgICBcInVucGx1Z2luLWF1dG8taW1wb3J0XCI6IFwiXjAuMTYuN1wiLFxuICAgIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHNcIjogXCJeMC4yNS4yXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjUuMC4xMFwiLFxuICAgIFwidml0ZS1wbHVnaW4tY2RuMlwiOiBcIjAuMTUuMlwiLFxuICAgIFwidml0ZS1wbHVnaW4tY29tcHJlc3Npb25cIjogXCJeMC41LjFcIixcbiAgICBcInZpdGUtcGx1Z2luLWVqc1wiOiBcIl4xLjcuMFwiLFxuICAgIFwidml0ZS1wbHVnaW4tZXNsaW50XCI6IFwiMS44LjFcIixcbiAgICBcInZpdGUtcGx1Z2luLWltcFwiOiBcIl4yLjQuMFwiLFxuICAgIFwidml0ZS1wbHVnaW4taW5zcGVjdFwiOiBcIl4wLjcuNDJcIixcbiAgICBcInZpdGUtcGx1Z2luLW1vY2stZGV2LXNlcnZlclwiOiBcIjEuMy40XCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1zdmctaWNvbnNcIjogXCJeMi4wLjFcIixcbiAgICBcInZpdGUtc3ZnLWxvYWRlclwiOiBcIl40LjAuMFwiLFxuICAgIFwidnVlLXRzY1wiOiBcIl4xLjguMjdcIlxuICB9LFxuICBcImRlc2NyaXB0aW9uXCI6IFwiPCEtLSBBTEwtQ09OVFJJQlVUT1JTLUJBREdFOlNUQVJUIC0gRG8gbm90IHJlbW92ZSBvciBtb2RpZnkgdGhpcyBzZWN0aW9uIC0tPlwiLFxuICBcIm1haW5cIjogXCJpbmRleC50c1wiLFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiZ2l0K2h0dHBzOi8vZ2l0aHViLmNvbS9YaWFvRGFpR3VhLVJheS94aWFvZGFpZ3VhLXJheS5naXRodWIuaW8uZ2l0XCJcbiAgfSxcbiAgXCJrZXl3b3Jkc1wiOiBbXG4gICAgXCJyYXktdGVtcGxhdGVcIixcbiAgICBcInZ1ZTMtdHN4LXZpdGUtcGluaWFcIixcbiAgICBcInJheSB0ZW1wbGF0ZVwiLFxuICAgIFwidml0ZVwiLFxuICAgIFwidnVlM1wiLFxuICAgIFwiYWRtaW4gdGVtcGxhdGVcIixcbiAgICBcIlx1NEUyRFx1NTQwRVx1NTNGMFx1NkEyMVx1Njc3RlwiXG4gIF0sXG4gIFwibGljZW5zZVwiOiBcIk1JVFwiLFxuICBcImF1dGhvclwiOiB7XG4gICAgXCJuYW1lXCI6IFwiUmF5XCIsXG4gICAgXCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vWGlhb0RhaUd1YS1SYXlcIlxuICB9LFxuICBcImJ1Z3NcIjoge1xuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL1hpYW9EYWlHdWEtUmF5L3hpYW9kYWlndWEtcmF5LmdpdGh1Yi5pby9pc3N1ZXNcIlxuICB9LFxuICBcImhvbWVwYWdlXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL1hpYW9EYWlHdWEtUmF5L3hpYW9kYWlndWEtcmF5LmdpdGh1Yi5pbyNyZWFkbWVcIlxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9pY2VwaWUvUHJvamVjdHMvcmF5LWdpbi1hZG1pblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvaWNlcGllL1Byb2plY3RzL3JheS1naW4tYWRtaW4vdml0ZS5wbHVnaW4uY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2ljZXBpZS9Qcm9qZWN0cy9yYXktZ2luLWFkbWluL3ZpdGUucGx1Z2luLmNvbmZpZy50c1wiOy8qKlxuICpcbiAqIEBhdXRob3IgUmF5IDxodHRwczovL2dpdGh1Yi5jb20vWGlhb0RhaUd1YS1SYXk+XG4gKlxuICogQGRhdGUgMjAyMy0wOS0xNVxuICpcbiAqIEB3b3Jrc3BhY2UgcmF5LXRlbXBsYXRlXG4gKlxuICogQHJlbWFyayBcdTRFQ0FcdTU5MjlcdTRFNUZcdTY2MkZcdTUxNDNcdTZDMTRcdTZFRTFcdTZFRTFcdTY0QjhcdTRFRTNcdTc4MDFcdTc2ODRcdTRFMDBcdTU5MjlcbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXG5cbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHZpdGVWdWVKU1ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcbmltcG9ydCB2aXRlVmVJMThuUGx1Z2luIGZyb20gJ0BpbnRsaWZ5L3VucGx1Z2luLXZ1ZS1pMThuL3ZpdGUnXG5pbXBvcnQgdml0ZUluc3BlY3QgZnJvbSAndml0ZS1wbHVnaW4taW5zcGVjdCdcbmltcG9ydCB2aXRlU3ZnTG9hZGVyIGZyb20gJ3ZpdGUtc3ZnLWxvYWRlcidcbmltcG9ydCB2aXRlUGx1Z2luSW1wIGZyb20gJ3ZpdGUtcGx1Z2luLWltcCdcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInXG5pbXBvcnQgdml0ZUNvbXByZXNzaW9uIGZyb20gJ3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uJ1xuaW1wb3J0IHsgVml0ZUVqc1BsdWdpbiBhcyB2aXRlRWpzUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tZWpzJ1xuaW1wb3J0IHZpdGVBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgdml0ZUVzbGludCBmcm9tICd2aXRlLXBsdWdpbi1lc2xpbnQnXG5pbXBvcnQgbW9ja0RldlNlcnZlclBsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1tb2NrLWRldi1zZXJ2ZXInXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucydcbmltcG9ydCB1bnBsdWdpblZpdGVDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXG5pbXBvcnQgeyBjZG4gYXMgdml0ZUNETlBsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLWNkbjInXG5cbmltcG9ydCB7IE5haXZlVWlSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcblxuaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NmZydcblxuaW1wb3J0IHR5cGUgeyBQbHVnaW5PcHRpb24gfSBmcm9tICd2aXRlJ1xuXG4vLyBcdTRFQzVcdTkwMDJcdTc1MjhcdTRFOEVcdTYyQTVcdTU0NEFcdTZBMjFcdTVGMEZcdUZGMDhyZXBvcnRcdUZGMDlcbmZ1bmN0aW9uIG9ubHlSZXBvcnRPcHRpb25zKG1vZGU6IHN0cmluZykge1xuICByZXR1cm4gW1xuICAgIHZpc3VhbGl6ZXIoe1xuICAgICAgZ3ppcFNpemU6IHRydWUsIC8vIFx1NjQxQ1x1OTZDNiBgZ3ppcGAgXHU1MzhCXHU3RjI5XHU1MzA1XG4gICAgICBicm90bGlTaXplOiB0cnVlLCAvLyBcdTY0MUNcdTk2QzYgYGJyb3RsaWAgXHU1MzhCXHU3RjI5XHU1MzA1XG4gICAgICBlbWl0RmlsZTogZmFsc2UsIC8vIFx1NzUxRlx1NjIxMFx1NjU4N1x1NEVGNlx1NTcyOFx1NjgzOVx1NzZFRVx1NUY1NVx1NEUwQlxuICAgICAgZmlsZW5hbWU6ICd2aXN1YWxpemVyLmh0bWwnLFxuICAgICAgb3BlbjogbW9kZSA9PT0gJ3JlcG9ydCcgPyB0cnVlIDogZmFsc2UsIC8vIFx1NEVFNVx1OUVEOFx1OEJBNFx1NjcwRFx1NTJBMVx1NTY2OFx1NEVFM1x1NzQwNlx1NjI1M1x1NUYwMFx1NjU4N1x1NEVGNlxuICAgIH0pLFxuICBdXG59XG5cbi8vIFx1NEVDNVx1OTAwMlx1NzUyOFx1NEU4RVx1Njc4NFx1NUVGQVx1NkEyMVx1NUYwRlx1RkYwOFx1NEVGQlx1NEY1NVx1Njc4NFx1NUVGQVx1NkEyMVx1NUYwRlx1RkYxQXByZXZpZXdcdTMwMDFidWlsZFx1MzAwMXJlcG9ydC4uLlx1RkYwOVxuZnVuY3Rpb24gb25seUJ1aWxkT3B0aW9ucyhtb2RlOiBzdHJpbmcpIHtcbiAgcmV0dXJuIFtcbiAgICB2aXRlQ0ROUGx1Z2luKHtcbiAgICAgIHVybDogJ2h0dHBzOi8vd3d3LnN0YXRpY2ZpbGUub3JnLycsXG4gICAgICAvLyBtb2R1bGVzIFx1OTg3QVx1NUU4RiB2dWUsIHZ1ZS1kZW1pIFx1NUZDNVx1OTg3Qlx1NEZERFx1NjMwMVx1NUY1M1x1NTI0RFx1OTg3QVx1NUU4Rlx1NTJBMFx1OEY3RFx1RkYwQ1x1NTQyNlx1NTIxOVx1NEYxQVx1NTFGQVx1NzNCMFx1NTJBMFx1OEY3RFx1OTUxOVx1OEJFRlx1OTVFRVx1OTg5OFxuICAgICAgbW9kdWxlczogW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ3Z1ZScsXG4gICAgICAgICAgZ2xvYmFsOiAnVnVlJyxcbiAgICAgICAgICByZXNvbHZlOiAnaHR0cHM6Ly9jZG4uc3RhdGljZmlsZS5vcmcvdnVlLzMuMy4xMS92dWUuZ2xvYmFsLm1pbi5qcycsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAndnVlLWRlbWknLFxuICAgICAgICAgIGdsb2JhbDogJ1Z1ZURlbWknLFxuICAgICAgICAgIHJlc29sdmU6XG4gICAgICAgICAgICAnaHR0cHM6Ly9jZG4uc3RhdGljZmlsZS5vcmcvdnVlLWRlbWkvMC4xNC42L2luZGV4LmlpZmUubWluLmpzJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICduYWl2ZS11aScsXG4gICAgICAgICAgZ2xvYmFsOiAnbmFpdmUnLFxuICAgICAgICAgIHJlc29sdmU6ICdodHRwczovL2Nkbi5zdGF0aWNmaWxlLm9yZy9uYWl2ZS11aS8yLjM1LjAvaW5kZXgubWluLmpzJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdwaW5pYScsXG4gICAgICAgICAgZ2xvYmFsOiAnUGluaWEnLFxuICAgICAgICAgIHJlc29sdmU6ICdodHRwczovL2Nkbi5zdGF0aWNmaWxlLm9yZy9waW5pYS8yLjEuNy9waW5pYS5paWZlLm1pbi5qcycsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAndnVlLXJvdXRlcicsXG4gICAgICAgICAgZ2xvYmFsOiAnVnVlUm91dGVyJyxcbiAgICAgICAgICByZXNvbHZlOlxuICAgICAgICAgICAgJ2h0dHBzOi8vY2RuLnN0YXRpY2ZpbGUub3JnL3Z1ZS1yb3V0ZXIvNC4yLjUvdnVlLXJvdXRlci5nbG9iYWwubWluLmpzJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICd2dWUtaTE4bicsXG4gICAgICAgICAgZ2xvYmFsOiAnVnVlSTE4bicsXG4gICAgICAgICAgcmVzb2x2ZTpcbiAgICAgICAgICAgICdodHRwczovL2Nkbi5zdGF0aWNmaWxlLm9yZy92dWUtaTE4bi85LjguMC92dWUtaTE4bi5nbG9iYWwubWluLmpzJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdlY2hhcnRzJyxcbiAgICAgICAgICBnbG9iYWw6ICdlY2hhcnRzJyxcbiAgICAgICAgICByZXNvbHZlOiAnaHR0cHM6Ly9jZG4uc3RhdGljZmlsZS5vcmcvZWNoYXJ0cy81LjQuMy9lY2hhcnRzLm1pbi5qcycsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAneGxzeCcsXG4gICAgICAgICAgZ2xvYmFsOiAnWExTWCcsXG4gICAgICAgICAgcmVzb2x2ZTogJ2h0dHBzOi8vY2RuLnN0YXRpY2ZpbGUub3JnL3hsc3gvMC4xOC41L3hsc3guZnVsbC5taW4uanMnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ2F4aW9zJyxcbiAgICAgICAgICBnbG9iYWw6ICdheGlvcycsXG4gICAgICAgICAgcmVzb2x2ZTogJ2h0dHBzOi8vY2RuLnN0YXRpY2ZpbGUub3JnL2F4aW9zLzEuNi4yL2F4aW9zLm1pbi5qcycsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0pLFxuICBdXG59XG5cbi8vIFx1NEVDNVx1OTAwMlx1NzUyOFx1NEU4RVx1NUYwMFx1NTNEMVx1NkEyMVx1NUYwRlxuZnVuY3Rpb24gb25seURldk9wdGlvbnMobW9kZTogc3RyaW5nKSB7XG4gIHJldHVybiBbXVxufVxuXG4vLyBcdTU3RkFcdTc4NDBcdTYzRDJcdTRFRjZcdTkxNERcdTdGNkVcbmZ1bmN0aW9uIGJhc2VPcHRpb25zKG1vZGU6IHN0cmluZykge1xuICBjb25zdCB7IHRpdGxlLCBhcHBQcmltYXJ5Q29sb3IsIHByZWxvYWRpbmdDb25maWcgfSA9IGNvbmZpZ1xuXG4gIHJldHVybiBbXG4gICAgdnVlKCksXG4gICAgdml0ZVZ1ZUpTWCgpLFxuICAgIHRpdGxlLFxuICAgIHZpdGVWZUkxOG5QbHVnaW4oe1xuICAgICAgcnVudGltZU9ubHk6IHRydWUsXG4gICAgICBjb21wb3NpdGlvbk9ubHk6IHRydWUsXG4gICAgICBmb3JjZVN0cmluZ2lmeTogdHJ1ZSxcbiAgICAgIGRlZmF1bHRTRkNMYW5nOiAnanNvbicsXG4gICAgICBpbmNsdWRlOiBbcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uL2xvY2FsZXMvKionKV0sXG4gICAgfSksXG4gICAgdml0ZUF1dG9JbXBvcnQoe1xuICAgICAgZXNsaW50cmM6IHtcbiAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgZmlsZXBhdGg6ICcuL3VucGx1Z2luLy5lc2xpbnRyYy1hdXRvLWltcG9ydC5qc29uJyxcbiAgICAgIH0sXG4gICAgICBpbmNsdWRlOiBbXG4gICAgICAgIC9cXC5bdGpdc3g/JC8sIC8vIC50cywgLnRzeCwgLmpzLCAuanN4XG4gICAgICAgIC9cXC52dWUkLyxcbiAgICAgICAgL1xcLnZ1ZVxcP3Z1ZS8sIC8vIC52dWVcbiAgICAgICAgL1xcLm1kJC8sIC8vIC5tZFxuICAgICAgXSxcbiAgICAgIGR0czogJy4vdW5wbHVnaW4vYXV0by1pbXBvcnRzLmQudHMnLFxuICAgICAgaW1wb3J0czogW1xuICAgICAgICAndnVlJyxcbiAgICAgICAgJ3Z1ZS1yb3V0ZXInLFxuICAgICAgICAncGluaWEnLFxuICAgICAgICB7XG4gICAgICAgICAgJ25haXZlLXVpJzogW1xuICAgICAgICAgICAgJ3VzZURpYWxvZycsXG4gICAgICAgICAgICAndXNlTWVzc2FnZScsXG4gICAgICAgICAgICAndXNlTm90aWZpY2F0aW9uJyxcbiAgICAgICAgICAgICd1c2VMb2FkaW5nQmFyJyxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIHJlc29sdmVyczogW05haXZlVWlSZXNvbHZlcigpXSxcbiAgICB9KSxcbiAgICB1bnBsdWdpblZpdGVDb21wb25lbnRzKHtcbiAgICAgIGR0czogJy4vdW5wbHVnaW4vY29tcG9uZW50cy5kLnRzJyxcbiAgICAgIHJlc29sdmVyczogW05haXZlVWlSZXNvbHZlcigpXSxcbiAgICAgIHR5cGVzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBmcm9tOiAndnVlLXJvdXRlcicsXG4gICAgICAgICAgbmFtZXM6IFsnUm91dGVyTGluaycsICdSb3V0ZXJWaWV3J10sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0pLFxuICAgIHZpdGVDb21wcmVzc2lvbigpLFxuICAgIHZpdGVTdmdMb2FkZXIoe1xuICAgICAgZGVmYXVsdEltcG9ydDogJ3VybCcsIC8vIFx1OUVEOFx1OEJBNFx1NEVFNSB1cmwgXHU1RjYyXHU1RjBGXHU1QkZDXHU1MTY1IHN2Z1xuICAgIH0pLFxuICAgIHZpdGVFc2xpbnQoe1xuICAgICAgbGludE9uU3RhcnQ6IHRydWUsXG4gICAgICBmYWlsT25FcnJvcjogdHJ1ZSxcbiAgICAgIGZhaWxPbldhcm5pbmc6IHRydWUsXG4gICAgICBmaXg6IHRydWUsXG4gICAgICBleGNsdWRlOiBbJ2Rpc3QvKionLCAnKiovbm9kZV9tb2R1bGVzLyoqJywgJ3ZpdGUtZW52LmQudHMnLCAnKi5tZCddLFxuICAgICAgaW5jbHVkZTogWydzcmMvKiovKi57dnVlLGpzLGpzeCx0cyx0c3h9J10sXG4gICAgICBjYWNoZTogdHJ1ZSxcbiAgICB9KSxcbiAgICB2aXRlUGx1Z2luSW1wKHtcbiAgICAgIGxpYkxpc3Q6IFtcbiAgICAgICAge1xuICAgICAgICAgIGxpYk5hbWU6ICdsb2Rhc2gtZXMnLFxuICAgICAgICAgIGxpYkRpcmVjdG9yeTogJycsXG4gICAgICAgICAgY2FtZWwyRGFzaENvbXBvbmVudE5hbWU6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGliTmFtZTogJ0B2dWV1c2UnLFxuICAgICAgICAgIGxpYkRpcmVjdG9yeTogJycsXG4gICAgICAgICAgY2FtZWwyRGFzaENvbXBvbmVudE5hbWU6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9KSxcbiAgICB2aXRlRWpzUGx1Z2luKHtcbiAgICAgIHByZWxvYWRpbmdDb25maWcsXG4gICAgICBhcHBQcmltYXJ5Q29sb3IsXG4gICAgfSksXG4gICAgdml0ZUluc3BlY3QoKSwgLy8gXHU0RUM1XHU5MDAyXHU3NTI4XHU0RThFXHU1RjAwXHU1M0QxXHU2QTIxXHU1RjBGKFx1NjhDMFx1NjdFNSBgVml0ZWAgXHU2M0QyXHU0RUY2XHU3Njg0XHU0RTJEXHU5NUY0XHU3MkI2XHU2MDAxKVxuICAgIG1vY2tEZXZTZXJ2ZXJQbHVnaW4oe1xuICAgICAgaW5jbHVkZTogWydtb2NrLyoqLyoubW9jay50cyddLFxuICAgICAgZXhjbHVkZTogW1xuICAgICAgICAnKiovbm9kZV9tb2R1bGVzLyoqJyxcbiAgICAgICAgJyoqL3Rlc3QvKionLFxuICAgICAgICAnKiovY3lwcmVzcy8qKicsXG4gICAgICAgICdzcmMvKionLFxuICAgICAgICAnKiovLnZzY29kZS8qKicsXG4gICAgICAgICcqKi8uZ2l0LyoqJyxcbiAgICAgICAgJyoqL2Rpc3QvKionLFxuICAgICAgICAnbW9jay9zaGFyZWQvKionLFxuICAgICAgXSxcbiAgICAgIHJlbG9hZDogdHJ1ZSxcbiAgICAgIGJ1aWxkOiB0cnVlLFxuICAgIH0pLFxuICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcbiAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvaWNvbnMnKV0sXG4gICAgICBzeW1ib2xJZDogJ2ljb24tW2Rpcl0tW25hbWVdJyxcbiAgICAgIGluamVjdDogJ2JvZHktbGFzdCcsXG4gICAgICBjdXN0b21Eb21JZDogJ19fc3ZnX19pY29uc19fZG9tX18nLFxuICAgIH0pLFxuICBdXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChtb2RlOiBzdHJpbmcpOiBQbHVnaW5PcHRpb25bXSB7XG4gIGNvbnN0IHBsdWdpbnMgPVxuICAgIG1vZGUgPT09ICdkZXZlbG9wbWVudCcgPyBvbmx5RGV2T3B0aW9ucyhtb2RlKSA6IG9ubHlCdWlsZE9wdGlvbnMobW9kZSlcbiAgY29uc3QgcmVwb3J0UGx1Z2lucyA9IG1vZGUgPT09ICdyZXBvcnQnID8gb25seVJlcG9ydE9wdGlvbnMobW9kZSkgOiBbXVxuXG4gIHJldHVybiBbLi4uYmFzZU9wdGlvbnMobW9kZSksIC4uLnBsdWdpbnMsIC4uLnJlcG9ydFBsdWdpbnNdXG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJSLFNBQVMsb0JBQW9COzs7QUNzQ3hULE9BQU8sVUFBVTs7O0FDbENWLElBQU0sa0JBQWtCLENBQUMsVUFBa0I7QUFDaEQsU0FBTztBQUFBLElBQ0wsTUFBTTtB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
