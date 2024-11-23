const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://admin:rA%40dns123@cluster0.rhjgkqz.mongodb.net/paytm"
);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  firstName: { type: String, required: true, trim: true, maxLength: 50 },
  lastName: { type: String, required: true, trim: true, maxLength: 50 },
  password: { type: String, required: true, minLength: 6 },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
