const Posts = require('../posts/posts-model')

const Users = require('../users/users-model')



const logger = (token) => (req, res, next) => {
  if(token === 'Token'){
      console.log(`Request Date: [${new Date()}] Method: ${req.method} to ${req.url} URL`)
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
    const hub = User.get(user)
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
    const posts = await Posts.get(post)
    if(!posts){
      res.status(400).json({message: `Post: ${post} could not be found`})
    }else{
      req.posts = posts
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