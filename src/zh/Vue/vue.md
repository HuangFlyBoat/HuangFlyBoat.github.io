---
title: Vue3基础
icon: page
order: 1
author: HCX
date: 2024-06-12
category:
  - Vue
tag:
  - Vue
sticky: true
star: true
footer: fly fly fly ~
---

# Vue3 基础语法

## 模板语法

通过 `v-bind` 来绑定变量的值，通常简写为 `:`

通过双括弧语法在 html 元素内使用变量`{{变量名}}`

双括弧里渲染的是字符串，如果想要渲染一段 html 代码，使用 `v-html` 来实现

## 计算属性和侦听器

模板中不宜放入过多的逻辑，难以维护，对于任何包括响应式数据的复制逻辑，都应该使用计算属性。
计算属性具有缓存性，不会进行重复计算

侦听器（监听器），侦听某个响应式数据的变化，执行一段给定逻辑

侦听器有两种写法，一种是传递函数，一种是传递对象，传递对象的方式可以自定义侦听器的配置

```vue
<script>
// ...
watch: {
  title(newValue, oldValue) {
    this.name = newValue + 'name'
  }
}
watch: {
  title: {
    immediate: true, // 立即执行
    deep: true, // 深度侦听内部嵌套属性
    handler(newValue,oldValue) {
      this.name = newValue + 'name'
    }
  }
}
// ...
</script>
```

:::tip
为什么有了计算属性后还需要侦听器？

大部分情况下计算属性都适合，但是当数据变化时执行异步或者开销较大的操作时，侦听器更合适
:::

## 动态样式绑定

动态切换类名：动态绑定类名，传入对象，根据对象的属性的值来决定是否生成对应的类名，如 active 的类名取决于 isActive 变量的值

```vue
<div :class="{ active: isActive, text-danger: hasError }"></div>
```

动态绑定样式

```vue
<p :style="{ active: isActive, fontSize: fontSize + 'px' }">111</p>
```

## 条件和列表渲染

通过`v-for`指令实现列表渲染

```vue
<li v-for="item in items" :key="item"></li>
```

通过`v-if`和`v-else`来实现条件渲染

```vue
<div v-if="items.length === 0">没有物品了</div>
```

## 事件处理

使用`v-on`监听事件，或者简写为`@事件名`

```vue
<div @click="handleClick" />
```

## 数据双向绑定

使用`v-model`进行双向绑定，常见于输入框

## 生命周期钩子

每个实例在被创建时都要经过一系列的初始化过程，例如需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做生命周期钩子的函数，这些给用户在不同阶段添加自己代码的机会

生命周期：

- 初始化阶段: beforeCreate、create、beforeMount、mounted
- 更新阶段：beforeUpdate、update
- 销毁阶段：beforeUnmount、unmount

注意在 update 阶段去获取 dom 元素时，并不能保证 dom 全部都更新了，因此会使用到 nextTick 方法

## 组件化开发

**组件注册**

```vue
<div id="app">
  <comp/>
  <comp2/>
</div>
<script>
const app = Vue.createApp({
  data() {
    return {};
  },
  // 局部注册
  components: {
    comp2: {
      template: '<div>my-component2</div>',
    },
  },
});

// 全局注册
app.component('comp', {
  template: '<div>my-component</div>',
});

app.mount('#app');
</script>
```

全局注册的组件在 vue 文件中都可以使用，而局部注册只在当前文件中可以被访问到

**组件通信**

1. 父传子

```js
// 全局注册
app.component('comp', {
  template: '<div>my-component</div>',
  // props: [title,],  传递属性，可以为数组或者是对象，配置更详细的属性
  props: {
    title: {
      type: String,
      default: '',
      require: true,
    },
  },
});
```

传递属性时，如果是非字符串类型的，则需要使用模板语法，`v-bind`（或者简写为`:`） 进行绑定

:::tip
当想要一次性传递多个属性时，可以采用对象的方式，自动展开键值对传递属性

```vue
<comp v-bind="{ title: 'xxx', id: '1' }"></comp>
```

:::

