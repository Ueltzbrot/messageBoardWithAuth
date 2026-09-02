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


async function checkPasscode(req, res){
  const {secretCode} = req.body;
  if(secretCode == process.env.MEMBERSECRET){
    const{id} = req.user;
    await db.giveMemberStatus(id);
    res.redirect("/messages")
  }
  else{
    res.redirect("/messages")
  }
}

async function deletePost(req, res){
  const messageId = req.params.id;
  await db.deletePost(messageId);
  res.redirect("/messages")
}

module.exports ={
    getMessages,
    newMessage,
    checkPasscode,
    deletePost,
} 