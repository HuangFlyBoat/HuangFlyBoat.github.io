---
# 这是文章的标题
title: 动画基础
# You can customize cover image
cover: /assets/images/Animation/main.jpg
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 1
# 设置作者
author: HCX
# 设置写作时间
date: 2023-10-15
# 一个页面可以有多个分类
category:
  - 动画
# 一个页面可以有多个标签
tag:
  - 小白向
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
# 你可以自定义页脚
footer: 秋天到了
---

前端动画的简单入门

<!-- more -->

# 前端动画，基础篇

## 一、前端动画的实现方式

前端实现动画的方式有很多种，这里介绍四种常见的，前两者为 CSS 实现，后两者为 JS 控制实现

### 1. transition 过渡实现

> CSS 过渡提供了一种在更改 CSS 属性时控制动画速度的方法。其可以让属性变化成为一个持续一段时间的，而不是立即生效的过程。比如，将一个元素的颜色从白色改为黑色，通常这个改变是立即生效的，使用 CSS 过渡后该元素的颜色将按照一定的曲线速率从白色变化为黑色。这个过程可以自定义。
> transition CSS 属性是 transition-property、transition-duration、transition-timing-function 和 transition-delay 的一个简写属性 (en-US)。

通过设置 CSS 过渡的值可以实现一些简单的基本动画，如缩放、放大、移动等

**使用示例如下，给特定的状态加上过渡，第一个值为过渡属性（可以设置为 all），第二个为过渡动画的执行时间，第三个参数可以为过渡行为（可以省略），最后为过渡延迟时间**

```css
div {
  transition: <property> <duration> <timing-function> <delay>;
  transition: margin-right 2s ease-in-out 0.5s;
  transition: margin-right 2s 0.5s;
}
```

当没有设置过渡的时间函数时，默认为平滑线性函数。通过设置自定义的时间函数可以实现一些生动的动画

如先进行反效果再进行正向的效果

```css
div {
  transition: font-size 0.7s cubic-bezier(0.61, -0.19, 0.7, -0.11), flex 0.7s
      cubic-bezier(0.61, -0.19, 0.7, -0.11);
}
```

[贝塞尔曲线在线绘制](https://cubic-bezier.com)

### 2. animation 实现

比 transition 更加强大，可以设置多个关键帧来实现

### 3. 定时器实现

### 4. requestAnimationFrame 实现

## 二、前端动画参考网站
