const db = require("../db/queries");

async function getMessages(req, res){
    const messages = await db.getMessages();
    res.render("messages", {messages: messages});
}

module.exports ={
    getMessages,
} 