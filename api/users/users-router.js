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
  Users.insert(req.body)
  .then((newUser) => {
    if(newUser){
      res.status(201).json(`New user successfully added`)
    }else{
      res.status(400).json({message: `Please provide username`})
    }
  })
  .catch((err) => {
    res.status(500).json({message: `Server error: ${err}, could not post`})
  })

});



router.put('/:id', mw.validateUserId, (req, res) => {
  const id = req.params.id
  const changes = req.body

  Users.update(id,changes)
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
    Users.remove(id)
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



router.get('/:id/posts',mw.validateUserId, (req, res) => {
  const id = req.params.id
  Users.getUserPosts()
  .then((post) =>{
    if(post.length > 0 ){
      res.status(200).json(post)
    }else{
      res.status(404).json({message:`Post with specified ID: ${id} does not exist`})
    }
  })
  .catch( 
    res.status(500).json({message: `Posts could not be received`})
    )
});



router.post('/:id/posts', mw.validateUserId,(req, res) => {
  const id = req.params.id
  Users.getUserPosts(id)
    .then((post) => {
      if(post.length > 0 || !post.id){
        res.status(200).json(post)
      }else{
        res.status(400).json({message:`Please add correct data`})
      }
    })
    .catch(
      res.status(500).json({message: 'Could not post'})
    )
});

// do not forget to export the router
module.exports = router