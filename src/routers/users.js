const express = require('express')
const User = require('../models/UserModel')
const cors = require('cors')
const route = express.Router()

route.post('/signup',cors(),async (req, res) => {
    
    let user = new User(req.body)
    await user.save()
    .then(()=>{
        res.status(201)
        res.send(user);
    })
    .catch((e)=>{
        res.status(400)
        res.send(e);
    })
})

route.put('/users/:id',cors(),async (req, res) => {
    const _id = req.params.id
    User.findByIdAndUpdate(_id,req.body)
    .then((value)=>{
        if(!value){
            return res.status(404).send()
        }
        res.send(value)
    })
    .catch((e)=>{
        res.status(500).send(e)
    })
})

route.delete('/users/:id',cors(),async (req, res) => {
    const _id = req.params.id
    User.findByIdAndDelete(_id,req.body)
    .then((value)=>{
        if(!value){
            return res.status(404).send()
        }
        res.status(200).json({"success":"User-DELETED"})
    })
    .catch((e)=>{
        res.status(500).send(e)
    })
})

route.get('/users',cors(),async (req, res)=>{
    await User.find({})
    .then((value)=>{
        res.send(value)
    })
    .catch((e)=>{
        res.status(500)
        res.send(e)
    })
})

route.get('/users/:id',cors(),(req, res)=>{
    const _id = req.params.id
    User.findById(_id)
    .then((value)=>{
        if(!value){
            return res.status(404).send()
        }
        res.send(value)
    })
    .catch((e)=>{
        res.status(500).send(e)
    })
})

module.exports = route