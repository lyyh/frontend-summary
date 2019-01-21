var source = {
	a:{b:1},
	c:Array.of(1,2,3,4),
	d:function () {
		return true
	}
}

var shallowClone = (source) => {
	var target = {}
	for(var key in source){
		if(Object.prototype.hasOwnProperty.call(source,key)){
			target[key] = source[key]
		}
	}

	return target
}

// 利用递归实现深拷贝
var deepClone = (source) => {
	var target = {}
	for(var key in source){
		if(Object.prototype.hasOwnProperty.call(source,key)){
			if(typeof source[key] === 'object'){
				target[key] = deepClone(source[key])
			}else{
				target[key] = source[key]
			}
		}
	}
	return target
}

console.log(deepClone(source))

// 兼容数组的写法
var isObject = (target) => {
	return
}
var deepCloneWithArray = source => {
	var target = {}
	for(var key in source){
		if(Object.prototype.hasOwnProperty.call(source,key)){
			if(typeof source[key] === 'object'){
				target[key] = deepClone(source[key])
			}else{
				target[key] = source[key]
			}
		}
	}
	return target
}