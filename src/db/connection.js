const mongoose = require('mongoose')

const URI = 'mongodb+srv://trideep123:trideep123@cluster0.ponh1.mongodb.net/test?retryWrites=true&w=majority'

const connectDB = async ()=>{
    await mongoose.connect(URI,{useNewUrlParser: true,useUnifiedTopology: true})
    console.log('DB connection established')
}

module.exports = connectDB