应用例子：

```vue
<script type="text/x-template" id="course-list">
<ul>
  <li
    v-for="c in courses"
    :key="c"
    :class="{active: selectedCourse === c}"
    @click="selectedCourse = c"
  >
    {{c}}
  </li>
</ul>
</script>

<script>
const CourseList = {
  template: '#course-list',
  data() {
    return {
      selectedCourse: '',
    };
  },
  props: {
    course: {
      type: Array,
      required: true,
    },
  },
};
</script>

<div id="app">
  <course-list :course="courses"/>
</div>

<script>
const app = Vue.createApp({
  data() {
    return {
      courses: [],
    };
  },
});

// 全局注册
app.component('course-list', CourseList);

app.mount('#app');
</script>
```

2. 子传父

当子组件需要和父级组件进行通信，自定义事件来派发事件

通过 emits 选项在组件上定义已发出的事件

子组件声明自定义事件与派发事件

```vue
<script>
app.component('comp', {
  // 派发
  template: '<div @click="$emit(\'some-event\')">my-component</div>',
  props: {},
  // 声明
  emits: ['some-event', 'someEvent2'],
});
</script>
```

父组件监听子组件的自定义事件，并获得相关数据

```vue
<custom-comp @some-event="dosomething" />
<custom-comp @someevent2="dosomething" />
```

:::tip

html 中对于大小写并不敏感，事件名称建议使用 some-event 这类短横线命名（Kebab case 命名法），避免使用驼峰式命名。
方便在父组件监听时命名一致。

需要注意的是，如果是属性 props，那键的名称应该使用驼峰式命名，对应父组件传值时，属性名为驼峰式或者短横线命名
:::

3. 在组件上使用 `v-model`

自定义事件也可以用于创建支持`v-model`的自定义输入组件

```vue
<custom-input v-model="searchText"></custom-input>

<!-- 等价于 -->
<custom-input :model-value="searchText" @update:model-value="searchText = $event"></custom-input>
```

custom-input 组件内部

```vue
<script>
app.component('custom-input', {
  // 派发
  template: `<input
    :value="modelValue"
    @input="$emit('update:model-value',$event.target.value)"
  >`,
  props: ['model-value'],
  // 声明
  emits: ['update:model-value'],
});
</script>
```

:::tip

`v-model` 是可以传递参数的，组件上使用的`v-model`使用`model-value`作为 prop 和`update:modelValue`作为事件。我们可以通过向`v-model`传递参数来修改这些名称

```vue
<my-component v-model:foo="bar" />
```

对应组件中只需要 foo 属性就可以了

```vue
<script>
app.component('custom-input', {
  // 派发
  template: `<input
    :value="foo"
    @input="$emit('update:foo',$event.target.value)"
  >`,
  props: ['foo'],
  // 声明
  emits: ['update:foo'],
});
</script>
```

这样的好处是，v-model 可以使用多次，根据传参绑定不同的值，并且修改后代码可读性增加
:::

## 插槽

内容分发的 API，称为插槽，将`slot`元素作为承载分发内容的出口

```vue
<!-- 使用 todo-button 组件时传递内容 -->
<todo-button>
  button label
</todo-button>

<!-- todo-button 组件模板中使用slot作为内容出口 -->
<button class="btn-primary">
  <slot></slot>
</button>

<!-- 未来渲染的HTML -->
<button class="btn-primary">
  button label
</button>
```

**具名插槽**，支持多个插槽的使用，内容分发到指定位置

```vue
<!-- layout 组件 -->
<template>
  <div class="container">
    <header>
      <!-- 具名插槽 -->
      <slot name="header"></slot>
    </header>
  <main>
      <!-- 默认插槽 -->
      <slot></slot>
  </main>
  <footer>
      <!-- 具名插槽 -->
      <slot name="footer"></slot>
  </footer>
</template>

<!-- 具名插槽使用时，通过template元素和v-slot指令，并以参数形式提供其名称 -->
<template>
  <layout>
    <template v-slot:header>
      <h1>title</h1>
    </template>
    <template v-slot:default>
      <p>main</p>
    </template>
    <template v-slot:footer>
      <p>footer</p>
    </template>
</template>

```

