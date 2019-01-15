/**
 * Created by anserliu on 2019/1/15.
 */
// 最基础的订阅发布模式
//	买房者与售楼处
const salesOffices = {
	clientList: [], // 缓存列表
	listen: function (fn) {
		this.clientList.push(fn)
	},
	trigger: function () {
		for(let fn of this.clientList){
			fn.apply(this,arguments)
		}
	}
}

salesOffices.listen(function (price,squareMeter) {
	console.log(`价格=${price}`)
	console.log(`平方米=${squareMeter}`)
})

salesOffices.trigger(100,100)