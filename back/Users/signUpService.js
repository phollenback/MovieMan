const db = require('../config/db'); // Import the database module

function checkUser(username) {
    return new Promise((resolve, reject) => {
        const userCheck = "SELECT COUNT(*) AS count FROM users WHERE username = ?";
        db.execute(userCheck, [username], (err, results) => {
            if (err) {
                console.error('Error checking user:', err);
                return reject(err);
            }
            const count = results[0].count; // Access the count from the result
            resolve(count > 0);
        });
    });
}

function createUser(username, password) {
    return new Promise((resolve, reject) => {
        const userAdd = "INSERT INTO users (username, password) VALUES (?, ?)";
        db.execute(userAdd, [username, password], (err, results) => {
            if (err) {
                console.error('Error creating user:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

module.exports = { checkUser, createUser };