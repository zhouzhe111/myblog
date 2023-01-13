<template><h1 id="linux命令" tabindex="-1"><a class="header-anchor" href="#linux命令" aria-hidden="true">#</a> Linux命令</h1>
<h2 id="_1-简单系统命令" tabindex="-1"><a class="header-anchor" href="#_1-简单系统命令" aria-hidden="true">#</a> 1.简单系统命令</h2>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> 查看ip地址</span>
	ip a
	ip addr
<span class="token title important"><span class="token punctuation">#</span> ping网络(测试网络连通)</span>
	ip 目标机器的ip
<span class="token title important"><span class="token punctuation">#</span> 查看系统时间</span>
	date
<span class="token title important"><span class="token punctuation">#</span> 注销</span>
	logout
<span class="token title important"><span class="token punctuation">#</span> 关机</span>
	shutdown now
<span class="token title important"><span class="token punctuation">#</span> 重启</span>
	reboot
<span class="token title important"><span class="token punctuation">#</span> 清屏</span>
	clear
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h2 id="_2-linux文件系统" tabindex="-1"><a class="header-anchor" href="#_2-linux文件系统" aria-hidden="true">#</a> 2. Linux文件系统</h2>
<ul>
<li>核心</li>
</ul>
<blockquote>
<ol>
<li>Linux一切皆文件</li>
</ol>
<p>2.只有一个顶级目录，不像windows分C盘、D盘、E盘</p>
</blockquote>
<ul>
<li>目录结构</li>
</ul>
<p><img src="linux命令.assets/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56ys5LqM6IyD5byP,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center.png" alt="在这里插入图片描述"></p>
<ul>
<li>文件含义</li>
</ul>
<table>
<thead>
<tr>
<th>Linux</th>
<th>含义</th>
<th>windows</th>
</tr>
</thead>
<tbody>
<tr>
<td>/bin</td>
<td>所有用户可用的基本命令存放的位置</td>
<td>windows没有固定的命令存放目录</td>
</tr>
<tr>
<td>/sbin</td>
<td>需要管理员权限才能使用的命令</td>
<td></td>
</tr>
<tr>
<td>/boot</td>
<td>linux系统启动的时候需要加载和使用的文件</td>
<td></td>
</tr>
<tr>
<td>/dev</td>
<td>外设连接linux后，对应的文件存放的位置</td>
<td>类似Windows中的U盘，光盘的符号文件。</td>
</tr>
<tr>
<td>/etc</td>
<td>存放系统或者安装的程序的配置文件,注册服务等</td>
<td>类似windows中的注册表，</td>
</tr>
<tr>
<td>/home</td>
<td>家目录，linux中每新建一个用户，会自动在home中为该用户分配一个文件夹</td>
<td>类似windows中的&quot;我的文档&quot;，每个用户有自己的目录。</td>
</tr>
<tr>
<td>/root</td>
<td>root账户的家目录，仅供root账户使用</td>
<td>类似windows中的Administrator账户的&quot;我的文档&quot;</td>
</tr>
<tr>
<td>/lib</td>
<td>linux的命令和系统启动，需要使用一些公共的依赖，放在lib中，类似我们开发的代码执行需要引入的jdk的jar</td>
<td></td>
</tr>
<tr>
<td>/usr</td>
<td>很多系统软件的默认安装路径</td>
<td>类似windows中的C盘下的Program Files目录。</td>
</tr>
<tr>
<td>/var</td>
<td>系统和程序运行产生的日志文件和缓存文件放在这里</td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="_3-文件管理命令" tabindex="-1"><a class="header-anchor" href="#_3-文件管理命令" aria-hidden="true">#</a> 3. 文件管理命令</h2>
<blockquote>
<p>注意事项：命令区分大小写</p>
</blockquote>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> 1. 查看文件列表</span>
	ls <span class="token url">[<span class="token content">-参数1参数2</span>] [<span class="token variable">目标文件夹</span>]</span>
<span class="token title important"><span class="token punctuation">#</span> 查看当前目录下的文件列表</span>
	ls
<span class="token title important"><span class="token punctuation">#</span> 查看指定目录下的文件</span>
	ls /