**作用域插槽**

插槽内容需要访问子组件中才有的数据，使用作用域插槽实现。常见于表格组件中，希望自定义列的渲染方式

```vue
<script>
const Child = {
  template: `<div><slot :foo="foo"></slot></div>`,
  data() {
    return {
      foo: 'bar',
    };
  },
};

const Parent = {
  template: `
    <Child>
      <template v-slot="slotProps">
        {{slotProps.foo}}
      </template>
    </Child>
  `,
  components: { Child },
};
</script>
```

:::tip

v-slot 有对应的简写 #，因此 `<template v-slot:header>`可以简写为 `<template #header>`。其意思就是“将这部分模板片段传入子组件的 header 插槽中”。

当一个组件同时接收默认插槽和具名插槽时，所有位于顶级的非 `<template>` 节点都被隐式地视为默认插槽的内容。所以上面也可以写成：

```vue
<template>
  <BaseLayout>
    <template #header>
      <h1>Here might be a page title</h1>
    </template>

    <!-- 隐式的默认插槽 -->
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>

    <template #footer>
      <p>Here's some contact info</p>
    </template>
  </BaseLayout>
</template>
```

:::

## Compositon API

> 在 Vue 应用的概念中，“组合式函数”(Composables) 是一个利用 Vue 的组合式 API 来封装和复用有状态逻辑的函数。

用组件的选项 Option API 组织逻辑在大多数情况下都有效，然而当组件变大时，逻辑关注点的列表也会增长，这种碎片化使得理解和维护复杂组件变得困难。此外，在处理单个逻辑关注点时，我们必须不断的“跳转”相关代码的选项块

**如果能够将同一个逻辑关注点相关的代码配置在一起会更好，这正是 Composition API 设计的动机**

### setup 函数

- 函数里 return 不一定是对象，还可以是一个渲染函数
- setup 的参数有 props 属性，ctx 上下文
- props 解构赋值后会失去响应式，但 ctx 不会（ctx 是一个对象，内部属性才并非响应式，因此可以结构赋值）
- setup 执行时机非常早，甚至早过 beforcreate，要在函数里获得当前的实例可以通过 getCurrentInstance 方法

```html
<div id="app">
  {{state.counter}}
  <comp dong="dong" tua="tua" />
</div>

<script src="https://unpkg.com/vue@next"></script>
<script>
  const {createAPP, reactive, h, getCurrentInstance} = Vue
  const vm = createApp({
    setup(props, ctx) {
      // 获取组件实例
      const ins = getCurrentInstance();

      const state = reactive({
        counter: 0
      })

      setInterval(() => {
        state.counter++
      }, 1000);
      // return {
      //   state
      // }
      // 自然也可以返回 jsx 渲染函数，需要配置
      return () => h('div', state.counter)
    },
    components: {
      Comp: {
        template: `<div>comp<slot/></div>`,
        props: {
          dong: {
            type: String,
            default: ''
          }
        }
      },
      setup(props, ctx) {
        console.log(props, ctx)
        // 输出 Proxy {dong: "dong"} 和 {...}
        // 和 props 不同，attrs 和 slots 的属性都不是响应式的。
        // 如果你想要基于 attrs 或 slots 的改变来执行副作用
        // 应该在 onBeforeUpdate 生命周期钩子中编写相关逻辑。
      }
    }
  }).mount('#app')

```

> setup() 钩子是在组件中使用组合式 API 的入口，通常只在以下情况下使用：
>
> 需要在非单文件组件中使用组合式 API 时。
> 需要在基于选项式 API 的组件中集成基于组合式 API 的代码时。
> ::: warning
> 注意
> 对于结合单文件组件使用的组合式 API，推荐通过 `<script setup>` 以获得更加简洁及符合人体工程学的语法。
> :::

### Ref

> 接受一个内部值，返回一个响应式的、可更改的 ref 对象，此对象只有一个指向其内部值的属性 .value。
> 如果将一个对象赋值给 ref，那么这个对象将通过 reactive() 转为具有深层次响应式的对象。

