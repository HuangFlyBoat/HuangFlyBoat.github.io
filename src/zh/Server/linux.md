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

## 一、前置知识 基础术语了解

- Kernel

  Linux 的内核，操作系统的大脑，它控制着系统硬件并制造硬件和应用程序的交互

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

  文件系统是 Linux 的一种存储方式，如 ext3, ext4

- X Window system

  提供了标准的工具包和协议，用于构建几乎所有的图形用户界面

- desktop environment

  操作系统顶部的图形用户界面

- command line

  命令行是一个提供输入命令的接口

- Shell

  命令行解释器，用于解释命令行的输入并指示操作系统去执行任何必要的任务和命令，如 bash, TC shell, Z shell

## 二、Linux 目录结构

Linux 的目录结构是一个树型结构，并且顶层为 `/` (windows 顶层就可以有 c 盘, d 盘等)

::: warning
在 Linux 系统中，路径之间的层级关系用 `: /` 表示, 如： /usr/local/hello.txt

在 Windows 系统中，路径之间的层级关系用 `: \` 表示, 如: D:\data\work\hello.txt
:::

## 三、Linux 常用指令

### 1. 命令基础

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

### 2. ls 命令

ls 以平铺的形式列出当前工作目录下的内容

::: info
Linux 系统的命令行终端，在启动的时候，默认会加载：

- 当前登录用户的 HOME 目录作为当前的工作目录，所以 ls 命令列出的是 HOME 目录的内容
- HOME 目录：每个 Linux 操作用户在 Linux 系统的个人账号目录，路径在 :/home/用户名
- 可以通过 pwd 命令查看当前的工作目录
  :::

**ls 的选项和参数**

`ls [-a -l -h] [Linux路径]`

- `-a` 表示 all 的意思，列出全部文件（包括隐藏的文件/文件夹）

  以 `.` 开头命名的文件表名是 Linux 系统的隐藏文件/文件夹，只要以`.`开头就能自动隐藏

- `-l` 以列表（竖向排列）的形式展示文件，并且展示详细信息

- `-h` 以易于阅读的形式，列出文件大小单位，如 K、M、G，该选项必须搭配 `-l` 一起使用

命令选项是可以混合使用的，如 `ls -alh /`

### 3. cd 和 pwd 命令

**cd 切换工作目录**

语法： `cd [Linux路径]`

- cd 命令无需选项，只有参数，表示切换到哪个目录下
- 如果没有参数，则表面回到工作目录下

**pwd 无选项，无参数，表名当前所在的工作目录**

### 4. 相对路径和绝对路径

- `cd /home/root/test` 绝对路径写法
- `cd test` 相对路径写法

绝对路径，以根目录为起点，描述路径的一种写法，路径描述以 / 开头
相对路径，以当前目录为起点

::: tip 特殊路径符号：

- `.` 表示当前目录，如 `cd ./test`
- `..` 表示上一级目录，如 `cd ../..` 切换到上两级目录
- `~` 表示 HOME 目录， 如 `cd ~`

:::

### 5. mkdir 命令创建新目录（文件夹）

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

### 6. `touch cat more` 命令

**touch 创建文件**

语法： `touch Linux路径`

- touch 命令无选项，参数必填，表明文件名路径

`touch test.txt`

**cat 命令查看文件内容**

语法： `cat Linux路径`

- touch 命令无选项，参数必填，表明文件名路径

`cat test.txt`

**more 命令查看文件内容**

语法和 cat 相同

与 cat 不同的是，cat 是直接将内容全部显示出来，more 支持翻页，可以一页一页的展示

空格进行翻页，按 q 退出

### 7. `cp mv rm` 命令

**cp 命令复制文件文件夹**
语法： `cp [-r] 参数1 参数2`

- `-r` 选项，是否递归的复制
- 参数 1，参数 2 均为 Linux 路径，参数 1 表示被复制的文件文件夹路径，参数 2 表示复制到的地方

**mv 移动文件文件夹**

语法： `mv 参数1 参数2`

- 参数 1，参数 2 均为 Linux 路径，参数 1 表示被移动的文件文件夹路径，参数 2 表示移动到的地方
- 如果目标不存在，则会自动进行改名，确保目标存在 `mv test2.txt test3.txt` 相当于重命名了

**rm 删除文件文件夹**

语法： `cp [-r -f] 参数1 参数2 ...参数`

- `-r` 选项，是否递归的删除
- `-f` 表示 force, 强制删除（不会弹出提示确认信息）

  - 普通用户删除内容不会弹出提示，只有 root 管理员删除时会有提示，根据提示输入 y 或者 n 来继续下一步
  - 所以一般用户用不到 -f 选项

- 参数 1，参数 2，参数 N 均为 Linux 路径，表示要删除的文件和文件夹路径，用空格隔开

:::tip
rm 命令参数支持通配符 \*，用于模糊匹配

- 符号*表示通配符，即匹配任意内容(包含空)，示例：
  `test*`匹配test开头的`_test_` 匹配包含 test 的
  :::

### 8. `which find` 命令

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

文件名同样支持 \* 通配符进行模糊匹配

- 选项 name ，根据文件名来查找
- 选项 size ，根据文件大小来查找，其中参数 `+-` 表示大于小于，n 表示大小数字，`KMG`为单位（KB,MB,GB）

```bash
find / -name "test*"

