var server = require('pushstate-server');
require('./server/index.js')
server.start({
    port: 9000,
    directory: './build'
}, function() {
    console.log("Server start on : http://photobooth.local:9000")
})