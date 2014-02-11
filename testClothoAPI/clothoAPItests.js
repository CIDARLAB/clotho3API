module("Server API Tests");

////////////////////////////////////////////////////////

// Creates new web socket socket
// var socket = new WebSocket('wss://localhost:8443/websocket');
// Callback function hash table --> Key: request id, Value: callback function
// var callbackHash = {};
// var requestID = 0;  

// // Websocket socket open
// socket.onopen = function(evt) {
//     // TODO: Authenticate websocket socket
// };
// //websocket socket closed
// socket.onclose = function(evt) {
//     alert("Closing websocket socket");
// };
// //websocket error occurs
// socket.onerror = function(evt) {
//     alert("Socket error. Is Clotho running?");
// };
var callbackHash = {};
var getSocket = function(addr) {
    socket = new WebSocket(addr);

    socket.oldsend = socket.send;

    // Helper function: Client sends message to server
    socket.send = function(channel, data, callback) {
        // if (socket.readyState !== 1) {
        //     // Open new websocket if one is not detected
        //     socket = new WebSocket('wss://localhost:8443/websocket');
        // }
        // Create 'deferred' object ... Q is a global variable created simply by adding the Q library script tag
        // var deferred = Q.defer();
        // New Request ID is assigned current time value
        var requestID = new Date().getTime();
        // Construct message to send
        var message = '{"channel":"' + channel + '", "data":"' + data + '","requestId":"' + requestID + '"}';
        // Hash callback function with its corresponding requestID
        callbackHash[channel + requestID] = callback;
        // var socket = new WebSocket('wss://localhost:8443/websocket');
        // Send message
        socket.oldsend(message);
        // Return promise
        // return deferred.promise;
    };

    // Client receives data from the server
    socket.onmessage = function(evt) {
        // Parse message into JSON  
        var dataJSON = JSON.parse(evt.data);
        // Ignore say messages which have no requestId
        var channel = dataJSON.channel;
        var requestId = dataJSON.requestId;
        if (requestId !== null) {
            // If callback function exists, run it
            var callback = callbackHash[dataJSON.channel + requestId];
            if (callback !== undefined) {
                callback(dataJSON.data);
                delete callbackHash[requestId];
            }
        }
    };
    return socket;
};

var clothosocket = "wss://localhost:8443/websocket";

LIBRARY JS
//////////////////////////////////////////////////////////////////////////////////////////////
CLIENT JS

asyncTest("get", function() {
    var socket = getSocket(clothosocket);
    socket.onopen = function() {
        socket.send("get", "Test Part 1", function(data) {
            equal(data.name, "Test Part 1");
            start();
        });
    };
});