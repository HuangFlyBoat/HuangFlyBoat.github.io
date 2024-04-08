import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as c,c as o,a as n,b as e,d,e as a}from"./app-a19c7c3f.js";const t="/assets/images/Server/kernel.png",p="/assets/images/Server/distribution.png",r="/assets/images/Server/bootloader.png",u={},h=a('<h1 id="linux" tabindex="-1"><a class="header-anchor" href="#linux" aria-hidden="true">#</a> Linux</h1><h2 id="一、前置知识-基础术语了解" tabindex="-1"><a class="header-anchor" href="#一、前置知识-基础术语了解" aria-hidden="true">#</a> 一、前置知识 基础术语了解</h2><ul><li><p>Kernel</p><p>Linux 的内核，操作系统的大脑，它控制着系统硬件并制造硬件和应用程序的交互</p><figure><img src="'+t+'" alt="kernel" tabindex="0" loading="lazy"><figcaption>kernel</figcaption></figure></li><li><p>distribution</p><p>发行版是一系列程序结合包含了 Linux 内核共同组成 Linux 操作系统，一些常见的发行版示例如：red hat Enterprise Linux Fedora, Ubantu, gen2</p><figure><img src="'+p+'" alt="发行版" tabindex="0" loading="lazy"><figcaption>发行版</figcaption></figure></li><li><p>boot loader</p><p>在操作系统内核运行前执行的一小段程序，如 grub, isolinux</p><figure><img src="'+r+`" alt="boot" tabindex="0" loading="lazy"><figcaption>boot</figcaption></figure></li><li><p>service</p><p>一段运行在后台进程的程序，如 httpd, nfsd, ntpd</p></li><li><p>filesysterm</p><p>文件系统是 Linux 的一种存储方式，如 ext3, ext4</p></li><li><p>X Window system</p><p>提供了标准的工具包和协议，用于构建几乎所有的图形用户界面</p></li><li><p>desktop environment</p><p>操作系统顶部的图形用户界面</p></li><li><p>command line</p><p>命令行是一个提供输入命令的接口</p></li><li><p>Shell</p><p>命令行解释器，用于解释命令行的输入并指示操作系统去执行任何必要的任务和命令，如 bash, TC shell, Z shell</p></li></ul><h2 id="二、linux-目录结构" tabindex="-1"><a class="header-anchor" href="#二、linux-目录结构" aria-hidden="true">#</a> 二、Linux 目录结构</h2><p>Linux 的目录结构是一个树型结构，并且顶层为 <code>/</code> (windows 顶层就可以有 c 盘, d 盘等)</p><div class="hint-container warning"><p class="hint-container-title">注意</p><p>在 Linux 系统中，路径之间的层级关系用 <code>: /</code> 表示, 如： /usr/local/hello.txt</p><p>在 Windows 系统中，路径之间的层级关系用 <code>: \\</code> 表示, 如: D:\\data\\work\\hello.txt</p></div><h2 id="三、linux-常用指令" tabindex="-1"><a class="header-anchor" href="#三、linux-常用指令" aria-hidden="true">#</a> 三、Linux 常用指令</h2><h3 id="_1-命令基础" tabindex="-1"><a class="header-anchor" href="#_1-命令基础" aria-hidden="true">#</a> 1. 命令基础</h3><p>Linux 命令格式：</p><p><code>command [-options] [parameters]</code></p><ul><li>command: 命令本身</li><li>-options: 命令选项（可选）</li><li>parameter: 命令的参数（可选）</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 以列表的形式显示 /home/test/ 目录的内容</span>
<span class="token function">ls</span> <span class="token parameter variable">-l</span> /home/test
<span class="token comment"># 递归的复制文件夹 test1 为 test2</span>
<span class="token function">cp</span> <span class="token parameter variable">-r</span> <span class="token builtin class-name">test</span> test2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-ls-命令" tabindex="-1"><a class="header-anchor" href="#_2-ls-命令" aria-hidden="true">#</a> 2. ls 命令</h3><p>ls 以平铺的形式列出当前工作目录下的内容</p><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>Linux 系统的命令行终端，在启动的时候，默认会加载：</p><ul><li>当前登录用户的 HOME 目录作为当前的工作目录，所以 ls 命令列出的是 HOME 目录的内容</li><li>HOME 目录：每个 Linux 操作用户在 Linux 系统的个人账号目录，路径在 :/home/用户名</li><li>可以通过 pwd 命令查看当前的工作目录</li></ul></div><p><strong>ls 的选项和参数</strong></p><p><code>ls [-a -l -h] [Linux路径]</code></p><ul><li><p><code>-a</code> 表示 all 的意思，列出全部文件（包括隐藏的文件/文件夹）</p><p>以 <code>.</code> 开头命名的文件表名是 Linux 系统的隐藏文件/文件夹，只要以<code>.</code>开头就能自动隐藏</p></li><li><p><code>-l</code> 以列表（竖向排列）的形式展示文件，并且展示详细信息</p></li><li><p><code>-h</code> 以易于阅读的形式，列出文件大小单位，如 K、M、G，该选项必须搭配 <code>-l</code> 一起使用</p></li></ul><p>命令选项是可以混合使用的，如 <code>ls -alh /</code></p><h3 id="_3-cd-和-pwd-命令" tabindex="-1"><a class="header-anchor" href="#_3-cd-和-pwd-命令" aria-hidden="true">#</a> 3. cd 和 pwd 命令</h3><p><strong>cd 切换工作目录</strong></p><p>语法： <code>cd [Linux路径]</code></p><ul><li>cd 命令无需选项，只有参数，表示切换到哪个目录下</li><li>如果没有参数，则表面回到工作目录下</li></ul><p><strong>pwd 无选项，无参数，表名当前所在的工作目录</strong></p><h3 id="_4-相对路径和绝对路径" tabindex="-1"><a class="header-anchor" href="#_4-相对路径和绝对路径" aria-hidden="true">#</a> 4. 相对路径和绝对路径</h3><ul><li><code>cd /home/root/test</code> 绝对路径写法</li><li><code>cd test</code> 相对路径写法</li></ul><p>绝对路径，以根目录为起点，描述路径的一种写法，路径描述以 / 开头 相对路径，以当前目录为起点</p><div class="hint-container tip"><p class="hint-container-title">特殊路径符号：</p><ul><li><code>.</code> 表示当前目录，如 <code>cd ./test</code></li><li><code>..</code> 表示上一级目录，如 <code>cd ../..</code> 切换到上两级目录</li><li><code>~</code> 表示 HOME 目录， 如 <code>cd ~</code></li></ul></div><h3 id="_5-mkdir-命令创建新目录-文件夹" tabindex="-1"><a class="header-anchor" href="#_5-mkdir-命令创建新目录-文件夹" aria-hidden="true">#</a> 5. mkdir 命令创建新目录（文件夹）</h3><p>语法： <code>mkdir [-p] Linux路径</code></p><ul><li>参数必填，表示 Linux 路径，即需要创建的文件夹的路径，相对路径或绝对路径</li><li>选项选填，表示自动创建不存在的父目录，用于一次性创建多个层级的目录</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token builtin class-name">test</span>
<span class="token function">mkdir</span> ./test
<span class="token function">mkdir</span> ~/test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p><code>ctrl + l</code> 用于清屏</p></div><p>注意：创建文件夹需要修改权限，确保操作均在 HOME 目录内，不要在 HOME 之外操作</p><h3 id="_6-touch-cat-more-命令" tabindex="-1"><a class="header-anchor" href="#_6-touch-cat-more-命令" aria-hidden="true">#</a> 6. <code>touch cat more</code> 命令</h3><p><strong>touch 创建文件</strong></p><p>语法： <code>touch Linux路径</code></p><ul><li>touch 命令无选项，参数必填，表明文件名路径</li></ul><p><code>touch test.txt</code></p><p><strong>cat 命令查看文件内容</strong></p><p>语法： <code>cat Linux路径</code></p><ul><li>touch 命令无选项，参数必填，表明文件名路径</li></ul><p><code>cat test.txt</code></p><p><strong>more 命令查看文件内容</strong></p><p>语法和 cat 相同</p><p>与 cat 不同的是，cat 是直接将内容全部显示出来，more 支持翻页，可以一页一页的展示</p><p>空格进行翻页，按 q 退出</p><h3 id="_7-cp-mv-rm-命令" tabindex="-1"><a class="header-anchor" href="#_7-cp-mv-rm-命令" aria-hidden="true">#</a> 7. <code>cp mv rm</code> 命令</h3><p><strong>cp 命令复制文件文件夹</strong> 语法： <code>cp [-r] 参数1 参数2</code></p><ul><li><code>-r</code> 选项，是否递归的复制</li><li>参数 1，参数 2 均为 Linux 路径，参数 1 表示被复制的文件文件夹路径，参数 2 表示复制到的地方</li></ul><p><strong>mv 移动文件文件夹</strong></p><p>语法： <code>mv 参数1 参数2</code></p><ul><li>参数 1，参数 2 均为 Linux 路径，参数 1 表示被移动的文件文件夹路径，参数 2 表示移动到的地方</li><li>如果目标不存在，则会自动进行改名，确保目标存在 <code>mv test2.txt test3.txt</code> 相当于重命名了</li></ul><p><strong>rm 删除文件文件夹</strong></p><p>语法： <code>cp [-r -f] 参数1 参数2 ...参数</code></p><ul><li><p><code>-r</code> 选项，是否递归的删除</p></li><li><p><code>-f</code> 表示 force, 强制删除（不会弹出提示确认信息）</p><ul><li>普通用户删除内容不会弹出提示，只有 root 管理员删除时会有提示，根据提示输入 y 或者 n 来继续下一步</li><li>所以一般用户用不到 -f 选项</li></ul></li><li><p>参数 1，参数 2，参数 N 均为 Linux 路径，表示要删除的文件和文件夹路径，用空格隔开</p></li></ul><div class="hint-container tip"><p class="hint-container-title">提示</p><p>rm 命令参数支持通配符 *，用于模糊匹配</p><ul><li>符号*表示通配符，即匹配任意内容(包含空)，示例： <code>test*</code>匹配test开头的<code>_test_</code> 匹配包含 test 的</li></ul></div><h3 id="_8-which-find-命令" tabindex="-1"><a class="header-anchor" href="#_8-which-find-命令" aria-hidden="true">#</a> 8. <code>which find</code> 命令</h3><p><strong>which 查看所使用的一系列命令的程序文件存方法在哪里</strong></p><p>语法： <code>which 要查找的命令</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">which</span> <span class="token builtin class-name">cd</span>
<span class="token function">which</span> <span class="token builtin class-name">pwd</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>find 搜索指定文件</strong></p><p>语法：</p><p><code>find 起始路径 -name &quot;被查找的文件名&quot;</code></p><p><code>find 起始路径 -size +|-n[KMG]</code></p><p>文件名同样支持 * 通配符进行模糊匹配</p><ul><li>选项 name ，根据文件名来查找</li><li>选项 size ，根据文件大小来查找，其中参数 <code>+-</code> 表示大于小于，n 表示大小数字，<code>KMG</code>为单位（KB,MB,GB）</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">find</span> / <span class="token parameter variable">-name</span> <span class="token string">&quot;test*&quot;</span>

<span class="token function">find</span> / <span class="token parameter variable">-size</span> <span class="token parameter variable">-10k</span>

<span class="token function">find</span> / <span class="token parameter variable">-size</span> +1G
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-grep-wc-管道符" tabindex="-1"><a class="header-anchor" href="#_9-grep-wc-管道符" aria-hidden="true">#</a> 9. <code>grep wc</code> 管道符</h3><p><strong>grep 命令，从文件中通过关键词过滤文件行</strong></p><p>语法： <code>grep [-n] 关键字 文件路径</code></p><ul><li>参数<code>-n</code>可选，表示在结果中显示匹配的行的行号</li><li>参数关键字，必填，表示过滤的关键字，带有空格或者其他特殊符号，建议用<code>&quot;&quot;</code>包裹起来</li><li>参数文件路径，必填，表示过滤内容的文件路径，可以作为内如输入端口</li></ul><p><strong>wc 命令，统计文件的行数、单词数量等</strong></p><p>语法： <code>wc [-c -m -l -w] 文件路径</code></p><ul><li>选项, <code>-c</code>, 统计 bytes 数量</li><li>选项, <code>-m</code>, 统计字符数量</li><li>选项, <code>-l</code>, 统计行数</li><li>选项, <code>-w</code>, 统计单词数量</li><li>参数文件路径，被统计的文件，可作为内容的输入端口</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wc</span> test.txt
<span class="token comment"># 2(行数) 11(单词的数量) 59(字节数) test.txt</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container info"><p class="hint-container-title">管道符 |</p><p>shift + 回车上的按键打出管道符 <code>|</code></p><p>管道符的含义是：将管道符左边命令的结果作为右边命令的输入（需要该参数支持作为内容的输入端口）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> test.txt <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&quot;test&quot;</span>
<span class="token function">cat</span> test.txt <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span>
<span class="token function">ls</span> <span class="token parameter variable">-l</span> /usr/bin <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得注意的是，管道符是可以嵌套使用的 <code>command a | command b | command c</code></p></div><h3 id="_10-echo-tail-重定向" tabindex="-1"><a class="header-anchor" href="#_10-echo-tail-重定向" aria-hidden="true">#</a> 10. <code>echo tail</code> 重定向</h3><p><strong>echo 命令可以用于在命令行输出指定内容</strong></p><p>语法: <code>echo 指定内容</code></p><ul><li>对于特殊的内容，可以使用双引号包裹起来</li><li>指定内容可以被反引号 \`\` 包裹起来, 从而输出内容命令的执行结果</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&quot;hello world&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">\`</span><span class="token builtin class-name">pwd</span><span class="token variable">\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container info"><p class="hint-container-title">重定向符</p><ul><li><code>&gt;</code> 将左侧命令的结果，覆盖写入到符号右侧指定的文件中</li><li><code>&gt;&gt;</code> 将左侧命令的结果，追加写入到符号右侧</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&quot;hello&quot;</span> <span class="token operator">&gt;</span> text.txt
<span class="token builtin class-name">echo</span> <span class="token string">&quot;linux&quot;</span> <span class="token operator">&gt;&gt;</span> text.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div><p><strong>tail 命令可以查看文件尾部内容，跟踪文件的最新更改，语法如下</strong></p><p><code>tail [-f -num] Linux 路径</code></p><ul><li>参数，Linux 路径，表示被跟踪的文件路径</li><li>选项, <code>-f</code> 表示持续追踪，能够获取到文件的最新更改</li><li>选项, <code>-num</code> 表示查看尾部多少行，不填默认为 10</li></ul><div class="hint-container tip"><p class="hint-container-title">提示</p><p>contrl + c 可以快速停止当前的命令</p></div><h3 id="_11-vi-编辑器" tabindex="-1"><a class="header-anchor" href="#_11-vi-编辑器" aria-hidden="true">#</a> 11. vi 编辑器</h3><p>vi\\vim 编辑器的三种工作模式</p><ul><li><p>命令模式，键盘输入的内容视为命令。vim 进入后的默认模式，可通过 esc 来返回到命令模式</p><ul><li>输入模式相关 <ul><li><code>i</code>: 在当前光标位置进入输入模式</li><li><code>I</code>: 在当前行的开头进入输入模式</li><li><code>a</code>: 在当前光标位置之后进入输入模式</li><li><code>A</code>: 在当前行的结尾进入输入模式</li><li><code>o</code>: 在当前光标的下一行进入输入模式</li><li><code>O</code>: 在当前光标的上一行进入输入模式</li></ul></li><li>光标移动 <ul><li>键盘上下左右移动光标</li><li><code>0</code>: 移动光标到行的开头</li><li><code>$</code>: 移动光标到行的结尾</li><li><code>pageup</code>: 向上翻页</li><li><code>pagedown</code>: 向下翻页</li></ul></li><li>搜索 <ul><li><code>/</code>: 进入搜索模式，输入内容进行高亮</li><li><code>n</code>: 向下继续搜索</li><li><code>N</code>: 向上继续搜索</li></ul></li><li>编辑 <ul><li><code>dd</code>: 删除光标所在行内容</li><li><code>ndd</code>: 删除光标向下 n 行的内容</li><li><code>yy</code>: 复制光标所在行内容</li><li><code>nyy</code>: 复制光标向下 n 行的内容</li><li><code>p</code>: 粘贴复制的内容</li><li><code>u</code>: 撤销修改</li><li><code>ctrl + r</code>: 反向撤销修改</li><li><code>gg</code>: 跳到首行</li><li><code>G</code>: 跳到行尾</li><li><code>dG</code>: 从当前行开始，向下全部删除</li><li><code>dgg</code>: 从当前行开始，向上全部删除</li><li><code>d$</code>: 从当前光标开始，删除到本行的结尾</li><li><code>d0</code>: 从当前光标开始，删除到本行的开头</li></ul></li></ul></li><li><p>输入模式，编辑文件内容</p></li><li><p>底线命令模式，整体文件的控制，保存退出等，通过<code>:</code>进入到底线命令模式</p><ul><li><code>wq</code> 保存并退出</li><li><code>q</code> 仅退出</li><li><code>q!</code> 强制退出</li><li><code>w</code> 仅保存</li><li><code>set nu</code> 显示行号</li><li><code>set paste</code> 设置粘贴模式</li></ul></li></ul><p>语法： <code>vim hello.txt</code> <code>vi hello.txt</code></p><h2 id="四、linux-权限" tabindex="-1"><a class="header-anchor" href="#四、linux-权限" aria-hidden="true">#</a> 四、Linux 权限</h2><h3 id="_1-root-用户-超级管理员" tabindex="-1"><a class="header-anchor" href="#_1-root-用户-超级管理员" aria-hidden="true">#</a> 1. root 用户（超级管理员）</h3><p>root 用户拥有最大的系统操作权限</p><p><strong>su 和 exit 命令</strong></p><p>su 命令(Switch User)，用于切换账户</p><p>语法: <code>su [-] 用户名</code></p><ul><li><code>-</code> 可选，表示是否在切换用户后加载环境变量，建议带上</li><li>参数：用户名，表示要切换的用户，用户名也可以省略，省略代表切换到 root</li><li>切换用户后可以通过 exit 命令退回到上一个用户，也可以用快捷键 ctrl + d</li></ul><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>使用普通用户切换到其他用户需要输入密码</p><p>使用 root 用户切换到其他用户则无需输入密码</p><p>不建议长期使用 root 用户，避免带来系统损坏</p></div><p>使用 sudo 命令为普通命令授权，临时以 root 身份执行</p><p>语法: <code>sudo 命令</code></p><p>但不是所有的用户都有权限使用 sudo 命令，需要为普通用户配置 sudo 认证</p><div class="hint-container tip"><p class="hint-container-title">配置 sudo 认证</p><ol><li>切换到 root 用户，执行 <code>visudo</code> 命令，会自动通过 vi 编辑器打开 <code>:/etc/sudoers</code></li><li>在文件的最后添加</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 命令模式下 G 来到最后一行 ， o 进入插入模式在下面增加一行</span>
用户名 <span class="token assign-left variable">ALL</span><span class="token operator">=</span><span class="token punctuation">(</span>ALL<span class="token punctuation">)</span> NOPASSWD:ALL
<span class="token comment"># esc 回到命令模式，:wq 保存</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><h3 id="_2-用户和用户组" tabindex="-1"><a class="header-anchor" href="#_2-用户和用户组" aria-hidden="true">#</a> 2. 用户和用户组</h3><p>Linux 系统中可以配置多个用户，配置多个用户组，用户可以加入多个用户组中</p><p>Linux 中关于权限的管控级别有两个，分别是</p><ul><li>针对用户的权限控制</li><li>针对用户组的权限控制</li></ul><p><strong>用户组的管理</strong></p><ul><li><p><code>groupadd 用户组名</code>：创建用户组</p></li><li><p><code>groupdel 用户组名</code>: 删除用户组</p></li></ul><p><strong>用户的管理</strong></p><ul><li><p><code>useradd [-g -d] 用户名</code>：创建用户，<code>-g</code> 表示指定用户的组，不指定会创建同名的组并自动加入。<code>-d</code>指定用户 HOME 路径，不指定则默认在 <code>/home/用户名</code> 下</p></li><li><p><code>userdel [-r] 用户名</code>: 删除用户，<code>-r</code> 表示删除用户的 HOME 目录，不指定则不删除</p></li><li><p><code>id [用户名]</code>：查看指定用户的信息，不指定则是查看自己</p></li><li><p><code>usermod -aG 用户组 用户名</code>: 将指定的用户加入指定的用户组</p></li></ul><div class="hint-container tip"><p class="hint-container-title">查看当前系统中有哪些用户</p><p>语法： <code>getent passwd</code></p><p>将会以列表的形式展开显示用户信息</p><p>包括 用户名:密码(x):用户 ID:组 ID:描述信息(无用):HOME 目录:执行终端(默认 bash)</p><p>语法： <code>getent group</code> 查看当前系统中有哪些用户组</p></div><h3 id="_3-权限控制" tabindex="-1"><a class="header-anchor" href="#_3-权限控制" aria-hidden="true">#</a> 3. 权限控制</h3><p>通过 <code>ls -l</code> 可以以列表形式查看内容，并展示权限细节</p><p>首位 <code>d</code> 表示是文件夹， <code>-</code> 表示是文件，<code>l</code> 表示软链接</p><p>权限每隔三位为一类，分别表示所属用户权限，所属用户组的权限，其他用户的权限</p><p>每一类里权限为 <code>rwx</code>: 表示读、写、执行权限</p><p>针对文件、文件夹的不同，rwx 的含义有细微差别</p><ul><li>r 针对文件可以查看内容，针对文件夹可以查看文件夹内容，如 ls 命令</li><li>w 针对文件表示可以修改此文件，针对文件夹表示可以在文件夹内创建、删除、改名等操作</li><li>x 针对文件表示可以将文件作为程序执行，针对文件夹表示可以更改工作目录到此文件夹，即 cd 进入</li></ul><h3 id="_4-chmod-命令" tabindex="-1"><a class="header-anchor" href="#_4-chmod-命令" aria-hidden="true">#</a> 4. chmod 命令</h3><p>使用 chmod 命令修改文件、文件夹的权限信息，注意只有文件、文件夹的所属用户或 root 用户可以修改</p><p>语法: <code>chmod [-R] 权限 文件或文件夹</code> ，选项 r 递归的操作</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 将权限修改为 rwxr-x--x</span>
<span class="token function">chmod</span> <span class="token assign-left variable">u</span><span class="token operator">=</span>rwx,g<span class="token operator">=</span>rx,o<span class="token operator">=</span>x hello.txt

<span class="token comment"># 将权限修改为 rwxr-x--x</span>
<span class="token function">chmod</span> <span class="token number">751</span> hello.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container info"><p class="hint-container-title">权限的数字序号</p><p>权限可以用 3 位数字来表示，第一位数字表示用户权限，第二位表示用户组权限，第三位表示其他用户权限</p><p>0：没有任何权限 ---</p><p>1：仅有 x 权限 --x</p><p>2：仅有 w 权限 -w-</p><p>3：有 wx 权限 -wx</p><p>4：仅有 r 权限 r--</p><p>5：有 rx 权限 r-x</p><p>6：有 rw 权限 rw-</p><p>7：有 rwx 权限 rwx</p></div><h3 id="_5-chown-命令" tabindex="-1"><a class="header-anchor" href="#_5-chown-命令" aria-hidden="true">#</a> 5. chown 命令</h3><p>使用 chown 命令可以修改文件、文件夹的所属用户和用户组</p><p>普通用户无法修改所属为其他用户或组，所以此命令只适用于 root 用户执行</p><p>语法: <code>chown [-R] [用户][:][用户组] 文件或文件夹</code> ，选项 r 递归的操作</p><p>示例</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">chown</span> root hello.txt
<span class="token function">chown</span> :root hello.txt
<span class="token function">chown</span> root:flyboat hello.txt
<span class="token function">chown</span> <span class="token parameter variable">-R</span> root <span class="token builtin class-name">test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、linux-服务" tabindex="-1"><a class="header-anchor" href="#五、linux-服务" aria-hidden="true">#</a> 五、Linux 服务</h2><h3 id="_1-快捷键" tabindex="-1"><a class="header-anchor" href="#_1-快捷键" aria-hidden="true">#</a> 1. 快捷键</h3><p><code>ctrl + c</code> 中断当前命令</p><p><code>ctrl + d</code> 退出当前用户，也可以用于退出某些特定的程序页面如 python</p><p><code>history</code> 查看历史指令</p><p><code>!命令前缀</code> 自动执行最近一次匹配前缀的历史指令</p><p><code>ctrl + r</code> 输入内容去匹配历史命令</p><p>光标移动快捷键</p><p><code>ctrl + a</code> 跳到命令开头 <code>ctrl + e</code> 跳到命令结尾 <code>ctrl + 键盘左键/右键</code> 向左或者右跳一个单词</p><p>清屏</p><p><code>clear</code> 清空终端</p><p><code>ctrl + l</code> 清空终端</p><h3 id="_2-软件安装" tabindex="-1"><a class="header-anchor" href="#_2-软件安装" aria-hidden="true">#</a> 2. 软件安装</h3><p>yum: RPM 包软件管理器，用于自动化安装配置 Linux 软件，并且可以自动解决依赖问题</p><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>不同的发行版对应系统的包管理器是不一样的，CentOS 使用 yum 管理器，而 Ubuntu 使用 apt 管理器</p><p>apt 的语法和 yum 一致</p><p>语法: <code>qpt [-y] [install | remove | search] 软件名称</code></p></div><p>语法: <code>yum [-y] [install | remove | search] 软件名称</code></p><ul><li>选项: -y 自动确认，无需手动确认安装或者卸载过程</li><li><code>install</code>: 安装</li><li><code>remove</code>: 卸载</li><li><code>search</code>: 搜索</li></ul><p><strong>yum 命令需要 root 权限，并且联网</strong></p><p>示例：</p><p>通过 yum 命令安装 wget 程序, wget 是一种通过 http 或者 ftp 协议的下载工具</p><p><code>sudo yum -y install wget</code></p><h3 id="_3-systemctl-命令" tabindex="-1"><a class="header-anchor" href="#_3-systemctl-命令" aria-hidden="true">#</a> 3. Systemctl 命令</h3><p>Linux 系统的很多软件(内置或第三方)均支持使用 systemctl 命令控制：启动、停止、开机自启</p><p>能够被 Systemctl 命令管理的软件，一般也称之为服务</p><p>语法: <code>systenctl start | stop | status | enable | disable 服务名</code></p><p>系统内置的服务有：</p><ul><li>NetworkManager 主网络服务</li><li>network 副网络服务</li><li>firewalld 防火墙服务</li><li>sshd,ssh 服务</li></ul><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>除了内置的服务以外，部分第三方软件安装后也可以通过 systemctl 进行控制</p><ul><li><p><code>yum install -y ntp</code> 安装 ntp 软件</p></li><li><p><code>yum install -y httpd</code> 安装 apache 服务器软件</p></li></ul><p>部分软件安装后没有自动集成到 systemctl 中，可以自行手动添加</p></div><h3 id="_4-软链接" tabindex="-1"><a class="header-anchor" href="#_4-软链接" aria-hidden="true">#</a> 4. 软链接</h3><p>类似于 Windows 系统中的快捷方式，在系统中创建软链接，可以将文件、文件夹链接到其他位置</p><p>语法: <code>ln -s 参数1 参数2</code></p><ul><li><code>-s</code>：必选选项，创建软链接</li><li>参数 1：被链接的文件或者文件夹</li><li>参数 2：要链接去的目的地</li></ul><p>示例</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 在home目录下创建自己的快捷方式</span>
<span class="token function">ln</span> <span class="token parameter variable">-s</span> /etc/yum.conf ~/yum.conf
<span class="token function">ln</span> <span class="token parameter variable">-s</span> /etc/yum ~/yum
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-日期和时区" tabindex="-1"><a class="header-anchor" href="#_5-日期和时区" aria-hidden="true">#</a> 5. 日期和时区</h3><p><strong>date 命令，在命令行中查看系统的时间</strong></p><p>语法： <code>date [-d] [+格式化字符串]</code></p><ul><li><code>-d</code> 按照给定的字符串显示日期，一般用于日期计算 <ul><li><code>date -d &quot;+1 day&quot;</code> 显示后一天的日期</li><li><code>date -d &quot;-1 ddy&quot;</code> 显示前一天的日期</li><li>支持的时间标记有 year、month、day、hour、minute、second</li></ul></li><li>格式化字符串：通过特定的字符串标记，来控制显示的日期格式 <ul><li>%Y 年</li><li>%y 年份后两位数字</li><li>%m 月份</li><li>%d 日</li><li>%H 小时</li><li>%M 分钟</li><li>%S 秒</li><li>%s 自 1970-01-01 00:00:00 UTC 到现在的秒数</li></ul></li></ul><div class="hint-container tip"><p class="hint-container-title">date 命令示例</p><p>直接使用 date 命令本体可以查看时间</p><p><code>date +%Y-%m-%d</code> 按照 2024-04-06 显示日期</p><p><code>date &quot;+%Y-%m-%d %H:%M:%S&quot;</code> 2024-04-06 12:32:12</p></div><p><strong>Linux 时区修改</strong></p><p>系统默认的时区非中国的东八区，使用 root 权限进行更改时区</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 重新创建本地时区的软链接</span>
<span class="token function">rm</span> <span class="token parameter variable">-f</span> /etc/localtime
<span class="token function">sudo</span> <span class="token function">ln</span> <span class="token parameter variable">-s</span> /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">ntp 程序</p><p>通过 ntp 程序自动校验系统时间</p><p>安装 ntp : <code>yum -y install ntp</code> 启动并设置开机自启</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl start ntpd
systemctl <span class="token builtin class-name">enable</span> ntpd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>启动后 ntpd 会定期帮助我们联网校验系统的时间</p><p>也可以手动校准（需要 root 权限）：<code>ntpdate -u ntp.aliyun.com</code></p><p>通过阿里云提供的服务网址配合 ntpdate（安装 ntp 后附带的命令）命令自动校准</p></div><h3 id="_6-网络下载" tabindex="-1"><a class="header-anchor" href="#_6-网络下载" aria-hidden="true">#</a> 6. 网络下载</h3><p>通过 <code>ifconfig</code> 查看本地的 ip 地址</p><p>如果无法执行该命令，可以安装 <code>yum -y install net-tools</code></p><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>一般主网卡会被叫做 ens33 , 在 inet 字段中可以看见 ip 地址</p><p>还有本地回环的网卡 io , 127.0.0.1 代表本机</p><p>0.0.0.0 可以用于指代主机，或者表示所有 ip 的意思，允许任意的 ip 访问</p><p>可以通过 hostname 来查看主机名, 通过命令 <code>hostnamectl set-hostname 新名称</code> 来修改主机名</p></div><p><strong>wget 命令</strong></p><p>进行网络文件的下载</p><p>语法：<code>wget [-b] url</code></p><ul><li>选项：<code>-b</code> 可选，后台下载，会将日志写入到当前的工作目录的 wget-log 文件</li><li>参数: url，下载链接</li></ul><p>通过 tail 命令可以监控后台下载进度: <code>tail -f wget-log</code></p><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>需要注意的是下载无论成功还是失败都会有一个文件</p></div><p><strong>curl 命令</strong></p><p>用于发起网络请求</p><p>语法：<code>curl [-o] url</code></p><ul><li>选项：<code>-o</code> 用于下载文件，当 url 是下载链接时可以使用此选项保存文件</li><li>参数：url，要发起请求的网络地址</li></ul><p>示例：</p>`,188),m={href:"http://cip.cc",target:"_blank",rel:"noopener noreferrer"},v=n("code",null,"curl cip.cc",-1),b=a(`<h3 id="_7-端口" tabindex="-1"><a class="header-anchor" href="#_7-端口" aria-hidden="true">#</a> 7. 端口</h3><p>Linux 可以支持 65535 个端口，大致分为三类</p><ul><li>公共端口: 1~1023，通常用于一些系统内置或知名程序的预留使用，如 SSH 服务的 22 端口，HTTPS 服务的 443 端口</li><li>注册端口: 1024~49151 通常可以随意使用，用于松散的绑定一些程序、服务</li><li>动态端口: 49152~65535，通常不会固定绑定程序，而是当程序对外进行网络链接时，用于临时使用</li></ul><p><strong>通过 nmap 命令查看端口的占用情况</strong></p><p>安装：<code>yum -y install nmap</code></p><p>语法: <code>nmap 被查看的IP地址</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看某个端口是否被占用</span>
nmap <span class="token number">127.0</span>.0.1 <span class="token operator">|</span> <span class="token function">grep</span> <span class="token number">8080</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-进程管理" tabindex="-1"><a class="header-anchor" href="#_8-进程管理" aria-hidden="true">#</a> 8. 进程管理</h3><p><strong>通过 ps 命令查看系统中的进程信息</strong></p><p>语法: <code>ps [-e -f]</code></p><p>选项： <code>-e</code> 显示出全部的进程 选项: <code>-f</code> 以完全格式化的形式展示信息</p><p>一般固定用法 <code>ps -ef</code></p><p><strong>关闭进程 kill 命令</strong></p><p>语法: <code>kill [-9] 进程ID</code></p><p>选项: <code>-9</code> 表示强制关闭进程</p><h3 id="_9-查看资源占用" tabindex="-1"><a class="header-anchor" href="#_9-查看资源占用" aria-hidden="true">#</a> 9. 查看资源占用</h3><p><strong>CPU 占用情况</strong></p><p>可以通过 top 命令查看 CPU 内存占用使用情况，类似于 Window 的任务管理器</p><p>默认每隔 5 秒刷新一次</p><p>语法: <code>top</code></p><ul><li><p>第一行: top 命令名称，xx:xx:xx 当前系统时间，up x min: 启动了 x 分钟，x users: x 用户登录，load: 1、5、15 分钟负载</p></li><li><p>第二行: Tasks：x 个进程，运行中、睡眠中、停止进程</p></li><li><p>第三行: CPU 使用率, us: 用户 CPU 使用率, sy: 系统 CPU 使用率, ni: 高优先级进程占用 CPU 时间百分比, id: 空闲 CPU 率, wa: IO 等待 CPU</p></li><li><p>第四五行: 物理内存和虚拟内存的总量、空闲和使用</p></li></ul><p>列的含义</p><ul><li>PID: 进程 id</li><li>USER: 进程的所属用户</li><li>PR: 进程优先级，越小越高</li><li>NI: 负值表示高优先级，正表示低优先级</li><li>VIRT: 进程使用的虚拟内存</li><li>RES: 进程使用的物理内存</li><li>SHR: 进程使用的共享内存</li><li>S: 进程状态(S 休眠，R 运行，Z 僵死状态，N 负数优先级，I 空闲状态)</li><li>%CPU: 进程占用 CPU 率</li><li>%MEM: 进程占用内存率</li><li>TIME+: 进程使用 CPU 时间总计，单位 10 毫秒</li><li>COMMAND: 进程的命令或名称或程序文件的路径</li></ul><div class="hint-container info"><p class="hint-container-title">top 命令选项</p><ul><li><code>-p 进程id</code> 只显示某个进行的信息</li><li><code>-d</code> 设置刷新时间，默认是 5s</li><li><code>-c</code> 显示产生进程的完整命令，默认是进程名</li><li><code>-n</code> 指定刷新次数，比如 top -n 3，刷新输出三次后退出</li><li><code>-b</code> 以非交互非全屏模式运行，批次的方式执行 top，一般配合 <code>-n</code> 指定输出几次统计信息，并重定向到指定文件。如 <code>top -b -n 3 &gt; /tmp/top.tmp</code></li><li><code>-i</code> 不显示任何闲置(idle)或无用(zombie)的进程</li><li><code>-u</code> 查找特定用户启动的进程</li></ul><p>在默认模式下(不输入<code>-b</code>)有很多按键可以互动，如 h，m</p></div><p><strong>磁盘信息监控</strong></p><p>使用 df 命令，可以查看磁盘的使用情况</p><p>语法: <code>df [-h]</code></p><p>选项: <code>-h</code> 更加人性化的单位显示</p><div class="hint-container tip"><p class="hint-container-title">使用 iostat 查看 CPU、磁盘的相关信息</p><p>首先安装 sysstat 包 <code>yum install -y sysstat</code></p><p>语法: <code>iostat [-x][num1][num2]</code></p><ul><li>选项: <code>-x</code> 显示更多信息</li><li>num1: 数字，刷新间隔</li><li>num2: 刷新几次</li></ul></div><h3 id="_10-环境变量" tabindex="-1"><a class="header-anchor" href="#_10-环境变量" aria-hidden="true">#</a> 10. 环境变量</h3><p>在 Linux 系统中执行 env 命令可以查看当前系统中记录的环境变量</p><p>环境变量是一种 keyValue 型结构</p><p>查看 PATH <code>env | grep PATH</code></p><p>PATH 记录了系统执行任何命令的搜索路径，当执行命令时会从 PATH 中的路径里搜索</p><p><strong><code>$</code>符号</strong></p><p>在 linux 系统，<code>$</code>符号被用于取变量的值</p><p>取得环境变量的值就可以通过语法: <code>$环境变量名</code></p><p>比如 <code>echo $PATH</code> 获取环境变量 PATH 的值</p><p>通过 <code>echo \${PATH}ABC</code> 和其他内容混合在一起的时候，可以通过{}来标注取的变量是谁（类似 ES6 的模板字变量用法）</p><p><strong>自行设置环境变量</strong></p><p>Linux 环境变量可以用户自行设置，其中分为</p><ul><li>临时设计，语法: export 变量名 = 变量值</li><li>永久生效 <ul><li>针对当前用户生效、配置在当前用户的: <code>~/.bashrc</code> 文件中</li><li>针对所有用户生效、配置在系统的: <code>/etc/profile</code> 文件中</li><li>并通过语法: source 配置文件，进行立刻生效，或重新登录 FinalShell 生效</li></ul></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> hcx <span class="token operator">=</span> <span class="token number">222</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$hcx</span>
<span class="token comment"># 222</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>自定义环境变量 PATH</strong></p><p>临时修改 PATH: <code>export PATH=$PATH:/Linxu文件路径</code>(在原有的 PATH 路径后面增加)</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> ~
<span class="token function">mkdir</span> myenv
<span class="token builtin class-name">cd</span> myenv
<span class="token function">vim</span> testEnv
<span class="token comment"># 编辑脚本内容，如 echo &quot;testEnv执行了&quot;</span>
<span class="token comment"># 设置权限，用户能够执行</span>
<span class="token function">chmod</span> <span class="token number">755</span> testEnv
<span class="token comment"># 添加到环境变量，也可以配置在当前用户 vim ~/.bashrc</span>
<span class="token function">vim</span> /etc/profile
<span class="token comment"># 在文件最下面添加自己创建的文件夹，以便搜索得到</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span>:/root/myenv
<span class="token comment"># 在其他目录输入测试</span>
<span class="token builtin class-name">cd</span> /
testEnv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_11-linux-中的上传和下载" tabindex="-1"><a class="header-anchor" href="#_11-linux-中的上传和下载" aria-hidden="true">#</a> 11. Linux 中的上传和下载</h3><p>通过第三方软件可以进行可视化的上传和下载</p><ul><li>WinSCP</li><li>FinalShell</li></ul><p>除了第三方软件外，也可以通过: <code>yum -y install lrzsz</code> 安装</p><ul><li><code>rz</code>命令，进行上传</li><li><code>sz 要下载的文件</code>命令，会自动下载到桌面的 fsdownload 文件夹中</li></ul><h3 id="_12-压缩和解压" tabindex="-1"><a class="header-anchor" href="#_12-压缩和解压" aria-hidden="true">#</a> 12. 压缩和解压</h3><p><strong>tar 命令</strong></p><div class="hint-container info"><p class="hint-container-title">Linux 压缩格式</p><p>Linux 和 Mac 系统常用有 2 种压缩格式，后缀名分别是:</p><ul><li><code>.tar</code> 称之为 tarball 归档文件，即简单的将文件组装到一个<code>.tar</code>文件内，并没有体积上的减少</li><li><code>.gz</code> 也常见为 <code>.tar .gz gzip</code>格式压缩文件，体积也会压缩</li></ul></div><p>语法: <code>tar [-c -v -x -f -z -C] 参数1 参数2 ... 参数N</code></p><ul><li><code>-c</code> 创建压缩文件，用于压缩模式</li><li><code>-v</code> 显示压缩、解压过程，用于查看进度</li><li><code>-x</code> 解压模式</li><li><code>-f</code> 要创建的文件、或要解压的文件，该选项必须处于所有选项中的最后一个</li><li><code>-z</code> gzip 模式，不适用<code>-z</code>则默认普通的 tarball 格式</li><li><code>-C</code> 选择解压的目的地，用于解压模式</li></ul><p>示例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 将三个文件打包到 test.tar中</span>
<span class="token function">tar</span> <span class="token parameter variable">-cvf</span> test.tar <span class="token number">1</span>.txt <span class="token number">2</span>.txt <span class="token number">3</span>.txt
<span class="token comment"># 进行 gzip 压缩, z 选项一般放在首位</span>
<span class="token function">tar</span> <span class="token parameter variable">-zcvf</span> test.tar.gz <span class="token number">1</span>.txt <span class="token number">2</span>.txt <span class="token number">3</span>.txt

<span class="token comment"># 将压缩包解压到当前目录</span>
<span class="token function">tar</span> <span class="token parameter variable">-xvf</span> test.tar
<span class="token comment"># 将压缩包解压到指定目录, -C 选项当度使用，和解压的参数分开</span>
<span class="token function">tar</span> <span class="token parameter variable">-xvf</span> test.tar <span class="token parameter variable">-C</span> /home/flyboat
<span class="token comment"># 以gzip模式解压</span>
<span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> test.tar.gz <span class="token parameter variable">-C</span> /home/flyboat
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>zip 压缩格式</strong></p><p>通过 zip 命令，压缩文件为 zip 压缩包</p><p>语法: <code>zip [-r] 参数1 参数2 ... 参数N</code></p><ul><li><code>-r</code> 递归的压缩</li></ul><p>示例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">zip</span> test.zip a.txt b.txt c.txt
<span class="token comment"># 将文件夹 testDir 和文件 a.txt 一起压缩</span>
<span class="token function">zip</span> test.zip testDir a.txt

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过 unzip 命令，解压 zip 压缩包</p><p>语法: <code>unzip [-d] 参数</code></p><ul><li><code>-d</code>,指定哟啊解压的位置，同 tar 的<code>-C</code>选项</li><li>参数，被解压的 zip 文件</li></ul><p>示例</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">unzip</span> test.zip
<span class="token function">unzip</span> test.zip <span class="token parameter variable">-d</span> /home/flyboat
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,69);function g(x,k){const i=l("ExternalLinkIcon");return c(),o("div",null,[h,n("p",null,[e("向 "),n("a",m,[e("cip.cc"),d(i)]),e(" 发起网络请求: "),v]),b])}const w=s(u,[["render",g],["__file","linux.html.vue"]]);export{w as default};
