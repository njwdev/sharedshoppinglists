const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect database

connectDB();

//Init Middleware

app.use(express.json());

app.get('/', (req, res) => res.send('API RUNNINGGGG'));

//Define routes

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/lists', require('./routes/api/lists'));
app.use('/api/account', require('./routes/api/account'));
app.use('/api/profile', require('./routes/api/profile'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on ${PORT}`));
