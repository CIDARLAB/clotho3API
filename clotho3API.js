// TODO: How to ensure these libraries below are used? Cannot import js libs in other js files.
// Pull q library hosted at cdnjs
//<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/q.js/0.9.6/q.min.js"></script>
// Pull Socket.IO from cdn
//<script type="text/javascript" src="http://cdn.socket.io/stable/socket.io.js"></script>

var Q = require('q');

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// 								 Websocket socket and event handlers								 //
///////////////////////////////////////////////////////////////////////////////////////////////////////////

// Creates new web socket socket
var socket = new WebSocket('ws://localhost:8080/websocket');
// Callback function hash table --> Key: request id, Value: callback function
var callbackHash = {};
var requestID = 0;	

// Websocket socket open
socket.onopen = function(evt) {
	// TODO: Authenticate websocket socket
};

//websocket socket closed
socket.onclose = function(evt) {
	alert("Closing websocket socket");
};

//websocket error occurs
socket.onerror = function(evt) {
	alert("Socket error. Is Clotho running?");
};

// Helper function: Client sends message to server
var send = function(channel, data) {
    if (socket.readyState !== 1) {
    	// Open new websocket if one is not detected
        socket = new WebSocket('ws://localhost:8080/websocket');
    }
    // Create 'deferred' object
    var deferred = Q.defer();
    // New Request ID is assigned current time value
    var requestID = new Date().getTime();
    // Construct message to send
    var message = '{"channel":"' + channel + '", "data":' + data + ',"requestId":"' + requestID + '"}';
    // Hash callback function with its corresponding requestID
    callbackHash[requestID] = function(serverData) {
        deferred.resolve(serverData);
    };
    // Send message
    socket.send(message);
    // Return promise
    return deferred.promise;
};

// Client receives data from the server
socket.onmesssage = function(evt) {
    // Parse message into JSON  
    var dataJSON = JSON.parse(evt.data);
    // Ignore say messages which have no requestId
    var channel = dataJSON["channel"];
    var requestId = dataJSON["requestId"];
    if (requestId !== null) {
        // If callback function exists, run it
        var callback = callbackHash[requestId];	
        if (callback !== undefined) {
            callback(dataJSON["data"]);
            delete callbackHash[requestId];
        }
    }
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////
// 												 Methods											     //
///////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
* Clotho.create
* Creates specified object(s) and associated UUIDs in the order they are found in the list (if more than one). 
* @param {Object} A list of one or more JSON objects describing an instance(s) of Clotho schema. 
* @return {Object} A list of created objects
*/
var create = function(objects) {
	// DO I WANT A CALLBACK INPUT FOR THIS (AND ALL) METHODS?
    return send('create', objects);
}

/**
* Clotho.destroy
* Destroys object(s) as defined by the input.
* @param {Object} One or more JSON object(s) describing an instance(s) of Clotho schema.
*/
var destroy = function(objects) {
	//nothing to return
}

/**
* Clotho.set
* Sets the fields present in the specificiation to the values defined by the spec. 
* @param {Object} A JSON object specification with the ID field(s) of the Clotho object instance to be altered. 
* @return {Object} An ID or list of IDs of objects updated.
*/
var set = function(objectSpecs){
	return objectIDs;
}

/**
* Clotho.get
* Gets object(s) as defined by the input parameter(s).
* @param {Object} JSON object selector(s) describing an instance(s) of Clotho schema. 
* @return {Object} Object description for every input object requested.
*/
var get = function(objectSelectors) {
	return objects;
}

/**
* Clotho.query
* Seeks all Clotho object instances that match the object specification. 
* @param {Object} Clotho object specification.
* @return {Object} All objects that match the spec.
*/
var query = function(objectSpec) {
	return objects;
}

/**
* Clotho.queryAll
* Seeks Clotho object instances that match the object specification.
* @param {Object} Clotho object specification. 
* @return {Object} The first Clotho object that matches the spec.
*/
var queryOne = function(objectSpec) {
	return object;
}

/**
* Clotho.run
* Executes specified function with args as its input.
* @param {Object} Object selector indicating the function to run. Args: JSON object with key-value pairs providing the argument values to the function.
*/
var run = function(myFunction, args) {
	//nothing to return
}


