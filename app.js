const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authroutes');

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
const dbURI = 'mongodb+srv://admin:6kkAhPcJW5SCtWET@agrovista.8l8dq.mongodb.net/node-auth?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(3000, () => console.log('Server is running on port 3000')))
  .catch(err => console.log(err));
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use('/auth', authRoutes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res) => res.status(404).render('404'));
// app.listen(3000, () => console.log('Server is running on port 3000'));
