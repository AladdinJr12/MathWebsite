const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

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

    try {
        // Example query (use your own DB method to insert data)
        const query = `
            INSERT INTO users (user_name, email, gender, birthday, password_hash, password)
            VALUES (?, ?, ?, ?, ?, ?);
        `;
        // Execute the query with your database connection (this is pseudocode)
        await db.run(query, [username, email, gender, birthday, passwordHash, password]);

        res.redirect('/users/login');
    } catch (error) {
        res.status(500).send('Error creating account');
    }
});

// Render Login page
router.get('/login', (req, res) => {
    res.render('login');
});

// Handle Login form submission
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

        if (!user) {
            return res.status(400).send('User not found');
        }

        console.log("Checking user");
        console.log(user);

        // Check the password
        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) {
            return res.status(400).send('Invalid password');
        }

        // Redirect to dashboard
        res.redirect('/dashboard');

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;