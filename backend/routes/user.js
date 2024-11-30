const express = require("express");
const z = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const authMiddleware = require("../middleware");

const router = express.Router();

// Signup Route

const signupSchema = z.object({
  username: z.string().email(),
  password: z.string(),
  firstName: z.string().trim().max(15),
  lastName: z.string().trim().max(15),
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  console.log(body);
  const { success } = signupSchema.safeParse(body);
  if (!success) {
    return res.status(411).json({ message: "Incorrect inputs" });
  }

  const alreadyPresent = await User.findOne({ username: body.username });
  if (alreadyPresent) {
    return res.status(411).json({ message: "Email already taken" });
  }

  const currUser = await User.create({
    username: body.username,
    password: body.password,
    firstName: body.firstName,
    lastName: body.lastName,
  });
  const currId = currUser._id;

  const acc = await Account.create({
    userId: currId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign({ userId: currId }, JWT_SECRET);
  return res.status(200).json({
    message: "User created successfully",
    token: token,
  });
});

//Signin Route

const signinSchema = z.object({
  username: z.string().email(),
  password: z.string(),
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const { success } = signinSchema.safeParse(body);
  if (!success) {
    return res.status(411).json({ message: "Incorrect Inputs" });
  }
  const currUser = await User.findOne({
    username: body.username,
    password: body.password,
  });

  if (!currUser) {
    return res.status(411).json({ message: "Email or Password not correct" });
  }

  const currId = currUser._id;
  const token = jwt.sign({ userId: currId }, JWT_SECRET);
  res.status(200).json({ token: token });
});

//Update Route
const updateSchema = z.object({
  password: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const body = req.body;
  const { success } = updateSchema.safeParse(body);
  if (!success) {
    return res
      .status(411)
      .json({ message: "Error while updating information" });
  }
  try {
    await User.updateOne({ _id: req.userId }, body);
    return res.status(200).json({ message: "Updated successfully" });
  } catch (err) {
    return res.status(411).json({ message: "Incorrect Inputs" });
  }
});

//Bulk route
router.get("/bulk", authMiddleware, async (req, res) => {
  const name = req.query.name.toLowerCase() || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: name,
          $options: "i",
        },
      },
      {
        lastName: {
          $regex: name,
          $options: "i",
        },
      },
    ],
  });

  return res.json({
    user: users.map((e) => ({
      username: e.username,
      firstName: e.firstName,
      lastName: e.lastName,
      _id: e._id,
    })),
  });
});
module.exports = router;
