---
# 这是文章的标题
title: 正则表达式
# You can customize cover image
cover: /assets/images/CrushingZone/regular_expression.jpg
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 1
# 设置作者
author: HCX
# 设置写作时间
date: 2023-03-15
# 一个页面可以有多个分类
category:
  - 正则
# 一个页面可以有多个标签
tag:
  - 小白向
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
# 你可以自定义页脚
footer: 夏天刚刚开始呢
---

正则表达式，小白向~

<!-- more -->

# 正则表达式，新手向

在面试的时候被问到正则表达式，发现经常会看见的正则表达式，自己却不曾深入了解，一些很基础的正则都写不来，于是想学习入门一下，搜寻了一些教程但感觉都不是特别小白,因此自己进行了整合，主要资料来源于 MDN
::: tip
正则表达式重点在于匹配，为了匹配到对应元素而不停的设置限制
:::
如何使用正则表达式？

最常见的情景就是表单验证，对表单里的字符进行选择性替换。第一个参数为正则表达式，第二个参数为替换成的字符
`string.replace(reg,value)`

**注意正则表达式的字变量并不是由引号`'`包裹，而是由`/`进行包裹**

在斜杠后面加上一些匹配结束的限制，默认为成功匹配到第一个就结束，可以加上 `g` 表示全文匹配 `/regExp/g`。类似的修饰符还有 i 忽略大小写 和 m 匹配多行

## 一、断言匹配

断言匹配常用于确认字符串的匹配范围和边界

## 1.1 边界类型的断言

### 1. ^ 匹配字符串的头前的空隙位置，用于插入字符在字符串头部

### 2. $ 匹配字符串的尾后的空隙位置，用于插入字符在字符串尾部

对于 ^ 和 $ 而言不仅可以单独使用，还可以加以限制条件，匹配以指定字符结尾的或者开头的元素(注意此时不再是进行插入，而是匹配成功后直接对元素进行替换操作)

```js
let str = 'a 123 bP';
console.log(str.replace(/^/, '*')); // *a 123 bP
console.log(str.replace(/$/, '*')); // a 123 bP*
console.log(str.replace(/^a 12/, '*')); // *3 bP
console.log(str.replace(/$x/, '*')); // a 123 bP
```

:::tip
^ 也有取反的意思哦，注意区分。比如 `^/d ^/w` 等，文章最后有举例
:::

#### 3. \b 匹配一个词的边界

**在使用之前需要明白一个问题，词的边界是什么？**

What is the boundary of a word?
以上英文总共出现了七个词，分别是 `What` `is` `the` `boundary` `of` `a` `word`

为什么最后一个词是 `word` 而不是 `word?`
简单理解因为字符`?`不在规定的属于词的那 63 个字符内（所有英文的大小写和数字以及下划线），所以对应的词是`word`，相对于的它的边界是`w前的间隙`和`d后的间隙`

注意是间隙而不是空格

通过上面的例子可以知道，\b 就是去划分词，然后匹配各个词的左右边界位置，**从而获得该词的位置**，从而限制匹配的边界为单词。

```js
let str2 = 'What is the boundary of a word?';
console.log(str2.replace(/\b/g, '**'));
// **What** **is** **the** **boundary** **of** **a** **word**?
```

```js
// 修改后缀jpg的为png
let str = 'aaa.jpg';
console.log(str.replace(/\bjpg/, 'png'));
```

补充：
js 正则表达式引擎规定的 \b 匹配逻辑如下：

> The production Assertion :: \ b evaluates by returning an internal AssertionTester closure that takes a State argument x and performs the following:
> Let e be x's endIndex.
> Call IsWordChar(e–1) and let a be the Boolean result.
> Call IsWordChar(e) and let b be the Boolean result.
> If a is true and b is false, return false.
> If a is false and b is true, return false.
> Return true

63 个字符和运算逻辑

#### 4. \B 则和 \b 相反，是对非词的边界进行匹配

对于所有\b 不会匹配的位置，都会被\B 匹配到，有点取反的意思

还是那个例子 What is the boundary of a word?

