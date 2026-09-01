const {Router} = require('express');
const messageRouter = Router();
const {getMessages, newMessage} = require("../controllers/messageController")



messageRouter.get("/", getMessages);
messageRouter.post("/", newMessage);

module.exports = messageRouter;