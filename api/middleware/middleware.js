const Posts = require('../posts/posts-model')
const Users = require('../users/users-model')



const logger = (token) => (req, res, next) => {
  if(token === 'Token'){
      console.log(`[${new Date()}]:${req.method}:${req.url}`)
    next()
  }else{
    res.json('Not a valid token')
  }
}



const validateUserId = async (req, res, next) => {
  const {id} = req.params
  try{
    const user = await Users.getById(id)
    if(!user){
      res.status(400).json({message: `Post: ${id} could not be found`})
    }else{
      req.user = user
      next()
    }
  }catch(err){
    res.status(500).json({message:`Server error: ${err}`})
  }

}



const  validateUser = (req, res, next) => {
  const {user} = req.params
  try{
    const hub = Users.get(user)
    if(!hub){
      res.status(400).json({message: `User: ${user} could not be found`})
    }else{
      req.user = user
      next()
    }
  }catch(err){
    res.status(500).json({message: `Server error: ${err}`})
  }

}




const validatePost = async (req, res, next) => {
  const { post } = req.params
  try{
    const hub = await Posts.get(post)
    if(!hub){
      res.status(400).json({message: `Post: ${post} could not be found`})
    }else{
      req.posts = hub
      next()
    }
  }catch(err){
    res.status(500).json({message: `Server error: ${err}`})
  }
}

const validatePostId = async (req, res, next) => {
  const {id} = req.params
  try{
    const post = await Posts.getById(id)
    if(!post){
      res.status(400).json({message: `Post: ${id} could not be found`})
    }else{
      req.post = post
      next()
    }
  }catch(err){
    res.status(500).json({message:`Server error: ${err}`})
  }

}
// do not forget to expose these functions to other modules
module.exports = {
  logger, 
  validateUserId,
  validateUser,
  validatePost,
  validatePostId
}