```js
let str2 = 'What is the boundary of a word?';
console.log(str2.replace(/\B/g, '*'));
// W*h*a*t i*s t*h*e b*o*u*n*d*a*r*y o*f a w*o*r*d?*
```

## 1.2 其他类型的断言

这类断言表达式中利用问号`?`来实现各种前后关联字符的断言。如要查找某个字符串 x，且 x 的后面的字符必须是满足给定条件的，又或者 x 的前面的字符必须满足条件

1.  x(?=y) 只会匹配 x，且满足 x 的后面紧跟着 y（有空格都不行）
2.  x(?!y) 只会匹配 x，且满足 x 的后面没有紧跟着 y

3.  (?<=y)x 只会匹配 x，且满足 x 的前面紧跟着 y （注意写法和前两者的差距，限制 x 的前面时始终有`<`）

4.  (?<!y)x 只会匹配 x，且满足 x 的前面没有紧跟着 y

## 二、 字符组合

这里将介绍除了断言匹配外，对于字符串里的内容经常会用到的简单匹配方式，包括了直接查找字符和查找字符的限制写法，包括值、范围、出现次数等

## 2.1 简单常用的字符查找

### 1. a|b 字符直接匹配

直接在正则表达式里面输入字符进行匹配，支持逻辑或，表示可选项

```js
// 将 ax 替换为了 *
let str = 'aaaxjpg';
console.log(str.replace(/ax/, '*'));
// aa*jpg
```

如果我想匹配空格呢? 当然可以，并且加上修饰符 g 后可以用于简单的消除多余空格

```js
let str = ' a a a x   h g';
console.log(str.replace(/ /g, ''));
// aaaxhg
```

但是不能去除多余的换行符以及各种特殊的具有间隔功能的符号，不过没关系，有一个专门用来做这方面的特殊字符

#### 2. \s 匹配一个空白字符，包括空格、制表符、换页符和换行符

清除字符串中的空格元素

`str.replace(/\s/g, '')`

#### 3. [a-z] 按顺序匹配字母、数字,也可以用来匹配括号内的内容

- [abc] 匹配字符 a,b,c
- [-] 匹配`-`
- [a-z] 匹配字母 a 到字母 z 的字符
- [a-c1-9] 括号里可以包含多个连字符,匹配 a-c 和 1-9

```js
let str = 'abcAG150';
console.log(str.replace(/[a-cA-C0]/g, '*'));
// ****G15*
```

需要注意的是在 [] 中所写的限制都是针对单个字符的，也就是说 `/[ab]/` 和 `/ab/`的意思完全不一样，`/[ab]/` 和 `/a|b/` 的意思相同

但是如果我们想匹配所有数字或者字母，难道每次都要写 [a-zA-Z0-9]吗?当然不用，内部提供了对应的特殊字符表示

#### 4. \d 匹配任何数字 (阿拉伯数字)。相当于 [0-9]

对应的大写 \D 表示匹配任何非阿拉伯数字，相当于 [^0-9]。忘记说了符号 ^ 代表着取反

#### 5. \w 匹配 26 个字母，10 个数字和下划线（经常使用的大凶器，相当于[a-zA-Z0-9_]）

对应的大写 \W 则匹配\w 能匹配之外的字符，比如一些特殊字符 !@#$%...乱七八糟的

#### 6. `.` 当个的 `.`表示与字符 '.'进行匹配，当`.`与其他字符结合时则表示匹配任意字符，除\n, \r, \u2028 or \u2029 外。比\w 匹配的范围更广,如果需要在与其他字符连接时保持原有意思则加上转义符\

```js
// 匹配 任意四个字符 加上 字符> 结尾的元素
let str = '<div>123</div>';
console.log(str.replace(/....>/g, '*')); // *123<*
```

通常 `.` 后面并不会指定字符，而是搭配着量词使用（见最后）

## 2.2 复杂的限制查找

到了这里基本上一些简单的正则表达式也能看懂了，但如果需要完成复杂的匹配，如想要限制匹配的次数，则需要引入各类量词（注意没有减号哦）

