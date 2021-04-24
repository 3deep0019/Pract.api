const mongoose = require('mongoose')
const validator = require('validator')

const user = new mongoose.Schema({
    fullName:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required:true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email')
            }
        }
    },
    password:{
        type: String,
        required:true,
        minLength:8
    }
})

module.exports = User = mongoose.model('user',user)