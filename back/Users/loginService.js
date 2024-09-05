const db = require('../config/db');

async function checkCred(username, password) {
    const query = "SELECT * FROM users WHERE username = ? AND password = ?";
    
    return new Promise((resolve, reject) => {
        db.execute(query, [username, password], (err, rows) => {
            if (err) {
                return reject(err); // Reject the promise if there's an error
            }

            if (rows.length > 0) {
                const user = rows[0];
                console.log('User:', user); // Log the user object

                // Resolve the promise with the user object
                resolve(user);
            } else {
                // No user found with the given credentials
                resolve(null);
            }
        });
    });
}

module.exports = { checkCred };