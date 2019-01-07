# XSS注入
## React转义
React为了预防XSS注入，会自动将字符串转义成文本内容，无需主动关心填充的字符串是否含特殊非法符号

## dangerouslySetInnerHTML
如果想阻止自动转义，在React中呈现HTML内容，则使用`dangerouslySetInnerHTML={{ __html: message.text }}`，
有助于在代码审查时重视它

## href注入攻击
`<a href={user.website}>`website 为`'javascript: stealYourPassword()'`的情况

## 常见安全问题
`...`运算符`<div {...props}>`也很危险：
1. 提示`React does not recognize the `titleClassName` prop on a DOM element.`意外的不识别React属性。
React规定原生HTML标签的自定义属性都应该小写

