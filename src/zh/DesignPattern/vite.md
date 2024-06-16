---
# 这是文章的标题
title: Vite
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 1
# 设置作者
author: HCX
# 设置写作时间
date: 2024-06-15
# 一个页面可以有多个分类
category:
  - Vite
  - 构建工具
# 一个页面可以有多个标签
tag:
  - 教程
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
# 你可以自定义页脚
footer: 夏天快到了
---

Vite 是开发构建工具，开发期它利用浏览器`native ES Module`特性导入组织代码，生产中利用 rollup 作为打包工具，它具有如下特点

- 光速启动
- 热模块替换
- 按需编译

安装

```bash
npm init vite-app <project-name>
cd <project-name>
npm install
npm run dev
```

## Vite 中的资源加载

**CSS 文件导入**

vite 中可以直接导入`.css`文件，样式将影响导入的页面，最终会被打包到`style.css`

> 在程序中，除了全局样式外，大部分样式都是以 `<style>` 形式存在于 SFC 中

**CSS Module**

SFC 中使用 CSS Module，模板中使用类名通过动态绑定，使用`$styles.className`来书写类名

```vue
<template>
  <div :class="$styles.test">111</div>
</template>
<style module>
.test {
  /* ... */
}
</style>
```

**CSS 预处理器**

安装对应的预处理器就可以直接在 vite 项目中使用

```vue
<style lang="scss"></style>
```

或者在 JS 中导入`import './style.scss'`

**PostCSS**

Vite 自动对`*.vue`文件和导入的`.css`文件应用 PostCSS 配置，只需要安装必要的插件和添加`postcss.config.js`文件即可

```js
module.exports = {
  plugin: {
    require('autoprefixer')
  }
}

```

**资源 URL 处理**

public 目录用于存放未在源码中引用的资源，它们会被留下且文件名不会有哈希处理，这里的文件会被原封不动的拷贝到发布目录的根目录下

> 如果需要引用，使用绝对路径进行引用。如`public/icon.png`应该使用`/icon.png`引用

引用静态资源：

可以在`*.vue`文件的 template，style 和纯`.css`文件中以相对和绝对路径方式引用静态资源

```vue
<template>
  <!-- 相对路径 -->
  <img src="./assets/logo.png" />
  <!-- 绝对路径 -->
  <img src="./src/assets/logo.png" />
</template>
```

## 代码规范和格式化

我们借助 eslint 规范项目代码，通过 prettier 做代码格式化

首先在项目中安装依赖，`package.json`

```json
{
  "scripts": {
    "lint": "eslint \"src/**/*.{js,vue}\""
  },
  "devDependencies": {
    "@vue/eslint-config-prettier": "^6.0.0", // 专门为 @vue/cli 和 create-vue 设置设计
    "babel-eslint": "^10.1.0",
    "eslint": "^6.7.2",
    "eslint-plugin-prettier": "^3.1.3", // Pre-made configs. Turn off rules that conflict or are unnecessary with Prettier
    "eslint-plugin-vue": "7.0.0-0", // Official ESLint plugin for Vue.js.
    "prettier": "^1.19.1"
  }
}
```

配置 lint 规则，书写配置文件，以`.eslintrc.js`或者`.eslintrc`命名

```js
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': [
      'warn',
      {
        // singleQuote: none
        // semi: false
        trailingComma: 'es5',
      },
    ],
  },
};
```

如果有必要还可以配置 `prettier.config.js` 修改 prettier 的默认格式化规则

```js
module.exports = {
  printWdith: 80, // 每行代码长度(默认80)
  tabWdith: 2, // 每个tab相当于多少空格（默认2）
  useTabs: false, // 是否使用tab进行缩进（默认false）
  singleQuote: false, // 是否使用单引号（默认false）
  semi: true, // 声明结尾使用分号（默认true）
  trailingComma: true, // 多行使用拖尾逗号（默认none）
  bracketSpacing: true, // 对象字面量的大括号间使用空格（默认true）
  jsxBracketSameLine: false, // 多行JSX中的>放置在最后一行的结尾，而不是另起一行（默认false）
  arrowParents: 'avoid', // 只有一个参数的箭头函数的参数是否带圆括号（默认avoid）
};
```

## 测试

利用`jest`和`@vue/test-utils`测试组件

安装依赖

```json
{
  "devDependencies": {
    "jest": "^24.0.0",
    "vue-jest": "^5.0.0-alpha.3",
    "babel-jest": "^26.1.0",
    "@babel/preset-env": "^7.10.4",
    "@vue/test-utils": "^2.0.0-beta.9"
  }
}
```

