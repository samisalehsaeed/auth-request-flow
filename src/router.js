const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const secret = process.env.JWT_SECRET;
dotenv.config();

const router = express.Router();

const mockUser = {
  username: "authguy",
  password: "mypassword",
  profile: {
    firstName: "Chris",
    lastName: "Wolstenholme",
    age: 43,
  },
};

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === mockUser.username && password === mockUser.password) {
    const payload = {
      username: mockUser.username,
      password: mockUser.password,
    };
    const token = jwt.sign(payload, secret);
    res.json({ token });
  } else {
    res.status(403).json({
      error: "Failure to provide correct credentials",
    });
  }
});

router.get("/profile", (req, res) => {
  const { authorization } = req.header;

  if (!authorization) {
    return res.status(403).json({
      error: "Failed to send",
    });
  }
  jwt.verify(authorization, secret);
  const profile = mockUser.profile;

  return profile;
});

module.exports = router;
