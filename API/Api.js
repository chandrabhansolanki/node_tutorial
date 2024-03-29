const express = require('express')
const dbConnect = require('./mongodb')
const mongodb = require("mongodb")
const app = express()
app.use(express.json())

app.get('/' ,async (req, res) => {
    let data = await dbConnect()
    data = await data.find().toArray()
    console.log(data);
    res.send(data)
})


app.post('/',async (req, res)=>{
    let data = await dbConnect()
    let result =await data.insertOne(req.body)
    res.send(result)
})

// these how we can update data with query params

app.put('/:name', async (req, res) =>{
    let data = await dbConnect()
    let result = await data.updateMany({name: req.params.name}, {$set:req.body})
    res.send(result)
})


app.delete('/:id', async(req, res)=>{
    console.log(req.params.id);
    let data = await dbConnect()
    let result = await data.deleteOne({_id:new mongodb.ObjectId(req.params.id)})
    res.send(result)
})
app.listen(5000)
