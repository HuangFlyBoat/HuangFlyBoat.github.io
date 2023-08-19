---
# 这是文章的标题
title: React 路由管理
# You can customize cover image

# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 1
# 设置作者
author: HCX
# 设置写作时间
date: 2023-08-12
# 一个页面可以有多个分类
category:
  - react
# 一个页面可以有多个标签
tag:
  - 自用速查，实用
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
# 你可以自定义页脚
footer: 已经立秋过了
---

5 版本和 6 版本都有人使用，但 5 和 6 版本区别挺大。

<!-- more -->

# react-router-dom

## v5：

### 1. 基础运用和细节

基于 HashRouter 把所有要渲染的内容包起来，开启 HASH 路由
后续用到 Route 和 Link 等都需要在 HashRouter 中使用

开启后，整个页面地址，默认会设置一个 #/ 哈希值

Link 实现路由切换/跳转的组件，最后渲染完毕的结果依然是 a 标签，但是可以根据路由模式来自动设置切换方式

```jsx
import { HashRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import A from './view/A';
import B from './view/B';
import C from './view/C';
const App = function App() {
  return (
    <HashRouter>
      <NavBox>
        {/* <a href='#/'> A </a>
        <a href='#/b'> B </a>
        <a href='#/c'> C </a>
        不用自己手动处理加上 #
         */}
        <Link to='/'>A</Link>
        <Link to='/b'>B</Link>
        <Link to='/c'>C</Link>
      </NavBox>
      {/* 路由容器: 每一次页面加载完毕或者路由切换完毕，都会根据当前的哈希值，到这里和一个Route进行匹配，把匹配到的组件放在容器中渲染 */}
      <div className='content'>
        {/* Switch 只要有一项匹配，则不会继续向下匹配.
            exact 设置精准匹配
         */}
        <Switch>
          <Route exact path='/' component={A} />
          <Route path='/b' component={B} />
          <Route path='/c' component={C} />
          {/* 放在最后一项，path设置*或者不写，意思是：以上都不匹配的时候执行这个规则 */}
          {/* <Route path='*' component={404组件} />
            当然也可以不设置404组件，而是重定向到一个默认地址
          */}
          <Redirect from='' to='' exact />
          {/* from: 从哪来的（可以省略）
              to: 重定向去的地址
              exact: 是对from地址的修饰，开启精准匹配
           */}
        </Switch>
      </div>
    </HashRouter>
  );
};
```

:::info 路由地址匹配的规则

| 页面地址 | 路由地址 | 非精准匹配 | 精准匹配 |
| -------- | -------- | ---------- | -------- |
| /        | /        | true       | true     |
| /        | /login   | false      | false    |
| /login   | /        | true       | false    |
| /a/b     | /a       | true       | false    |
| /a/b     | /a/b     | true       | true     |
| /a2/b    | /a       | false      | false    |

非精准匹配：只需要页面地址包好一个完整的路由地址即可匹配上

精准匹配：两个地址需要一模一样，最后的/匹配可以忽略

补充：当路由地址匹配后，先把 render 函数执行，返回的返回值就是我们要渲染的内容，在这里可以做一些预处理，比如登陆校验
:::

```jsx
<Route
  path='/c'
  render={() => {
    let isLoign = true;
    if (isLogin) {
      return <C />;
    }
    return <Redirect to='/login' />;
  }}
/>
```

### 2. 多级路由分析和构建

每一次路由跳转都是从一级路由开始匹配，先匹配一级路由，进入匹配的组件，在组件内容里再去匹配二级路由

/ -> 定向到 /a
/a -> A.jsx
/a/a1 -> A1.jsx
/a/a2 -> A2.jsx
/a/a3 -> A3.jsx
/b -> B.jsx
/c -> C.jsx