<span class="token title important"><span class="token punctuation">#</span> 查看详细信息，元数据信息(用户、组、大小、创建时间、权限信息、文件类型)</span>
	ls -l
<span class="token title important"><span class="token punctuation">#</span> 查看隐藏文件</span>
	ls -a 
<span class="token title important"><span class="token punctuation">#</span> 参数并用</span>
	ls -la
<span class="token title important"><span class="token punctuation">#</span> 2. 切换目录</span>
	cd 目标文件夹
<span class="token title important"><span class="token punctuation">#</span> 绝对路径切换</span>
	cd 绝对路径
<span class="token title important"><span class="token punctuation">#</span> 绝对路径切换</span>
	cd 相对路径
<span class="token title important"><span class="token punctuation">#</span> 例子：切换到/etc/sysconfig/networks-scripts 目录下</span>

<span class="token title important"><span class="token punctuation">#</span> 3. 查看当前命令所在的目录</span>
[root@centos7 network-scripts]# pwd
/etc/sysconfig/network-scripts
<span class="token title important"><span class="token punctuation">#</span> 特殊目录符号</span>
	~ 当前用户的home目录
	. 当前目录
	.. 上一级目录
<span class="token title important"><span class="token punctuation">#</span> 4. 新建文件夹及文件</span>
<span class="token title important"><span class="token punctuation">#</span> 在当前位置新建文件夹</span>
	mkdir 文件夹名
<span class="token title important"><span class="token punctuation">#</span> 在指定目录位置，创建文件夹，并创建父文件夹</span>
	mkdir -p /a/b/文件夹名
<span class="token title important"><span class="token punctuation">#</span> 在当前目录下新建文件</span>
	touch 文件名
<span class="token title important"><span class="token punctuation">#</span> 5. 删除文件</span>
<span class="token title important"><span class="token punctuation">#</span> 删除文件</span>
	rm 文件
<span class="token title important"><span class="token punctuation">#</span> 删除文件夹</span>
	rm -r 文件夹
<span class="token title important"><span class="token punctuation">#</span> 强制删除不询问</span>
	rm -rf 文件
<span class="token title important"><span class="token punctuation">#</span> 6. 拷贝文件</span>
<span class="token title important"><span class="token punctuation">#</span> 拷贝文件</span>
	cp 原文件  新文件
<span class="token title important"><span class="token punctuation">#</span> 拷贝文件夹</span>
	cp -r 源文件夹 新文件夹

<span class="token title important"><span class="token punctuation">#</span> 7. 移动文件或修改文件名</span>
<span class="token title important"><span class="token punctuation">#</span> 移动源文件到目标文件夹中</span>
	mv 文件  文件夹
<span class="token title important"><span class="token punctuation">#</span> 修改文件A的名字为文件B</span>
	mv 文件A 文件B
<span class="token title important"><span class="token punctuation">#</span> 8. 获取文件的md5指纹(数字签名)</span>
md5sum 文件名
<span class="token title important"><span class="token punctuation">#</span> 简介</span>
<span class="token list punctuation">1.</span> 数字签名，又称数字指纹
<span class="token list punctuation">2.</span> 可以验证文件是否被修改
<span class="token list punctuation">3.</span> 一个文件通过计算得到的一串字符串,文件内容的唯一标记(文件内容不变,指纹不会变)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br></div></div><h2 id="_4-文本内容查看命令" tabindex="-1"><a class="header-anchor" href="#_4-文本内容查看命令" aria-hidden="true">#</a> 4. 文本内容查看命令</h2>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> cat命令</span>
<span class="token title important"><span class="token punctuation">#</span> 查看文件中的全部信息(适合查看小文档)</span>
	cat 文件名
<span class="token title important"><span class="token punctuation">#</span> less命令</span>
<span class="token title important"><span class="token punctuation">#</span> 以分页的方式浏览文件信息(适合查看大文档)，进入浏览模式</span>
	less 文件名
<span class="token title important"><span class="token punctuation">#</span> 浏览模式快捷键</span>
	↑ #上一行
    ↓ #下一行
    G #最后一页
    g #第一页
    空格 #下一页
    /关键词 #搜索关键词
