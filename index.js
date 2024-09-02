const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')

const TodoModel = require('./model/todo')
const app= express()

app.use(cors())
app.use(express.json)

mongoose.connect('mongodb://127.0.0.1:27017/test')
app.get('/get',(req,res) => {
    const task=req.body.task;
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
    console.log("done")
})
app.put('/update/:id',(req,res)=> {
    const {id}=req.params;
    console.log(id);
    TodoModel.findByIdAndUpdate({_id:id},{done:true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})
app.delete('/delete/:id',(req,res)=> {
    const {id}=req.params;
    console.log(id);
    TodoModel.findByIdAndDelete({_id:id},{done:true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})
app.post('/add',(req,res) => {
    const task=req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err))
    console.log("done")
})

const PORT=process.env.port || 5000
 app.listen(PORT,() =>{
    console.log(`server is ruuning on ${PORT}`)
 })