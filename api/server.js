const express = require('express');
const server = express();
const postsRouter = require('./posts/posts-router');



// remember express by default cannot parse JSON in request bodies
server.use(express.json())


// global middlewares and routes need to be connected here


server.use('/api/posts/posts-router', postsRouter)


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
