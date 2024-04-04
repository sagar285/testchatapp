const express =require("express")
const { Server } = require("socket.io");
require("./conn/connection")
const userRoute  = require("./routes/user")
const chatRoute  = require("./routes/chats")
const messageRoute  = require("./routes/messages")
const http = require('http')
const chatSocket = require("./socket");

const app =express()
const server = http.createServer(app) 
const dotenv = require("dotenv")
dotenv.config()
app.use(express.json())
app.use(userRoute);
app.use(chatRoute);
app.use(messageRoute);

const io = new Server(server, {
    cors: {
      origin: "*"
    }
  })

  chatSocket(io)



  server.listen(3000, () => {
    console.log(`Server is listening at http://localhost:3000`);
  });