find / -size -10k

find / -size +1G
```

### 9. `grep wc` 管道符

**grep 命令，从文件中通过关键词过滤文件行**

语法： `grep [-n] 关键字 文件路径`

- 参数`-n`可选，表示在结果中显示匹配的行的行号
- 参数关键字，必填，表示过滤的关键字，带有空格或者其他特殊符号，建议用`""`包裹起来
- 参数文件路径，必填，表示过滤内容的文件路径，可以作为内如输入端口

**wc 命令，统计文件的行数、单词数量等**

语法： `wc [-c -m  -l -w] 文件路径`

- 选项, `-c`, 统计 bytes 数量
- 选项, `-m`, 统计字符数量
- 选项, `-l`, 统计行数
- 选项, `-w`, 统计单词数量
- 参数文件路径，被统计的文件，可作为内容的输入端口

```bash
wc test.txt
# 2(行数) 11(单词的数量) 59(字节数) test.txt
```

:::info 管道符 |
shift + 回车上的按键打出管道符 `|`

管道符的含义是：将管道符左边命令的结果作为右边命令的输入（需要该参数支持作为内容的输入端口）

```bash
cat test.txt | grep "test"
cat test.txt | wc -l
ls -l /usr/bin | wc -l
```

值得注意的是，管道符是可以嵌套使用的 `command a | command b | command c`

:::

### 10. `echo tail` 重定向

**echo 命令可以用于在命令行输出指定内容**

语法: `echo 指定内容`

- 对于特殊的内容，可以使用双引号包裹起来
- 指定内容可以被反引号 `` 包裹起来, 从而输出内容命令的执行结果

```bash
echo "hello world"
echo `pwd`
```

:::info 重定向符

- `>` 将左侧命令的结果，覆盖写入到符号右侧指定的文件中
- `>>` 将左侧命令的结果，追加写入到符号右侧

```bash
echo "hello" > text.txt
echo "linux" >> text.txt
```

:::

**tail 命令可以查看文件尾部内容，跟踪文件的最新更改，语法如下**

`tail [-f -num] Linux 路径`

- 参数，Linux 路径，表示被跟踪的文件路径
- 选项, `-f` 表示持续追踪，能够获取到文件的最新更改
- 选项, `-num` 表示查看尾部多少行，不填默认为 10

:::tip
contrl + c 可以快速停止当前的命令
:::

### 11. vi 编辑器

vi\vim 编辑器的三种工作模式

- 命令模式，键盘输入的内容视为命令。vim 进入后的默认模式，可通过 esc 来返回到命令模式

  - 输入模式相关
    - `i`: 在当前光标位置进入输入模式
    - `I`: 在当前行的开头进入输入模式
    - `a`: 在当前光标位置之后进入输入模式
    - `A`: 在当前行的结尾进入输入模式
    - `o`: 在当前光标的下一行进入输入模式
    - `O`: 在当前光标的上一行进入输入模式
  - 光标移动
    - 键盘上下左右移动光标
    - `0`: 移动光标到行的开头
    - `$`: 移动光标到行的结尾
    - `pageup`: 向上翻页
    - `pagedown`: 向下翻页
  - 搜索
    - `/`: 进入搜索模式，输入内容进行高亮
    - `n`: 向下继续搜索
    - `N`: 向上继续搜索
  - 编辑
    - `dd`: 删除光标所在行内容
    - `ndd`: 删除光标向下 n 行的内容
    - `yy`: 复制光标所在行内容
    - `nyy`: 复制光标向下 n 行的内容
    - `p`: 粘贴复制的内容
    - `u`: 撤销修改
    - `ctrl + r`: 反向撤销修改
    - `gg`: 跳到首行
    - `G`: 跳到行尾
    - `dG`: 从当前行开始，向下全部删除
    - `dgg`: 从当前行开始，向上全部删除
    - `d$`: 从当前光标开始，删除到本行的结尾
    - `d0`: 从当前光标开始，删除到本行的开头

- 输入模式，编辑文件内容

- 底线命令模式，整体文件的控制，保存退出等，通过`:`进入到底线命令模式
  - `wq` 保存并退出
  - `q` 仅退出
  - `q!` 强制退出
  - `w` 仅保存
  - `set nu` 显示行号
  - `set paste` 设置粘贴模式

语法： `vim hello.txt` `vi hello.txt`

## 四、Linux 权限

### 1. root 用户（超级管理员）

root 用户拥有最大的系统操作权限

**su 和 exit 命令**

su 命令(Switch User)，用于切换账户

语法: `su [-] 用户名`

- `-` 可选，表示是否在切换用户后加载环境变量，建议带上
- 参数：用户名，表示要切换的用户，用户名也可以省略，省略代表切换到 root
- 切换用户后可以通过 exit 命令退回到上一个用户，也可以用快捷键 ctrl + d

:::info
使用普通用户切换到其他用户需要输入密码

使用 root 用户切换到其他用户则无需输入密码

不建议长期使用 root 用户，避免带来系统损坏
:::

使用 sudo 命令为普通命令授权，临时以 root 身份执行

语法: `sudo 命令`

但不是所有的用户都有权限使用 sudo 命令，需要为普通用户配置 sudo 认证

:::tip 配置 sudo 认证

1. 切换到 root 用户，执行 `visudo` 命令，会自动通过 vi 编辑器打开 `:/etc/sudoers`
2. 在文件的最后添加

```bash
# 命令模式下 G 来到最后一行 ， o 进入插入模式在下面增加一行
用户名 ALL=(ALL) NOPASSWD:ALL
# esc 回到命令模式，:wq 保存
```

:::

### 2. 用户和用户组

Linux 系统中可以配置多个用户，配置多个用户组，用户可以加入多个用户组中

Linux 中关于权限的管控级别有两个，分别是

- 针对用户的权限控制
- 针对用户组的权限控制

**用户组的管理**

- `groupadd 用户组名`：创建用户组

- `groupdel 用户组名`: 删除用户组

**用户的管理**

- `useradd [-g -d] 用户名`：创建用户，`-g` 表示指定用户的组，不指定会创建同名的组并自动加入。`-d`指定用户 HOME 路径，不指定则默认在 `/home/用户名` 下

- `userdel [-r] 用户名`: 删除用户，`-r` 表示删除用户的 HOME 目录，不指定则不删除

- `id [用户名]`：查看指定用户的信息，不指定则是查看自己

- `usermod -aG 用户组 用户名`: 将指定的用户加入指定的用户组

::: tip 查看当前系统中有哪些用户
语法： `getent passwd`

将会以列表的形式展开显示用户信息

包括 用户名:密码(x):用户 ID:组 ID:描述信息(无用):HOME 目录:执行终端(默认 bash)

语法： `getent group` 查看当前系统中有哪些用户组
:::

### 3. 权限控制

通过 `ls -l` 可以以列表形式查看内容，并展示权限细节

首位 `d` 表示是文件夹， `-` 表示是文件，`l` 表示软链接

权限每隔三位为一类，分别表示所属用户权限，所属用户组的权限，其他用户的权限

每一类里权限为 `rwx`: 表示读、写、执行权限

针对文件、文件夹的不同，rwx 的含义有细微差别

- r 针对文件可以查看内容，针对文件夹可以查看文件夹内容，如 ls 命令
- w 针对文件表示可以修改此文件，针对文件夹表示可以在文件夹内创建、删除、改名等操作
- x 针对文件表示可以将文件作为程序执行，针对文件夹表示可以更改工作目录到此文件夹，即 cd 进入

### 4. chmod 命令

使用 chmod 命令修改文件、文件夹的权限信息，注意只有文件、文件夹的所属用户或 root 用户可以修改

语法: `chmod [-R] 权限 文件或文件夹` ，选项 r 递归的操作

```bash
# 将权限修改为 rwxr-x--x
chmod u=rwx,g=rx,o=x hello.txt

