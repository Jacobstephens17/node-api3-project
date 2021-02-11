const Posts = require('../posts/posts-model')



const logger = (token) => (req, res, next) => {
  if(token === 'testing'){
    console.log(`Token: ${token} has been collected!`)
    next()
  }else{
    res.json('Not a valid token')
  }
}



const validateUserId =  (req, res, next) => {
  const {id} = req.params
  try{
    const hub = Posts.getById(id)
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



const  validateUser = (req, res, next) => {
  const {user} = req
  try{
    const hub = Posts.getById(user)
    if(!hub){
      res.status(400).json({message: `User: ${user} could not be found`})
    }else{
      req.hub = hub
      next()
    }
  }catch(err){
    res.status(500).json({message: `Server error: ${err}`})
  }

}




const validatePost = (req, res, next) => {


}

// do not forget to expose these functions to other modules
module.exports = {
  logger, 
  validateUserId,
  validateUser,
  validatePost
}