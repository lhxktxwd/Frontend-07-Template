学习笔记

设计http Reuqest
1.从用法开始设计
    (1）有一个config来自定义header，method等属性
    (2）有一个send方法发送请求
    (3)必须要有Content-type 和 Content-length属性才能进行http请求
    (4)发送格式 
    GET / HTTP/1.1
    Host:127.0.0.1
    Conetnt-type:application/x-www-form-urlencoded

    field1=1&field2=2