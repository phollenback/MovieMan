const signUp = require('../Users/signUpService');
const login = require('../Users/loginService');
const util = require('../config/jwtUtil');

async function handleSignUp(req, res) {
  const { user, pwd } = req.body;

  try {
    // Check if username is taken
    const taken = await signUp.checkUser(user);
    if (taken) {
      return res.status(400).send('Username is taken');
    }

    // Create user
    const person = await signUp.createUser(user, pwd);

    // Create JWT token
    const token = util.generateToken(person);
    
    return res.json(token);
  } catch (error) {
    console.error('Error during sign-up:', error.message);
    return res.status(500).send('Server error');
  }
}

async function handleLogin(req, res) {
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
}

module.exports = { handleSignUp, handleLogin }; // Ensure this export is correct