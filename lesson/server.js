const http = require('http')
const fs = require('fs')
const port = 3000
const hostname = '127.0.0.1'

const handleReadFile = (fileName, statusCode) => {
    fs.readFile(fileName,(err,data) => {
        if(err){
            console.log(err);
        }
        else{
            res.writeHead(statusCode ,{'content-type':'text/html'})
            res.write(data)
            res.end();
        }
    })
}

const myServer = http.createServer((req,res) => {
    if (req.url === '/'){
        handleReadFile('/index.html', 200, req, res)
    }
    else if (req.url === '/about'){
        handleReadFile('/about.html', 200, req, res)
    }
    else if (req.url === '/contact'){
        handleReadFile('/contact.html', 200, req, res)
    }
    else{
        
    }
})

myServer.listen(port, hostname, ()=>{
    console.log(`server is successfully running at http://${hostname}:${port}`);
})