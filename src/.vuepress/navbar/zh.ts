import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/zh/",
  { text: "文档", icon: "discover", link: "/zh/Front/" },
  {
    text: "博文",
    icon: "edit",
    prefix: "/zh/posts/",
    children: [
      {
        text: "暂时没想法",
        icon: "edit",
        prefix: "nothing/",
        children: [
          { text: "1", icon: "edit", link: "1" },
        ],
      }
    ],
  }
]);
