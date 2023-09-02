---
# 这是文章的标题
title: Typescript 入门
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 1
# 设置作者
author: HCX
# 设置写作时间
date: 2023-09-02
# 一个页面可以有多个分类
category:
  - Typescript
# 一个页面可以有多个标签
tag:
  - Typescript
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
# 你可以自定义页脚
footer: fly fly fly ~
---

# TypeScript 入门

## 环境配置

1. 安装编译 TS 的工具包

   `npm i -g typescript`

   验证是否安装成功 `tsc -v`

2. 编译并运行 ts 代码
   在终端输入 tsc 文件名.ts 进行编译
   然后运行 node 文件名.js
3. 简化运行 ts
   使用 ts-node 包，直接在 Node.js 中运行 TS 代码
   `npm i -g ts-node`
   `ts-node hello.ts`

## 一、TypeScript 常用

### 原始类型

number/string/boolean/null/undefine/symbol

```ts
let age: number = 18;
let myName: string = 'hcx';
let isFlag: boolean = false;
```

### 数组类型

```ts
// 两种写法
let number: number[] = [1, 3, 5];
let sstrings: Array<string> = ['a', 'b', 'c'];
```

### 联合类型

```ts
let arr: (number | string)[] = [1, 'a', 3, 's'];
```

数组中既有 number 类型又有 string 类型

### 类型别名

用 **type** 为任意类型起别名

```ts
type CustomArray = (number | string)[];
let arr1: CustomArray = [1, 'a', 3, 'b'];
let arr2: CustomArray = ['x', 5];
```

### 函数类型

函数的参数和返回值的类型

1. 单独指定参数和返回值类型

```ts
function add(num1:number,num2:number):number{
  return num1+num2
}
const add = (num1:number,num2:number):void{
}
```

2. 同时指定参数、返回值类型
   注意这种形式只适用于函数表达式

```ts
const add: (num1: number, num2: number) => number = (num1, num2) => {
  return num1 + num2;
};
```

3. 函数可选参数

可选参数：在可传和不可传的参数名称后面添加?(问号)

```ts
function mySlice(start?: number, end?: number): void {
  console.log('起始索引：', start, '结束索引', end);
}
```

### 对象

JS 中的对象是由属性和方法构成的，而 TS 中对象的类型就是在描述对象的结构

```ts
let person: { name: string; age: number; sayHi(): void } = {
  name: 'Jack',
  age: 19,
  sayHi() {},
};
```

对象可选属性,和函数可选参数语法一致，都是在变量后加问号

```ts
function myAxios(config: { url: string; method?: string }) {
  console.log(config);
}
```

### 接口

当一个对象类型被多次使用时，一般会使用接口来描述对象的类型，达到复用的目的

声明接口后，直接使用接口名称作为变量的类型

```ts
interface IPerson {
  name: string;
  age: number;
  sayHi(): void;
}

let Person: IPerson = {
  name: 'jack',
  age: 19,
  sayHi() {},
};
```

> interface（接口）和类型别名（type）的区别
> 相同点：都可以为对象指定类型
> 不同点：接口只能为对象指定类型；类型别名不仅可以为对象类型，实际上也可以为任意类型指定别名

```ts
interface IPerson {
  name: string;
  age: number;
  sayHi(): void;
}

type IPerson {
  name: string;
  age: number;
  sayHi(): void;
}

type NumStr = number | string
```

##### 接口继承

如果两个接口之间有相同的属性或方法，可以将公共的属性或方法抽离出来，通过继承来实现复用

原本的写法：

```ts
interface Point2D {
  x: number;
  y: number;
}
interface Point3D {
  x: number;
  y: number;
  z: number;
}
```

更好的方式：

```ts
interface Point2D {
  x: number;
  y: number;
}
interface Point3D extends Point2D {
  z: number;
}
```

### 元组

元组类型是另一种类型的数组，它确切的知道包含多少个元素，以及特定索引对应的类型

```ts
let position: [number, number] = [25, 39];
let xxx: [number, String] = [15, 'xx'];
```

