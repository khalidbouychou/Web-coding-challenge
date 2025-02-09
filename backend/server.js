const express = require('express')
const app = express()
const handelcors = require('cors')
// const dbmongo = require('mongoose')


app.use(handelcors({
    origin: 'http://localhost:3000',
}))


app.get('/', function (req, res) {
  res.send('---------------- Hello From Backend ------------- ')
})

app.get('/api/allTasks' , (req,res) => {
    res.send("this is your Tasks")
})

app.post('/api/addTask',(req,res)=>{
    res.send('task added successfully')
})

app.post('/api/allTasks/:id',(req,res)=>{
    res.send('task deleted successfully')
})

app.put('/api/allTasks/:id',(req,res)=>{
    res.send('task updated successfully')
})



app.listen(3000,() => console.log("-------------- im listening on port 3000 just go work --------------"))