<span class="token title important"><span class="token punctuation">#</span> 退出浏览模式，回到Linux命令行模式</span>
    q #退出
<span class="token title important"><span class="token punctuation">#</span> tail 命令</span>
<span class="token title important"><span class="token punctuation">#</span> 实时滚动显示文件的最后10行信息(默认10行)</span>
tail -f 文件名
<span class="token title important"><span class="token punctuation">#</span> 显示文件的最后20行信息</span>
tail -n 20 文件名
tail -n -20 文件名
<span class="token title important"><span class="token punctuation">#</span> 显示文件信息从第20行至文件末尾</span>
tail -n +20 文件名
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h2 id="_5-文件查找" tabindex="-1"><a class="header-anchor" href="#_5-文件查找" aria-hidden="true">#</a> 5. 文件查找</h2>
<ol>
<li>
<p>文件名查找</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> 语法</span>
	find 搜索路径 -name "文件名关键词"
<span class="token title important"><span class="token punctuation">#</span> 例子</span>
	find / -name "passwd"
	find / -name "ifcfg-*"
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></li>
<li>
<p>文件内容查找</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> 语法</span>
	grep -参数 要查找的目录范围
	<span class="token title important"><span class="token punctuation">#</span> 参数</span>
	-n 显示查找结果所在行号
	-R 递归查找目录下的所有文件
<span class="token title important"><span class="token punctuation">#</span> 例子</span>
	grep aries /etc
	grep aries /etc/passwd
	
123456789
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div></li>
</ol>
<h2 id="_6-文件链接" tabindex="-1"><a class="header-anchor" href="#_6-文件链接" aria-hidden="true">#</a> 6. 文件链接</h2>
<ol>
<li>Linux文件管理</li>
</ol>
<ul>
<li>模型图</li>
</ul>
<p><img src="linux命令.assets/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56ys5LqM6IyD5byP,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center-16605297164351.png" alt="在这里插入图片描述"></p>
<ul>
<li>
<p>说明</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> 文件名</span>
	该文件的名字
<span class="token title important"><span class="token punctuation">#</span> inode</span>
	该文件的元数据
<span class="token title important"><span class="token punctuation">#</span> datablock</span>
	该文件真正保存的数据
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><blockquote>
<p>注意：</p>
<p>1、inode中保存的是文件的元数据</p>
<p>2、ls命令查看的都是linux的元数据信息</p>
<p>3、数据块中才是文件的真正数据</p>
</blockquote>
</li>
</ul>
<ol>
<li>硬链接</li>
</ol>
<ul>
<li>图</li>
</ul>
<p><img src="linux命令.assets/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56ys5LqM6IyD5byP,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center-16605297164352.png" alt="在这里插入图片描述"></p>
<ul>
<li>
<p>命令</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">ln</span> 源文件 硬链接文件
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
</ul>
<ol>
<li>软连接</li>
</ol>
<ul>
<li>图</li>
</ul>
<p><img src="linux命令.assets/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56ys5LqM6IyD5byP,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center-16605297164353.png" alt="在这里插入图片描述"></p>
<ul>
<li>
<p>命令</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">ln</span> <span class="token parameter variable">-s</span> 目标文件或文件夹 软连接名字
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
</ul>
<h2 id="_7-系统管理" tabindex="-1"><a class="header-anchor" href="#_7-系统管理" aria-hidden="true">#</a> 7. 系统管理</h2>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> 静态查看系统进程</span>
	ps -aux
<span class="token title important"><span class="token punctuation">#</span> 实时查看系统进程</span>
	top
	<span class="token title important"><span class="token punctuation">#</span> 快捷键</span>
		↑ 下翻
		↓ 上翻
		q 退出
<span class="token title important"><span class="token punctuation">#</span> 关闭进程</span>
	kill 进程id 
<span class="token title important"><span class="token punctuation">#</span> 强制关闭进程(谨慎使用)</span>
	kill -9 进程id
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h2 id="_8-输出" tabindex="-1"><a class="header-anchor" href="#_8-输出" aria-hidden="true">#</a> 8. 输出</h2>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> 覆盖输出</span>
<span class="token title important"><span class="token punctuation">#</span> 将命令1的执行结果，输出到后面的文件中。</span>
<span class="token code-snippet code keyword">`覆盖写入`</span>
	命令1 > 文件
