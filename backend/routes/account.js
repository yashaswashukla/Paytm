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
  const currUser = req.userId;
  const body = req.body;
  const session = await mongoose.startSession();

  session.startTransaction();
  const sender = await Account.findOne({ userId: currUser }).session(session);
  console.log(sender);
  if (!sender || sender.balance < body.amount) {
    session.abortTransaction();
    return res.status(400).json({ message: "Insufficient Balance" });
  }

  const receiver = await Account.findOne({ userId: body.to }).session(session);
  console.log(receiver);
  if (!receiver) {
    session.abortTransaction();
    return res.status(400).json({ message: "Invalid Account" });
  }

  await Account.updateOne(
    { userId: sender.userId },
    { $inc: { balance: -body.amount } }
  ).session(session);
  await Account.updateOne(
    { userId: receiver.userId },
    { $inc: { balance: body.amount } }
  ).session(session);

  session.commitTransaction();
  return res.status(200).json({ message: "Transfer Successful" });
});
module.exports = router;
