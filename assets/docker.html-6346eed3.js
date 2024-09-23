import{_ as c}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as d,c as i,a as e,b as a,d as l,e as n}from"./app-ac9850e2.js";const r={},t=n('<h2 id="docker-是什么" tabindex="-1"><a class="header-anchor" href="#docker-是什么" aria-hidden="true">#</a> Docker 是什么</h2><ol><li>Docker 是一个开源的平台，主要用于开发、运输和运行应用程序。Docker 使用容器技术来解决传统虚拟化技术中的一些缺陷和复杂性。</li></ol><ul><li>操作系统层面的虚拟化技术</li><li>隔离的进程独立于宿主和其他的隔离的进程，容器</li><li>GO 语言开发</li></ul><ol start="2"><li>特点：</li></ol><ul><li><p>便携性：由于容器包含所有依赖项，应用程序可以在任何地方运行，无论是开发人员的笔记本电脑、测试环境还是生产环境。</p></li><li><p>隔离性：容器之间是互相隔离的，确保一个容器的变化不会影响其他容器。这使得应用程序更安全、更稳定。</p></li><li><p>高效性：容器共享宿主操作系统的内核，相比虚拟机，启动速度更快，占用资源更少。</p></li><li><p>可扩展性：通过 Docker Compose 和 Docker Swarm 等工具，可以轻松编排和管理多个容器，支持微服务架构和大规模分布式系统。</p></li></ul><ol start="3"><li><strong>核心概念</strong></li></ol><p>容器（Container）：容器是一个独立的运行环境，包含应用程序及其所有依赖项。容器与宿主操作系统共享内核，但彼此<strong>隔离</strong>，确保应用程序可以在不同的环境中一致运行。</p><p>镜像（Image）：镜像是一个只读的模板，用来创建容器。镜像包含运行应用程序所需的一切：代码、运行时、库、环境变量和配置文件。</p><p>Docker 引擎（Docker Engine）：这是一个客户端-服务器应用程序，包括一个长期运行的守护进程（dockerd），一个接口（REST API）和一个命令行界面（CLI docker）</p><ol start="4"><li>安装 Docker</li></ol><p>在自己的服务器上进行安装</p>',11),p={href:"https://docs.docker.com/engine/install/",target:"_blank",rel:"noopener noreferrer"},u=n(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 移除旧版本的docker</span>
<span class="token function">sudo</span> yum remove <span class="token function">docker</span> <span class="token punctuation">\\</span>
                  docker-client <span class="token punctuation">\\</span>
                  docker-client-latest <span class="token punctuation">\\</span>
                  docker-common <span class="token punctuation">\\</span>
                  docker-latest <span class="token punctuation">\\</span>
                  docker-latest-logrotate <span class="token punctuation">\\</span>
                  docker-logrotate <span class="token punctuation">\\</span>
                  docker-engine

<span class="token comment"># 国内配置 docker yum 源，速度更快</span>
<span class="token function">sudo</span> yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

<span class="token comment"># 安装docker  docker-ce 引擎  docker-ce-cli 引擎的命令行程序  containerd.io 运行时环境</span>
<span class="token function">sudo</span> yum <span class="token function">install</span> docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

<span class="token comment"># 启动docker</span>
<span class="token function">sudo</span> systemctl start <span class="token function">docker</span>

<span class="token comment"># 设置开机自启</span>
sudi systemctl <span class="token builtin class-name">enable</span> <span class="token function">docker</span>

<span class="token comment"># 配置加速，默认镜像下载源为docker hub，换成国内的</span>
<span class="token function">sudo</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/docker
<span class="token function">sudo</span> <span class="token function">tee</span> /etc/docker/daemon.json <span class="token operator">&lt;&lt;-</span><span class="token string">&#39;EOF&#39;
{
  &quot;registry-mirrors&quot;: [&quot;https://mirrors.ccs.tencentyun.com&quot;]
}
EOF</span>
<span class="token function">sudo</span> systemctl daemon-reload
<span class="token function">sudo</span> systemctl restart <span class="token function">docker</span>
<span class="token comment"># 验证是否成功</span>
<span class="token comment"># 此命令下载测试映像并在容器中运行它。当容器运行，它打印确认消息并退出。</span>
<span class="token function">sudo</span> <span class="token function">docker</span> run hello-world
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker-基本操作" tabindex="-1"><a class="header-anchor" href="#docker-基本操作" aria-hidden="true">#</a> Docker 基本操作</h2><h3 id="镜像基础操作" tabindex="-1"><a class="header-anchor" href="#镜像基础操作" aria-hidden="true">#</a> 镜像基础操作：</h3><ul><li><code>docker search 镜像名称</code> 检索</li><li><code>docker pull 镜像名称</code> 下载某个镜像的最新版本</li><li><code>docker images</code> 列表</li><li><code>docker rmi 镜像id</code> 删除，可选参数 <code>-f</code> 强制删除</li></ul><p>如果需要下载指定版本</p><p><code>https://hub.docker.com</code> 官网上查找镜像，根据版本号下载指定版本 <code>docker pull 镜像名称:版本号</code></p><h3 id="容器相关操作" tabindex="-1"><a class="header-anchor" href="#容器相关操作" aria-hidden="true">#</a> 容器相关操作：</h3><ul><li><code>docker run 镜像名称</code> 运行，如果本地没有找到这个镜像，则会远程下载，同样可以指定版本运行</li><li><code>docker ps</code> 查看运行中的容器，也可以使用参数 <code>-a</code> 查看所有的容器</li><li><code>docker stop 容器名/id</code> 停止</li><li><code>docker start 容器名/id</code> 启动</li><li><code>docker restart 容器名/id</code> 重启</li><li><code>docker stats 容器名/id</code> 状态</li><li><code>docker logs 容器名/id</code> 日志</li><li><code>docker exec 容器名/id</code> 进入容器内，退出容器通过 <code>exit</code> 指令</li><li><code>docker rm 容器名/id</code> 删除，可选参数 <code>-f</code> 强制删除</li></ul><p>注意 id 也可以简写前面几位数字，只要能与其他容器进行区分即可</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>通过添加 <code>--help</code> 可以查看指令的说明，如 <code>docker run --help</code></p><p>如 <code>docker run -d --name myNginx nginx</code> 后台启动 nginx，并为容器取名为 myNginx</p><p>但此时启动后仍然无法根据 ip 访问到服务，因为启动的容器是运行在自己的环境内，容器并不会影响到整个系统</p><p>如果想要通过访问外部主机的端口来访问到容器内的服务，通过端口映射实现 <code>-p 88:80</code> 主机的 88 端口映射到容器内 80 端口</p><p><code>docker run -d --name myNginx -p 80:80 nginx</code></p></div><p><strong>实际案例：</strong></p><p>如修改 Nginx 的默认主页， 进入到容器内部更改文件 <code>docker exec -it mynginx /bin/bash</code></p><ul><li><code>-it</code>：交互方式进入</li><li><code>bin/bash</code>：使用命令行的方式进行交互</li></ul><p>进入配置文件夹 <code>cd /usr/share/nginx/html</code></p><p>在容器内也是有着自己独立的文件系统和软件，为了保证极简化，vim 也没有安装在内。通过原生的 linux 指令 <code>echo</code> 进行修改 <code>echo &quot;&lt;h1&gt;Hello,Hcx learn Docker&lt;/h1&gt;&quot; &gt; index.html</code></p><h3 id="保存分享镜像" tabindex="-1"><a class="header-anchor" href="#保存分享镜像" aria-hidden="true">#</a> 保存分享镜像</h3><p>保存镜像</p><ul><li><code>docker commit -m &quot;description&quot; 容器名/id 生成的镜像名称</code> 根据已有的容器和相关修改来创建一个新镜像</li><li><code>docker save 镜像名 -o</code> 保存，将镜像保存为一个压缩包</li><li><code>docker load -i 压缩包路径</code> 加载镜像文件</li></ul><p>分享镜像</p><ul><li><code>docker login</code> 登录到 docker hub</li><li><code>docker tag 镜像名称 别名</code> 给本地镜像打一个标记（tag），可将其归入某一仓库，要求的命名格式为<code>用户名/镜像名:版本号(latest)</code>，命名为 latest 表示最新，他人在下载时默认下载的版本</li><li><code>docker push 镜像tag</code> 推送到仓库里</li></ul><h2 id="docker-存储" tabindex="-1"><a class="header-anchor" href="#docker-存储" aria-hidden="true">#</a> Docker 存储</h2><p><strong>目录挂载</strong></p><p>有没有办法直接在外部主机上修改文件，然后映射到容器内部？</p><p>通过目录挂载实现，在容器启动 <code>docker run</code> 时输入参数</p><p><code>-v 外部地址:内部地址</code> 将会自动创建外部目录，并将容器内指定地址的文件挂载到该目录下</p><p>并且当容器被删除时，外部的文件还保留着，起到一个保存配置的作用，而又不会生成新的镜像。 下次启动容器时仍然可以选择挂载到相同的外部地址上，复用之前销毁容器的配置</p><p><strong>卷映射</strong></p><p>通过目录挂载有个缺点便是，一切以外部为准，当挂载时并不会对容器的文件进行拷贝，也就是说如果外部是新建了一个空文件夹用来挂载容器内的文件，则该容器内的文件夹里也会被清空。</p><p>仍然是在容器启动时加入参数实现卷映射，将容器内的文件也在最开始映射到挂载文件里</p><p>docker 会自动根据卷名生成文件，该文件被放于 <code>/var/lib/docker/volumes/卷名</code> 里</p><p><code>-v 卷名:内部地址</code></p><p>卷名并不是地址，它并不以 <code>./</code> 或者 <code>/</code> 开头</p><p>也可以通过 <code>docker volume inspect 卷名</code> 来查看卷信息，找到文件存储位置。同样的删除容器，卷依旧存在</p><h2 id="网络于集群" tabindex="-1"><a class="header-anchor" href="#网络于集群" aria-hidden="true">#</a> 网络于集群</h2><h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h2>`,35);function k(m,v){const o=s("ExternalLinkIcon");return d(),i("div",null,[t,e("blockquote",null,[e("p",null,[e("a",p,[a("https://docs.docker.com/engine/install/"),l(o)])])]),u])}const g=c(r,[["render",k],["__file","docker.html.vue"]]);export{g as default};