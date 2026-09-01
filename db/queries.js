const pool = require("./pool");

async function createUser(username, password, firstName, lastName) {
  await pool.query("INSERT INTO users (username, password, first_name, last_name) VALUES ($1, $2, $3, $4)", [
    username,
    password,
    firstName,
    lastName,
  ]);

  console.log(pool.query("Select * from users"))
}

async function getUserByUsername(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
  return rows[0];
}

async function getUserById(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
}


async function getMessages(){
  const {rows} = await pool.query("Select * from messages order by timestamp desc");
  console.log(rows);
  return rows;
}

async function createMessage(title, textInput, id){
  await pool.query("insert into messages(text, title, author_id) Values($1, $2, $3)", 
    [textInput, title, id]
  )
}

module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
  getMessages,
  createMessage,
};
