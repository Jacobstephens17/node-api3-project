const express = require('express');
const Posts = require('./posts-model')
const router = express.Router();
const mw = require('../middleware/middleware')


router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE POSTS
  Posts.get(req.query)
  .then((hubs) => {
    res.status(200).json(hubs)
  })
  .catch((err) => {
    res.status(500).json({
      message: `Error: ${err} ocurred while finding data`
    })
  })
});

router.get('/:id', mw.validateUserId, (req, res) => {
  // RETURN THE POST OBJECT
  // this needs a middleware to verify post id
  res.status(200).json(req.hub)
});




// do not forget to export the router
module.exports = router;