需要知道的前提：量词使用的时候紧跟在前面的正则字符串 x 后面，作用于前面的 x 匹配几次

### 1. `{}` 灵活的设置匹配次数

- x{n} 匹配符合前一项 x 的要求，且满足 n 次（n 为正整数）

  ```js
  let str = '111111222333';
  console.log(str.replace(/1{6}2{2}/, '*')); // *2333

  // 当然你也不用量词可以这样写，只是远不如量词简洁
  console.log(str.replcae(/11111122/, '*')); // *2333
  ```

- x{n,} 匹配符合前一项 x 的要求，且至少满足 n 次（n 为正整数）

  ```js
  let str = '1111111111111111222333';
  console.log(str.replace(/1{4,}2{2}/, '*')); // *2333
  ```

- x{n,m} 匹配符合前一项 x 的要求，且最少满足 n 次，最多满足 m 次（n，m 均为正整数且 n<m）

  ```js
  let str = '111222333';
  console.log(str.replace(/1{1,4}2{2}/, '*')); // *2333
  ```

限制次数的正整数 n 和 m 都可以设置为 0，表示不用满足匹配条件，不过感觉并没有实际意义。因为这样写的时候可以省略掉

```js
let str = '111222333';
console.log(str.replace(/1{0}2{2}/, '*')); // 111*2333
// 等价于
console.log(str.replace(/2{2}/, '*')); // 111*2333
```

### 2. `+` 将前一项匹配 1 次或者更多次，等价于`{1,}`

```js
let str = '111222333';
console.log(str.replace(/1+2{2}/, '*')); // *2333
```

### 3. `*` 将前一项匹配 0 次或者更多次

```js
let str = '222333';
console.log(str.replace(/1*2{2}/, '*')); // *2333
```

### 4. `?`将前一项匹配 0 次或者 1 次

```js
let str1 = 'angel';
let str2 = 'angle';
// 只有 l 字符是明确要匹配的，l前后可能有e则也匹配
console.log(str1.replace(/e?le?/, '')); //ang
console.log(str2.replace(/e?le?/, '')); //ang
```

### 补充：关于贪婪和非贪婪

像 \* 和 + 这样的量词被称作是贪婪的，没有设限最高匹配次数，只要能匹配则会一直匹配下去。我们可以在贪婪量词后面添加`?`使得其变为非贪婪，即匹配一次成功满足条件后就不再匹配，即使后面也有满足匹配条件的

```js
let str = '<foo> <bar> new </bar> </foo>';
console.log(str.replace(/<.*>/, '*')); // *
console.log(str.replace(/<.*?>/), '*'); // * <bar> new </bar> </foo>
```

```js
// 匹配console (注意如何不加问号，则会将整个字符串变为 *)
let str2 = `console.log() asf let x = 5 console.error(;asf)`;
console.log(str2.replace(/console\.\w{3,5}\(.*?\)/g, '*'));
// * asf let x = 5 *
```

## 三、正则常用函数

### 3.1 `RegExp.prototype.test(str)`

test() 方法执行一个检索，用来查看正则表达式与指定的字符串是否匹配。返回 true 或 false

注意全局匹配(有 g)和不是非全局匹配的 lastIndex 区别

```js
const str = 'table football';

const regex = new RegExp('foo*');
const globalRegex = new RegExp('foo*', 'g');

console.log(regex.test(str));
// Expected output: true

console.log(globalRegex.lastIndex);
// Expected output: 0

console.log(globalRegex.test(str));
// Expected output: true

console.log(globalRegex.lastIndex);
// Expected output: 9

console.log(globalRegex.test(str));
// Expected output: false
```

::: tip
在实际应用中，确定位数的情况下应该避免使用全局匹配(g)和粘性匹配(y)

因为一旦加上后，正则会记录上次匹配成功的索引 lastIndex（从 1 开始），下次匹配时会从 lastIndex 后开始匹配

而用户输入是一个动态过程，一直在变化值，如果从 lastIndex 开始匹配会导致匹配结果和实际想要的效果不一致
:::

