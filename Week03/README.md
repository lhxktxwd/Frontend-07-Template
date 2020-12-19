学习笔记

本章知识点

1.正则表达式

2.四则运算语法分析算法
（1）ll算法，程序从左往右处理代码，从左往右进行预测推倒,  将加减乘除以嵌套的方式展示出来.
 (2) 设定加法(<AdditiveExpression>)是一种特殊的乘法，即<MultipliativeExpression>+<MultipliativeExpression>来表示加法
 (3) 设定乘法以<MultipliativeExpression>开头，<Number>结尾，或者是一个单独的<Number>
加减表达式统称为AdditiveExpression
乘除表达式统称为MultipliativeExpression

词法定义：
表达式的表现形式
<Expression>
>><AdditiveExpression><EOF>

假发运算的表现形式
```
<AdditiveExpression>
>><MultipliativeExpression>
>><AdditiveExpression>+<MultipliativeExpression>
>><AdditiveExpression>-<MultipliativeExpression>
```

乘法运算表现形式
```
<MultipliativeExpression>
>><Number>
>><MultipliativeExpression>*<Number>
>><MultipliativeExpression>/<Number>
```


本章核心：
1.regexp.exec
RegExp 对象是有状态的。他们会将上次成功匹配后的位置记录在 lastIndex 属性中。使用此特性，exec() 可用来对单个字符串中的多次匹配结果进行逐条的遍历.
在遍历过程中字符串通过自定义的映射来形成字符串对应设定类型数组。
2.通过类型数组和之前的词法定义来进行词法分析形成想要的ast结果。