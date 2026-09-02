const {Router} = require('express');
const messageRouter = Router();
const {getMessages, newMessage, checkPasscode, deletePost} = require("../controllers/messageController")
const {isAuth, isAdmin} = require("./authMiddleware")



messageRouter.get("/", isAuth, getMessages);
messageRouter.post("/", isAuth, newMessage);
messageRouter.post("/passcode", isAuth, checkPasscode);
messageRouter.post("/:id/deletePost", isAdmin, deletePost);

module.exports = messageRouter;