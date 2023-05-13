import { defineUserConfig } from "vuepress";
import theme from "./theme.js";


export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "en-US",
      title: "hcx Blog",
      description: "A blog demo for vuepress-theme-hope",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "hcx的博客",
      description: "黄先生的博客妙妙屋",
    },
  },

  theme,




  // Enable it with pwa
  // shouldPrefetch: false,
});
