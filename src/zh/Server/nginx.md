---
title: Nginx
icon: page
order: 1
author: HCX
date: 2024-04-09
category:
  - Server
tag:
  - Server
sticky: true
star: true
footer: fly fly fly ~
---

# Nginx 快速入门

Nginx（发音为"engine X"）是一个开源的高性能的 Web 服务器软件，也可以用作反向代理服务器、负载均衡器、邮件代理以及 HTTP 缓存服务器。它由俄罗斯的程序员 Igor Sysoev 于 2004 年创建，并于 2009 年成立了它的公司 Nginx Inc.。

Nginx 的设计目标是提供高性能、高并发的服务，同时具有低内存消耗。它采用事件驱动的异步架构，能够处理大量的并发连接而不会产生过多的线程或进程。这使得 Nginx 在面对高流量的情况下仍能保持稳定的性能。Nginx 还具有良好的扩展性，可以通过模块化的方式灵活地扩展和定制功能。

Nginx 最常见的用法是作为前端 Web 服务器，用于提供静态内容、处理反向代理请求和负载均衡。它可以直接处理静态文件的传输，而对于动态内容的请求，则可以将其代理到后端的应用服务器（如 Node.js、Tomcat 等）进行处理。这种架构可以提高 Web 应用程序的性能和可靠性。

此外，Nginx 还具有其他功能，如 SSL/TLS 终端代理、HTTP 缓存、URL 重写、限速控制、基于 IP 的访问控制等。这些功能使得 Nginx 在构建高可用性和安全性的 Web 服务方面非常有用。

## 安装

### 1. 包管理器进行安装

CentOS 使用 yum 管理器，而 Ubuntu 使用 apt 管理器

```bash
# Ubuntu
sudo apt update
sudo apt install nginx
```

```bash
# CentOs
yum -y install nginx
```

### 2. 编译安装

### 3. 使用 Docker 安装

##