# 将权限修改为 rwxr-x--x
chmod 751 hello.txt
```

:::info 权限的数字序号
权限可以用 3 位数字来表示，第一位数字表示用户权限，第二位表示用户组权限，第三位表示其他用户权限

0：没有任何权限 ---

1：仅有 x 权限 --x

2：仅有 w 权限 -w-

3：有 wx 权限 -wx

4：仅有 r 权限 r--

5：有 rx 权限 r-x

6：有 rw 权限 rw-

7：有 rwx 权限 rwx

:::

### 5. chown 命令

使用 chown 命令可以修改文件、文件夹的所属用户和用户组

普通用户无法修改所属为其他用户或组，所以此命令只适用于 root 用户执行

语法: `chown [-R] [用户][:][用户组] 文件或文件夹` ，选项 r 递归的操作

示例

```bash
chown root hello.txt
chown :root hello.txt
chown root:flyboat hello.txt
chown -R root test
```

## 五、Linux 服务

### 1. 快捷键

`ctrl + c` 中断当前命令

`ctrl + d` 退出当前用户，也可以用于退出某些特定的程序页面如 python

`history` 查看历史指令

`!命令前缀` 自动执行最近一次匹配前缀的历史指令

`ctrl + r` 输入内容去匹配历史命令

光标移动快捷键

`ctrl + a` 跳到命令开头
`ctrl + e` 跳到命令结尾
`ctrl + 键盘左键/右键` 向左或者右跳一个单词

清屏

`clear` 清空终端

`ctrl + l` 清空终端

### 2. 软件安装

yum: RPM 包软件管理器，用于自动化安装配置 Linux 软件，并且可以自动解决依赖问题

::: info
不同的发行版对应系统的包管理器是不一样的，CentOS 使用 yum 管理器，而 Ubuntu 使用 apt 管理器

apt 的语法和 yum 一致

语法: `qpt [-y] [install | remove | search] 软件名称`
:::

语法: `yum [-y] [install | remove | search] 软件名称`

- 选项: -y 自动确认，无需手动确认安装或者卸载过程
- `install`: 安装
- `remove`: 卸载
- `search`: 搜索

**yum 命令需要 root 权限，并且联网**

示例：

通过 yum 命令安装 wget 程序, wget 是一种通过 http 或者 ftp 协议的下载工具

`sudo yum -y install wget`

### 3. Systemctl 命令

Linux 系统的很多软件(内置或第三方)均支持使用 systemctl 命令控制：启动、停止、开机自启

能够被 Systemctl 命令管理的软件，一般也称之为服务

语法: `systenctl start | stop | status | enable | disable 服务名`

系统内置的服务有：

- NetworkManager 主网络服务
- network 副网络服务
- firewalld 防火墙服务
- sshd,ssh 服务

:::info
除了内置的服务以外，部分第三方软件安装后也可以通过 systemctl 进行控制

- `yum install -y ntp` 安装 ntp 软件

- `yum install -y httpd` 安装 apache 服务器软件

部分软件安装后没有自动集成到 systemctl 中，可以自行手动添加
:::

### 4. 软链接

类似于 Windows 系统中的快捷方式，在系统中创建软链接，可以将文件、文件夹链接到其他位置

语法: `ln -s 参数1 参数2`

- `-s`：必选选项，创建软链接
- 参数 1：被链接的文件或者文件夹
- 参数 2：要链接去的目的地

示例

```bash
# 在home目录下创建自己的快捷方式
ln -s /etc/yum.conf ~/yum.conf
ln -s /etc/yum ~/yum
```

### 5. 日期和时区

**date 命令，在命令行中查看系统的时间**

语法： `date [-d] [+格式化字符串]`

- `-d` 按照给定的字符串显示日期，一般用于日期计算
  - `date -d "+1 day"` 显示后一天的日期
  - `date -d "-1 ddy"` 显示前一天的日期
  - 支持的时间标记有 year、month、day、hour、minute、second
- 格式化字符串：通过特定的字符串标记，来控制显示的日期格式
  - %Y 年
  - %y 年份后两位数字
  - %m 月份
  - %d 日
  - %H 小时
  - %M 分钟
  - %S 秒
  - %s 自 1970-01-01 00:00:00 UTC 到现在的秒数

::: tip date 命令示例
直接使用 date 命令本体可以查看时间

`date +%Y-%m-%d` 按照 2024-04-06 显示日期

`date "+%Y-%m-%d %H:%M:%S"` 2024-04-06 12:32:12

:::

**Linux 时区修改**

系统默认的时区非中国的东八区，使用 root 权限进行更改时区

```bash
# 重新创建本地时区的软链接
rm -f /etc/localtime
sudo ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

