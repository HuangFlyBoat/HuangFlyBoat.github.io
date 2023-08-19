import { sidebar } from 'vuepress-theme-hope';

export const zhSidebar = sidebar({
  '/zh/Overview/': [
    {
      text: '前端知识汇总',
      icon: 'like',
      prefix: 'Front/',
      link: '/zh/Front/',
      children: 'structure',
    },
    {
      text: '知识粉碎区',
      icon: 'hot',
      prefix: 'CrushingZone/',
      link: '/zh/CrushingZone/',
      children: 'structure',
    },
    {
      text: 'React',
      icon: 'react',
      prefix: 'React/',
      link: '/zh/React/',
      children: 'structure',
    },
    {
      text: 'JS数据结构',
      icon: 'emmet',
      prefix: 'DataStructure/',
      link: '/zh/DataStructure/',
      children: 'structure',
    },
    {
      text: '项目自用封装',
      icon: 'api',
      prefix: 'Project/',
      link: '/zh/Project/',
      children: 'structure',
    },
    {
      text: '前端设计模式',
      icon: 'leaf',
      prefix: 'DesignPattern/',
      link: '/zh/DesignPattern/',
      children: 'structure',
    },
    {
      text: '动画方面',
      icon: 'animation',
      prefix: 'Animation/',
      link: '/zh/Animation/',
      children: 'structure',
    },
    'intro',
  ],
  // 上面文档大分类的侧边栏
  // 下面是点击后类别细分
  '/zh/Front/': [
    {
      text: '前端知识汇总',
      link: '/zh/Front/',
      icon: 'like',
      children: 'structure',
    },
  ],
  '/zh/CrushingZone/': [
    {
      text: '知识粉碎区',
      link: '/zh/CrushingZone/',
      icon: 'hot',
      children: 'structure',
    },
  ],
  '/zh/React/': [
    {
      text: 'React',
      link: '/zh/React/',
      icon: 'react',
      children: 'structure',
    },
  ],
  '/zh/DataStructure/': [
    {
      text: 'JS数据结构',
      link: '/zh/DataStructure/',
      icon: 'emmet',
      children: 'structure',
    },
  ],
  '/zh/Project/': [
    {
      text: '项目自用封装',
      link: '/zh/Project/',
      icon: 'emmet',
      children: 'structure',
    },
  ],
  '/zh/DesignPattern/': [
    {
      text: '前端设计模式',
      link: '/zh/DesignPattern/',
      icon: 'emmet',
      children: 'structure',
    },
  ],
  '/zh/Animation/': [
    {
      text: '动画方面',
      link: '/zh/Animation/',
      icon: 'emmet',
      children: 'structure',
    },
  ],
  '/zh/posts/': [
    {
      text: '文章',
      icon: 'note',
      children: 'structure',
    },
  ],
});
