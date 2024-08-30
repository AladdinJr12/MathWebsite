
// Set up express, bodyparser, path, cors and EJS
const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path');
var bodyParser = require("body-parser");
const bcrypt = require('bcrypt');

const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // set the app to use ejs for rendering
app.set('views', path.join(__dirname, '../client/views')); // set location of static files

//---Linking the css----//
app.use(express.static(path.join(__dirname, '../client/src/css files')));



//---adding the secure session component---//
const session = require('express-session');
app.use(session({
    secret: 'user_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set this to true if using HTTPS
}));

//-----To allow requests from the frontend--------//
app.use(cors());
app.use(express.json());

//________________________Set up SQLite__________________________//

// Items in the global namespace are accessible throught out the node application
const sqlite3 = require('sqlite3').verbose();
global.db = new sqlite3.Database('./database.db',function(err){
    if(err){
        console.error(err);
        process.exit(1); // bail out we can't connect to the DB
    } else {
        console.log("Database connected");
        global.db.run("PRAGMA foreign_keys=ON"); // tell SQLite to pay attention to foreign key constraints
    }
});


//----Used for retriving the topics and users data later on----//
//****** This two constants need to be placed after global.db is initialised ******/
const Users = require('./model/users');
const Topics = require('./model/topics');

//---When a request is made to this endpoint, it runs the function that queries --//
//--the SQLite database and returns the results as a JSON response.--//
app.get('/api/questions', (req, res) => {
    // SQL query to select all questions from the 'Questions' table
    const sql = `SELECT * FROM Questions`;
    console.log("Checking database at line 55 of index.js")
    console.log(db);
    // Execute the SQL query
    db.all(sql, [], (err, rows) => {
      if (err) {
        // If there’s an error, send a response with a 400 status code and the error message
        return res.status(400).json({ error: err.message });
      }
      // Send back the rows (questions) in a JSON response
      res.json({
        message: "success",
        data: rows
      });
    });
  });
  
app.get('/api/answers', (req, res) => {
  // SQL query to select all Answers from the 'Answers' table
  const sql = `SELECT * FROM Answers`;

  // Execute the SQL query
  db.all(sql, [], (err, rows) => {
    if (err) {
      // If there’s an error, send a response with a 400 status code and the error message
      return res.status(400).json({ error: err.message });
    }
    // Send back the rows (answers) in a JSON response
    res.json({
      message: "success",
      data: rows
    });
  });
});

//---For getting user data from the database----//
app.get('/user/:userId', (req, res) => {
  var userId = req.params.userId;

  Users.getOneUser(userId, (err, results) => {
      if (err) {
          console.log("Issue at line 89 index.js")
          console.log(err);
          return res.status(500).send();
      } else {
        console.log("Line 95 checking for results in index.js")
        console.log(results)
        return res.status(200).json(results);
      }
  });
});

//---For adding user data into the database-----//
app.put('/editUser/:userId', async (req, res) => {
  var userId = req.params.userId;
  var { username, email, currentPassword, newPassword, confirmPassword } = req.body;

  // Hash the password
  if (newPassword && confirmPassword) {
    var passwordHash = await bcrypt.hash(newPassword, 10);
  } else {
    var passwordHash = "";
  }

  if (newPassword === confirmPassword) {
    Users.editUserDetails(userId, username, email, currentPassword, newPassword, passwordHash, (err, results) => {
      if (err) {
        console.log("the error is at line 109");
        console.log(err);
        return res.status(500).send();
      } else {
        return res.status(200).json(results);
      }
    });
  } else {
    res.redirect(`/user/${userId}`);
    return res.status(400).send('Confirm Password must match New Password');
  }
});

/*---Topics APIs-----*/
app.get('/topics', (req, res) => {
  // const userId = req.params.userId;
  Topics.getAllTopics((err, results) => {
      if (err) {
          console.log("the error is at line 127")
          console.log(err);
          return res.status(500).send();
      } else {
        console.log("results for topics")
        console.log(results)
          return res.status(200).json(results);
      }
  });
});

/*-----------------------Routing for the login and add user page------------------*/
// Add all the route handlers in usersRoutes to the app under the path /users
const usersRoutes = require('./routes/register');
app.use('/users', usersRoutes);

// Make the web application listen for HTTP requests
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