```jsx
import { HashRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import A from './view/A';
import A1 from './view/a/A1';
import A2 from './view/a/A2';
import A3 from './view/a/A3';
import B from './view/B';
import C from './view/C';
const App = function App() {
  return (
    <HashRouter>
      <NavBox>
        <Link to='/a'>A</Link>
        <Link to='/b'>B</Link>
        <Link to='/c'>C</Link>
      </NavBox>
      <div className='content'>
        <Switch>
          <Redirect exact from='/' to='/a' />
          <Route path='/a' component={A} />
          <Route path='/b' component={B} />
          <Route path='/c' component={C} />
          <Redirect to='/a' />
        </Switch>
      </div>
    </HashRouter>
  );
};
```

```jsx
const A = function A() {
  return (
    <div className='box'>
      <div className='menu'>
        <Link to='/a/a1'>A1</Link>
        <Link to='/a/a2'>A2</Link>
        <Link to='/a/a3'>A3</Link>
      </div>
      <div className='view'>
        {/* 配置二级路由的匹配规则，需要把一级路由地址带上，不能省略 */}
        <Switch>
          <Redirect exat from='/a' to='/a/a1' />
          <Route path='/a/a1' component={A1} />
          <Route path='/a/a2' component={A2} />
          <Route path='/a/a3' component={A3} />
        </Switch>
      </div>
    </div>
  );
};
```

### 3. 构建 React 专属路由表管理机制

:::tip
路由表配置，之前路由被分散到各个组件中，如果是动态路由或者想要更新路由还需要深入组件，比较麻烦。这时候就需要在一个文件中对多级路由进行统一管理
:::

```jsx
//  配置路由表
/**
 * 本身是一个数组，数组中的每一项都是一个需要配置的路由规则
 * redirect：true 此配置项是重定向
 * from: 来源的地址
 * to: 重定向地址
 * exact: 是否精准匹配
 * path: 匹配的路径
 * component: 渲染的组件
 * name: 路由名称
 * meta:{} 路由元信息,包含当前路由的一些信息，当路由匹配后可以拿这些信息做一些事情
 * children: [] 子路由
 * ...
 */
const routes = [
  {
    redirect: true,
    from: '/',
    to: '/a',
    exact: true,
  },
  {
    path: '/a',
    component: A,
    name: 'a',
    meta: {},
    children: aRoutes,
  },
  {
    path: '/b',
    component: B,
    name: 'b',
    meta: {},
  },
  {
    path: '/c',
    component: C,
    name: 'c',
    meta: {},
  },
  {
    redirect: true,
    to: '/a',
  },
];

export default routes;
```

二级路由表 aRoutes.js

```jsx
const aRoutes = [
  {
    redirect: true,
    from: '/a',
    to: '/a/a1',
    exact: true,
  },
  {
    path: '/a/a1',
    component: A1,
    name: 'a-a1',
    meta: {},
  },
  {
    path: '/a/a2',
    component: A2,
    name: 'a-a2',
    meta: {},
  },
  {
    path: '/a/a3',
    component: A3,
    name: 'a-a3',
    meta: {},
  },
];
export default aRoutes;
```

index.js

```jsx
// 调用组件的时候，基于属性传递路由表进来
// 根据路由表动态设定路由的匹配规则
const RouterView = function RouterView(props) {
  // 获取传递的路由表
  let { routes } = props;
  return <Switch>
    {routes.map((item,index)=>{
        let {redirect,exact,from,to,path,component:Component,meta,name} = item
        let config = {}
        if(redirect){
            {/* 重定向规则 */}
            config = {to}
            if(from) config.from = from
            if(exact) config.exact = true
            return <Redirect key={index} {...config}/>
        }
        {/* 正常匹配规则 */}
        config = {path}
        if(exact) config.exact = true
        return <Route key={index} {...config} render= {()=>{
            {/* 统一基于render管理，当某个路由匹配，后期在这里可以做一些其他事情 */}
            rerurn <Component/>
        }} />
    })
  </Switch>;
};
export default RouterView;
```

