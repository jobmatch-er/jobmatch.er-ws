const WebSocket = require('ws');
var HOST = "ws://0.tcp.ngrok.io"
var PORT = "10481"

var start = function () {
    const connection = new WebSocket(HOST + ":" + PORT)

    connection.on('open', function open() {
        console.log("CONNECTION ESTABLISHED -> " + HOST)  
    })
    
    connection.on('error', function error() {
        console.log("ERROR WHILE CONNECTING")
    })

    connection.on('message', function message(data) {
        console.log(data)
    })
    
}


module.exports = {
    start
}