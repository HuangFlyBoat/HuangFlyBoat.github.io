import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as e,c as o,a as n,b as s,d as c,e as i}from"./app-0d30a107.js";const l={},u=n("h1",{id:"node-js",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#node-js","aria-hidden":"true"},"#"),s(" Node.js")],-1),r=n("p",null,[n("strong",null,"前言介绍："),s(" 维基百科介绍")],-1),d=n("blockquote",null,[n("p",null,"Node.js 是能够在服务器端运行 JavaScript 的开放源代码、跨平台执行环境。Node.js 由 OpenJS Foundation （原为 Node.js Foundation，已与 JS Foundation 合并）持有和维护，亦为 Linux 基金会的项目。Node.js 采用 Google 开发的 V8 执行代码，使用事件驱动、非阻塞和异步输入输出模型等技术来提高性能，可优化应用程序的传输量和规模。这些技术通常用于资料密集的即时应用程序。")],-1),k=n("blockquote",null,[n("p",null,"Node.js 大部分基本模块都用 JavaScript 语言编写。在 Node.js 出现之前，JavaScript 通常作为客户端程序设计语言使用，以 JavaScript 写出的程序常在用户的浏览器上执行。Node.js 的出现使 JavaScript 也能用于服务端编程。Node.js 含有一系列内置模块，使得程序可以脱离 Apache HTTP Server 或 IIS，作为独立服务器执行。")],-1),v=n("p",null,"Node.js 是一个 服务器 上的 JavaScript 运行环境。",-1),m={href:"https://nodejs.org/en",target:"_blank",rel:"noopener noreferrer"},b=i(`<h2 id="一、前置知识" tabindex="-1"><a class="header-anchor" href="#一、前置知识" aria-hidden="true">#</a> 一、前置知识</h2><h3 id="_1-1-node-js-的初步认识" tabindex="-1"><a class="header-anchor" href="#_1-1-node-js-的初步认识" aria-hidden="true">#</a> 1.1 Node.js 的初步认识</h3><p>Node.js 有哪些用途？</p><ol><li>开发服务商应用</li><li>开发工具类应用（Webpack、Vite、Babel）</li><li>开发桌面端应用（node.js 编写的 electron 框架开发桌面版应用）</li></ol><p>Node.js 的安装</p><p>Node.js 在官网中有两个版本，一个是推荐给大多数用户的稳定版本（LTS），另外一个是最新版（Current）</p><p>根据自己的操作系统和版本需求自行选择下载安装即可</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>不过一般公司内部会使用很多版本的 Node，这里推荐一些 Node 版本管理工具，方便快速切换版本</p><ul><li>nvm (推荐)</li><li>n</li></ul><p>node 版本管理工具还有一个是 TJ 大神的 n 命令，n 命令是作为一个 node 的模块而存在，而 nvm 是一个独立于 node/npm 的外部 shell 脚本，因此 n 命令相比 nvm 更加局限。</p><p>由于 npm 安装的模块路径均为 /usr/local/lib/node_modules，当使用 n 切换不同的 node 版本时，实际上会共用全局的 node/npm 目录。 因此不能很好的满足『按不同 node 版本使用不同全局 node 模块』的需求。</p></div><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>注意在 node.js 中是无法调用 BOM 和 DOM 的相关接口的，这一点也很好理解，毕竟运行在服务器上而不是在浏览器上，自然无法调用浏览器提供的相关接口了</p><ul><li>但是可以使用 console 和定时器的 API</li><li>Node.js 中的顶级对象为 global，可以使用 global 和 globalThis 访问顶级对象</li></ul></div><h3 id="_1-2-buffer-缓冲器" tabindex="-1"><a class="header-anchor" href="#_1-2-buffer-缓冲器" aria-hidden="true">#</a> 1.2 Buffer 缓冲器</h3><blockquote><p>Buffer 是一个类似数组的对象，用于表示固定长度的字节序列。本质上是一段内存空间，专门用于处理二进制数据</p></blockquote><p>特点：</p><ol><li>Buffer 大小固定且无法调整</li><li>Buffer 性能较好，可以直接对计算机内存进行操作</li><li>每个元素的大小为 1 字节(Byte)</li></ol><p>如何创建一个 Buffer</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 1. alloc</span>

<span class="token comment">// 创建一个10字节的Buffer，Buffer为Node.js的内置模块</span>
<span class="token comment">// 用该方式创建的Buffer，每一个二进制位都为0</span>
<span class="token keyword">let</span> buf <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">alloc</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 2. allocUnsafe</span>

<span class="token comment">// 不安全的创建方式，该方式可能会使用到旧的内存空间，但是速度比第一种快</span>
<span class="token keyword">let</span> buf_2 <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">allocUnsafe</span><span class="token punctuation">(</span><span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buf_2<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 3. from</span>

<span class="token comment">// 根据 Unicode 码进行二进制编码存入</span>
<span class="token comment">// 但是输出为了方便查看展示的是16进制的</span>
<span class="token keyword">let</span> buf_3 <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&#39;hello&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buf_3<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Buffer 与字符串的转换</strong></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> buf_4 <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">105</span><span class="token punctuation">,</span> <span class="token number">108</span><span class="token punctuation">,</span> <span class="token number">111</span><span class="token punctuation">,</span> <span class="token number">118</span><span class="token punctuation">,</span> <span class="token number">101</span><span class="token punctuation">,</span> <span class="token number">121</span><span class="token punctuation">,</span> <span class="token number">111</span><span class="token punctuation">,</span> <span class="token number">117</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 根据 utf-8 的方式进行编码转换</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buf_4<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// iloveyou (恋爱脑必备)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Buffer 元素的读写</strong></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> buf <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&#39;hello&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buf<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出 h 对应的 ASCII 十进制编码</span>

<span class="token keyword">let</span> buf2 <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&#39;我&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buf<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出 我 对应的utf-8编码的字节流中的第一个字节 e6 的十进制 230</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &lt;Buffer e6 88 91&gt;</span>

<span class="token keyword">let</span> buf_3 <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">230</span><span class="token punctuation">,</span> <span class="token number">136</span><span class="token punctuation">,</span> <span class="token number">145</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buf_3<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出 我</span>

<span class="token comment">// buffer里的内容可以直接修改</span>
buf<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">95</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、基础使用" tabindex="-1"><a class="header-anchor" href="#二、基础使用" aria-hidden="true">#</a> 二、基础使用</h2><h3 id="_2-1-fs-模块" tabindex="-1"><a class="header-anchor" href="#_2-1-fs-模块" aria-hidden="true">#</a> 2.1 fs 模块</h3><p>关于文件的写入和读取，具体场景包括：</p><ul><li>下载文件</li><li>安装软件</li><li>保存日志，如 git</li><li>编辑器保存文件</li><li>爬虫</li><li>...</li></ul><h4 id="_2-1-1-写入文件" tabindex="-1"><a class="header-anchor" href="#_2-1-1-写入文件" aria-hidden="true">#</a> 2.1.1 写入文件</h4><p>如何新建一个文件并往里面写入内容</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 1. 导入 fs 模块</span>
<span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 2. 写入文件</span>

fs<span class="token punctuation">.</span><span class="token function">writeFile</span><span class="token punctuation">(</span><span class="token string">&#39;./text.txt&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;demo&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// err 写入失败时抛出的错误对象</span>
  <span class="token comment">// 如果没有失败则为 null</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    consolo<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在写入文件的函数中，可以在文件内容后一个参数传入一个对象，作为配置项 <code>fs.writeFile(&#39;fileName&#39;, &#39;content&#39;, configObj, cbFn)</code></p><h4 id="_2-1-2-文件写入方式" tabindex="-1"><a class="header-anchor" href="#_2-1-2-文件写入方式" aria-hidden="true">#</a> 2.1.2 文件写入方式</h4><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>fs 模块有两种，异步和同步两种方式实现</p><ul><li><p><code>fs.writeFile(&#39;fileName&#39;,&#39;content&#39;,cb)</code> 异步方法</p></li><li><p><code>fs.writeFileSync(&#39;fileName&#39;,&#39;content&#39;)</code> 同步方法</p></li></ul></div><p><strong>追加写入</strong>，用于需要持续的往文件里面增加内容</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

fs<span class="token punctuation">.</span><span class="token function">appendFile</span><span class="token punctuation">(</span><span class="token string">&#39;fileName&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;补充&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 同样的也有同步方法</span>
fs<span class="token punctuation">.</span><span class="token function">appendFileSync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>fs.appendFile 和 fs.writeFile 是 Node.js 的文件系统模块（fs）中用于写入文件的两个方法。这两个方法之间存在以下区别和共同点：</p><ol><li><p>写入方式：fs.appendFile 将数据追加到文件的末尾，而 fs.writeFile 则会完全覆盖文件中的内容并写入新的数据。</p></li><li><p>文件存在时的行为：fs.appendFile 在文件已经存在时，会将数据追加到文件末尾。而 fs.writeFile 则会直接覆盖已存在的文件，删除原有内容并写入新的数据。</p></li><li><p>文件不存在时的行为：当文件不存在时，fs.appendFile 会创建一个新的文件，并将数据写入其中。fs.writeFile 也会创建一个新的文件，并写入数据。</p></li></ol><p><strong>流式写入</strong>，更适用于写入频率高的场景，也适合大文件写入</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 创建流对象</span>
<span class="token keyword">const</span> ws <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">createWriteStream</span><span class="token punctuation">(</span><span class="token string">&#39;./文件名.txt&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 往流里面写入,\\r\\n 手动换行</span>
ws<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&#39;11111\\r\\n&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
ws<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&#39;21111\\r\\n&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
ws<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&#39;31111\\r\\n&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
ws<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&#39;41111\\r\\n&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 关闭通道（可选，当脚本执行完毕后通道自然会断开）</span>
ws<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-1-3-文件读取" tabindex="-1"><a class="header-anchor" href="#_2-1-3-文件读取" aria-hidden="true">#</a> 2.1.3 文件读取</h4><p>语法 <code>fs.readFile(path,[options],callback)</code></p><p>参数说明：</p><ul><li>path 文件路径</li><li>optinos 选项配置</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 异步读取</span>
fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span><span class="token string">&#39;./text.txt&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;读取失败&#39;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 同步读取</span>
<span class="token keyword">let</span> data <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">readFileSync</span><span class="token punctuation">(</span><span class="token string">&#39;./text.txt&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-1-4-文件读取方式" tabindex="-1"><a class="header-anchor" href="#_2-1-4-文件读取方式" aria-hidden="true">#</a> 2.1.4 文件读取方式</h4><p><strong>流式读取</strong>，适用于读取大文件，内存占用空间小</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> rs <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">createReadStream</span><span class="token punctuation">(</span><span class="token string">&#39;./video.mp4&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 监听 data 事件，每读完一块chunk内容则执行一次</span>
rs<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;data&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">chunk</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>chunk<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

rs<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;end&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;读取完成&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-1-5-重命名和移动" tabindex="-1"><a class="header-anchor" href="#_2-1-5-重命名和移动" aria-hidden="true">#</a> 2.1.5 重命名和移动</h4><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 重命名</span>
fs<span class="token punctuation">.</span><span class="token function">rename</span><span class="token punctuation">(</span><span class="token string">&#39;./fileName&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;./reName&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 文件移动</span>
fs<span class="token punctuation">.</span><span class="token function">rename</span><span class="token punctuation">(</span><span class="token string">&#39;./fileName&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;../other/fileName&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-1-6-文件删除" tabindex="-1"><a class="header-anchor" href="#_2-1-6-文件删除" aria-hidden="true">#</a> 2.1.6 文件删除</h4><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

fs<span class="token punctuation">.</span><span class="token function">unlink</span><span class="token punctuation">(</span><span class="token string">&#39;./fileName&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">//...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 还可以使用 rm 方法， node 14.4 新增</span>
fs<span class="token punctuation">.</span><span class="token function">rm</span><span class="token punctuation">(</span><span class="token string">&#39;./fileName&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-1-7-文件夹操作" tabindex="-1"><a class="header-anchor" href="#_2-1-7-文件夹操作" aria-hidden="true">#</a> 2.1.7 文件夹操作</h4><p>创建、删除、移动文件夹</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 创建文件夹</span>
fs<span class="token punctuation">.</span><span class="token function">mkdir</span><span class="token punctuation">(</span><span class="token string">&#39;./dirName&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 递归创建文件夹</span>
fs<span class="token punctuation">.</span><span class="token function">mkdir</span><span class="token punctuation">(</span><span class="token string">&#39;./a/b/c&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">recursive</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 读取文件夹</span>

fs<span class="token punctuation">.</span><span class="token function">readdir</span><span class="token punctuation">(</span><span class="token string">&#39;../test&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// data 为一个数组，包括了文件名</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 删除文件夹</span>
fs<span class="token punctuation">.</span><span class="token function">rmdir</span><span class="token punctuation">(</span><span class="token string">&#39;../test&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 递归删除</span>

fs<span class="token punctuation">.</span><span class="token function">rmdir</span><span class="token punctuation">(</span><span class="token string">&#39;./a&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">recursive</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 也可以使用 fs.rm 来删除文件夹，语法与 rmdir 一致</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-1-8-查看资源" tabindex="-1"><a class="header-anchor" href="#_2-1-8-查看资源" aria-hidden="true">#</a> 2.1.8 查看资源</h4><h4 id="_2-1-9-path-模块" tabindex="-1"><a class="header-anchor" href="#_2-1-9-path-模块" aria-hidden="true">#</a> 2.1.9 Path 模块</h4><h3 id="_2-2-http-请求" tabindex="-1"><a class="header-anchor" href="#_2-2-http-请求" aria-hidden="true">#</a> 2.2 Http 请求</h3><h3 id="_2-3-模块化-daemon-守护进程" tabindex="-1"><a class="header-anchor" href="#_2-3-模块化-daemon-守护进程" aria-hidden="true">#</a> 2.3 模块化 daemon 守护进程</h3><h2 id="三、模块化与包管理" tabindex="-1"><a class="header-anchor" href="#三、模块化与包管理" aria-hidden="true">#</a> 三、模块化与包管理</h2><h2 id="四、node-后台相关框架" tabindex="-1"><a class="header-anchor" href="#四、node-后台相关框架" aria-hidden="true">#</a> 四、Node 后台相关框架</h2><h2 id="五、补充" tabindex="-1"><a class="header-anchor" href="#五、补充" aria-hidden="true">#</a> 五、补充</h2><h3 id="node-schedule-定时任务" tabindex="-1"><a class="header-anchor" href="#node-schedule-定时任务" aria-hidden="true">#</a> node-schedule 定时任务</h3><h3 id="pm2-管理进程" tabindex="-1"><a class="header-anchor" href="#pm2-管理进程" aria-hidden="true">#</a> pm2 管理进程</h3>`,59);function f(h,g){const a=p("ExternalLinkIcon");return e(),o("div",null,[u,r,d,k,v,n("p",null,[s("官网： "),n("a",m,[s("https://nodejs.org/en"),c(a)])]),b])}const x=t(l,[["render",f],["__file","node.html.vue"]]);export{x as default};