::: tip ntp 程序

通过 ntp 程序自动校验系统时间

安装 ntp : `yum -y install ntp`
启动并设置开机自启

```bash
systemctl start ntpd
systemctl enable ntpd
```

启动后 ntpd 会定期帮助我们联网校验系统的时间

也可以手动校准（需要 root 权限）：`ntpdate -u ntp.aliyun.com`

通过阿里云提供的服务网址配合 ntpdate（安装 ntp 后附带的命令）命令自动校准
:::

### 6. 网络下载

通过 `ifconfig` 查看本地的 ip 地址

如果无法执行该命令，可以安装 `yum -y install net-tools`

:::info
一般主网卡会被叫做 ens33 , 在 inet 字段中可以看见 ip 地址

还有本地回环的网卡 io , 127.0.0.1 代表本机

0.0.0.0 可以用于指代主机，或者表示所有 ip 的意思，允许任意的 ip 访问

可以通过 hostname 来查看主机名, 通过命令 `hostnamectl set-hostname 新名称` 来修改主机名
:::

**wget 命令**

进行网络文件的下载

语法：`wget [-b] url`

- 选项：`-b` 可选，后台下载，会将日志写入到当前的工作目录的 wget-log 文件
- 参数: url，下载链接

通过 tail 命令可以监控后台下载进度: `tail -f wget-log`

