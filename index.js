// require your server and launch it
const server = require('./api/server')

server.listen(4000, () => {
    console.log('Server is listening on: http://localhost:4000')
})

