const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.send('This is home!');
})

// Import routes
const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);

const usersRoute = require('./routes/users');
app.use('/users', usersRoute);



mongoose.connect(process.env.MONGO_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}, () => {
  console.log('Connected to mongoDB');
})

app.listen(3000, () => {
  console.log('Server listening on port 3000');
})