---
title: Docker 容器化部署持续集成
icon: page
order: 1
author: HCX
date: 2024-06-22
category:
  - Docker
  - Server
tag:
  - Server
sticky: true
star: true
footer: fly fly fly ~
---

## Docker 是什么

1. Docker 是一个开源的平台，主要用于开发、运输和运行应用程序。Docker 使用容器技术来解决传统虚拟化技术中的一些缺陷和复杂性。

- 操作系统层面的虚拟化技术
- 隔离的进程独立于宿主和其他的隔离的进程，容器
- GO 语言开发

2. 特点：

- 便携性：由于容器包含所有依赖项，应用程序可以在任何地方运行，无论是开发人员的笔记本电脑、测试环境还是生产环境。

- 隔离性：容器之间是互相隔离的，确保一个容器的变化不会影响其他容器。这使得应用程序更安全、更稳定。

- 高效性：容器共享宿主操作系统的内核，相比虚拟机，启动速度更快，占用资源更少。

- 可扩展性：通过 Docker Compose 和 Docker Swarm 等工具，可以轻松编排和管理多个容器，支持微服务架构和大规模分布式系统。

3. **核心概念**

容器（Container）：容器是一个独立的运行环境，包含应用程序及其所有依赖项。容器与宿主操作系统共享内核，但彼此**隔离**，确保应用程序可以在不同的环境中一致运行。

镜像（Image）：镜像是一个只读的模板，用来创建容器。镜像包含运行应用程序所需的一切：代码、运行时、库、环境变量和配置文件。

Docker 引擎（Docker Engine）：这是一个客户端-服务器应用程序，包括一个长期运行的守护进程（dockerd），一个接口（REST API）和一个命令行界面（CLI docker）

4. 安装 Docker

在自己的服务器上进行安装

> https://docs.docker.com/engine/install/

```bash
# 移除旧版本的docker
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine

# 国内配置 docker yum 源，速度更快
sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

# 安装docker  docker-ce 引擎  docker-ce-cli 引擎的命令行程序  containerd.io 运行时环境
sudo yum install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 启动docker
sudo systemctl start docker

# 设置开机自启
sudi systemctl enable docker

# 配置加速，默认镜像下载源为docker hub，换成国内的
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://mirrors.ccs.tencentyun.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
# 验证是否成功
# 此命令下载测试映像并在容器中运行它。当容器运行，它打印确认消息并退出。
sudo docker run hello-world
```

## Docker 基本操作

### 镜像基础操作：

- `docker search 镜像名称` 检索
- `docker pull 镜像名称` 下载某个镜像的最新版本
- `docker images` 列表
- `docker rmi 镜像id` 删除，可选参数 `-f` 强制删除

如果需要下载指定版本

`https://hub.docker.com` 官网上查找镜像，根据版本号下载指定版本 `docker pull 镜像名称:版本号`

### 容器相关操作：

- `docker run 镜像名称` 运行，如果本地没有找到这个镜像，则会远程下载，同样可以指定版本运行
- `docker ps` 查看运行中的容器，也可以使用参数 `-a` 查看所有的容器
- `docker stop 容器名/id` 停止
- `docker start 容器名/id` 启动
- `docker restart 容器名/id` 重启
- `docker stats 容器名/id` 状态
- `docker logs 容器名/id` 日志
- `docker exec 容器名/id` 进入容器内，退出容器通过 `exit` 指令
- `docker rm 容器名/id` 删除，可选参数 `-f` 强制删除

注意 id 也可以简写前面几位数字，只要能与其他容器进行区分即可

:::tip
通过添加 `--help` 可以查看指令的说明，如 `docker run --help`

如 `docker run -d --name myNginx nginx` 后台启动 nginx，并为容器取名为 myNginx

但此时启动后仍然无法根据 ip 访问到服务，因为启动的容器是运行在自己的环境内，容器并不会影响到整个系统

如果想要通过访问外部主机的端口来访问到容器内的服务，通过端口映射实现 `-p 88:80` 主机的 88 端口映射到容器内 80 端口

`docker run -d --name myNginx -p 80:80 nginx`
:::

**实际案例：**

如修改 Nginx 的默认主页，
进入到容器内部更改文件 `docker exec -it mynginx /bin/bash`

- `-it`：交互方式进入
- `bin/bash`：使用命令行的方式进行交互

进入配置文件夹 `cd /usr/share/nginx/html`

在容器内也是有着自己独立的文件系统和软件，为了保证极简化，vim 也没有安装在内。通过原生的 linux 指令 `echo` 进行修改
`echo "<h1>Hello,Hcx learn Docker</h1>" > index.html`

### 保存分享镜像

保存镜像

- `docker commit -m "description" 容器名/id 生成的镜像名称` 根据已有的容器和相关修改来创建一个新镜像
- `docker save 镜像名 -o` 保存，将镜像保存为一个压缩包
- `docker load -i 压缩包路径` 加载镜像文件

分享镜像

- `docker login` 登录到 docker hub
- `docker tag 镜像名称 别名` 给本地镜像打一个标记（tag），可将其归入某一仓库，要求的命名格式为`用户名/镜像名:版本号(latest)`，命名为 latest 表示最新，他人在下载时默认下载的版本
- `docker push 镜像tag` 推送到仓库里

## Docker 存储

**目录挂载**

有没有办法直接在外部主机上修改文件，然后映射到容器内部？

通过目录挂载实现，在容器启动 `docker run` 时输入参数

`-v 外部地址:内部地址` 将会自动创建外部目录，并将容器内指定地址的文件挂载到该目录下

并且当容器被删除时，外部的文件还保留着，起到一个保存配置的作用，而又不会生成新的镜像。
下次启动容器时仍然可以选择挂载到相同的外部地址上，复用之前销毁容器的配置

**卷映射**

通过目录挂载有个缺点便是，一切以外部为准，当挂载时并不会对容器的文件进行拷贝，也就是说如果外部是新建了一个空文件夹用来挂载容器内的文件，则该容器内的文件夹里也会被清空。

仍然是在容器启动时加入参数实现卷映射，将容器内的文件也在最开始映射到挂载文件里

docker 会自动根据卷名生成文件，该文件被放于 `/var/lib/docker/volumes/卷名` 里

`-v 卷名:内部地址`

卷名并不是地址，它并不以 `./` 或者 `/` 开头

也可以通过 `docker volume inspect 卷名` 来查看卷信息，找到文件存储位置。同样的删除容器，卷依旧存在

## 网络于集群

##
