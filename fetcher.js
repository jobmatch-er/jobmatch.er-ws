const WebSockets_Callback = require('wscb');
var wscb = WebSockets_Callback;
var _ = require('underscore')

// Set options for Websocket connection
var options = {
    verbose: true,
    asClient: true,
    address: '0.tcp.ngrok.io',
    port: 17616,
    onOpen: function (conn) {
        console.log("CONNECTION ESTABLISHED -> " + options.address)
        wscb.send({
            data: "match 'blendercraft.info@gmail.com'"
        }, function (response) {
            if (reqInvalid(response)) {
                console.log(response)
            } else {
                console.log(response)
            }
        });
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

/**
 * Generates server-readable query and transmits it over a websocket\
 * -> sendMatcherReq(), sendCommand()
 *
 * @param {String} query
 * @param {function} callback
 */
function sendQuery(query, callback) {
    console.log("query " + query.toString().replace(/ /g, "_/"));
    var query = "query " + query.toString().replace(/ /g, "_/")
    wscb.send({
        data: query
    }, function (response) {
        if (reqInvalid(response)) {
            callback(true, response)
        } else {
            callback(null, response)
        }
    });
}

function sendMatcherReq(user, callback){
    var query = "match " + user.email
    wscb.send({
        data: query
    }, function (response) {
        if (reqInvalid(response)) {
            callback(true, response)
        } else {
            callback(null, response)
        }
    });
}

function sendCommand(query, callback) {
    console.log("command " + query.toString().replace(/ /g, "_/"));
    var query = "command " + query.toString().replace(/ /g, "_/")
    wscb.send({
        data: query
    }, function (response) {
        if (reqInvalid(response)) {
            callback(true, response)
        } else {
            callback(null, response)
        }
    });
}


/**
 * Tests if the response contains "error" as a data property
 *
 * @param {*} data
 * @returns boolean
 */
function reqInvalid(data) {
    if (data.data == "error") {
        console.log("fddfsdf")
        return true
    } else {
        console.log("ne")
        return false
    }
}

module.exports = {
    start,
    sendQuery,
    sendCommand
}