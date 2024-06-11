---
# 这是文章的标题
title: Mobx 状态管理
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 1
# 设置作者
author: HCX
# 设置写作时间
date: 2023-09-04
# 一个页面可以有多个分类
category:
  - 状态管理
# 一个页面可以有多个标签
tag:
  - 状态管理
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
# 你可以自定义页脚
footer: fly fly fly ~
---

# Mobx6 & React

https://zh.mobx.js.org/README.html
默认放弃了装饰器语法，也可以手动启用

## 一. 配置环境

安装 mobx、mobx-react[连接 react] 或者 mobx-react-lite[只支持函数组件]
`yarn mobx mobx-react-lite` 只支持函数组件
or
`yarn mobx mobx-react` 函数式和类组件都支持

## 二、基本使用

- observable 定义一个存储 state 的可追踪字段（Proxy）
- action 将一个方法标记为可以修改 state 的 action
- computed 标记一个可以由 state 派生出新值并且缓存其输出的计算属性

![Mobx活动](/assets/images/Project/relation.png)

### 创建 stroe

- 新建文件 store/Counter.ts，通过 class 创建一个 Counter 类
- 使用 MakeObservable 将类的属性和方法变为响应式的（初始化的东西都放这了）
- 导出 counter 实例
- 注意：mobx 中的每一个 store 都只应初始化一次,为避免数据不一致

```ts
import { action, makeObservable, observable } from 'mobx';
class Counter {
  constructor() {
    // 参数一：target 把谁变成响应式（可观察）
    // 参数二：指定哪些属性或者方法变成可观察的
    makeObservable(this, {
      count: observable,
      increase: action,
      reset: action,
    });
  }
  count = 0;
  increase() {
    this.count++;
  }
  reset() {
    this.count = 0;
  }
}

export default new Counter();
```

注意导出要直接实例化，而不是导出一个类

```ts
import React from 'react';
import Counter from './store/Counter';
// observer 是一个高阶组件函数，需要包裹一个组件，这样这个组件才会更新
import { observer } from 'mobx-react-lite';
function App() {
  return (
    <div className='App'>
      <h3>计数器案例</h3>
      <div>点击次数：{Counter.count}</div>
      <button onClick={() => Counter.increase()}>+</button>
      <button onClick={() => Counter.reset()}>reset</button>
    </div>
  );
}

export default observer(App);
```

注意导出要用 observe 包裹住组件

### This 指向问题

默认 class 中的方法不会绑定 this，this 指向取决于如何调用
在使用 makeObservable 的使用可以通过 action.bound 绑定 this 指向

这样就可以在 react 中直接使用函数名

```ts
    makeObservable(this, {
        ...
      increase: action.bound,
        ...
    });
        ...
    <button onClick={Counter.increase}>+</button>
```

### 计算属性

可以根据状态值派生出来的属性

- 计算值采用惰性求值，会缓存其输出，并且只有当依赖的可观察对象被改变时才会重新计算

- 计算属性是一个方法，且方法前面必须使用 get 进行修饰

- 计算数学还需要通过 makeObservable 方法指定

```ts
import { action, makeObservable, observable, computed } from 'mobx';
class Counter {
  constructor() {
    // 参数一：target 把谁变成响应式（可观察）
    // 参数二：指定哪些属性或者方法变成可观察的
    makeObservable(this, {
      count: observable,
      increase: action.bound,
      subtraction: action.bound,
      reset: action.bound,
      double: computed,
    });
  }

  count = 0;
  get double() {
    return this.count * 2;
  }
  increase() {
    this.count++;
  }
  reset() {
    this.count = 0;
  }
  subtraction() {
    this.count--;
  }
}

export default new Counter();
```

### makeAutoObservable

加强版的 makeObservable，在默认情况下它会推断所有的属性

推断规则如下：

1. 所有属性都成为 observable
2. 所有的方法都成为 action
3. 所有的 get 都成为 computed

通过手动重写来排除不需要观察的属性和方法，还可以通过 autoBind 绑定 this 指向

```ts
constructor(){
    // 通过第二个参数和第三个参数
    makeAutoObservable(this,{functionName: false},{autoBind: true})
}
```

## 三、监听属性

#### autoRun

- autorun 函数接收一个函数作为参数，每当该函数所观察的值发生变化时，它都应该运行。
- 当你自己创建 autorun 时，它也会运行一次
- Mobx 会自动收集并订阅所有的可观察属性，一旦有改变发生，autorun 将会再次触发

```ts
const counter = new Counter();
// 默认自动执行一次，以后每次数据变化都会执行一次
autorun(() => {
  console.log('counter.count', counter.count);
});

export default counter;
```

#### reaction

类似于 autorun，但更加精细控制要跟踪的可观察的对象

- 它接收两个函数作为参数
  - 参数 1：data 函数，其返回值将作为第二个函数输入
  - 参数 2：回调函数
- 与 autorun 不同，reaction 不会在初始化的时候自动运行

```ts
reaction(
  () => counter.count,
  (value, oldvalue) => {
    console.log('counter发生了变化', value, oldvalue);
  }
);
```

## 四、异步处理

- 异步进程在 Mobx 中不需要做任何处理，因为不论是何时引发的所有 reactions 都会自动更新
- 因为可观察对象是可变的，因此在 action 中执行过程中对它们的引用一般是安全的
- 如果可观察对象的修改不是在 action 函数中，控制台会报警告(可以关闭但不推荐)

```ts
  increase() {
    setTimeout(() => {
      this.count++;
    }, 1000);
  }
```

避免警告

```ts
  increase() {
    this.count++;
  }
  increaseAsync() {
    setTimeout(this.increase, 1000);
  }
```

#### runInAction 使用

- 通过 runInAction 可以保证所有的异步更新可观察对象的步骤都应该标识为 action（有点套娃,发请求的时候会涉及到）

```ts
  increase() {
    setTimeout(() => {
      runInAction(() => {
        this.count++;
      });
    }, 1000);
```

## 五、模块化

- 项目规格变大以后，不能将所有的状态和方法都放到一个 store 中
- 我们可以根据业务模块定义多个 store
- 通过一个 store 统一管理所有的 store

```ts
import { makeAutoObservable } from 'mobx';
class Cart {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  list = [1, 2, 3];
}

const cart = new Cart();
export default cart;
```

封装 store 到自定义 hook 中

```ts
import { createContext, useContext } from 'react';
import cart from './Cart';
import counter from './Counter';

class RootStore {
  cart = cart;
  counter = counter;
}
const store = new RootStore();
// 创建一个上下文对象用于跨级组件通讯
// 如果createContext提供了默认值，则不需要Provider
const Context = createContext(store);
// 自定义 hooks
export default function useStore() {
  return useContext(Context);
}
```

在任意组件中使用 store

```ts
import React from 'react';
// import Counter from './store/Counter';
// import cart from './store/Cart';
// observer 是一个高阶组件函数，需要包裹一个组件，这样这个组件才会更新
import { observer } from 'mobx-react-lite';
import useStore from './store';
function App() {
  const { counter, cart } = useStore();
  return (
    <div className='App'>
      <h3>计数器案例</h3>
      <div>点击次数：{counter.count}</div>
      <button onClick={counter.increase}>+</button>
      <button onClick={counter.increaseAsync}>异步+</button>
      <button onClick={counter.subtraction}>-</button>
      <div>次数的倍数是:{counter.double}</div>
      <button onClick={counter.reset}>reset</button>
      <div>{cart.list}</div>
    </div>
  );
}

export default observer(App);
```