<span class="token title important"><span class="token punctuation">#</span> 例子</span>
	date > date.log
<span class="token title important"><span class="token punctuation">#</span> 追加输出</span>
<span class="token title important"><span class="token punctuation">#</span> 将命令1的执行结果，输出到后面的文件中。</span>
<span class="token code-snippet code keyword">`追加写入`</span>
	命令1 >> 文件
<span class="token title important"><span class="token punctuation">#</span> 例子</span>
	date >> date.log
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h2 id="_9-管道" tabindex="-1"><a class="header-anchor" href="#_9-管道" aria-hidden="true">#</a> 9. 管道</h2>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> 管道</span>
<span class="token title important"><span class="token punctuation">#</span> 语法，将命令1的输出结果，作为命令2的输入</span>
命令1 | 命令2
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><img src="linux命令.assets/5e022a6ccd9c4966a0b6be89acf9855a.png" alt="在这里插入图片描述"></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 例子</span>
查找aries用户：cat /etc/passwd <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-n</span> “baizhi”
查找aries组：cat /etc/group <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-n</span> “baizhi”
查找sshd进程：ps <span class="token parameter variable">-aux</span> <span class="token operator">|</span> <span class="token function">grep</span> sshd
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="_10-文件编辑" tabindex="-1"><a class="header-anchor" href="#_10-文件编辑" aria-hidden="true">#</a> 10. 文件编辑</h2>
<blockquote>
<p>配置MobaXterm的默认文本编辑器</p>
<p>免去vim命令的麻烦</p>
</blockquote>
<h1 id="系统权限" tabindex="-1"><a class="header-anchor" href="#系统权限" aria-hidden="true">#</a> 系统权限</h1>
<h2 id="用户组" tabindex="-1"><a class="header-anchor" href="#用户组" aria-hidden="true">#</a> 用户组</h2>
<ul>
<li>图</li>
</ul>
<p><img src="linux命令.assets/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56ys5LqM6IyD5byP,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center-16605297164364.png" alt="在这里插入图片描述"></p>
<ul>
<li>
<p>相关命令</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">1</span>. 创建组
  <span class="token variable"><span class="token variable">`</span><span class="token function">groupadd</span> 组名<span class="token variable">`</span></span>
<span class="token number">2</span>. 删除组
  <span class="token variable"><span class="token variable">`</span><span class="token function">groupdel</span> 组名<span class="token variable">`</span></span>
<span class="token number">3</span>. 查找系统中的组
  <span class="token variable"><span class="token variable">`</span><span class="token function">cat</span> /etc/group <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-n</span> “组名”<span class="token variable">`</span></span>
  说明：系统每个组信息都会被存放在/etc/group的文件中
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div></li>
</ul>
<h2 id="用户" tabindex="-1"><a class="header-anchor" href="#用户" aria-hidden="true">#</a> 用户</h2>
<ul>
<li>
<p>相关命令</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">1</span>. 创建用户
  <span class="token variable"><span class="token variable">`</span><span class="token function">useradd</span> <span class="token parameter variable">-g</span> 组名 用户名<span class="token variable">`</span></span>
<span class="token number">2</span>. 设置密码
  <span class="token variable"><span class="token variable">`</span><span class="token function">passwd</span> 用户名<span class="token variable">`</span></span>
<span class="token number">3</span>. 查找系统账户
  说明：系统每个用户信息保存在<span class="token variable"><span class="token variable">`</span>/etc/passwd<span class="token variable">`</span></span>文件中
<span class="token number">4</span>. 切换用户
  <span class="token variable"><span class="token variable">`</span><span class="token function">su</span> 用户名<span class="token variable">`</span></span>
<span class="token number">5</span>. 删除用户
  <span class="token variable"><span class="token variable">`</span><span class="token function">userdel</span> <span class="token parameter variable">-r</span> 用户名<span class="token variable">`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div></li>
