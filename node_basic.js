const logger=require('./logger')
const path=require('path')
const os=require('os')
const fs=require('fs')
const http=require('http')

// logger.log("Hello world")  //recieving in a obj
//logger("hello world")  //recieve only the func

//1. path module
// console.log(__filename)
// console.log(__dirname)
// var pathObj=path.parse(__filename) //path module gives info about the path
// console.log(pathObj)

//2.os module
// var totalMemory=os.totalmem();
// var freeMemory=os.freemem();
// console.log(`Total memory is: ${totalMemory}, and free memory is: ${freeMemory}`)

// //3.file system
// fs.readdir('./',(err, data)=>{
//     err?console.log(err):console.log(data)
// })


//4.http= used to create server
const server=http.createServer((req,res)=>{
    if(req.url==='/'){
        res.write("hello world")
        res.end()
    }
});
// server.on('connection',(socket)=>{
//     console.log("new connection")
// })
server.listen(3000);
console.log("listening on port")