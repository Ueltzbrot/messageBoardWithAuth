const {Router} = require('express');
const messageRouter = Router();

const {getMessages} = require("../controllers/messageController")



messageRouter.get("/", getMessages);


module.exports = messageRouter;