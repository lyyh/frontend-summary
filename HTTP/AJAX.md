## 常见问题
- 后端返回200,jquery ajax 进入error方法：返回数据类型与dataType不匹配
## Jquery
表单请求配置：
```
const AjaxForm = ({ url, type = 'GET', params = {} }) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      type: type,
      data: params,
      dataType: 'json',
      success: function(data) {
        console.log(data)
        console.log('success');
        resolve(data);
      },
      error: function(data) {
        console.log('error');
        reject(data);
      },
    });
  });
};
```
devtool->network
```
Form Data
ids: 1025;513
```

JSON字符串配置
```
const AjaxApplicationJSON = ({ url, type = 'GET', params = {} }) => {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: url,
			type: type,
			data: JSON.stringify(params),
			dataType: 'json',
			contentType: "application/json",
			success: function(data) {
				console.log('success');
				resolve(data);
			},
			error: function(data) {
				console.log('error');
				reject(data);
			},
		});
	});
};
```
devtool -> network
```
Request payload
{"page":1,"pageSize":10}
```

表单序列化配置
```
const AjaxApplicationJSON = ({ url, type = 'GET', params = {} }) => {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: url,
			type: type,
			data: JSON.stringify(params),
			dataType: 'json',
			contentType: "application/json",
			success: function(data) {
				console.log('success');
				resolve(data);
			},
			error: function(data) {
				console.log('error');
				reject(data);
			},
		});
	});
};
```
```
Request payload
page=1&pageSize=10
```

