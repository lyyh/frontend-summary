## Fiber 架构（异步渲染）
### 背景
早期的 Stack 架构分为两个阶段：调度阶段（Reconcile）、渲染阶段（Renderer）
- Reconcile:自顶向下的递归算法，遍历节点生成 Virtual DOM，通过 Diff 算法找到需要更新的元素
放到更新队列中，整个过程占用主线程（javascript单线程），阻塞用户交互、动画等周期性任务，造成页面卡顿（同步渲染）
- Renderer:在浏览器中更新对应的DOM元素
- Fiber v16 引入（异步渲染）

### 优化原理
任务拆分调度，即将一个耗时任务分成多个任务片，每个任务片处理更新一个节点，处理完后再把控制权交给主线程，
由主线程控制任务执行，避免出现之前长期占用线程状态，从而实现对任务的暂停、恢复、复用灵活控制，这样主线程上的用户交互及动画可以快速响应，从而解决卡顿的问题。

### Fiber数据结构
```js
export type Fiber = {
  tag: TypeOfWork,
  key: null | string,
  type: any,

  return: Fiber | null,
  child: Fiber | null,
  sibling: Fiber | null,

  effectTag: TypeOfSideEffect,
  nextEffect: Fiber | null,
  firstEffect: Fiber | null,
  lastEffect: Fiber | null,

  alternate: Fiber | null,
  stateNode: any,
  ...
}
```
在virtualDOM基础上增加了一层 Fiber Node，主要是将递归遍历变成循环遍历。
所有Fiber Node连接起来形成一个单链表结构。


### 实现原理的背后API
requestIdleCallback，作用是为了在浏览器空闲时依次调用低优先级任务的函数
### 控制权交付原理


### 新的替换API
原因：在调度阶段时间分片可能会被用完，被中断和恢复的（重头再来），所以导致会多次执行 componentWillMount、componentWillReceiveProps、componentWillUpdate
造成跟预期不一致

- static getDerivedStateFromProps  
触发时期：获取新的props或者setState等组件渲染时触发  
主要取代 ComponentWillXXX 等 render 之前生命周期，不能使用this指针，解除此类生命周期带来的副作用。
- getSnapshotBeforeUpdate
render之后 componentDidxxx 之前，但是可以获取到dom节点信息

因为componentWillXXX可能会被调用多次，如果在其中进行ajax，可能会导致多次重复的请求，所以禁止在此类生命周期中做副作用操作

- getDerivedStateFromError 在 Reconcile 阶段调用(render之前)
- componentDidCatch 在 Renderer 阶段调用(render之后)

区别：
1. 调用阶段不一样
2. componentDidCatch 是不会在服务器端渲染的时候被调用的 而 getDerivedStateFromError 会。

### Suspense
异步加载，代码分包
### Hooks
函数式组件

## 参考资料
[React Fiber架构](https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651229937&idx=1&sn=0d979f82318431171390af58d5f16195&chksm=bd4957758a3ede639ff66f148af0e744365f61f95f1b6fc7d4814e8f886a624da0d2eaaf20ab&mpshare=1&scene=23&srcid=01150aujDwYRsKarUVilDhkk#rd)
[React v16 新特性](https://segmentfault.com/a/1190000017483690)