</ul>
<h2 id="权限" tabindex="-1"><a class="header-anchor" href="#权限" aria-hidden="true">#</a> 权限</h2>
<ul>
<li>
<p>问题</p>
<p>linux系统未来可能有程序员、用户、数据库管理员、项目经理等各种角色各种级别人使用，甚至还有身份不明的人链接到linux，控制不好权限容易导致系统崩溃、数据丢失等问题。</p>
</li>
<li>
<p>权限含义</p>
<table>
<thead>
<tr>
<th>权限字母</th>
<th>含义</th>
<th>对文件</th>
<th>代表命令</th>
<th>对文件夹</th>
<th>代表命令</th>
</tr>
</thead>
<tbody>
<tr>
<td>R®</td>
<td>读</td>
<td>查看文件内容和复制文件</td>
<td>more cat less cp head tail</td>
<td>查看文件夹下的文件</td>
<td>ls</td>
</tr>
<tr>
<td>W(w)</td>
<td>写</td>
<td>编辑文件</td>
<td>vi</td>
<td>在文件夹内创建和删除文件</td>
<td>rm touch</td>
</tr>
<tr>
<td>X(x)</td>
<td>执行</td>
<td>执行该文件(执行必须具备r权限)</td>
<td>-</td>
<td>切换到文件夹</td>
<td>cd</td>
</tr>
</tbody>
</table>
</li>
<li>
<p>权限访问控制列表(ACL access controll list)</p>
</li>
</ul>
<p><img src="linux命令.assets/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56ys5LqM6IyD5byP,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center-16605297164365.png" alt="在这里插入图片描述"></p>
<ul>
<li>
<p>命令</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> 查看权限</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">ls</span> <span class="token parameter variable">-la</span> 文件
ll 文件
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> 设置文件所有者</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>语法：chown <span class="token punctuation">[</span>-R<span class="token punctuation">]</span> user名:group名 文件名
参数：-R 如果是文件夹，需要使用这个参数，可以将文件夹及其内部所有文件的所有者和组全部修改
注意：命令权限需要root
<span class="token comment">## 修改文件所有者</span>
	<span class="token function">chown</span> 用户名 文件名
<span class="token comment">## 修改文件所属组</span>
	<span class="token function">chown</span> :组名 文件名
<span class="token comment">## 修改文件所有者和所属组</span>
	<span class="token function">chown</span> 用户名:组名 文件名
<span class="token comment">## 修改文件夹的所有者和所属组</span>
	<span class="token function">chown</span> <span class="token punctuation">[</span>-R<span class="token punctuation">]</span> 用户名:组名 文件夹
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> 权限设置1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>语法：chmod u±rwx,g±rwx,o±rwx 文件名
运算符：
	- 删除权限
	+ 添加权限
	<span class="token operator">=</span> 赋值权限
<span class="token comment">## 给文件的所有者添加执行权限</span>
<span class="token function">chmod</span> u+x 文件名
<span class="token comment">## 给文件的其他人删除所有权限</span>
<span class="token function">chmod</span> o-rwx 文件名
<span class="token comment">## 给文件的所属组设置读写权限</span>
<span class="token function">chmod</span> <span class="token assign-left variable">g</span><span class="token operator">=</span>wx 文件名
<span class="token number">1234567891011</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> 权限设置2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
</ul>
<p><img src="linux命令.assets/9027a4ea659c40c8b03838a4ab5d5f39.png" alt="在这里插入图片描述"></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 文件的每个归属方的权限的值使用rwx之和计算出来的。</span>
<span class="token comment"># 语法</span>
	<span class="token variable"><span class="token variable">`</span><span class="token function">chmod</span> <span class="token punctuation">[</span>-R<span class="token punctuation">]</span> nnn 文件<span class="token variable">`</span></span> 
	<span class="token parameter variable">-R</span> 递归设置文件夹内所有文件
