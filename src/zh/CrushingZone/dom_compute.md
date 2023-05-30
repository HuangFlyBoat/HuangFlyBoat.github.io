---
# 这是文章的标题
title: DOM 计算属性
# You can customize cover image
cover: /assets/images/CrushingZone/dom_compute.jpg
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 1
# 设置作者
author: HCX
# 设置写作时间
date: 2023-3-20
# 一个页面可以有多个分类
category:
  - dom
# 一个页面可以有多个标签
tag:
  - 自用速查
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
# 你可以自定义页脚
footer: 夏天刚刚开始呢

---

在这里分类总结一些常用的计算元素几何位置的属性和方法，包括了HTMLElement 、Intersection Observer、window、scroll

<!-- more -->

# DOM 几何位置相关计算属性和方法

## 一、HTMLElement 相关
::: tip
注意：如果元素被隐藏（例如 元素或者元素的祖先之一的元素的 style.display 被设置为 none），则返回 0
:::

### 1.1 元素自身宽高

1. **HTMLElement.offsetHeight**，元素自身可视高度加上上下 border 的高度

2. **HTMLElement.offsetWidth**，元素自身可视宽度加上左右 border 的宽度

### 1.2 元素相对位置

1. **HTMLElement.offsetLeft**，元素自己 border 左边距离父元素 border 左边或者 body 元素 border 左边的距离

2. **HTMLElement.offsetTop**，元素自己 border 顶部距离父元素顶部或者 body 元素 border 顶部的距离

3. **getBoundingClientRect()**，方法返回一个 DOMRect 对象，提供有关元素大小及其相对于视口的位置。

![DOMRect 对象提供的相对视口位置](/assets/images/CrushingZone/element-box-diagram.png)

```js
const rect = element.getBoundingClientRect();
const top = rect.top;
const bottom = rect.bottom;
const height = rect.height;
```

补充：**HTMLElement.offsetParent**，获取元素的父元素，如果没有就是 body 元素


> https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement

> Viewport 视口表示当前正在查看的计算机图形中的多边形（通常为矩形）区域。在 Web 浏览器术语中，它是指您正在查看的文档部分，该部分当前在其窗口中可见（如果文档以全屏模式查看，则为屏幕）。视口外的内容在滚动到视图中之前不会在屏幕上显示。
> 视区中当前可见的部分称为可视视区。这可以小于布局视口，例如当用户进行捏合缩放时。布局视口保持不变，但可视视口变小。
## 二、Window 相关

### 窗口大小

![示例图](/assets/images/CrushingZone/window.png)

1. **Window.outerHeight**，返回整个浏览器窗口的高度（以像素为单位），包括侧边栏（如果存在）、窗口镶边（window chrome）和窗口调正边框（window resizing border/handle）。

2. **Window.outerWidth**，获取浏览器窗口外部的宽度。表示整个浏览器窗口的宽度，包括侧边栏（如果存在）、窗口镶边（window chrome）和调正窗口大小的边框（window resizing borders/handles）。

3. **Window.innerHeight**，浏览器窗口的 **视口（viewport）** 高度（以像素为单位）；如果有水平滚动条，也包括滚动条高度。

4. **Window.innerWidth**，返回以像素为单位的窗口的内部宽度。如果垂直滚动条存在，则这个属性将包括它的宽度。

## 三、Scroll 相关计算

### 3.1 相对窗口的滚动计算

1. **Window.scrollX**,返回文档/页面水平方向滚动的像素值。

2. **Window.scrollY**,返回文档在垂直方向已滚动的像素值。

:::tip
注意还有个别名，Window.pageXOffset 和 Window.pageYOffset
:::

### 3.2 相对某个元素的滚动计算

一个页面里面可以会有多个滚动条，多出现在某个元素属性设置了 固定高度 和 `overflow:auto` 等属性

1. **Element.scrollTop**,获取或设置元素内容垂直滚动的像素数

2. **Element.scrollWidth** 只读属性,测量元素内容的宽度，包括由于溢出屏幕部分。

## 四、Intersection Observer Api

以往实现通常是监听滚动事件和`getBoundingClientRect()`方法来实现的，当页面滚动时，计算函数会被频繁调用，会影响网站的性能。
需要尽可能减少不必要的计算和操作。可以考虑使用节流函数来限制函数的调用频率。

> https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

一种新的浏览器API，它可以异步观察目标元素与其祖先元素或顶级文档视窗之间的交叉状态。使用该API可以轻松实现懒加载图片，只需要监听目标元素与视窗的交叉状态即可。


## 五、应用

### 5.1 图片懒加载
