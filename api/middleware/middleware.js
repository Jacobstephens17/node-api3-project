const Posts = require('../posts/posts-model')

function logger(req, res, next) {
  // do your magic!
}

const validateUserId = async (req, res, next) => {
  const {id} = req.params
  try{
    const hub = await Posts.getById(id)
    if(!hub){
      res.status(400).json({message: `Username with ID: ${id} could not be found`})
    }else{
      req.hub = hub
      next()
    }
      }catch(err){
        res.status(500).json({message: `Server error: ${err}`})
    }
  }

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

// do not forget to expose these functions to other modules
module.exports = {
  logger, 
  validateUserId,
  validateUser,
  validatePost
}