配置 `babel.config.js`

配置与你当前 Node 版本兼容的 Babel

```js
module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
};
```

配置 `jest.config.js`

```js
module.exports = {
  testEnviroment: 'jsdom',
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\js$': 'babel-jest',
  },
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  testMatch: ['**/tests/**/*.spec.js', '**/__tests__/**/*.spec.js'],
  moduleNameMapper: {
    '^main(.*)$': '<rootDir>/src$1',
  },
};
```

lint 配置中加入 jest 环境

```js
module.exports = {
  env: {
    jest: true,
  },
};
```

:::tip
将 lint、test 和 git 挂钩
`npm i lint-staged yorkie -D`

在`package.json`中插入

```json
{
  // ...
  // 监控提交之前，提供钩子
  "gitHooks": {
    "pre-commit": "lint-staged", // 提交之前跑 lint-staged
    "pre-push": "npm run test" // 推送前进行测试
  },
  "lint-staged": {
    "*.{js,vue}": "eslint"
  }
  // ...
}
```

:::

## 配置 TS

在 vite 中可以直接使用 ts，通过设置 `<script lang="ts">`实现

> 为了让 TypeScript 正确地推导出组件选项内的类型，我们需要通过 `defineComponent()` 这个全局 API 来定义组件：

```ts
import { defineComponent } from 'vue';

export default defineComponent({
  // 启用了类型推导
  props: {
    name: String,
    msg: { type: String, required: true },
  },
  data() {
    return {
      count: 1,
    };
  },
  mounted() {
    this.name; // 类型：string | undefined
    this.msg; // 类型：string
    this.count; // 类型：number
  },
});
```

> 当没有结合 `<script setup>` 使用组合式 API 时，`defineComponent()` 也支持对传递给 `setup()` 的 prop 的推导：

```ts
import { defineComponent } from 'vue';

export default defineComponent({
  // 启用了类型推导
  props: {
    message: String,
  },
  setup(props) {
    props.message; // 类型：string | undefined
  },
});
```

**配置 tsconfig**

在根目录下创建文件`tsconfig.json`,这个配置文件设置了 TypeScript 编译器的一系列选项，以确保代码使用最新的 ECMAScript 特性，并启用了严格的类型检查和其他有助于代码质量的选项，同时排除了某些目录以优化编译过程。

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "isolatedModules": true,
    "strict": true,
    "noUnusedParameters": true,
    "experimentalDecorators": true,
    "lib": ["dom", "esnext"]
  },
  "exclude": ["node_modules", "dist"]
}
```

- **`target: "esnext"`**: 设置编译后的 JavaScript 版本为 ECMAScript Next，也就是最新的 ECMAScript 标准。这意味着 TypeScript 将生成最新版本的 JavaScript 代码。

- **`module: "esnext"`**: 设置模块系统为 ECMAScript Next。这意味着使用最新的 ECMAScript 模块标准进行代码打包和导入导出。

- **`moduleResolution: "node"`**: 使用 Node.js 的模块解析策略，这对于在 Node.js 环境中编写代码或使用 npm 包非常有用。

- **`isolatedModules: true`**: 确保每个文件都是一个单独的模块。这可以提高编译速度并确保模块化的隔离性。

- **`strict: true`**: 启用所有严格类型检查选项。这是一个非常重要的选项，用于捕获潜在的错误并提高代码质量，包括`noImplicitAny`, `strictNullChecks`, `strictFunctionTypes`, `strictBindCallApply`, `strictPropertyInitialization`, `noImplicitThis` 和 `alwaysStrict` 等选项。

- **`noUnusedParameters: true`**: 如果函数有未使用的参数，则会报错。这有助于保持代码的整洁和避免未使用的代码。

- **`experimentalDecorators: true`**: 启用对装饰器的实验性支持。装饰器是一种特殊的声明，用于修改类及其成员的行为，目前是一个实验性特性。

- **`lib: ["dom", "esnext"]`**: 包含哪些库的声明文件。这些文件为全局变量和类型提供类型定义。`"dom"` 包含浏览器环境的类型声明，`"esnext"` 包含最新 ECMAScript 标准的类型声明。

`exclude`

- **`"node_modules"`**: 排除 `node_modules` 目录中的文件，不对其进行编译。这是标准做法，因为这些文件通常是已编译好的 JavaScript 代码或第三方库代码。

- **`"dist"`**: 排除 `dist` 目录中的文件，通常这个目录是用来存放编译后的代码或构建结果的。

## Vite 配置

在根目录创建`vite.config.js`文件，Vite 会自动解析 项目根目录下名为 `vite.config.js` 的文件。

:::tip
**配置智能提示**

因为 Vite 本身附带 TypeScript 类型，所以你可以通过 IDE 和 jsdoc 的配合来实现智能提示：

```js
/** @type {import('vite').UserConfig} */
export default {
  // ...
};
```

另外你可以使用 defineConfig 工具函数，这样不用 jsdoc 注解也可以获取类型提示：

```js
import { defineConfig } from 'vite';

