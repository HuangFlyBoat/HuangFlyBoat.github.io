---
title: Vuex
icon: page
order: 1
author: HCX
date: 2024-06-17
category:
  - 状态管理
tag:
  - Vue
  - Vuex
sticky: true
star: true
footer: fly fly fly ~
---

# Vuex

> Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式 + 库。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

```js
// store/index.js
import { createStore } from 'vuex';

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      count: 0,
    };
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
});

export default store;
```

```js
// main.js
import store from './store/index';
createApp(App).use(store).mount('#app');
```

## State 用法

通常一个应用只有一棵单一状态树，这样定位某个状态片段更加快速直接，调试时更容易获取当前 app 状态快照

**state 常见写法**

- 计算属性

```js
computed: {
  count(){
    return this.$store.state.count
  }
}
```

- helper 方法：mapState，接收对象或者数组，返回一个对象
  数组方式：最简单直接的方式

```js
import { mapState } from 'vuex';

export default {
  computed: {
    // 映射 this.count 为 store.state.count
    ...mapState(['count'])，
    ...mapState({
      // 箭头函数可使代码更简练
      count: state => state.count,

      // 传字符串参数 'count' 等同于 `state => state.count`
      countAlias: 'count',

      // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      countPlusLocalState (state) {
        return state.count + this.localCount
      }
    })
  },
};
```

## 派生状态 Getter

Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。

```js
const store = createStore({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
    ],
  },
  getters: {
    doneTodos(state) {
      return state.todos.filter(todo => todo.done);
    },
    // Getter 也可以接受其他 getter 作为第二个参数：
    doneTodosCount(state, getters) {
      return getters.doneTodos.length;
    },
    // 如果需要给Getter传参，需要通过返回函数来实现
    // 在使用时则被看作是一个方法
    nCount(state) {
      return n => {
        return state.count * n;
      };
    },
  },
});
```

同样 getter 也有 mapGetter 方法

## Mutations

Mutations 是唯一改变状态的方式

定义 mutations

> 每个 mutation 都有一个字符串的事件类型 (type)和一个回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：

```js
const store = createStore({
  state: {
    count: 1,
  },
  mutations: {
    // 通过 commit 传递额外参数 n
    increment(state, n) {
      // 变更状态
      state.count += n;
    },
  },
});
```

传参还可以支持对象形式，此时属性 type 固定为事件类型

```js
store.commit('increment', 10);
store.commit({
  type: "increamen"
  num: 10 // 在mutation 中通过第二个参数 payload 获取参数
});
```

:::info
状态的变更必须是同步的，即 mutations 都应为同步
:::

通常会新建一个文件 mutation-types 用于存放事件类型的常量名称

mapMutations 方法可以简写 commit 方法

```js
import { mapMutations } from 'vuex';

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy', // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment', // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    }),
  },
};
```

## Action

动作类似于 Mutations，它们主要用于：

- 实现复杂业务逻辑
- 实现异步操作

定义 Action

```js
action: {
  inc (context) {
    // 通过 context.state 和 context.getters 也可以来获取 state 和 getters
    setTimeOut(()=>{
      context.commit('inc')
    },1000)
  }
}
```

Action 通过 `store.dispatch` 方法触发：

```js
// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10,
});

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10,
});
```

同样有 mapActions 方法用于辅助映射

```js
import { mapActions } from 'vuex';

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy', // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment', // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    }),
  },
};
```

**组合 Action**
store.dispatch 可以处理被触发的 action 的处理函数返回的 Promise，并且 store.dispatch 仍旧返回 Promise

```js
// 假设 getData() 和 getOtherData() 返回的是 Promise

actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
```

## 模块化

利用模块化拆分 store 定义避免状态树过大时难以维护

常见手法

```js
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = createStore({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

:::tip
进行模块化后，mapState 里面将会根据模块名称映射整个模块了。但由于模块仅仅是将 state 隔离了，所以 action、mutation、getters 仍然可以直接访问到
:::

### 命名空间

模块化划分，仅仅将 state 隔离了，模块内部的 action 和 mutation 仍然是注册在全局命名空间的。意味着多个模块会同时响应相同的 action/mutation 类型，getters 也注册在全局命名空间，编写些注意不能重名

为了保证更加隔离和重用效果，最好给模块加上命名空间选项：`namespace: true`，这样所有 actions/mutations/getters 都将注册在独立的命名空间中

```js
export default {
  namespaced: true,
};
```

访问命名空间后的 actions/mutations/getters

```vue
<script>
// 新增参数模块名称
computed: {
  ...mapGetters("moduleName", ["count"])
},
methods: {
  nCount(n) {
    // 通过动态属性的方式去访问到当前的 getters
    return this.$store.getters["count/nCount"](n);
  },
  ...mapMutations("count", ["inc", "incBy"]),
  ...maoActions("count", {
    incAsync: "inc"
  })
}
</script>
```

:::tip
在使用模块化后，模块内部也可以访问到根的状态和 getters。

如果你希望使用全局 state 和 getter，rootState 和 rootGetters 会作为第三和第四参数传入 getter，也会通过 context 对象的属性传入 action。

若需要在全局命名空间内分发 action 或提交 mutation，将 `{ root: true }` 作为第三参数传给 dispatch 或 commit 即可。

```js
modules: {
  foo: {
    namespaced: true,

    getters: {
      // 在这个模块的 getter 中，`getters` 被局部化了
      // 你可以使用 getter 的第四个参数来调用 `rootGetters`
      someGetter (state, getters, rootState, rootGetters) {
        getters.someOtherGetter // -> 'foo/someOtherGetter'
        rootGetters.someOtherGetter // -> 'someOtherGetter'
        rootGetters['bar/someOtherGetter'] // -> 'bar/someOtherGetter'
      },
      someOtherGetter: state => { ... }
    },

    actions: {
      // 在这个模块中， dispatch 和 commit 也被局部化了
      // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
      someAction ({ dispatch, commit, getters, rootGetters }) {
        getters.someGetter // -> 'foo/someGetter'
        rootGetters.someGetter // -> 'someGetter'
        rootGetters['bar/someGetter'] // -> 'bar/someGetter'

        dispatch('someOtherAction') // -> 'foo/someOtherAction'
        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

        commit('someMutation') // -> 'foo/someMutation'
        commit('someMutation', null, { root: true }) // -> 'someMutation'
      },
      someOtherAction (ctx, payload) { ... }
    }
  }
}
```

:::
