import { defineUserConfig } from "vuepress";
import theme from "./theme.js";


export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "en-US",
      title: "flyboat Blog",
      description: "A blog for flyboat",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "飞船的博客",
      description: "飞船的博客妙妙屋",
    },
  },

  theme,




  // Enable it with pwa
  // shouldPrefetch: false,
});