```js
const count = ref(0);
console.log(count.value); // 0

count.value = 1;
console.log(count.value); // 1
```

:::tip
在模板中使用 ref 时，我们不需要附加 .value

```html
<div>{{ count }}</div>
```

:::

`toRefs()`把一个响应式对象转换成普通对象，该普通对象的每个属性都是一个 Ref

```js
const state = reactive({
  foo: 1,
  bar: 2,
});

const stateAsRefs = toRefs(state);
/* 类型如下
{
  foo: Ref<number>,
  bar: Ref<number>
}
*/
```

### 生命周期钩子

生命周期钩子可以通过`onXXX`的方式在 setup 里面引入

- setup 的执行时刻在 beforeCreate 之前
- 生命周期的钩子可以多次注册

:::info
与 2.x 版本生命周期相对应的组合式 API

- `beforeCreate` -> 直接写到 `setup()`
- `create` -> 直接写到 `setup()`
- `beforeMount` -> `onMounted`
- `updated` -> `onUpdated`
- `beforeDestroy` -> `onBeforeUnmount` 变化
- `destroyed` -> `onUnmounted` 变化
- `errorCaptured` -> `onErrorCaptured`
- `onRenderTracked` 新增
- `onRenderTriggered` 新增

:::

## Vue 可复用性

### 混入（mixin）

混入提供了一种非常灵活的方式，来分发 Vue 组件中可复用的功能。一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项都将被“混合”进入该组件本身的选项

```js
const myMixin = {
  data() {
    return {
      bar: 'bar',
      foo: 'foo',
    };
  },
  created() {
    console.log('hello from mixin');
  },
};

const app = Vue.createApp({
  data() {
    return {
      foo: 'foo-foo', // 属性名称相同时，将会使用组件的属性，不会使用混入的 foo
    };
  },
  // 使用混入
  mixins: [myMixin],
  // 混入对象的选项会和组件本身的选项合并
  create() {
    console.log('hello from app');
  },
});

// 全局混入，应用程序级别都可以使用
app.mixin({
  create() {
    console.log('hello from global mixin');
  },
});
```

Mixin 钩子的调用顺序与提供它们的选项顺序相同，且会在组件自身的钩子前被调用。全局混入的执行顺序又高于局部混入

```js
const mixin = {
  created() {
    console.log(1);
  },
};

createApp({
  created() {
    console.log(2);
  },
  mixins: [mixin],
});

// => 1
// => 2
```

> :::warning
>
> 在 Vue 2 中，mixins 是创建可重用组件逻辑的主要方式。尽管在 Vue 3 中保留了 mixins 支持，但对于组件间的逻辑复用，使用组合式 API 的组合式函数是现在更推荐的方式。
>
> :::

### 自定义指令

需要对普通 DOM 元素进行底层操作，会用到自定义指令

一个自定义指令由一个包含类似组件生命周期钩子的对象来定义。钩子函数会接收到指令所绑定元素作为其参数。下面是一个自定义指令的例子，当一个 input 元素被 Vue 插入到 DOM 中后，它会被自动聚焦：

```vue
<script setup>
// 在模板中启用 v-focus
const vFocus = {
  mounted: el => el.focus(),
};
</script>

<template>
  <input v-focus />
</template>
```

在 `<script setup>` 中，任何以 v 开头的驼峰式命名的变量都可以被用作一个自定义指令。在上面的例子中，vFocus 即可以在模板中以 v-focus 的形式使用。

在没有使用 `<script setup>` 的情况下，自定义指令需要通过 directives 选项注册

```js
const app = Vue.createApp({
  directives: {
    // 指令名称
    focus: {
      // 生命周期钩子
      mounted((el)=>{
        el.focus()
      })
    }
  }
})
```

当然也可以全局注册指令

```js
const app = createApp({});

// 使 v-focus 在所有组件中都可用
app.directive('focus', {
  /* ... */
});
```

## Teleport 传送

