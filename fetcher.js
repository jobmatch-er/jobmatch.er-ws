const WebSockets_Callback = require('wscb');
var wscb = WebSockets_Callback;
var _ = require('underscore')

var options = {
    verbose: true, //will log some messages to the console
    asClient: true,
    address: '0.tcp.ngrok.io',
    port: 16016,
    onOpen: function (conn) {
        console.log("CONNECTION ESTABLISHED -> " + options.address)
    },
    onError: function (conn, error) {
        console.log("ERROR: " + error)
    },
    onUnexpectedMessage: function (conn, msg) {
        console.log(conn.data)
    },
}

var start = function () {
    wscb = new WebSockets_Callback(options);
}

function sendQuery(query, callback) {
    console.log("query " + query.toString().replace(/ /g, "_/"));
    var query = "query " + query.toString().replace(/ /g, "_/")
    wscb.send({
        data: query
    }, function (response) {
        console.log("eins")
        if (reqInvalid(response)) {
            callback(response.error, null)
        } else {
            callback(null, response)
        }
    });
}

function reqInvalid(data) {
    if (_.has(data, "error")) {
        console.log("fddfsdf")
        return true
    } else {
        console.log("ne")
        return false
    }
}

function getID(data) {
    var arr = data.split(" ");
    return arr[0]
}

function waitForSocketConnection(socket, callback) {
    setTimeout(
        function () {
            if (socket.readyState === 1) {
                console.log("Connection is made")
                if (callback != null) {
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
}