### 类型推论

在 TS 中，某些没有明确指出类型的地方，TS 的类型推断机制会帮助提供类型。

> 换句话说：由于类型推论的存在，这些地方，类型注解可以省略不写
> 发生类型推断的两种常见场景

    1. 声明变量并初始化时
    2. 决定函数返回值时

```ts
let age = 18;

function add(num1: number, num2: number): number;
```

**推荐能省略类型注解的地方就省略（充分利用 TS 类型推断能力，提高开发效率）**

### 类型断言

使用类型断言`as`指定更加具体的类型,解决获取类型不准确的情况

```ts
const aLink = document.getElementById('link') as HtMLAnchorElement;
```

### 字符量类型

```ts
let age: 18 = 20;
const str: 'Hello TS' = 'Hello';
```

在 TS 中某个特定的字符串/对象/数字等可以作为 TS 中的类型

- 使用场景:
  字变量类型配合联合类型一起使用，用来表示一组明确的可选值列表

```ts
function changeDirection(direction: 'up' | 'down' | 'left' | 'right') {}
```

参数 direction 只能是那四个中的任意一个，而不是任意的字符串

### 枚举类型

定义一组命名常量。它描述一个值，这个值可以是这些命名常量中的一个

类似于字变量类型+联合类型组合的功能，也可以表示一组明确的值

```ts
enum Dirrction {
  Up,
  Down,
  Left,
  Right,
}
function changeDirection(direction: Direction);
```

解释:

1. 使用 enum 关键词枚举
2. 约定枚举名称、枚举中的值以大写字母开头
3. 枚举中的多个值之间通过逗号分隔
4. 定义好枚举后，直接使用枚举名称作为类型注解
5. 访问枚举成员通过.点语法

**注意枚举成员是有值的，初始值为 0，自增长**
也可以手动声明,下面 Up 为 10，Down 为 11

```ts
enum Direction {
  Up = 10,
  Down,
}
```

字符串枚举，需要给每个值都初始化值为字符串，同时没有了数字枚举里的自增行为

```ts
enum Dirrction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}
```

> 枚举是 TS 的非 JavaScript 类型级扩展，枚举类型会被编译成 JS 代码！
> 由于枚举和字变量类型+联合类型组合的功能相似，都用来表示一组明确的可选值列表
> 一般情况下，推荐使用字变量+联合类型组合

### any 类型

原则：不推荐使用 any！这会失去 TS 类型保护的优势
大部分情况下不得已使用是临时

不声明类型的变量和函数也是 any

### typeof

可以在类型上下文中引用变量或者属性的类型（类型查询）
使用场景：根据已有变量的值，获取该值的类型，来简化类型书写

```ts
let p = { x: 1, y: 2 };
function formatPoint(point: typeof p) {}
```

## 二、TypeScript 高级类型

1. class 类
2. 类型兼容性
3. 交叉类型
4. 泛型和 keyof
5. 索引签名类型和索引查询类型
6. 映射类型

### class 类

TypeScript 全面支持 ES2015 中引入的 class 关键字，并为其添加了类型注解和其他语法（比如，可见性修饰符等）

```ts
class Person {}

const p = new Person();
```

TS 中的类型推论可以知道 Person 类的实例对象 p 的类型是 Person；calss 也作为一种类型存在

```ts
class Person {
  age: number;
  gender = '男';
  // gender : striing = '男'
}
```

##### class 构造函数

1. 成员初始化（比如，age:number）后，才可以通过 this.age 来访问实例成员
2. 需要为构造函数指定类型注解，否则会被隐式推断为 any

```ts
class Person {
  age: number;
  gender: string;

  constructor(age: number, gender: string) {
    this.age = age;
    this.gender = gender;
  }
}
```

##### 实例方法

```ts
class Point {
  x = 10;
  y = 10;

  scale(n: number): void {
    this.x *= n;
    this.y *= n;
  }
}
```

##### 类继承

1. extends（继承父类）
2. implements（实现接口）