`<Teleport>` 接收一个 to prop 来指定传送的目标。to 的值可以是一个 CSS 选择器字符串，也可以是一个 DOM 元素对象。这段代码的作用就是告诉 Vue“把以下模板片段传送到 body 标签下”。

```vue
<button @click="open = true">Open Modal</button>

<Teleport to="body">
  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</Teleport>
```

## 渲染函数

渲染函数给我们提供完全 JS 编程能力，可以解决更复杂的模板需求

```html
<div id="app">
  {{title}}
  <x-heading :level="3">插槽值</x-heading>
</div>
<script src="https://unpkg.com/vue@next"></script>
<script>
  const { createApp, h } = Vue
  createApp({
    data(){
      return{
        title:'渲染函数',
        items: ['a', 'b', 'c']
      }
    }
  })
  .component('x-heading',{
    props: {
      level: {
        type: Number,
        required: true
      },
      items: {
        type: Array,
        default: []
      },
      modelValue: String
    },
    render() {
      // 和 vue2 相比，不再接收一个h函数
      // vue3 中插槽和作用域插槽集中到 $slots 中，且每个值都是函数

      // 渲染函数里 v-model 的实现
      return h(LInput, {
        modelValue: this.modelValue,
        'onUpdate:modelValue': value => this.$emit('update:modelValue', value)
      })

      // 条件和循环的实现
      if (this.items.length) {
        const children = this.items.map((item) => h('li', item))
        return h('ul', children)
      } else {
        // 参数1，元素的名称
        // 参数2，若干属性和事件等
        // 参数3为子元素，如果是字符串，则为text，如果是数组则为子元素
        return h(
          'h' + this.level,
          {},
          this.$slots.default() // 渲染插槽 <h1><slot></slot></h1>
        )
      }
    }
  })

```

:::info
如果要将插槽传递给子组件（实现 v-slot 指令），第三个参数为对象，是插槽函数，定义了插槽的名称和返回的内容

```js
// 该渲染函数的作用是，实现一个组件，并且为该组件的子组件定义插槽

render() {
  return Vue.h('div',[
    Vue.h('child',null,{
      // 传递一个对象作为children
      // 形如 {name: props => VNode | Array<VNode>}
      default: (props) => Vue.h('span', props.text)
      // `<child v-slot="props"><span>{{props.text}}</span></child>`
    })
  ])
}
```

:::

## 插件

> 插件 (Plugins) 是一种能为 Vue 添加全局功能的工具代码。

插件可以是包含`install()`方法的对象，也可以直接是 install 函数

```js
export default {
  install: (app, options) => {
    // 插件收到应用实例和插件选项
  },
};
```

**插件常见任务**

- 添加指令、组件、过渡等全局资源

```js
export default {
  install: (app, options) => {
    app.component('comp', {});
  },
};
```

- 全局混入一些组合选项

```js
export default {
  install: (app, options) => {
    app.mixin({});
  },
};
```

- 添加实例方法

```js
export default {
  install: (app, options) => {
    app.config.globalProperties.xx = xx;
  },
};
```

**使用插件**

实例挂载之前调用 use 方法注册插件

`app.use(plugin)`

例子，实现一个 Message 插件

```js
const MessagePlugin = function (app) {
  // 声明一个组件
  const MyMessage = {
    props: {
      duration: {
        type: Number,
        default: 1000,
      },
      msg: {
        type: String,
        required: true,
      },
    },
    template: `
    <div class="message-box">
      <p>{{msg}}</P>
    </div>
    `,
    mounted() {
      setTimeout(() => {
        app.config.globalProperties.$message(null);
      }, this.duration);
    },
  };

  // 组件添加
  const container = document.createElement('div');
  document.body.appendChild(container);

  // 注册全局实例方法 $message
  app.config.globalProperties.$message = function (props) {
    if (props) {
      render(h(MyMessage, props), container);
    } else {
      render(null, container);
    }
  };
};
```

## 补充

### Vue3 与 Vue2 的区别

1. 生成 Vue 实例的方式

2. 组件里 this 指向

3. Composition Api 组合式

4.

###
