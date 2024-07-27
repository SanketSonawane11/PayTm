// const express = require('express');
// const serverless = require('serverless-http');
// const app = express();
// const bodyParser = require('body-parser');
// const userRouter = require("./routes/user");
// const accountRouter = require("./routes/account");
// const connectDb = require('./db');
// const cors = require('cors');
// require('dotenv').config();

// const corsOptions = {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
// };

// app.use(cors(corsOptions));
// app.use(bodyParser.json());

// connectDb();
// const PORT = process.env.PORT;

// app.use("/api/v1/users", userRouter);
// app.use("/api/v1/account", accountRouter);

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

// module.exports.handler = serverless(app);

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
    origin: '*', // Adjust this as needed for your deployment
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Connect to the database
connectDb();

// Set up routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/account", accountRouter);

// Export the serverless handler
module.exports = serverless(app);
