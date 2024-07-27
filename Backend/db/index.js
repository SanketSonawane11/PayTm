const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.URI;

const connectDb = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Database connection error:', err);
    }
};

module.exports = connectDb;
