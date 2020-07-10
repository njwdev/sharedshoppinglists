const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect database

connectDB();

//Initiate Middleware

app.use(express.json());

//Define routes

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/lists', require('./routes/api/lists'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on ${PORT}`));