后续直接调用 index.js 和导入的路由表进行搭配

二级路由则直接在组件里面导入对应的二级路由表即可

`<RouterView routes={routes} />`

### 4. React 中路由懒加载

在真实项目中，如果我们事先把所有组件全部导入进来，再基于 Route 做路由匹配，这样：最后项目打包的时候，所有组件都全部打包到一个 js 中

这样 js 文件会非常大，第一次加载的时候从服务器获取这个 JS 文件会用很久的时间，导致页面一直处于白屏的状态

虽然优化方案中有建议合并为一个 JS 文件，减少 Http 请求次数，但 JS 文件不宜过大

:::tip
最好的处理方案，将一开始要展示的内容打包到主 JS 中（bundle.js）其余组件单独打包成独立的 JS，或者几个组件合并在一起打包
:::

当页面首次加载的时候，首先只把主 JS(bundle.js)请求回来渲染，其他的 JS 先不加载。因为 bundle.js 中只有最开始要渲染的代码，所以体积小，渲染速度更快，可以减少白屏等待的时间。

当路由切换的时候，只请求对应要渲染的组件 JS 文件，动态导入

---

实操部分：利用 react 中的 lazy 组件和 ES6 中的 import()方法
`import {lazy} from 'react`

```jsx
import { lazy } from 'react';
import A from '../view/A';
import aRoutes from './aRoutes';
const routes = [
  {
    redirect: true,
    from: '/',
    to: '/a',
    exact: true,
  },
  {
    path: '/a',
    component: A,
    name: 'a',
    meta: {},
    children: aRoutes,
  },
  {
    path: '/b',
    component: lazy(() => {
      return import('../view/B');
    }),
    name: 'b',
    meta: {},
  },
  {
    path: '/c',
    component: lazy(() => {
      return import('../view/C');
    }),
    name: 'c',
    meta: {},
  },
  {
    redirect: true,
    to: '/a',
  },
];

export default routes;
```

同理二级路由中都应该设置为懒加载，如果需要二级路由统一打包在一个 JS 文件下，则使用到注释。这样有相同注解的就会统一打包成一个 JS 文件

```jsx
{
    path: '/a/a1',
    component: lazy(()=>import(/* webpackChunkName:AChild */'../views/a/A1')),
    name: 'a-a1',
    meta: {},
  },
```

但是由于是异步加载需要引用到 react 中的 Suspense 来进行返回组件

```jsx
import React,{Suspense} from 'react'
// 调用组件的时候，基于属性传递路由表进来
// 根据路由表动态设定路由的匹配规则
const RouterView = function RouterView(props) {
  // 获取传递的路由表
  let { routes } = props;
  return <Switch>
    {routes.map((item,index)=>{
        let {redirect,exact,from,to,path,component:Component,meta,name} = item
        let config = {}
        if(redirect){
            {/* 重定向规则 */}
            config = {to}
            if(from) config.from = from
            if(exact) config.exact = true
            return <Redirect key={index} {...config}/>
        }
        {/* 正常匹配规则 */}
        config = {path}
        if(exact) config.exact = true
        return <Route key={index} {...config} render= {()=>{
            {/* 统一基于render管理，当某个路由匹配，后期在这里可以做一些其他事情 */}
            {/* Suspense.fallback:在异步加载的组件还没有处理完之前，先展示Loading效果 */}
            rerurn <Suspense fallback={<>正在处理中...</>}>
                <Component />
              </Suspense>
        }} />
    })
  </Switch>;
};
export default RouterView;
```

真实项目中一定要做路由懒加载，但是也很少每个组件都成一个 JS 文件，会把几个组件打包成一起

### 5. 在组件中获得路由信息

基于 render 函数接收 props 并传给要渲染的组件

