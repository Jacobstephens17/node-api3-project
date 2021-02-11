const express = require('express');
const Posts = require('./posts-model')
const router = express.Router();
const mw = require('../middleware/middleware')


router.get('/', (req, res) => {
  Posts.get(req.body)
  .then((posts) => {
    res.status(200).json(posts)
  })
  .catch((err) => {
    res.status(500).json({
      message: `Error: ${err} ocurred while finding data`
    })
  })
});


router.get('/:id', mw.validatePostId, (req, res) => {
  res.status(200).json(req.post)
});


// do not forget to export the router
module.exports = router;