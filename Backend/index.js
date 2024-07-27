const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');
const accountRouter = require('./routes/account');
const connectDb = require('./db');
const cors = require('cors');
require('dotenv').config();

const app = express();

const corsOptions = {
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

connectDb();

app.use("/api/v1/users", userRouter);
app.use("/api/v1/account", accountRouter);

// Export the serverless handler as 'handler'
module.exports.handler = serverless(app);