### 3.2 `RegExp.prototype.exec(str)`

exec() 方法在一个指定字符串中执行一个搜索匹配。返回一个结果数组或 null

如果匹配失败，exec() 方法返回 null，并将正则表达式的 lastIndex 重置为 0

匹配成功，数组的第一个元素是整个匹配结果，接下来的元素是与括号捕获组中的模式匹配的子字符串。

```js
const reg = new RegExp(/tat/g);
let str = 'Neither tar nor tab. tat is tat';
console.log(reg.exec(str));
console.log(reg.exec(str));
console.log(reg.exec(str));
/**
[
  'tat',
  index: 21,
  input: 'Neither tar nor tab. tat is tat',
  groups: undefined
]
[
  'tat',
  index: 28,
  input: 'Neither tar nor tab. tat is tat',
  groups: undefined
]
null
 */
```

```js
const regex = /(\w+)\s(\w+)/;
const str = 'Hello World';
const result = regex.exec(str);
console.log(result);
/**
[
  'Hello World',
  'Hello',
  'World',
  index: 0,
  input: 'Hello World',
  groups: undefined
]
 */
```

### 3.1 `String.prototype.match(RegExp)`

match() 方法检索字符串与正则表达式进行匹配的结果，没有匹配的则返回 null

> 只接受一个参数 `match(regexp)`

> 返回值一个 Array，其内容取决于是否存在全局（g）标志，如果没有匹配，则返回 **null**。
>
> - 如果使用 g 标志，则将返回与完整正则表达式匹配的所有结果，但不会返回捕获组。
>
> - 如果没有使用 g 标志，则只返回第一个完整匹配及其相关捕获组。在这种情况下，match() 方法将返回与 RegExp.prototype.exec() 相同的结果（一个带有一些额外属性的数组）。

```js
const paragraph = 'The quick brown fox jumps over the lazy dog. It barked.';
const regex = /[A-Z]/g;
const found = paragraph.match(regex);
// ["T", "I"]  正则表达式有 g 的情况下
// ["T"]  正则表达式没有 g 的情况下
```

### 3.3 `String.prototype.replace()`

用得比较多的方法了，相较于其他几个方法，具有更多的参数选择。

> replace(pattern, replacement)
>
> - pattern 可以是字符串或者一个带有 Symbol.replace 方法的对象，典型的例子就是正则表达式。任何没有 Symbol.replace 方法的值都会被强制转换为字符串。
> - replacement 可以是字符串或函数。如果是字符串，它将替换由 pattern 匹配的子字符串。函数下面重点介绍

::: warning
值得注意的是，如果 pattern 是一个空字符串，则替换项将被插入到字符串的开头

```js
'xxx'.replace('', '_');
// "_xxx"
```

字符串模式只会被替换一次。要执行全局搜索和替换，请使用带有 g 标志的正则表达式或使用 replaceAll()
:::

在第二个参数里面还可以传入特殊的字符，这里就不过多赘述，感兴趣可以查阅 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace)

```js
// 例如 $ + 数字 表示匹配的子项，数字序号从1开始
const re = /(\w+)\s(\w+)/;
const str = 'Maria Cruz';
const newstr = str.replace(re, '$2, $1');
console.log(newstr); // Cruz, Maria
```

**replacement 为函数的情况**

当替换值为函数时，函数会接收一些参数，提供有关匹配的信息，以便动态生成替换字符串。函数的参数如下：

- match：匹配到的字符串。
- p1, p2, ..., pn：如果模式中有括号捕获组，这些参数会接收括号捕获组匹配的字符串。
- offset：匹配到的字符串在原始字符串中的偏移量。
- string：原始字符串。

```js
function replacer(match, p1, p2, p3, offset, string) {
  // p1 是非数字，p2 是数字，且 p3 非字母数字
  return [p1, p2, p3].join(' - ');
}
// ^ 在这里是取反的意思，不是以什么开头的意思哦
const newString = 'abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, replacer);
console.log(newString); // abc - 12345 - #$*%
```
