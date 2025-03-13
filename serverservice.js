const express = require('express')
const cors = require('cors')
const userRoute = require('./routes/user.route')
require('dotenv').config()

const app = express()

const PORT = process.env.PORT

app.use('cors')
app.use(express.json())
app.use('/user', userRoute)

//เอาไว้เทสว่ารับ request/response ได้ไหม 
app.get('/', (request, response)=>{
    response.json({
        message : "Hello, welcome to server....SORAWIT"
    })
})

// สั่ง start web server โดยเปิด port รองรับการ request/response ตามที่กำหนดไว้
app.listen(PORT,()=>{
    // console.log("Server running on port" + PORT)
    // console.log('Server running on port' + PORT)
    console.log(`Server running on port ${PORT}`);
})
