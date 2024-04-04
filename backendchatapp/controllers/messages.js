const MessageModel = require('../modals/messages');
const ChatModel = require('../modals/chats');

const sendMessage = async (req, res) => {
    const { chatId, text,receiverId, type,time } = req.body
    try {
        const newMessage = await MessageModel.create({
            text,
            chatId,
            time,
            user: req.user._id
        })
        const chatUpdate = await ChatModel.findByIdAndUpdate(chatId, {
            latestMessage: text
        }, {
            new: true
        }).populate({
            path:"users",
            select:"userName"
        })
        res.send({
            data: newMessage,
            roomData: chatUpdate,
            status: true,

        })
    } catch (error) {
        res.status(403).json({ status: false, error: error })
    }
}


const myMessages = async (req, res) => {
    const chatId = req.body.chatId
    console.log(chatId)
    const page = parseInt(req.query.pag3) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit 
    try {
        const messages = await MessageModel.find({
            chatId: chatId
        }).populate({
            path: "user",
            select:"userName"
        }).sort({createdAt: -1})
        res.send({
            data: messages,
            status: true,
        })
    } catch (error) {
        res.status(403).json({ status: false, error: error })
    }
}


module.exports = {
    sendMessage,
    myMessages
}
