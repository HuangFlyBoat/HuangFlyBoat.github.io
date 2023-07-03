import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/zh/": [
    "",
    {
      text: "前端知识汇总",
      icon: "like",
      prefix: "Front/",
      link: "Front/",
      children: "structure",
    },
    {
      text: "React",
      icon: "react",
      prefix: "React/",
      link: "React/",
      children: "structure",
    },
    {
      text: "JS数据结构",
      icon: "emmet",
      prefix: "DataStructure/",
      link: "DataStructure/",
      children: "structure",
    },
    {
      text: "项目自用封装",
      icon: "api",
      prefix: "Project/",
      link: "Project/",
      children: "structure",
    },
    {
      text: "前端设计模式",
      icon: "leaf",
      prefix: "DesignPattern/",
      link: "DesignPattern/",
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
      text: "动画方面",
      icon: "animation",
      prefix: "Animation/",
      link: "Animation/",
      children: "structure",
    },
    "intro",
  ],
  "/zh/posts/":[
    {
      text: "文章",
      icon: "note",
      children: "structure",
    },
  ]
});
