const express = require('express');
const mw = require('../middleware/middleware')
const router = express.Router();
const Users = require('./users-model')

router.get('/', (req, res) => {
  Users.get(req.body)
  .then((users) => {
    res.status(200).json(users)
  })
  .catch((err) => {
    res.status(500).json({message: `Error: ${err} ocurred while finding data`})
  })
});

router.get('/:id', mw.validateUserId,(req, res) => {
  res.status(200).json(req.user)
});

router.post('/', (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', mw.validateUserId, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id',mw.validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts',mw.validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', mw.validateUserId,(req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router