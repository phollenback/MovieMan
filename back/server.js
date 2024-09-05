// DEPENDENCIES
const express = require('express');
const cors = require('cors')

// SERVICES
const signUp = require('./Users/signUpService');
const login = require('./Users/loginService');

// CONFIG
const util = require('./config/jwtUtil')

const app = express();
app.use(cors())
const port = 8000;

app.get('/', (req, res) => {
    res.send('Hello');
});

app.get('/sign-up', async (req, res) => {
    // gather username/password from body
    const user = 'pholle';
    const pwd = 'herb';
    
    try {
        // check if username is taken
        const taken = await signUp.checkUser(user); // Assuming checkUser is async
        // if taken - throw nameTaken error
        if (taken) {
            return res.status(400).send('Username is taken'); // Use return to stop further execution
        }

        // else - continue and create user
        await signUp.createUser(user, pwd);
        return res.send('User created!'); // Use return after sending response
    } catch (error) {
        console.error(error);
        return res.status(500).send('ERROR'); // Use return after sending response
    }
});

app.get('/login', async (req, res) => {
    const user = req.query.user;
    const pwd = req.query.pwd;

    console.log('Received user: ' + user + ' with the pwd: ' + pwd);

    try {
        // get user from db
        const person = await login.checkCred(user, pwd);

        if (!person) {
            return res.status(401).send('Invalid credentials');
        } 

        // create jwt
        const token = util.generateToken(person);

        // If needed, you can send back the user data or any other response
        return res.json({ token });
    } catch (error) {
        // Log the error and respond with a 500 Internal Server Error
        console.error('Error during login:', error);
        return res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log('movie app api Live on: ' + port);
});