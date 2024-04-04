---
title: Linux
icon: page
order: 1
author: HCX
date: 2024-04-04
category:
  - Linux
  - Server
tag:
  - Server
sticky: true
star: true
footer: fly fly fly ~
---

# Linux

## 前置知识 基础术语了解

- Kernel

   Linux的内核，操作系统的大脑，它控制着系统硬件并制造硬件和应用程序的交互

   ![kernel](/assets/images/Server/kernel.png)

- distribution

   发行版是一系列程序结合包含了 Linux 内核共同组成 Linux 操作系统，一些常见的发行版示例如：red hat Enterprise Linux Fedora, Ubantu, gen2

   ![发行版](/assets/images/Server/distribution.png)

- boot loader

  在操作系统内核运行前执行的一小段程序，如 grub, isolinux

  ![boot](/assets/images/Server/bootloader.png)

- service

  一段运行在后台进程的程序，如 httpd, nfsd, ntpd

- filesysterm

  文件系统是Linux的一种存储方式，如 ext3, ext4

- X Window system

  提供了标准的工具包和协议，用于构建几乎所有的图形用户界面

- desktop environment

  操作系统顶部的图形用户界面

- command line

  命令行是一个提供输入命令的接口

- Shell

  命令行解释器，用于解释命令行的输入并指示操作系统去执行任何必要的任务和命令，如 bash, TC shell, Z shell


## Linux 目录结构

Linux 的目录结构是一个树型结构，并且顶层为 `/` (windows顶层就可以有 c 盘, d 盘等)

::: warning
在Linux系统中，路径之间的层级关系用 `: /` 表示, 如： /usr/local/hello.txt

在Windows系统中，路径之间的层级关系用 `: \` 表示, 如: D:\data\work\hello.txt
:::

## Linux 常用指令

###  命令基础

Linux 命令格式：

`command [-options] [parameters]`

- command: 命令本身
- -options: 命令选项（可选）
- parameter: 命令的参数（可选）

```bash
# 以列表的形式显示 /home/test/ 目录的内容
ls -l /home/test 
# 递归的复制文件夹 test1 为 test2 
cp -r test test2
```

### ls 命令

ls 以平铺的形式列出当前工作目录下的内容

::: info
Linux 系统的命令行终端，在启动的时候，默认会加载：

- 当前登录用户的 HOME 目录作为当前的工作目录，所以ls命令列出的是 HOME 目录的内容
- HOME 目录：每个 Linux 操作用户在 Linux 系统的个人账号目录，路径在 :/home/用户名
- 可以通过 pwd 命令查看当前的工作目录
:::

**ls 的选项和参数**

`ls [-a -l -h] [Linux路径]`

- `-a` 表示 all 的意思，列出全部文件（包括隐藏的文件/文件夹）

  以 `.` 开头命名的文件表名是Linux系统的隐藏文件/文件夹，只要以`.`开头就能自动隐藏

- `-l` 以列表（竖向排列）的形式展示文件，并且展示详细信息

- `-h` 以易于阅读的形式，列出文件大小单位，如 K、M、G，该选项必须搭配 `-l` 一起使用

命令选项是可以混合使用的，如 `ls -alh /`

### cd 和 pwd 命令

**cd 切换工作目录**

语法： `cd [Linux路径]`

- cd 命令无需选项，只有参数，表示切换到哪个目录下
- 如果没有参数，则表面回到工作目录下

**pwd 无选项，无参数，表名当前所在的工作目录**

### 相对路径和绝对路径

- `cd /home/root/test` 绝对路径写法
- `cd test` 相对路径写法

绝对路径，以根目录为起点，描述路径的一种写法，路径描述以 / 开头
相对路径，以当前目录为起点

::: tip 特殊路径符号：


- `.` 表示当前目录，如 `cd ./test`
- `..` 表示上一级目录，如 `cd ../..` 切换到上两级目录
- `~` 表示 HOME 目录， 如 `cd ~` 

:::

### mkdir 命令创建新目录（文件夹）

语法： `mkdir [-p] Linux路径`

- 参数必填，表示 Linux 路径，即需要创建的文件夹的路径，相对路径或绝对路径
- 选项选填，表示自动创建不存在的父目录，用于一次性创建多个层级的目录

```bash
mkdir test
mkdir ./test
mkdir ~/test
```

::: tip

`ctrl + l` 用于清屏

:::

注意：创建文件夹需要修改权限，确保操作均在 HOME 目录内，不要在 HOME 之外操作

### `touch cat more` 命令

**touch 创建文件**

语法： `touch Linux路径`

- touch 命令无选项，参数必填，表明文件名路径

`touch test.txt`


**cat 命令查看文件内容**

语法： `cat Linux路径`

- touch 命令无选项，参数必填，表明文件名路径

`cat test.txt`

**more 命令查看文件内容**

语法和cat相同

与 cat 不同的是，cat是直接将内容全部显示出来，more支持翻页，可以一页一页的展示

空格进行翻页，按 q 退出

### `cp mv rm` 命令

**cp 命令复制文件文件夹**
语法： `cp [-r] 参数1 参数2`

- `-r` 选项，是否递归的复制
- 参数1，参数2 均为Linux路径，参数1表示被复制的文件文件夹路径，参数2表示复制到的地方

**mv 移动文件文件夹**

语法： `mv 参数1 参数2`

- 参数1，参数2 均为Linux路径，参数1表示被移动的文件文件夹路径，参数2表示移动到的地方
- 如果目标不存在，则会自动进行改名，确保目标存在 `mv test2.txt test3.txt` 相当于重命名了

**rm 删除文件文件夹**

语法： `cp [-r -f] 参数1 参数2 ...参数`

- `-r` 选项，是否递归的删除
- `-f` 表示 force, 强制删除（不会弹出提示确认信息）
  
  - 普通用户删除内容不会弹出提示，只有root管理员删除时会有提示，根据提示输入 y 或者 n 来继续下一步
  - 所以一般用户用不到 -f 选项

- 参数1，参数2，参数N 均为Linux路径，表示要删除的文件和文件夹路径，用空格隔开

:::tip
rm 命令参数支持通配符 *，用于模糊匹配
- 符号*表示通配符，即匹配任意内容(包含空)，示例：
`test*` 匹配test开头的
`*test*` 匹配包含test的
:::

### `which find` 命令

**which 查看所使用的一系列命令的程序文件存方法在哪里**

语法： `which 要查找的命令`

```bash
which cd
which pwd
```

**find 搜索指定文件**

语法： 

`find 起始路径 -name "被查找的文件名"`

`find 起始路径 -size +|-n[KMG]`

文件名同样支持 * 通配符进行模糊匹配

- 选项 name ，根据文件名来查找
- 选项 size ，根据文件大小来查找，其中参数 `+-` 表示大于小于，n 表示大小数字，`KMG`为单位（KB,MB,GB）

```bash
find / -name "test*"

find / -size -10k

find / -size +1G
```

### `grep wc` 管道符


### `echo tail` 重定向

### vi 编辑器

## Linux 权限

## Linux 服务

## 