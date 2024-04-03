const { uploadFile } = require("../middleware/S3")
const usermodel = require("../modals/user")
const crypto = require("crypto")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')
exports.userlogin =async(req,res)=>{
    const {phone} =req.body
    try {
        const isphonealreadyexist =await usermodel.findOne({phone});
        if(!isphonealreadyexist){
            const newuser = await usermodel.create({phone});
            const token = jwt.sign({ _id: newuser?._id,}, process.env.TOKEN_KEY);
            newuser.token = token
            await newuser.save();
            return res.status(200).send({newuser:true,newuser});
        }
        else{
            return res.status(200).send({newuser:false,isphonealreadyexist})
        }
    } catch (error) {
        console.log("error in login register",error.message)
        return res.status(500).send({message:error.message})
    }
}

exports.userprofileupdate =async(req,res)=>{
    const {userName,phone,fullName,bio,imgurl} =req.body;
    const file = req.file;
    // b01772083bf77b64305c8ad51cba1b609dc32ffe7e9964da998720e08375d4e8
    const imageName = file ? generateFileName() : imgurl;
    const fileBuffer = file?.buffer;
    try {
        if (fileBuffer) {
            await uploadFile(fileBuffer, imageName, file.mimetype)
        }
        const dataupdated = await usermodel.findByIdAndUpdate({_id:req.user._id},{userName,phone,fullName,bio,imgname:imageName},{new:true})
        dataupdated.profileImage = "https://d3bjtrjgvxo65.cloudfront.net/" + data.imgname
        await dataupdated.save();
        return res.status(200).send({updated:true,dataupdated})
    }catch (error) {
        console.log(error)
    }
}

exports.updateusername =async(req,res)=>{
    try {
        const {username}=req.body
        const updateddata = await usermodel.findByIdAndUpdate({_id:req.user._id},{userName:username},{new:true})
        return res.status(200).send(updateddata)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

exports.usergetallphonenumbers =async(req,res)=>{
    try {
    const data = await usermodel.find({_id:{$ne:req.user._id}}).select("phone")
    return res.status(200).send(data)
    } catch (error) {
       console.log(error)
       return res.status(500).send(error.message)
}
}