:::info
需要注意的是下载无论成功还是失败都会有一个文件
:::

**curl 命令**

用于发起网络请求

语法：`curl [-o] url`

- 选项：`-o` 用于下载文件，当 url 是下载链接时可以使用此选项保存文件
- 参数：url，要发起请求的网络地址

示例：

向 cip.cc 发起网络请求: `curl cip.cc`

### 7. 端口

Linux 可以支持 65535 个端口，大致分为三类

- 公共端口: 1~1023，通常用于一些系统内置或知名程序的预留使用，如 SSH 服务的 22 端口，HTTPS 服务的 443 端口
- 注册端口: 1024~49151 通常可以随意使用，用于松散的绑定一些程序、服务
- 动态端口: 49152~65535，通常不会固定绑定程序，而是当程序对外进行网络链接时，用于临时使用

**通过 nmap 命令查看端口的占用情况**

安装：`yum -y install nmap`

语法: `nmap 被查看的IP地址`

```bash
# 查看某个端口是否被占用
nmap 127.0.0.1 | grep 8080
```

### 8. 进程管理

**通过 ps 命令查看系统中的进程信息**

语法: `ps [-e -f]`

选项： `-e` 显示出全部的进程
选项: `-f` 以完全格式化的形式展示信息

一般固定用法 `ps -ef`

