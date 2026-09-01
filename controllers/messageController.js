const db = require("../db/queries");
const { timeAgo } = require('../utils/helper');

async function getMessages(req, res){
  const messages = await db.getMessages();
  const formatted = messages.map(m => ({
    ...m,
    timeAgo: timeAgo(m.timestamp)
  }));
  res.render("messages", { messages: formatted });
}

async function newMessage(req,res){
    const {title, textInput} = req.body;
    const{id} = req.user;
    await db.createMessage(title, textInput, id);
    res.redirect("/messages")
}

module.exports ={
    getMessages,
    newMessage
} 