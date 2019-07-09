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

function sendQuery(query, id){
    waitForSocketConnection(ws, function (query, id){
        ws.send(id + " query " + query)
    })
}

function waitForSocketConnection(socket, callback){
    setTimeout(
        function () {
            if (socket.readyState === 1) {
                console.log("Connection is made")
                if (callback != null){
                    callback();
                }
            } else {
                console.log("wait for connection...")
                waitForSocketConnection(socket, callback);
            }

        }, 5); // wait 5 milisecond for the connection...
}
module.exports = {
    start
}