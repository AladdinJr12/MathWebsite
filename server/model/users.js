// Import databaseConfig
const db = global.db;

let users = {
    // Retrieve one user from user ID
    getOneUser: (userId, callback) => {
        var sql = `SELECT * FROM users WHERE user_id = ?`;
        db.get(sql, [userId], (err, result) => {
            if (err) {
                console.error("SQL Error at users.js: " + err);
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    },

    editUserDetails: (userId, username, email, currentPw, newPw, pwHash, callback) => {
        if (currentPw && newPw) {
            var sql = `UPDATE users
                SET user_name=?, email=?, password=?, password_hash=?
                WHERE user_id=? AND password=?`;
            db.run(sql, [username, email, newPw, pwHash, userId, currentPw], function(err)  {
                if (err) {
                    console.log("SQL Error at editUserDetails: " + err);
                    return callback(err, null);
                } else {
                    return callback(null, { changes: this.changes });
                }
            });
        }
        else{
            var sql = `UPDATE users
                SET user_name=?, email=?
                WHERE user_id=?`;
            db.run(sql, [username, email, userId], function(err) {
                if (err) {
                    console.log("SQL Error at editUserDetails: " + err);
                    return callback(err, null);
                } else {
                   return callback(null, { changes: this.changes });
                }
            });
        }
    }
}

module.exports = users;