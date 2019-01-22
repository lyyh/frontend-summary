/**
 * @author liuyanhao
 * @date 2018-12-23
 * @Description:
 */
var DiyReact = importFromBelow()
class Foo extends DiyReact.Component{
    constructor(props){
        super(props)
        this.a = 1
    }
    render(){
        const {name} = this.props
        return DiyReact.createElement('a',{href:'http://baidu.com','data-id':name},'go to baidu')
    }
}
var element = DiyReact.createElement(Foo,{name:'aaa'})
DiyReact.render(element,document.getElementById('root'))
console.log(element)
