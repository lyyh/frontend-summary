# react-resource
react源码学习

## 架构
- reconcile(diff): 对比某个虚拟dom异同，新增、更新、删除组件节点
- instantiate: 实例化组件、dom节点
- createPublicInstance: 对类实例化
- reconcileChildren(diff children): 对比每个children虚拟dom异同
- updateDomProperties: 更新组件数据属性、监听器

## 执行顺序
1. createElement(type,props,...children)
根据children中的child类型返回文本节点或者子element
2. render(element,parentDom)
element:dom节点描述，parentDom父节点，调用reconcile对比实例前后状态的变化(diff)，生成新的实例
3. reconcile(parentDom,oldInstance,element)
组件装载：调用 instantiate 生成 newInstance，调用 componentWillMount 和 componentDidMount 声明周期函数
删除子组件：删除子组件
替换组件：
更新组件数据属性和事件监听器
子组件更新


