const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2').Strategy;

const { callOpenAI } = require('./openai_utils');
// Create an instance of express to serve our endpoints
const app = express();

// Use bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

/*
// Passport configuration
passport.use(new OAuth2Strategy({
    authorizationURL: 'https://<your-canvas-domain>/login/oauth2/auth',
    tokenURL: 'https://<your-canvas-domain>/login/oauth2/token',
    clientID: process.env.CANVAS_CLIENT_ID,
    clientSecret: process.env.CANVAS_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/canvas/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // Logic to handle user profile and access token
    return cb(null, profile);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Initialize Passport
app.use(passport.initialize());

// Authentication Routes
app.get('/auth/canvas', passport.authenticate('oauth2'));

app.get('/auth/canvas/callback', 
  passport.authenticate('oauth2', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);
*/

// Route for simple OpenAI requests
app.post('/chat', async (req, res) => {
  const userPrompt = req.body.message;
  const aiResponse = await callOpenAI(userPrompt);
  res.json({ message: aiResponse });
});

// Route for Chain of Thought requests
app.post('/chat/thought', async (req, res) => {
  const userPrompt = req.body.message;
  const aiResponse = await callOpenAIChainOfThought(userPrompt);
  res.json({ message: aiResponse });
});

// Route for Wolfram Alpha computation
app.post('/compute', async (req, res) => {
  const query = req.body.query;
  const result = await callWolframAlpha(query);
  res.json({ result: result });
});

// Route for ensemble and judgment
app.post('/ensemble', async (req, res) => {
  const userPrompt = req.body.message;
  const responses = await ensembleThoughts(userPrompt);
  const bestResponse = judgeBestResponse(responses);
  res.json({ message: bestResponse });
});

// Define a simple route to get started
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Define the port to run the server on
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});