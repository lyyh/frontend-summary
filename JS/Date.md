## 常用技巧
### 比较两个小时、分钟大小
```
Date.prototype.setHours.apply(new Date(),arguments)
Date.prototype.setMinute.apply(new Date(),arguments)
```
返回的是UTC时间戳

