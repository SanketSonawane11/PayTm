const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.URI;

const connectDb = async () => {
    if (mongoose.connection.readyState === 0) { // Check if already connected
        try {
            await mongoose.connect(uri);
            console.log('Connected to MongoDB');
        } catch (err) {
            console.error('Database connection error:', err);
        }
    }
};

module.exports = connectDb;
