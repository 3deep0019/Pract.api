const express = require('express')
const connectDB = require('./db/connection')

connectDB()
const app = express()
const port = process.env.PORT || 2000

app.use(express.json({extended:false}))


app.use(require('./routers/users'))



app.listen(port,()=> console.log(`Server running at PORT ${port}`))