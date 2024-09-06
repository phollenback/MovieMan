const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import controllers
const { handleSignUp, handleLogin } = require('./controllers/regController');

const app = express();
app.use(cors());
app.use(bodyParser.json()); // For parsing application/json
const port = 8000;

app.get('/', (req, res) => {
  res.send('Hello');
});

app.post('/sign-up', handleSignUp);
app.post('/login', handleLogin);

app.listen(port, () => {
  console.log('Movie app API live on: ' + port);
});