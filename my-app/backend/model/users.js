// Import databaseConfig
const db = require('../controller/databaseConfig');

let users = {
    // Retrieve one user from user ID
    getOneUser: (userId, callback) => {
        var connection = db.getConnection();
        connection.connect(err => {
            if (err) {
                console.error("Connection error: " + err.stack);
                return;
            } else {
                var sql = `SELECT * FROM users WHERE user_id=?`;

                connection.query(sql, userId, (err, results) =>{
                    connection.end();
                    if (err) {
                        console.error("SQL Error: " + err);
                        return callback(err, null);
                    } else {
                        return callback(null, results);
                    }
                });
            }
        });
    },

    editUserDetails: (userId, username, email, currentPw, newPw, callback) => {
        var connection = db.getConnection();
        connection.connect(err => {
            if (err) {
                console.log("Connection error: " + err);
            } else {
                if (currentPw && newPw) {
                    var sql = `UPDATE users
                        SET user_name=?, email=?, password=?
                        WHERE user_id=? AND password=?`;
                    connection.query(sql, [username, email, newPw, userId, currentPw], (err, results) => {
                        connection.end();
                        if (err) {
                            console.log("SQL Error: " + err);
                            return callback(err, null);
                        } else {
                            return callback(null, results);
                        }
                    });
                } else {
                    var sql = `UPDATE users
                        SET user_name=?, email=?
                        WHERE user_id=?`;
                    connection.query(sql, [username, email, userId], (err, results) => {
                        connection.end();
                        if (err) {
                            console.log("SQL Error: " + err);
                            return callback(err, null);
                        } else {
                            return callback(null, results);
                        }
                    });
                }
            }
        })
    }
}

module.exports = users;