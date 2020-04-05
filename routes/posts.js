const express = require('express');
const postRouter = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');

postRouter.get('/', async (req, res) => {
  let posts
  try {
    if (req.query.username) {
      posts = await Post.find({
        "poster": req.query.username
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({
      message: err
    });
  }
})

postRouter.get('/:postID', async (req, res) => {
  try {
    const posts = await Post.find({
      "_id": req.params.postID
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({
      message: err
    });
  }
})

postRouter.post('/', async (req, res) => {
  let poster = req.body.poster;
  let users = await User.find({
    "username": poster
  });

  if (users.length == 1) {
    const post = new Post({
      poster: req.body.poster,
      title: req.body.title,
      body: req.body.body
    });
    try {
      const savedPost = await post.save();
      res.status(201).json(savedPost);
    } catch (err) {
      res.status(500).json({
        message: err
      });
    }
  } else {
    res.status(400).json({
      message: "username does not exist: " + poster
    })
  }
})

postRouter.delete('/:postID', async (req, res) => {
  try {
    const deletedPost = await Post.remove({
      "_id": req.params.postID
    });
    res.status(200).json(deletedPost);
  } catch (err) {
    res.status(400).json({
      message: err
    });
  }
})

postRouter.patch('/:postID', async (req, res) => {
  try {
    const updatedPost = await Post.updateOne({
      "_id": req.params.postID
    }, {
      $set: {
        body: req.body.body
      }
    });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json({
      message: err
    });
  }
})


module.exports = postRouter;