const { Router } = require("express");
const { User } = require("../db/models/userModel");
const authMiddleware = require('../middlewares/authMiddleware')
const router = Router();
const jwt = require('jsonwebtoken');
const z = require('zod');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

// Input validation
const signUpInput = z.object({
    email: z.string().email().max(100).trim(),
    password: z.string().min(6).max(1024),
    firstName: z.string().min(2).max(50).trim(),
    lastName: z.string().min(2).max(50).trim(),
    role: z.enum(['user', 'admin']),
    username: z.string().toLowerCase().min(2).max(30).trim()
});

const signinInput = z.object({
    username: z.string().toLowerCase().min(2).max(30).trim(),
    password: z.string().min(6).max(1024)
})

router.post('/signup', async (req, res) => {
    try {
        const { username, password, firstName, lastName, role, email } = req.body;

        const validInput = signUpInput.safeParse(req.body);
        if (!validInput.success) return res.status(411).json({ message: "Invalid input" });

        // Checking if user with the same username or email already exists {use $or}
        const userExist = await User.findOne({ $or: [{ username }, { email }] });

        if (userExist) {
            return res.status(411).json({ message: "User already exists" });
        }

        // Create a new user
        const newUser = new User({
            username,
            password,
            firstName,
            lastName,
            role,
            email
        });

        try {
            token = jwt.sign({ username }, secret);
            await newUser.save();
        }
        catch (err) {
            return res.status(411).json({ message: `Error creating token\nError: ${err}` })
        }

        res.status(201).json({
            user: {
                username: newUser.username,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                role: newUser.role,
                email: newUser.email,
                secret: token
            }
        });
    } catch (error) {
        console.error('Error during signup:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;
        const validInput = signinInput.safeParse(req.body);
        if (!validInput.success) return res.status(411).json({ message: "Enter valid input" });
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ message: 'Invalid username or password' });
        if (user.password !== password) return res.status(401).json({ message: "Incorrect password" });
        try {
            const token = jwt.sign({ username }, secret);
            res.status(200).json({ message: "Logged in successfully", token: token });
        }
        catch (err) {
            return res.status(411).json({ message: `Error genereting token\n${err}` })
        }
    }
    catch (err) {
        res.status(411).json({ message: `Error ${err}` });
    }
});

router.get('/getdata', authMiddleware, (req, res) => {
    const username = req.username;
    res.json({ message: `Username is: ${username}` })
});

module.exports = router;