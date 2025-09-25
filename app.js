const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authroutes');
const { requireAuth,checkuser } = require('./middleware/authmiddleware');


const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://admin:6kkAhPcJW5SCtWET@agrovista.8l8dq.mongodb.net/node-auth?retryWrites=true&w=majority';
mongoose.connect(dbURI)
  .then(() => app.listen(3000, () => console.log('Server is running on port 3000')))
  .catch(err => console.log(err));

// routes
app.get('*', checkuser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes); // ✅ now signup/login work at /signup and /login



// cookies
app.get('/set-cookies', (req, res) => {
  res.cookie('newUser', false);
  res.cookie('isEmployee', true, { 
    maxAge: 1000 * 60 * 60 * 24, 
    httpOnly: true 
  });
  res.send('you got the cookies!');
});

app.get('/read-cookies', (req, res) => {
  const cookies = req.cookies;
  console.log(cookies.newUser);
  res.json(cookies);
});

// 404 handler
app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

