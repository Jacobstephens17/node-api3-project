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

router.post('/', (req, res) => {
  Posts.insert(req.body)
  .then((newUser) => {
    if(newUser){
      res.status(201).json(`New post successfully added`)
    }else{
      res.status(400).json({message: `Please provide post`})
    }
  })
  .catch((err) => {
    res.status(500).json({message: `Server error: ${err}, could not post`})
  })

});

router.put('/:id', mw.validateUserId, (req, res) => {
  const id = req.params.id
  const changes = req.body

  Posts.update(id,changes)
    .then((updatedUser) => {
      if(!id){
        res.status(404).json({message:`The post with specified ID: ${id} does not exist`})
      }else if(!changes){
        res.status(400).json({message: `Please make a change`})
      }else{
        res.status(200).json(updatedUser)
      }
    })
    .catch(() => {
      res.status(500).json({ message: 'User could not be updated' });
    });
});


router.delete('/:id',mw.validateUserId, (req, res) => {
  const id = req.params.id
  Posts.remove(id)
  .then((user) => {
    if(user){
      res.status(200).json({message: `User with ID: ${id} was successfully destroyed`})
    }else{
      res.status(404).json({message: `User with ID: ${id} does not exist`})
    }
  })
  .catch((err) => {
    res.status(500).json({message: `Server error: ${err}, user could not be destroyed`})
  })
});

// do not forget to export the router
module.exports = router;