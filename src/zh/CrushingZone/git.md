---
# 这是文章的标题
title: Git 项目管理
# You can customize cover image
cover: /assets/images/CrushingZone/dom_compute.jpg
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 1
# 设置作者
author: HCX
# 设置写作时间
date: 2023-08-09
# 一个页面可以有多个分类
category:
  - git
# 一个页面可以有多个标签
tag:
  - 自用速查，实用
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
# 你可以自定义页脚
footer: 已经立秋过了

---

在新公司实习有一段时间了，在大公司里面体验到了git的实际应用，有所心得分享一下。
重点讲解仓库方面，分支创建和提交记录整理

<!-- more -->

# Git

## 一、基础用法

:::tip
开始之前先来解释下git的几个概念

1. 工作区（Working Directory）：工作区是你当前正在修改文件的地方。你可以在工作区添加、修改或删除文件。

2. 暂存区（Staging Area）：暂存区是一个中间区域，用于存储即将提交到版本库的修改。当你完成对文件的修改后，你可以将这些修改添加到暂存区。

3. 版本库（Repository）：版本库是Git的核心部分，它包含项目的完整历史记录。它由一系列的提交（commits）组成，每个提交代表了一次文件修改的快照。版本库存储在.git目录中。
:::

**一些常用的Git指令：**

- 初始化仓库：

  - `git init`：在当前目录初始化一个新的Git仓库。
  - `git clone <url>`: 克隆仓库
  - `git clone -b <branch_name> <url>` 克隆远程仓库上的指定分支

- 添加和提交文件：

  - `git add <file>`：将文件添加到暂存区。用 `git add ./` 来将所有修改的文件添加到暂存区里
  - `git commit -m "<message>"`：提交暂存区的修改到版本库，并添加提交信息。

- 分支管理：

  - `git branch`：列出所有分支。
  - `git branch <branch_name>`：创建新的分支。
  - `git checkout <branch_name>`：切换到指定分支。
  - `git checkout -b <branch_name>`: 创建并切换到对应分支
  - `git merge <branch_name>`：合并指定分支到当前分支。

- 远程仓库：

  - `git remote add <remote_name> <remote_url>`：添加远程仓库。
  - `git remote -v`：显示所有远程仓库。
  - `git push <remote_name> <branch_name>`：将本地分支推送到远程仓库。
  - `git pull <remote_name> <branch_name>`：从远程仓库拉取最新代码。

- 查看状态和历史：

  - `git status`：显示工作区和暂存区的状态。
  - `git log`：显示提交历史记录。
  - `git diff`：显示工作区与暂存区的差异。
  - `git show <commit_id>`：显示指定提交的详细信息和修改内容。

以上是一些基础的指令，也是工作中用得较多的。但是当出现复杂的场景时就不太够看了，往往是需要大费周章上网搜搜才能得到解决。

## 二、Git 进阶操作

### 1、reset 和 rebase 历史更改

git reset 和 git rebase 一直是一个很困惑作者的点，来到公司后利用空余时间好好恶补了一下。
为什么恶补？因为想要让自己的提交记录更加干净，不想因为 bug 或者漏提而反复提交好几次 :sneezing_face:

> **先说结论，reset没有rebase灵活，简单的用reset，复杂的情况用rebase** 在自己的提交还保留在本地并没有推送到远程仓库时，
更改自己的提交记录（注意是自己的且还没有推送的提交）是比较安全的

:::danger
变更历史是一件有风险的事情，请确保知道自己当前的目的和产生的副作用。在不确定时和团队成员做好沟通
:::

#### 1.1 git reset


#### 1.2 git rebase

### 2、stash 储存

### 3、merge 与 rebase 冲突解决

### 4、cherry-pick 选择提交

## 三、项目管理

:::info
在项目中
:::
### 1、提交合并注意项

### 2、git 规约

## 四、实际场景

### 1、 提交后发现漏提了或者有bug
### 2、 冲突处理解决

### 3、 开发过程中需求转换到更紧急的需求上