// Import databaseConfig
const db = require('../controller/databaseConfig');

let topics = {
    // Retrieve all topics (column completion of topic depends on completion of lessons?)
    getAllTopics: (callback) => {
        var connection = db.getConnection();
        connection.connect(err => {
            if (err) {
                console.error("Connection error: " + err.stack);
                return;
            } else {
                var sql = `SELECT * FROM topics`;

                connection.query(sql, (err, results) =>{
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
    }
}

module.exports = topics;