export default defineConfig({
  // ...
});
```

Vite 也直接支持 TS 配置文件。你可以在 vite.config.ts 中使用 defineConfig 工具函数。
:::

```js
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  // 配置基础路径
  base: '/', // 配置开发或生产环境的基础路径

  // 配置插件
  plugins: [
    vue(), // 配置 Vue 插件，启用 Vue 3 的单文件组件支持
  ],

  // 配置服务器
  server: {
    host: '0.0.0.0', // 监听所有地址
    port: 3000, // 配置开发服务器端口号
    open: true, // 启动开发服务器时自动打开浏览器
    proxy: {
      // 配置代理
      '/api': {
        target: 'http://backend-api-url', // 代理目标地址
        changeOrigin: true, // 允许跨域
        rewrite: path => path.replace(/^\/api/, ''), // 重写路径
      },
    },
  },

  // 配置构建选项
  build: {
    outDir: 'dist', // 指定输出路径
    assetsDir: 'assets', // 静态资源存放路径
    sourcemap: false, // 是否生成 source map 文件
    minify: 'terser', // 选择代码压缩工具
    terserOptions: {
      // 配置 Terser 压缩选项
      compress: {
        drop_console: true, // 移除 console.log 语句
        drop_debugger: true, // 移除 debugger 语句
      },
    },
  },

  // 配置解析选项
  resolve: {
    alias: {
      // 配置路径别名
      '@': '/src', // 使用 @ 代替 /src 路径
    },
  },

  // 配置 CSS 选项
  css: {
    preprocessorOptions: {
      scss: {
        // 配置 SCSS 预处理器
        additionalData: `@import "@/styles/global.scss";`, // 引入全局 SCSS 文件
      },
    },
  },
});
```

**模式和环境变量**

在 Vite 中配置环境变量，可以通过在项目根目录下创建 .env 文件来实现。这些文件可以根据不同的环境分别命名，比如 .env、.env.development 和 .env.production。Vite 会根据当前的运行环境自动加载相应的环境变量文件。

1. 创建环境变量文件：

- 开发环境：.env.development
- 生产环境：.env.production
- 通用环境：.env

在这些文件中定义环境变量，以 `VITE\_` 开头：

```
# .env
VITE_API_BASE_URL=https://api.example.com
VITE_APP_TITLE=My App

# .env.development
VITE_API_BASE_URL=https://dev.api.example.com
VITE_APP_TITLE=My App (Development)

# .env.production
VITE_API_BASE_URL=https://api.example.com
VITE_APP_TITLE=My App

```

2. 在代码中使用环境变量

在代码中使用环境变量时，需要通过 import.meta.env 进行访问：

```js
// 在 JavaScript 或 TypeScript 文件中
console.log(import.meta.env.VITE_API_BASE_URL);
console.log(import.meta.env.VITE_APP_TITLE);
```

如果需要在 vite.config.js 中使用环境变量，可以直接引用 process.env：

```js
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  base: process.env.VITE_BASE_URL || '/', // 使用环境变量配置基础路径
  define: {
    'process.env': process.env, // 定义全局环境变量
  },
});
```

:::tip
**运行项目时指定环境**
运行 Vite 项目时，Vite 会根据 NODE_ENV 或 MODE 自动加载相应的环境文件。默认情况下，vite 命令会加载 `.env` 和 `.env.development` 文件，vite build 命令会加载 `.env` 和 `.env.production` 文件。

你可以通过命令行参数 --mode 来指定不同的模式：

```bash
# 运行开发环境
vite --mode development

# 运行生产环境
vite build --mode production

```

:::

## 项目打包、部署

**打包**：使用`npm run build`执行打包

**部署**

手动上传 dist 中的内容到服务器，配置 nginx

但手动操作风险较大，一般使用自动化处理，避免繁琐的操作

以 github actions 实现 ci/cd 过程

1. 开发机器 -> push 到 github 上
2. github 进行远程虚拟机 build
3. 最后将打包的结果上传到服务器上

如果直接将开发机器链接到服务器上，在服务器上 git pull 最新代码和 build 并不恰当，占用服务器上的资源，并且不易做版本控制
