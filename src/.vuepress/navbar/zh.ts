import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/zh/",
  { text: "文档", icon: "discover", link: "/zh/Overview/" },
  {
    text: "博文",
    icon: "edit",
    prefix: "/zh/posts/",
    children: [
      {
        text: "笔记",
        icon: "edit",
        prefix: "note/",
        children: [
          { text: "日语笔记", icon: "edit", link: "Japanese" },
        ],
      }
    ],
  }
]);
