// Import databaseConfig (now referencing SQLite's global db)
const db = global.db;

let topics = {
    // Retrieve all topics
    getAllTopics: (callback) => {
        var sql = `SELECT * FROM topics`;
        db.all(sql, [], (err, results) => {
            if (err) {
                console.error("SQL Error: " + err);
                return callback(err, null);
            } else {
                return callback(null, results);
            }
        });
    }
}

module.exports = topics;