```jsx
import React,{Suspense} from 'react'
// 调用组件的时候，基于属性传递路由表进来
// 根据路由表动态设定路由的匹配规则
const RouterView = function RouterView(props) {
  // 获取传递的路由表
  let { routes } = props;
  return <Switch>
    {routes.map((item,index)=>{
        let {redirect,exact,from,to,path,component:Component,meta,name} = item
        let config = {}
        if(redirect){
            {/* 重定向规则 */}
            config = {to}
            if(from) config.from = from
            if(exact) config.exact = true
            return <Redirect key={index} {...config}/>
        }
        {/* 正常匹配规则 */}
        config = {path}
        if(exact) config.exact = true
        return <Route key={index} {...config} render= {(props)=>{
            {/* 统一基于render管理，当某个路由匹配，后期在这里可以做一些其他事情 */}
            {/* Suspense.fallback:在异步加载的组件还没有处理完之前，先展示Loading效果 */}
            rerurn <Suspense fallback={<>正在处理中...</>}>
                <Component {...props}/>
              </Suspense>
        }} />
    })
  </Switch>;
};
export default RouterView;
```

这样在组件 props 中就可以获得一些路由的基础信息：

- history
  - 编程式导航，基于 JS 方法实现路由跳转
  - go goForward goBack 前进后退
  - push replace 新增历史记录，替换当前历史记录
- location
- match

在函数式组件中还可以基于 hook 函数来获得属性信息

- useHistory()
- useLocation()
- useMatch()

:::warning
只要在 Router 中渲染的组件，我们在组件内基于 Hook 函数都可以获取路由信息（即使并不是基于 Route 渲染的）。但是只有基于 Route 匹配渲染的组件，才能通过 props 属性来获取
:::

### 6. 路由跳转和传参

路由跳转的两种方式：

- 基于 Link 方案跳转

  ```jsx
  <Link to="/xxx">导航</Link>
  <Link to={{
  pathname:"/xxx",
  search:"",
  state:{}
  }}>导航</Link>
  ```

- 基于编程式导航

  ```jsx
  history.push('/c');
  history.push({
    pathname: '/c',
    search: '',
    state: {},
  });
  history.replace('/c');
  ```

路由传参的三种方式：

- 问号传参

  问号传参会将参数暴露在 url 中，且长度有限制

  ```jsx
  const history = useHistory();
  history.push('/c?id=100&name=zx');
  history.push({
    pathname: '/c',
    search: 'id=100&name=zx',
  });
  ```

  在组件中接收信息

  ```jsx
  import React from 'react'
  import {useLocation} from 'react-router-dom'
  import qs from 'qs'
  // 还可以使用 URLSearchParams类
  const C = function C(){
    const location = useLocation()
    console.log(location.search) // ?id=100&name=zx
    // 转为对象
    let query = qs.parse(location.search.substring(1))

    let usp = new URLSearchParams(location.search)
    console.log(usp.get('id'),usp.get(name))
    ...
  }
  ```

- 路径参数
  特点：目前最主流的一种方式

  ```jsx
  // 把需要传递的值作为路径的一部分
  // 需要在对应的路由中修改路径为 path: /c/:id/:name?
  // 加上问号的意思是可选，不加问号则严格匹配
  const history = useHistory();
  history.push('/c/100/zx');
  history.push('/c/100');
  ```

  传递的信息也是在 URL 中，存在安全和长度限制。因为信息存在地址中，所以即使目标组件刷新，传递的信息也在

  在组件中接收

  ```jsx
  import { useRouteMatch, useParams } from 'react-router-dom';

  let params = useParams();
  // 或者
  const match = useRouteMatch();
  console.log(match.params);
  ```

- 隐式传参

  传递的信息不会出现在 url 中，安全美观，也没有限制
  但是目标组件刷新传递的信息就丢失了

  ```jsx
  const history = useHistory();
  history.push({
    pathname: '/c',
    state: {
      id: 100,
      name: 'zx',
    },
  });
  ```

  在组件中获取

  ```jsx
  const location = useLocation();
  consolo.log(location.state);
  ```

