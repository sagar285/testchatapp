const mongoose =require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/newchatapp').then(()=>{
    console.log("connetion succefull")
}).catch((e)=>{
    console.log(e)
})