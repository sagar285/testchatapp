
const { sendMessage, myMessages } = require("../controllers/messages");
const verifyToken = require("../middleware/auth");

const router = require("express").Router()


router.post("/sendmessage",verifyToken,sendMessage);
router.post("/mymessages",verifyToken,myMessages);

module.exports =router