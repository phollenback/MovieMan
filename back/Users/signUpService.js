const db = require('../config/db') // Import the database module

function checkUser(username) {
    
    const userCheck = "SELECT CNT(*) FROM users WHERE username = ?"


    db.execute(userCheck, [username], (err, rows) =>{
        console.log(rows);
    })
}

function createUser(username,password) {
    
}


module.exports = { checkUser, createUser }