注意：JS 中只有 extends（略），而 implements 是 TS 提供的

```ts
interface Singable {
  sing(): void;
}

class Person implements Singable {
  sing() {
    consolo.log('x');
  }
}
```

实现接口里的方法，而接口里的方法并不需要方法体。

##### 成员的可见性：

- public 公有的（可以被任何地方访问）
- protected 受保护的（仅对其声明所在类和子类中可见，实例对象中不可见）
- private 私有的（只在当前类中可见）

##### readonly 修饰符

表示只读，用来防止构造函数之外对属性赋值，只能用来修饰属性，不能用来修饰方法

```ts
class Person {
  readonly age: number = 18;
  constructor(age: number) {
    this.age = age;
  }
}
```

注意：属性 age 后面的类型注解（比如，此处的 number）如果不加，则 age 的类型为 18（字变量类型）

接口或者{}表示对象类型，也可以使用 readonly

### 类型兼容性

TS 采用的是结构化类型系统，也叫做 dubck typing（鸭子类型），类型检查关注的是值所具有的类型。如果两个对象具有相同的形状，则认为它们属于同一类型

```ts
class Point {
  x: number;
  y: number;
}
class Point2 {
  x: number;
  y: number;
}

const p: Point = new Point2();
```

##### 对象之间的兼容性

对于对象类型来说，y 的成员都属于 x 的成员，则 x 兼容 y

```ts
class Point {
  x: number;
  y: number;
}
class Point {
  x: number;
  y: number;
  z: number;
}
const p: Point = new Point3D();
```

##### 接口之间的兼容性，类似于 class

并且，class 与 interface 之间也可以兼容

##### 函数之间的兼容性

1. 参数个数
   参数多的兼容参数少的,与对象兼容相反

   ```ts
   type F1 = (a: number) => void;
   type F2 = (a: number, b: number) => void;
   let f1: F1;
   let f2: F2 = f1;
   ```

2. 参数类型
   相同位置的参数类型要相同（原始类型）或兼容（对象类型）

   ```ts
   type F1 = (a: number) => void;
   type F2 = (a: number) => void;
   let f1: F1;
   let f2: F2 = f1;
   ```

   ```ts
   interface Point2D {
     x: number;
     y: number;
   }
   interface Point3D {
     x: number;
     y: number;
     z: number;
   }
   type F2 = (p: Point2D) => void;
   type F3 = (p: Point3D) => void;
   let f2: F2;
   let f3: F3 = f2;
   ```

   将对象拆开，把每个属性都看做一个个参数，则参数多的可以兼容参数少的

3. 返回值类型
   只用关注返回值类型本身即可，如果是对象类型则看对象是否兼容，对象成员多的可以赋值给对象成员少的

### 交叉类型

交叉类型（&）：功能类似于接口继承，用于组合多个类型为一个类型（常用于对象类型）

```ts
interface Person {
  name: string;
}
interface Contact {
  phone: string;
}
type PersonDetaial = Person & Contact;
```

使用交叉类型后，新的类型将会同时具备 Person 和 Conract 的所有属性类型

交叉类和接口继承对比，对于同名属性的重复定义，继承会报错，而交叉类型会产生新方法，类似于多态

```ts
interface A {
  fn: (value: number) => string;
}
interface B extends A {
  fn: (value: string) => string;
}
// 会报错
```

```ts
interface A {
  fn: (value: number) => string;
}
interface B {
  fn: (value: string) => string;
}
type C = A & B;
// 等价于两个函数类型的交叉，可以选择任意函数来实现，方法重载
```

### 泛型

泛型是可以在保证类型安全前提下，让函数等与多种类型一起工作，从而实现复用，常用于：函数、接口、class 中

##### 创建泛型函数

```ts
function id<Type>(value: Type): Type {
  return value;
}

const num = id<nummber>(10);
const str = id<string>('a');
```

解释:

1.  语法：在函数名称的后添加<>(尖括号)，尖括号中添加类型变量，比如此处的 Type
2.  类型变量 Type，是一种特殊类型的变量，它处理类型而不受值
3.  类型变量 Type，可以是任意合法的变量名称

##### 简化调用泛型函数

利用类型参数推断的机制，根据传入的参数自动推断出类型变量 Type 的类型。从而省去尖括号

```ts
const num = id(10);
```

#### 泛型约束

默认情况下，泛型函数的类型变量 Type 可以代表多个类型，这导致无法访问任意属性。如访问某参数的长度 .length,因无法保证一定存在 length 属性

```ts
function id<Type>(value: Type): Type {
  console.log(value.length);
  return value;
}
```

此时就需要为泛型添加约束来收缩泛型

1. 指定更加具体的类型

```ts
function id<Type>(value: Type[]): Type {
  console.log(value.length);
  return value;
}
```

2. extend 添加约束

```ts
interface ILength {
  length: number;
}
function id<Type extends Ilength>(value: Type): Type {
  console.log(value.length);
  return value;
}
```

解释：

1. 创建描述约束的接口 ILength，该接口要求提供 Length 属性
2. 通过 extends 关键字使用该接口，为泛型（类型变量）添加约束
3. 该约束表示：传入的类型必须具有 length 属性

注意：传入的实参（比如，数组）只要有 length 属性即可，这也符合前面讲到的接口的类型兼容性

##### 多个泛型类型变量

泛型的类型变量可以有多个，并且类型变量之间还可以约束

```ts
function getProp<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}
let person = { name: 'hcx', age: '22' };
getProp(person, 'name');
```

解释：

1. 添加了第二个类型变量 Key，两个变量之间用逗号分隔
2. keyof 关键字接收一个对象类型，生成其键名称（可能是字符串和数字）的联合类型
3. 本示例中 keyof Type 实际上获取的是 person 对象所有键的联合类型，也就是：'name'|'age'
4. 类型变量 Key 受 Type 约束，可以理解为：Key 只能是 Type 所有键中的任意一个，或者说只能访问到对象存在的属性

#### 泛型接口

泛型接口：接口也可以配合泛型来使用，以增加其灵活性，增强其复用性

```ts
interface IdFunc<Type> {
  id: (value: Type) => Type;
  ids: () => Type[];
}

let obj:IdFunc<number> = {
  id(value){
    return value
  }
  ids() { return [1,3,5]}
}
```

解释：

1. 在接口名称的后面添加<类型变量>，那么，这个接口就变成了泛型接口
2. 接口的类型变量，对接口中所有其他成员可见，也就是接口所有成员都可以使用类型变量
3. 在使用泛型接口时，需要显示指定具体的类型（比如此处的 `IdFunc<number>`）

实际上，JS 中的数组在 TS 中就是一个泛型接口
当我们使用数组时，TS 会根据数组的不同类型，来自动将类型变量设置为相应的类型（通过 ctrl+鼠标左键查看具体的类型信息）

#### 泛型类

class 也可以配合泛型来使用
比如，React 的 class 组件的基类 Component 就是泛型类，不同的组件有不同的 props 和 state

```ts
interface IState {
  count: number;
}
interface IProps {
  maxLength: number;
}
class InputCount extends React.Component<IProps, IState> {
  state: IState = {
    count: 0,
  };
  render() {
    return <div>{this.props.maxLength}</div>;
  }
}
```

解释：React.Component 泛型有两个类型变量，分别指定 props 和 state 类型

#### 映射类型

基于旧类型创建新类型（对象类型），减少重复、提升开发效率
比如，类型 PropKeys 有 x/y/z，另一个类型 Type1 中也有 x/y/z，并且 Type1 中 x/y/z 的类型相同：

```ts
type ProKeys = 'x' | 'y' | 'z';
//  type Type1 = {x:number;y:number;z:number}

type Type2 = { [key in PropKeys]: number };
```

使用映射类型创建的新对象类型 Type2 和类型 Type1 结构完全相同
注意：映射类型只能在类型别名中使用，不能在接口中使用
