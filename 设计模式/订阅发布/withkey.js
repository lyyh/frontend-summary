/**
 * Created by anserliu on 2019/1/15.
 */
const salesOffices = {
	clientList:[],
	listen:function (key,fn) {
		if(!this.clientList[key]){
			this.clientList[key] = []
		}
		this.clientList[key].push(fn)
	},
	trigger:function () {
		const key = Array.prototype.shift.call(arguments)
		const fns = this.clientList[key]

		if(!fns || fns.length===0){ // 如果没有订阅该消息，则返回
			console.log(`Expection:没有订阅 ${key} 消息`)
			return
		}

		for(let fn of fns){
			fn.apply(this,arguments)
		}
	}
}

salesOffices.listen('hahah',function () {
	console.log(arguments)
})

salesOffices.trigger('hahah','a','b')
salesOffices.trigger('aaa','a','b')
