const express = require('express');
const userRouter = express.Router();
const User = require('../models/User');

userRouter.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      message: err
    });
  }
})

userRouter.get('/:username', async (req, res) => {
  try {
    const users = await User.find({
      "username": req.params.username
    });
    if (users.length == 1) {
      res.status(200).json(users);
    } else if (users.length == 0) {
      res.status(404).json({
        message: "username does not exist: " + req.params.username
      })
    } else {
      console.log("multiple users found")
      res.status(500).json({
        message: "server error"
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err
    });
  }
})

userRouter.post('/', async (req, res) => {
  const user = new User({
    username: req.body.username,
    fullname: req.body.fullname,
  });

  try {
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({
      message: err
    });
  }
})

module.exports = userRouter;