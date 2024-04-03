const express =require("express")
require("./conn/connection")
const userRoute  = require("./routes/user")
const chatRoute  = require("./routes/chats")
const messageRoute  = require("./routes/messages")
const app =express()
const dotenv = require("dotenv")
dotenv.config()
app.use(express.json())
app.use(userRoute);
app.use(chatRoute);
app.use(messageRoute);





app.listen(3000,()=>{
    console.log(`server listening on port no 3000`)
})
