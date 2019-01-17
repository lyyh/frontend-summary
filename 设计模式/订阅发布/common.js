/**
 * @author liuyanhao
 * @date 2019-01-18
 * @Description: 通用的订阅发布模式
 */
const event = {
    listenList:[],
    listen:function (key,fn) {
        if(!this.listenList[key]) this.listenList[key] = []
        this.listenList[key].push(fn)
    },
    trigger:function () {
        const key = Array.prototype.shift.call(arguments)
        const fns = this.listenList[key]

        if(!fns || fns.length===0)return false// 没有对该key监听

        for(let i = 0,fn;fn=fns[i++];){
            fn.apply(this,arguments)
        }
    },
    remove:function () {
        const key = arguments[0]
        const fn = arguments[1]

        const fns = this.listenList[key]
        if(!fns)return false

        !fn && (fns.length = 0 ) // 移除所有key监听

        for(let i = fns.length-1;i>=0;i--) { // 反向遍历，因为涉及到数组删除遍历
            if (fn == fns[i]) fns.splice(i, 1)
        }
    }
}

function initEvent(target) {
    for(let p in event){
        if(event.hasOwnProperty(p)) target[p] = event[p]
    }
    return target
}

const salesOffice = {}
const salesOfficeEvent = initEvent(salesOffice)
let fn1
salesOfficeEvent.listen('aaa',fn1 = function () {
    console.log('aaa')
})
salesOfficeEvent.trigger('aaa')
salesOfficeEvent.remove('aaa',fn1)
salesOfficeEvent.trigger('aaa')
