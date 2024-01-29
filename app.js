const express = require('express');
const cors = require('cors');
const httpStatus = require('http-status');
const routes = require('./route');

process.env.PWD = process.cwd();

const app = express();

// enable cors
app.use(cors());
app.options('*', cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send('Congratulations! API is working!');
});
app.use('/api', routes);

module.exports = app;
