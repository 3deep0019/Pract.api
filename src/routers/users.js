const express = require('express')
const User = require('../models/UserModel')
const cors = require('cors')
const route = express.Router()
const jwt = require('jsonwebtoken');


var corsOptions ={
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}
route.post('/signup',cors(corsOptions),async (req, res) => {
    
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

route.put('/users/:id',cors(corsOptions),async (req, res) => {
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

route.delete('/users/:id',cors(corsOptions),async (req, res) => {
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

route.get('/users',cors(corsOptions),async (req, res)=>{
    await User.find({})
    .then((value)=>{
        res.send(value)
    })
    .catch((e)=>{
        res.status(500)
        res.send(e)
    })
})

route.get('/users/:id',cors(corsOptions),(req, res)=>{
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

route.get('/tokenString',cors(corsOptions),(req,res)=>{
    res.send(_tokenGenerator())
})

const _tokenGenerator = () => {
    const accessToken = {
        ExpiresAt: Date.now() + 15 * 24 * 60 * 60 * 1000,
        Type: 'Application',
    };
    accessToken.TokenString = jwt.sign(accessToken, 'MDA3IDAwNyAwMDcgMDA3', {
        algorithm: 'HS256',
    });
    return accessToken;
};

module.exports = route