### 7. NavLink 和 Link 的区别

都是实现路由跳转，语法几乎一样

区别是每一次页面加载或者路由切换完毕，都会拿最新的路由地址和 NavLink 中 to 指向的地址（或者 pathname 地址）进行匹配，匹配上后会默认设置 active 选中样式名（这个名字可以通过 activeClassName 来修改）

也可以设置 exact 在 NavLink 中设置精准匹配。基于这样的机制可以给选中的导航设置相关的选中样式

## v6

思想上和 v5 一样，但是语法上有很大的改变

在 6 中没有 Switch 和 redirect，移除了 withRouter
取而代之的是 Routes 和 Navigate，代替方案自己写一个 withRouter

### 1. 基础运用

- 路由匹配成功，不再基于 component/render 控制渲染组件，而是基于 element。语法格式是 element = {<Component/>}

- 不再需要 Switch，默认就是一个匹配成功，就不再匹配下面的了

- 不再需要 exact，默认每一项匹配都是精准匹配

- 重定向由组件 `<Navigate to='' replace/>` 负责，只要遇见这个组件就会重定向（设置 replace 属性则不会新增记录，而是替换当前记录。to 还可以接收一个对象，里面包含三个属性 pathname,search,state）

```jsx
import React from 'react';
import { HashRouter } from 'react-router-dom';
import A from './views/A';
import B from './views/B';
import C from './views/C';
import A1 from './views/a/A1';
import A2 from './views/a/A2';
import A3 from './views/a/A3';
const App = function App() {
  return (
    <HashRouter>
      {/* 所有路由规则放在 routes 下*/}
      <Routes>
        <Route path='/' element={<Navigate to='/' />} />
        <Route path='/a' element={<A />}>
          {/* v6版本中，要求所有的路由（二级或者多级路由），不再分散到各个组件中编写，而是统一都写在一起进行处理 */}
          <Route path='/a' element={<Navigate to='/a/a1' />} />
          <Route path='/a/a1' element={<A1 />} />
          <Route path='/a/a2' element={<A2 />} />
          <Route path='/a/a3' element={<A3 />} />
        </Route>
        <Route path='/b' element={<B />} />
        <Route path='/c' element={<C />} />
        {/* 以上都不匹配的情况下 */}
        <Route
          path='*'
          element={
            <Navigate
              to={{
                pathname: '/a',
                search: '?from=404',
              }}
            />
          }
        />
      </Routes>
    </HashRouter>
  );
};
```

二级路由内容出现的位置，使用 Outlet 组件来作为路由容器。
用来渲染二级路由或者多级路由
`import {Outlet} from 'react-router-dom'`

### 2. 路由跳转和传参方案

在 react-router-dom v6 中即便组件是基于 Route 渲染的，也不会基于属性，把 history、location、match 传递给组件。想获取相关的信息，只能基于 Hook 函数处理

**确保是在 Router 内部包含着的才能使用对应 Hook 组件**

实现路由跳转的方式

- Link / NavLink 点击跳转路由
- Navigate 遇见这个组件就会跳转
- 编程式导航 `const navigate = useNavigate()`

传参方式仍然是：

- 问号传参

  ```jsx
  const navigate = useNavigate();
  navigate({
    pathname: '/c',
    search: '?id=1&name=fa',
  });
  navigate('/c?id=1&name=fa', { replace: true });
  ```

  ```jsx
  const location = useLocation();
  const usp = new URLSearchParms(location.search);
  console.log(usp.get('id'), usp.get('name'));

  // 或者
  const [usp] = useSearchParms();
  console.log(usp.get('id'), usp.get('name'));
  ```

路径传参

同样需要先在 route 里面对路径进行处理 `path="/c/:id?"/:name?`

```jsx
const navigate = useNavigate();
navigate(`/c/100/tt`);
```

