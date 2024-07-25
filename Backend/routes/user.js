const { Router } = require("express");
const router = Router();
const { User, Account } = require("../db/models/userModel");
const verifyUser = require('../middlewares/verifyUser')
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
});

const updateProfile = z.object({
    firstName: z.string().min(2).max(50).trim(),
    lastName: z.string().min(2).max(50).trim(),
    email: z.string().email().max(100).trim(),
    password: z.string().min(6).max(1024)
});

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

        let initialBalance = 0;

        try {
            token = jwt.sign({ username }, secret);
            await newUser.save();
            const userId = newUser._id;
            const userAccount = await Account.create({ userId, balance: 1 + Math.random() * 10000 });
            initialBalance = userAccount.balance;
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
                secret: token,
                balance: initialBalance
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
        if (!validInput.success) return res.status(411).json({ message: "Invalid input" });
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ message: 'Incorrect Username' });
        if (user.password !== password) return res.status(401).json({ message: "Incorrect password" });
        try {
            const token = jwt.sign({ username }, secret);
            res.status(200).json({
                message: "Logged in successfully", token: token
            });
        }
        catch (err) {
            return res.status(411).json({ message: `Error genereting token\n${err}` })
        }
    }
    catch (err) {
        res.status(411).json({ message: `Error ${err}` });
    }
});

router.get('/mydata', verifyUser, async (req, res) => {
    const username = req.username;
    try {
        const user = await User.findOne({ username });
        if (user) {
            res.json({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                role: user.role
            });
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (err) {
        res.status(404).json({ message: "Server Error. Try again after sometime" });
        console.log(err);
    }
});

router.post('/updateprofile', verifyUser, async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const username = req.username;
    const validInput = updateProfile.safeParse(req.body);
    if (!validInput.success) return res.status(411).json({ message: "Enter valid input" });
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ message: `Invalid username` });
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        await user.save();
        res.status(200).json({ message: "Profile updated successfully" });
    }
    catch (err) {
        res.status(401).json({ message: `Error updating profile\n${err}` })
    }
});

router.get('/user/bulk', verifyUser, async (req, res) => {
    const filter = req.query.filter || "";
    try {
        const users = await User.find({
            $or: [
                {
                    firstName: {
                        $regex: filter,
                    }
                },
                {
                    lastName: {
                        $regex: filter,
                    }
                }
            ]
        });
        res.json({
            user: users.map(u => ({
                username: u.username,
                firstName: u.firstName,
                lastName: u.lastName,
                _id: u._id
            }))
        });
    }
    catch (err) {
        res.status(411).json({ message: err });
    }
});

module.exports = router;

// router.get('/getdata', authMiddleware, (req, res) => {
//     const username = req.username;
//     res.json({ message: `Username is: ${username}` })
// });