**关闭进程 kill 命令**

语法: `kill [-9] 进程ID`

选项: `-9` 表示强制关闭进程

### 9. 查看资源占用

**CPU 占用情况**

可以通过 top 命令查看 CPU 内存占用使用情况，类似于 Window 的任务管理器

默认每隔 5 秒刷新一次

语法: `top`

- 第一行: top 命令名称，xx:xx:xx 当前系统时间，up x min: 启动了 x 分钟，x users: x 用户登录，load: 1、5、15 分钟负载

- 第二行: Tasks：x 个进程，运行中、睡眠中、停止进程

- 第三行: CPU 使用率, us: 用户 CPU 使用率, sy: 系统 CPU 使用率, ni: 高优先级进程占用 CPU 时间百分比, id: 空闲 CPU 率, wa: IO 等待 CPU

- 第四五行: 物理内存和虚拟内存的总量、空闲和使用

列的含义

- PID: 进程 id
- USER: 进程的所属用户
- PR: 进程优先级，越小越高
- NI: 负值表示高优先级，正表示低优先级
- VIRT: 进程使用的虚拟内存
- RES: 进程使用的物理内存
- SHR: 进程使用的共享内存
- S: 进程状态(S 休眠，R 运行，Z 僵死状态，N 负数优先级，I 空闲状态)
- %CPU: 进程占用 CPU 率
- %MEM: 进程占用内存率
- TIME+: 进程使用 CPU 时间总计，单位 10 毫秒
- COMMAND: 进程的命令或名称或程序文件的路径

:::info top 命令选项

- `-p 进程id` 只显示某个进行的信息
- `-d` 设置刷新时间，默认是 5s
- `-c` 显示产生进程的完整命令，默认是进程名
- `-n` 指定刷新次数，比如 top -n 3，刷新输出三次后退出
- `-b` 以非交互非全屏模式运行，批次的方式执行 top，一般配合 `-n` 指定输出几次统计信息，并重定向到指定文件。如 `top -b -n 3 > /tmp/top.tmp`
- `-i` 不显示任何闲置(idle)或无用(zombie)的进程
- `-u` 查找特定用户启动的进程

在默认模式下(不输入`-b`)有很多按键可以互动，如 h，m
:::

**磁盘信息监控**

使用 df 命令，可以查看磁盘的使用情况

语法: `df [-h]`

选项: `-h` 更加人性化的单位显示

:::tip 使用 iostat 查看 CPU、磁盘的相关信息
首先安装 sysstat 包
`yum install -y sysstat`

语法: `iostat [-x][num1][num2]`

- 选项: `-x` 显示更多信息
- num1: 数字，刷新间隔
- num2: 刷新几次

:::

### 10. 环境变量

在 Linux 系统中执行 env 命令可以查看当前系统中记录的环境变量

环境变量是一种 keyValue 型结构

查看 PATH `env | grep PATH`

PATH 记录了系统执行任何命令的搜索路径，当执行命令时会从 PATH 中的路径里搜索

