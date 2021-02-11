const express = require('express');
const server = express();
const morgan = require('morgan')
const postsRouter = require('./posts/posts-router');
const userRouter = require('./users/users-router')
const mw = require('./middleware/middleware')


// remember express by default cannot parse JSON in request bodies

server.use(morgan('dev'));
server.use(express.json())

// global middlewares and routes need to be connected here


server.use('/api/posts/posts-router', postsRouter)
server.use('/api/users/user-router', userRouter)
server.use(mw.logger('testing'))

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


module.exports = server;
