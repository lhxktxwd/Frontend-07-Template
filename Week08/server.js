const http = require('http')

http.createServer((request,response)=>{
    let body=[]
    request.on('error',(err)=>{
        console.log('err',err);
    })
    request.on('data',(chunk)=>{
        body.push(chunk)
    })
    request.on('end',()=>{
        body = Buffer.concat(body).toString()
        console.log('body',body);
        response.writeHead(200,{'Content-type':'text/html'})
        response.end('Hello world\n')
    })
}).listen(8080)

console.log('server started');