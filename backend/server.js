const express = require('express')
const app = express()
const handelcors = require('cors')
// const dbmongo = require('mongoose')


app.use(handelcors({
    origin: 'http://localhost:3000',
}))


app.get('/', function (req, res) {
  res.send('- Hello From Backend -') 
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


const port_front = process.env.PORT || 8000
app.listen(port_front,() => console.log(`- Im listening on port ${port_front} just go work -`))