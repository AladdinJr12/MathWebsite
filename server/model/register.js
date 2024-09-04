const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

//-----This will hash all of the passwords that do not have a hashed password value----//
const querySelect = 'SELECT user_id, password_hash, password FROM users';
global.db.all(querySelect, [], async (err, rows) => {
    if (err) {
        //**--In case the fetching fails--**/
        console.error('Error fetching users:', err);
        return;
    }

    for (const row of rows) {
        if (row.password_hash == 'hashed_password_here') {
            try {
                const passwordHash = await bcrypt.hash(row.password, 10);
                
                const queryUpdate = 'UPDATE users SET password_hash = ? WHERE user_id = ?';
                await new Promise((resolve, reject) => {
                    global.db.run(queryUpdate, [passwordHash, row.user_id], function (err) {
                        if (err) {
                            reject(`Error updating password for user_id ${row.user_id}: ${err}`);
                        } else {
                            console.log(`Password for user_id ${row.user_id} was updated successfully`);
                            resolve();
                        }
                    });
                });
            } catch (err) {
                console.error(`Error hashing password for user_id ${row.user_id}:`, err);
            }
        }
    }
});

// Render Create New Account page
router.get('/register', (req, res) => {
    res.render('add-user');
});

// Handle Create New Account form submission
router.post('/register', async (req, res) => {
    const { username, email, gender, birthday, password, confirmPassword } = req.body;

    console.log(`Password: ${password}`);
    console.log(`Confirm Password: ${confirmPassword}`);

    // Validate that passwords match
    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match');
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    //---validating that the email or user_name is unique-----//
    let user= null;
    const emailUsernameQuery = "SELECT user_name, email FROM users WHERE user_name = ? OR email = ?";
    try {
        users = await new Promise((resolve, reject) => {
            db.all(emailUsernameQuery, [username, email], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        // Check if any users are found
        if (users.length > 0) {
            console.log("Found matching users:", users);
            return res.render("add-user.ejs", { error: "Your username or email has already been taken" });
        } else {
            console.log("No matching user found.", users);
        }
        
    
        //----Continue with further processing if the user is not found---//
    } catch (err) {
        //----Handle the error by logging it----//
        console.error("Database query error at router.post('/register') from register.js:", err);
        return res.status(500).render("add-user.ejs", { error: "An error occurred while checking the username and email." });
    }
    
    //------------.Adding in the new account's details-----------------//
    try {
        // Example query (use your own DB method to insert data)
        const query = `
            INSERT INTO users (user_name, email, gender, birthday, password_hash, password)
            VALUES (?, ?, ?, ?, ?, ?);
        `;
        // Execute the query with your database connection (this is pseudocode)
        await db.run(query, [username, email, gender, birthday, passwordHash, password]);

        res.render("login.ejs", {success: "New account successfully created!"});
    } catch (error) {
        console.log("Error when trying to create new account: ", error)
        return res.render("add-user.ejs", { error: "Account was unsuccessfully created" });
    }
});

// Render Login page
router.get('/login', (req, res) => {
    res.render('login');
});

// Handle Login form submission
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Find the user by username
    const query = `SELECT * FROM users WHERE user_name = ?`;

    let user = null;
    try {
        // Wrap db.get() in a promise
        user = await new Promise((resolve, reject) => {
            db.get(query, [username], (err, row) => {
                if (err) {
                    reject(err); // Handle errors
                } else {
                    resolve(row); // Return the row if found
                }
            });
        });

        //---If the username is incorrect----------//
        if (!user) {
            return res.render("login.ejs", { error: "Username cannot be found" });
        }

        // Check the password
        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) {
            return res.render("login.ejs", { error: "Password cannot be found" });
        }

        // Redirect to dashboard
        res.redirect(`http://localhost:5173/?LoginState=true&userId=${user.user_id}`);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;