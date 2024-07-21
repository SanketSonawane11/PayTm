const { Router } = require("express");
const { Account, User } = require("../db/models/userModel");
const { route } = require("./user");
const verifyUser = require("../middlewares/verifyUser");
const { default: mongoose } = require("mongoose");
const router = Router();


router.get('/getbalance', verifyUser, async (req, res) => {
    const username = req.username;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'User not found' });
        const userId = user._id;
        try {
            const account = await Account.findOne({ userId });
            if (!account) return res.status(404).json({ message: 'Account not found' });
            res.status(200).json({ Balance: account.balance });
        }
        catch (err) {
            res.status(500).json({ message: `Bank server error \n${err}` });
        }
    }
    catch (err) {
        res.status(500).json({ message: `Cannot uget user \n${err}` });
    }
});

router.post('/transfer', verifyUser, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();

    const { amount, to } = req.body;
    const username = req.username;
    const user = await User.findOne({ username });
    const userId = user._id;
    const account = await Account.findOne({ userId });
    if (!account) {
        session.abortTransaction();
        return res.status(404).json({ message: "Your account not found" });
    }
    if (account.balance < amount) {
        session.abortTransaction();
        return res.status(400).json({ message: "Insufficient funds" });
    }
    const toUser = await User.findOne({ username: to });
    if (!toUser) {
        session.abortTransaction();
        return res.status(404).json({ message: "Please enter a valid username" });
    }
    const toAccount = await Account.findOne({ userId: toUser._id });
    if (!toAccount) {
        session.abortTransaction();
        return res.status(404).json({ message: "Receiver's account not found" });
    }

    //Transfer of money

    // Deducting money from sender's account
    await Account.updateOne({ userId },
        {
            $inc: {
                balance: -amount
            }
        }
    ).session(session);

    //Crediting money to receiver's account
    await Account.updateOne({ userId: toUser._id }, {
        $inc: {
            balance: amount
        }
    }).session(session);

    await session.commitTransaction();
    res.status(200).json({ message: "Transaction Successful" });

});

module.exports = router;