const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const userRouter = require("./routes/user");
const accountRouter = require("./routes/account");
const connectDb = require('./db');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT;

app.use("/api/v1/users", userRouter);
app.use("/api/v1/account", accountRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDb();
});

module.exports.handler = serverless(app);