<span class="token comment"># 设置文件的权限为(所有者可读可写可执行，所属组可读可写，其他人可读)</span>
	<span class="token function">chmod</span> <span class="token number">764</span> 文件名
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="系统软件管理" tabindex="-1"><a class="header-anchor" href="#系统软件管理" aria-hidden="true">#</a> 系统软件管理</h2>
<p>压缩解压缩</p>
<blockquote>
<p>压缩语法：<code>tar -zcvf 压缩后文件名 被压缩文件</code></p>
<p>解压缩语法 <code>tar -zxvf 压缩文件名 -C 解压后文件所在目录</code></p>
<p>参数1：</p>
<table>
<thead>
<tr>
<th>参数</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>-z</td>
<td>操作tar.gz文件需要使用</td>
</tr>
<tr>
<td>-x</td>
<td>解压缩</td>
</tr>
<tr>
<td>-c</td>
<td>压缩</td>
</tr>
<tr>
<td>-v</td>
<td>显示压缩或者解压缩的执行过程信息</td>
</tr>
<tr>
<td>-f</td>
<td>要处理的文件file，必须放在最后</td>
</tr>
</tbody>
</table>
<p>参数2：-C 指定解压后的文件存放的位置</p>
</blockquote>
<h3 id="rpm软件" tabindex="-1"><a class="header-anchor" href="#rpm软件" aria-hidden="true">#</a> rpm软件</h3>
<blockquote>
<p>简介：类似于windows中的.exe程序</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">1</span>. 安装rpm软件
  语法：<span class="token variable"><span class="token variable">`</span><span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> xxx.rpm<span class="token variable">`</span></span>
<span class="token number">2</span>. 查看系统中是否已安装的过该rpm软件
  语法：<span class="token variable"><span class="token variable">`</span><span class="token function">rpm</span> <span class="token parameter variable">-qa</span> 软件名<span class="token variable">`</span></span>
<span class="token number">3</span>. 卸载rpm软件
  语法：<span class="token variable"><span class="token variable">`</span><span class="token function">rpm</span> <span class="token parameter variable">-e</span> 软件名<span class="token variable">`</span></span>
<span class="token number">4</span>. 例子：安装tree工具
  作用：查看某个目录下的文件信息
  <span class="token comment"># 以树状结构查看2层文件信息</span>
  tree <span class="token parameter variable">-L</span> <span class="token number">2</span> 要查看的路径
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="yum" tabindex="-1"><a class="header-anchor" href="#yum" aria-hidden="true">#</a> yum</h3>
<blockquote>
<p>yum基于rpm实现的，提供了除了rpm的安装软件、卸载软件等功能以外还有，自动查找、下载软件并自动处理软件的彼此之间的依赖关系，下载并安装依赖包。</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">## 列出所有可以安装的软件包</span>
	yum list
<span class="token comment">## 安装软件</span>
	yum <span class="token function">install</span> <span class="token parameter variable">-y</span> 软件名
<span class="token comment">## 卸载软件</span>
	yum remove 软件名
<span class="token comment">## 查找软件包</span>
	yum search all 软件名
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="linux服务" tabindex="-1"><a class="header-anchor" href="#linux服务" aria-hidden="true">#</a> Linux服务</h2>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> 例如：sshd network firewalld 等</span>
<span class="token title important"><span class="token punctuation">#</span> 服务器管理命令</span>
	systemctl status 服务名
<span class="token title important"><span class="token punctuation">#</span> 启动服务</span>
	systemctl start 服务名
<span class="token title important"><span class="token punctuation">#</span> 重启服务</span>
	systemctl restart 服务名
<span class="token title important"><span class="token punctuation">#</span> 停止服务</span>
	systemctl stop 服务名
<span class="token title important"><span class="token punctuation">#</span> 禁止服务随linux启动。</span>
	systemctl disable 服务名
<span class="token title important"><span class="token punctuation">#</span> 设置服务随linux启动。</span>
	systemctl enable 服务名
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="ip设置" tabindex="-1"><a class="header-anchor" href="#ip设置" aria-hidden="true">#</a> ip设置</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>服务名:network
[root@centos7 dirnew]# vim /etc/sysconfig/network-scripts/ifcfg-ens33
----------------网卡对应的文件内容---------------------
    TYPE="Ethernet"
    PROXY_METHOD="none"
    BROWSER_ONLY="no"
    BOOTPROTO="none"
    DEFROUTE="yes"
    IPV4_FAILURE_FATAL="no"
    IPV6INIT="yes"
    IPV6_AUTOCONF="yes"
    IPV6_DEFROUTE="yes"
    IPV6_FAILURE_FATAL="no"
    IPV6_ADDR_GEN_MODE="stable-privacy"
    NAME="ens33"
    UUID="0bd5d8a5-fe1b-42de-82bd-bfa7d2984b95"
    DEVICE="ens33"
    ONBOOT="yes"
    IPADDR="192.168.199.8" # 修改这里的ip地址即可
    PREFIX="24"
    GATEWAY="192.168.199.2"
    DNS1="192.168.199.2"
    DNS2="8.8.8.8"
    IPV6_PRIVACY="no"
