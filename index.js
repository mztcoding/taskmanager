const connectDB = require('./db/connect');
require('dotenv').config();
const port = process.env.PORT || 3000;
const express = require('express');
const mongoose = require('mongoose');
const tasks = require('./routes/tasks');
const authRoutes = require('./routes/auth');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');

app.use('/api/v1', tasks);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port);
    } catch (error) {
        console.log(error);
    }
};
start();

app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/tasks', requireAuth , (req, res) => res.render('tasks'));
app.get('/edit-task', requireAuth, (req, res) => res.render('edit-task'));

app.use(authRoutes);