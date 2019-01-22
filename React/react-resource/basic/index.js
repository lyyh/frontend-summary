/**
 * @author liuyanhao
 * @date 2018-12-23
 * @Description:
 */
/** @jsx DiyReact.createElement */
//
// const DiyReact = importFromBelow();
//
// const randomLikes = () => Math.ceil(Math.random() * 100);
//
// const stories = [
//     {name: "React", url: "https://reactjs.org/", likes: randomLikes()},
//     {name: "Node", url: "https://nodejs.org/en/", likes: randomLikes()},
//     {name: "Webpack", url: "https://webpack.js.org/", likes: randomLikes()}
// ];
//
// const ItemRender = props => {
//     const {name, url} = props;
//     return (
//         <a href={url}>{name}</a>
// );
// };
//
// class App extends DiyReact.Component {
//     render() {
//         return (
//             <div>
//             <h1>DiyReact Stories</h1>
//         <ul>
//         {this.props.stories.map(story => {
//             return <Story name={story.name} url={story.url} />;
//         })}
//     </ul>
//         </div>
//     );
//     }
//
//     componentWillMount() {
//         console.log('execute componentWillMount');
//
//     }
//
//     componentDidMount() {
//         console.log('execute componentDidMount');
//     }
//
//     componentWillUnmount() {
//         console.log('execute componentWillUnmount');
//     }
// }
//
// class Story extends DiyReact.Component {
//     constructor(props) {
//         super(props);
//         this.state = { likes: Math.ceil(Math.random() * 100) };
//     }
//     like() {
//         this.setState({
//             likes: this.state.likes + 1
//         });
//     }
//     render() {
//         const { name, url } = this.props;
//         const { likes } = this.state;
//         const likesElement = <span />;
//         const itemRenderProps = {name, url};
//         return (
//             <li>
//             <button onClick={e => this.like()}>{likes}<b>❤️</b></button>
//         <ItemRender {...itemRenderProps} />
//         </li>
//     );
//     }
//
//     // shouldcomponentUpdate() {
//     //   return true;
//     // }
//
//     componentWillUpdate() {
//         console.log('execute componentWillUpdate');
//     }
//
//     componentDidUpdate() {
//         console.log('execute componentDidUpdate');
//     }
//
// }
//
// DiyReact.render(<App stories={stories} />, document.getElementById("root"));

/* 🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼 */

/*
* element 描述节点
* instance 实例
* */
// 描述dom节点
// {
//     type: 'button',
//     props: {
//         className: 'button button-blue',
//             children: {
//             type: 'b',
//                 props: {
//                 children: 'OK!'
//             }
//         }
//     }
// }
// 描述组件实例
// {
//     type: Button,
//     props: {
//         color: 'blue',
//             children: 'OK!'
//         }
// }

