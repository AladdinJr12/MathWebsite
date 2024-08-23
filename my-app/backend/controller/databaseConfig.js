const mysql = require('mysql');

// Creating connection to database & Exporting module to use in other places
var dbConnect = {
    getConnection: () => {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'mathdoodle'
        });
        return connection;
    }
};

module.exports = dbConnect;