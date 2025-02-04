const express = require('express');
const userRouter = require('./routes/user.route')
const app = express();
const bodyParser = require('body-parser')

app.use('/api/user',userRouter)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/views/index.html')
})

app.get('/triangle',(req,res)=>{
    res.sendFile(__dirname + '/views/triangle.html')
})

app.get('/circle',(req,res)=>{
    res.sendFile(__dirname + '/views/circle.html')
})

app.post('/triangle',(req,res)=>{
    const {base, height} = req.body;
    const result = base*height/2
    res.send(`The area of triangle is ${result}`)
})
app.post('/circle',(req,res)=>{
    const {radius} = req.body;
    const result = 3.1416*radius*radius
    res.send(`The area of circle is ${result}`)
})

app.post('/register',(req,res)=>{
    const {fullname, age} = req.body;
    res.send(`welcome ${fullname}. You are ${age}`)
    res.send('Hello')
})

app.use((req, res) => {
    res.send("<h1>404! not found</h1>")
})

module.exports = app