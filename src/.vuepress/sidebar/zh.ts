import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/zh/": [
    "",
    {
      text: "前端",
      icon: "like",
      prefix: "Front/",
      link: "Front/",
      children: "structure",
    },
    {
      text: "知识粉碎区",
      icon: "hot",
      prefix: "CrushingZone/",
      link: "CrushingZone/",
      children: "structure",
    },
    {
      text: "文章",
      icon: "note",
      prefix: "posts/",
      children: "structure",
    },
    "intro",
    "slides",
  ],
});
