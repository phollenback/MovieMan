// DEPENDENCIES
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// SERVICES
const signUp = require('./Users/signUpService');
const login = require('./Users/loginService');

// CONFIG
const util = require('./config/jwtUtil');

const app = express();
app.use(cors());
app.use(bodyParser.json()); // For parsing application/json
const port = 8000;

app.get('/', (req, res) => {
    res.send('Hello');
});

app.post('/sign-up', async (req, res) => {
    const { user, pwd } = req.body;

    try {
        // Check if username is taken
        const taken = await signUp.checkUser(user); // Assuming checkUser is async
        if (taken) {
            return res.status(400).send('Username is taken');
        }

        // Create user
        await signUp.createUser(user, pwd);
        return res.send('User created!');
    } catch (error) {
        console.error('Error during sign-up:', error);
        return res.status(500).send('Server error');
    }
});

app.post('/login', async (req, res) => {
    const { user, pwd } = req.body;

    if (!user || !pwd) {
        return res.status(400).send('Username or password is missing');
    }

    try {
        // Check credentials
        const person = await login.checkCred(user, pwd);

        if (!person) {
            return res.status(401).send('Invalid credentials');
        }

        // Create JWT token
        const token = util.generateToken(person);

        // Send the token back to the client
        return res.json({ token });
    } catch (error) {
        console.error('Error during login:', error.message);
        return res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log('Movie app API live on: ' + port);
});