**`$`符号**

在 linux 系统，`$`符号被用于取变量的值

取得环境变量的值就可以通过语法: `$环境变量名`

比如 `echo $PATH` 获取环境变量 PATH 的值

通过 `echo ${PATH}ABC` 和其他内容混合在一起的时候，可以通过{}来标注取的变量是谁（类似 ES6 的模板字变量用法）

**自行设置环境变量**

Linux 环境变量可以用户自行设置，其中分为

- 临时设计，语法: export 变量名 = 变量值
- 永久生效
  - 针对当前用户生效、配置在当前用户的: `~/.bashrc` 文件中
  - 针对所有用户生效、配置在系统的: `/etc/profile` 文件中
  - 并通过语法: source 配置文件，进行立刻生效，或重新登录 FinalShell 生效

```bash
export hcx = 222
echo $hcx
# 222
```

**自定义环境变量 PATH**

临时修改 PATH: `export PATH=$PATH:/Linxu文件路径`(在原有的 PATH 路径后面增加)

```bash
cd ~
mkdir myenv
cd myenv
vim testEnv
# 编辑脚本内容，如 echo "testEnv执行了"
# 设置权限，用户能够执行
chmod 755 testEnv
# 添加到环境变量，也可以配置在当前用户 vim ~/.bashrc
vim /etc/profile
# 在文件最下面添加自己创建的文件夹，以便搜索得到
export PATH=$PATH:/root/myenv
# 在其他目录输入测试
cd /
testEnv
```

### 11. Linux 中的上传和下载

通过第三方软件可以进行可视化的上传和下载

- WinSCP
- FinalShell

除了第三方软件外，也可以通过: `yum -y install lrzsz` 安装

- `rz`命令，进行上传
- `sz 要下载的文件`命令，会自动下载到桌面的 fsdownload 文件夹中

### 12. 压缩和解压

**tar 命令**

:::info Linux 压缩格式
Linux 和 Mac 系统常用有 2 种压缩格式，后缀名分别是:

- `.tar` 称之为 tarball 归档文件，即简单的将文件组装到一个`.tar`文件内，并没有体积上的减少
- `.gz` 也常见为 `.tar .gz gzip`格式压缩文件，体积也会压缩
  :::

语法: `tar [-c -v -x -f -z -C] 参数1 参数2 ... 参数N`

- `-c` 创建压缩文件，用于压缩模式
- `-v` 显示压缩、解压过程，用于查看进度
- `-x` 解压模式
- `-f` 要创建的文件、或要解压的文件，该选项必须处于所有选项中的最后一个
- `-z` gzip 模式，不适用`-z`则默认普通的 tarball 格式
- `-C` 选择解压的目的地，用于解压模式

示例：

```bash
# 将三个文件打包到 test.tar中
tar -cvf test.tar 1.txt 2.txt 3.txt
# 进行 gzip 压缩, z 选项一般放在首位
tar -zcvf test.tar.gz 1.txt 2.txt 3.txt

# 将压缩包解压到当前目录
tar -xvf test.tar
# 将压缩包解压到指定目录, -C 选项当度使用，和解压的参数分开
tar -xvf test.tar -C /home/flyboat
# 以gzip模式解压
tar -zxvf test.tar.gz -C /home/flyboat
```

**zip 压缩格式**

通过 zip 命令，压缩文件为 zip 压缩包

语法: `zip [-r] 参数1 参数2 ... 参数N`

- `-r` 递归的压缩

示例：

```bash
zip test.zip a.txt b.txt c.txt
# 将文件夹 testDir 和文件 a.txt 一起压缩
zip test.zip testDir a.txt

```

通过 unzip 命令，解压 zip 压缩包

语法: `unzip [-d] 参数`

- `-d`,指定哟啊解压的位置，同 tar 的`-C`选项
- 参数，被解压的 zip 文件

示例

```bash
unzip test.zip
unzip test.zip -d /home/flyboat
```