```jsx
const parms = useParms();
console.log(parms); // {id:100,name:tt}
```

隐式传参(注意在 V6 中即使刷新了也还存在 state 信息)

```jsx
const navigate = useNavigate();
navigate('/c', {
  replace: true,
  state: {
    id: 100,
    name: 'xx',
  },
});
```

```jsx
const location = useLocation();
console.log(location.state);
```

:::info
在 V6 中常用的 Hook 为 useNavigate ，替代 V5 中的 useHistory。useLocation,获取 location 对象信息（pathname,search,state）。

useSearchParms,V6 新增 Hook，获得问号传参信息，取到的就是一个 URLSearchParms 对象。useParms，获取路径参数匹配信息。
:::

### 3. 路由表及统一管理

./router/index.js

```jsx
import { Suspense } from 'react';
import routes from './routes';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParms,
  useSearchParms,
} from 'react-router-dom';

// 统一渲染的组件:在这里可以做一些事情
// 权限，登录校验，传递属性
const Element = function Element(props) {
  let { component: Component } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const parms = useParms();
  const [usp] = useSearchParms();
  // 最后要渲染的
  return (
    <Component
      navigate={navigate}
      location={location}
      parms={parms}
      usp={usp}
    />
  );
};

// 递归创建 Route
const createRoute = function createRoute(routes) {
  return (
    <>
      {routes.map((item, index) => {
        let { path, children } = item;
        {
          /* 每一次路由匹配成功，不直接渲染组件，而是渲染Element，在Element中做一些特殊处理后再去渲染我们真实要渲染的组件 */
        }
        return (
          <Route key={index} path={path} element={<Element {...item} />}>
            {Array.isArray(children) ? createRoute(children) : null}
          </Route>
        );
      })}
    </>
  );
};
// 路由容器
export default function RouterView() {
  return (
    <Suspense fallback={<>正在处理中</>}>
      <Routes>{createRoute(routes)}</Routes>;
    </Suspense>
  );
}

// 创建 withRouter
export const withRouter = function withRouter(Component) {
  return function Hoc(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const parms = useParms();
    const [usp] = useSearchParms();
    return (
      <Component
        navigate={navigate}
        location={location}
        parms={parms}
        usp={usp}
        {...props}
      />
    );
  };
};
```

./router/routes.js

```jsx
import { Navigate } from 'react-router-dom';
import A from '../views/A';
// A板块的二级路由
const aRoutes = [
  {
    path: '/a',
    component: () => <Navigate to='/a/a1' />,
  },
  {
    path: '/a/a1',
    name: 'a-a1',
    component: lazy(() =>
      import(/* webpackChunkName:AChild */ '../views/a/A1')
    ),
    meta: {},
  },
  {
    path: '/a/a2',
    name: 'a-a2',
    component: lazy(() =>
      import(/* webpackChunkName:AChild */ '../views/a/A2')
    ),
    meta: {},
  },
  {
    path: '/a/a3',
    name: 'a-a3',
    component: lazy(() =>
      import(/* webpackChunkName:AChild */ '../views/a/A3')
    ),
    meta: {},
  },
];

// 一级路由
const routes = [
  {
    path: '/',
    // component:<Navigate/> 不能直接这样写，遇见该组件后就跳转了
    component: () => <Navigate to='/a' />,
  },
  {
    path: '/a',
    name: 'a',
    component: A, // 这样写是导入没调用，但如果这样写 <A/>就是导入调用了
    meta: {},
    children: aRoutes,
  },
  {
    path: '/b',
    name: 'b',
    component: lazy(() => import('../view/B')),
    meta: {},
  },
  {
    path: '/c/:id?/:name?',
    name: 'c',
    component: lazy(() => import('../view/C')),
    meta: {},
  },
  {
    path: '*',
    component: () => (
      <Navigate
        to={{
          pathname: '/a',
          search: '?from=404',
        }}
      />
    ),
  },
];
export default routes;
```