[root@centos7 dirnew]# systemctl restart network #重启网卡服务
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><h3 id="防火墙" tabindex="-1"><a class="header-anchor" href="#防火墙" aria-hidden="true">#</a> 防火墙</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>服务名:firewalld
# 开启防火墙
systemctl stop 服务名
# 临时关闭防火墙
systemctl stop firewalld
# 禁止防火墙开机启动
systemctl disable firewalld
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="主机名" tabindex="-1"><a class="header-anchor" href="#主机名" aria-hidden="true">#</a> 主机名</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看主机名</span>
<span class="token function">hostname</span>
<span class="token comment"># 设置主机名</span>
hostnamectl set-hostname 主机名
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="ip映射" tabindex="-1"><a class="header-anchor" href="#ip映射" aria-hidden="true">#</a> ip映射</h3>
<ul>
<li>
<p>域名解析</p>
</li>
<li>
<p>本地hosts编辑</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span><span class="token comment"># vim /etc/hosts</span>
--------------下面是文件------------------
	<span class="token number">192.168</span>.199.8 centos7
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li>
</ul>
<h3 id="ssh" tabindex="-1"><a class="header-anchor" href="#ssh" aria-hidden="true">#</a> SSH</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 远程登录linux</span>
<span class="token function">ssh</span> 远程linux的ip或者映射域名
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="免密登录" tabindex="-1"><a class="header-anchor" href="#免密登录" aria-hidden="true">#</a> 免密登录</h3>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> 简介</span>
ssh登录远程linux，免去输入密码的麻烦
<span class="token title important"><span class="token punctuation">#</span> 生成公钥和私钥</span>
[root@centos7 <span class="token strike"><span class="token punctuation">~</span><span class="token content">]# ssh-keygen
------------执行结果-----------
    [root@centos7 </span><span class="token punctuation">~</span></span>]# tree .ssh
    .ssh
    ├── id_rsa # 私钥
    ├── id_rsa.pub # 公钥
    └── known_hosts
<span class="token title important"><span class="token punctuation">#</span> 发送公钥</span>
	<span class="token code-snippet code keyword">`保存公钥的文件为/root/.ssh/authorized_keys`</span>
[root@centos7 .ssh]# cat id_rsa.pub > authorized_keys
<span class="token title important"><span class="token punctuation">#</span> 发送公钥</span>
[root@centos7 .ssh]# ssh-copy-id 目标主机的ip
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h3 id="远程拷贝" tabindex="-1"><a class="header-anchor" href="#远程拷贝" aria-hidden="true">#</a> 远程拷贝</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">scp</span> 本地的文件 root@远程linuxip:/远程linux的文件路径
<span class="token function">scp</span> <span class="token parameter variable">-r</span> 本地的目录 root@远程linuxip:/远程linux的文件路径
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="必要软件安装" tabindex="-1"><a class="header-anchor" href="#必要软件安装" aria-hidden="true">#</a> 必要软件安装</h2>
<ol>
<li>
<p>vim(vi编辑器增强版)</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">vim</span> 文件
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>wget(下载器)</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">wget</span> url
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>tree(目录树状显示)</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 以tree结构，递归显示当前文件下所有文件</span>
	tree
<span class="token comment"># 显示目标文件夹下的文件</span>
	tree 目标目录
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></li>
<li>
<p>psmisc(高级进程管理工具)</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 以tree形式显示系统目前进程</span>
	pstree
<span class="token comment"># 杀死进程</span>
	<span class="token function">killall</span> 进程名
<span class="token comment"># 显示该文件被哪个进程使用</span>
	<span class="token function">fuser</span> /目标文件
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div></li>
</ol>
</template>