function importFromBelow() {
    const TEXT_ELEMENT = 'TEXT_ELEMENT';

    /*
    * 更新dom节点属性
    * 更新dom节点监听器
    * */
    function updateDomProperties(dom, prevProps, nextProps) {
        const isEvent = name => name.startsWith("on");
        const isAttribute = name => !isEvent(name) && name != "children";

        // Remove event listeners
        Object.keys(prevProps).filter(isEvent).forEach(name => {
            const eventType = name.toLowerCase().substring(2);
            dom.removeEventListener(eventType, prevProps[name]);
        });

        // Remove attributes
        Object.keys(prevProps).filter(isAttribute).forEach(name => {
            dom[name] = null;
        });

        // Set attributes
        Object.keys(nextProps).filter(isAttribute).forEach(name => {
            dom[name] = nextProps[name];
        });

        // Add event listeners
        Object.keys(nextProps).filter(isEvent).forEach(name => {
            const eventType = name.toLowerCase().substring(2);
            dom.addEventListener(eventType, nextProps[name]);
        });
    }

    let rootInstance = null;
    function render(element, parentDom) {
        const prevInstance = rootInstance;
        const nextInstance = reconcile(parentDom, prevInstance, element);
        rootInstance = nextInstance;
    }

    /*
    * 对比虚拟dom节点异同
    * 在父节点下新增、修改、删除节点
    * */
    function reconcile(parentDom, instance, element) {
        // 组件装载
        if (instance === null) {
            const newInstance = instantiate(element);
            // componentWillMount
            newInstance.publicInstance
            && newInstance.publicInstance.componentWillMount
            && newInstance.publicInstance.componentWillMount();
            parentDom.appendChild(newInstance.dom);
            // componentDidMount
            newInstance.publicInstance
            && newInstance.publicInstance.componentDidMount
            && newInstance.publicInstance.componentDidMount();
            return newInstance;
        // 删除子组件
        } else if (element === null) {
            // componentWillUnmount
            instance.publicInstance
            && instance.publicInstance.componentWillUnmount
            && instance.publicInstance.componentWillUnmount();
            parentDom.removeChild(instance.dom);
            return null;
        // 替换组件
        } else if (instance.element.type !== element.type) {
            const newInstance = instantiate(element);
            // componentDidMount
            newInstance.publicInstance
            && newInstance.publicInstance.componentDidMount
            && newInstance.publicInstance.componentDidMount();
            parentDom.replaceChild(newInstance.dom, instance.dom);
            return newInstance;
        // dom节点类型组件
        } else if (typeof element.type === 'string') {
            updateDomProperties(instance.dom, instance.element.props, element.props);
            instance.childInstances = reconcileChildren(instance, element);
            instance.element = element;
            return instance;
        // 子组件更新
        } else {
            if (instance.publicInstance
                && instance.publicInstance.shouldcomponentUpdate) {
                if (!instance.publicInstance.shouldcomponentUpdate()) {
                    return;
                }
            }
            // componentWillUpdate
            instance.publicInstance
            && instance.publicInstance.componentWillUpdate
            && instance.publicInstance.componentWillUpdate();
            instance.publicInstance.props = element.props;
            const newChildElement = instance.publicInstance.render();
            const oldChildInstance = instance.childInstance;
            const newChildInstance = reconcile(parentDom, oldChildInstance, newChildElement);
            // componentDidUpdate
            instance.publicInstance
            && instance.publicInstance.componentDidUpdate
            && instance.publicInstance.componentDidUpdate();
            instance.dom = newChildInstance.dom;
            instance.childInstance = newChildInstance;
            instance.element = element;
            return instance;
        }
    }

    //对比子组件数量
    function reconcileChildren(instance, element) {
        const {dom, childInstances} = instance;
        const newChildElements = element.props.children || [];
        const count = Math.max(childInstances.length, newChildElements.length);
        const newChildInstances = [];
        for (let i = 0; i < count; i++) {
            newChildInstances[i] = reconcile(dom, childInstances[i], newChildElements[i]);
        }
        return newChildInstances.filter(instance => instance !== null);
    }

    /*
    * 组件实例化
    * 返回组件实例
    * instance = {element, dom, childInstances}
    * */
    function instantiate(element) {
        const {type, props = {}} = element;

        const isDomElement = typeof type === 'string';
        const isClassElement = !!(type.prototype && type.prototype.isReactComponent);
        //普通dom节点
        if (isDomElement) {
            // 创建dom
            const isTextElement = type === TEXT_ELEMENT;
            const dom = isTextElement ? document.createTextNode('') : document.createElement(type);

            // 设置dom的事件、数据属性
            updateDomProperties(dom, [], element.props);
            const children = props.children || [];
            // 使用递归获得所有子节点实例
            const childInstances = children.map(instantiate);
            // 从组件实例中获取dom节点对象
            const childDoms = childInstances.map(childInstance => childInstance.dom);
            // 对父节点依次插入子节点
            childDoms.forEach(childDom => dom.appendChild(childDom));
            const instance = {element, dom, childInstances};
            return instance;
        // 类组件
        } else if (isClassElement) {
            const instance = {};
            const publicInstance = createPublicInstance(element, instance);
            // 得到child element
            const childElement = publicInstance.render();
            const childInstance = instantiate(childElement);
            Object.assign(instance, {dom: childInstance.dom, element, childInstance, publicInstance});
            return instance;
        } else {
            const childElement = type(element.props);
            const childInstance = instantiate(childElement);
            const instance = {
                dom: childInstance.dom,
                element,
                childInstance
            };
            return instance;
        }
    }

    /*
    * 创建文本节点
    * */
    function createTextElement(value) {
        return createElement(TEXT_ELEMENT, {nodeValue: value});
    }

    /*
    * 创建element
    * children：dom节点、组件、文本节点
    * */
    function createElement(type, props, ...children) {
        props = Object.assign({}, props);
        props.children = [].concat(...children)
            .filter(child => child != null && child !== false)
            .map(child => child instanceof Object ? child : createTextElement(child));
        return {type, props};
    }

    // 对类实例化
    // 传入props
    // 设置internalInstance
    function createPublicInstance(element, instance) {
        const {type, props} = element;
        const publicInstance = new type(props);
        publicInstance.__internalInstance = instance;
        return publicInstance;
    }

    class Component {
        constructor(props) {
            this.props = props;
            this.state = this.state || {};
        }
        // partial局部的
        setState(partialState) {
            this.state = Object.assign({}, this.state, partialState);
            // update instance
            const parentDom = this.__internalInstance.dom.parentNode;
            const element = this.__internalInstance.element;
            reconcile(parentDom, this.__internalInstance, element);
        }
    }

    Component.prototype.isReactComponent = {};

    return {
        render,
        createElement,
        Component
    };
}
