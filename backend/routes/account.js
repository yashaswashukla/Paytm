const express = require("express");
const authMiddleware = require("../middleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");

const router = express.Router();

//Getting Balance
router.get("/balance", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const currAcc = await Account.findOne({ userId: userId });
  res.status(200).json({ balance: currAcc.balance });
});

// Transfer Money
router.post("/transfer", authMiddleware, async (req, res) => {
  try {
    // Create a session and start a transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    // Get the userId of the account you wish to transfer the amount and the amount
    const { amount, to } = req.body;

    // Check if amount is negative
    if (amount <= 0) {
      await session.abortTransaction();
      return res
        .status(400)
        .json({ message: "Amount cannot be negative/Zero" });
    }

    // Check if the user sending has sufficient balance
    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );
    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Check if user to which youre sending is valid or not
    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Invalid account" });
    }

    // Perform the transfer if everyhing is okay
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);
    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    // Commit the transaction
    session.commitTransaction();

    // return res
    res.status(200).json({
      message: "Transfer successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  // const currUser = req.userId;
  // const body = req.body;
  // const session = await mongoose.startSession();

  // session.startTransaction();
  // const sender = await Account.findOne({ userId: currUser }).session(session);
  // // console.log(sender);
  // if (!sender || sender.balance < body.amount) {
  //   session.abortTransaction();
  //   return res.status(400).json({ message: "Insufficient Balance" });
  // }

  // const receiver = await Account.findOne({ userId: body.to }).session(session);
  // // console.log(receiver);
  // if (!receiver) {
  //   session.abortTransaction();
  //   return res.status(400).json({ message: "Invalid Account" });
  // }

  // await Account.updateOne(
  //   { userId: sender.userId },
  //   { $inc: { balance: -body.amount } }
  // ).session(session);
  // await Account.updateOne(
  //   { userId: receiver.userId },
  //   { $inc: { balance: body.amount } }
  // ).session(session);

  // session.commitTransaction();
  // return res.status(200).json({ message: "Transfer Successful" });
});
module.exports = router;
