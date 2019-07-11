const WebSocket = require('ws');
var HOST = "ws://0.tcp.ngrok.io"
var PORT = "11754"
var counter = 0;
var pendingRes = [];
var connection;
var start = function () {
    connection = new WebSocket(HOST + ":" + PORT)

    connection.on('open', function open() {
        console.log("CONNECTION ESTABLISHED -> " + HOST)  
    })
    
    connection.on('error', function error() {
        console.log("ERROR WHILE CONNECTING")
    })

    connection.on('message', function message(data) {
        console.log(data.toString())
        if(reqInvalid(data)){
            var cb = pendingRes[getID(data)]
            cb.call(getResult(data), null)
        } else {
            var cb = pendingRes[getID(data)]
            cb.call(null, getResult(data))
        }
       
    })
    
}


function sendQuery(query, callback){
    waitForSocketConnection(connection, function (){
        console.log(counter + " query " + query.toString().replace(/ /g, "_/"));
        connection.send(counter + " query " + query.toString().replace(/ /g, "_/"));
        pendingRes.push(callback);
    })
    counter++;
}

function reqInvalid(data){
    if(getID(data).startsWith("#")){
        return true
    } else {
        return false
    }
}

function getResult(data) {
    var arr = data.split(" ");
    return arr[2]
}

function getID(data){
    var arr = data.split(" ");
    return arr[0]
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
    start,
    sendQuery,
    getResult
}