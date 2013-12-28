// Pull q library hosted at cdnjs
<script src="//cdnjs.cloudflare.com/ajax/libs/q.js/0.9.6/q.min.js"></script>
// Pull Socket.IO from cdn
<script src="http://cdn.socket.io/stable/socket.io.js"></script>

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// 								 Websocket socket and event handlers								 //
///////////////////////////////////////////////////////////////////////////////////////////////////////////

// var socket = io.connect('http://localhost:8080');

var socket = new WebSocket('ws://localhost:8080/websocket');	//creates new web socket socket
var callbackHash = {}; // key: request id, value: callback function
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

// Client sends message to server
var send = function(channel, data, callback) {
    if (socket.readyState === 1) {
        // Request ID is assigned current time value
        var requestID = new Date().getTime();
        // Construct message to send
        var message = '{"channel":"' + channel + '", "data":' + data + ',"requestId":"' + requestID + '"}';
        // Hash callback function with its corresponding requestID
        callbackHash[requestID] = callback;
        // Send message
        socket.send(message);
    } else {
        // Open new websocket if one is not detected
        socket = new WebSocket('ws://localhost:8080/websocket');
    }
};

// Client receives data from the server
socket.onmesssage = function(evt) {
    // Parse message into JSON
    var dataJSON = $.parseJSON(evt.data);
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
* @name Clotho.create
* @param A list of one or more JSON objects describing an instance(s) of Clotho schema.
* @description Creates specified object(s) and associated UUIDs in the order they are found in the list (if more than one). 
* @return A list of created objects
*/
var create = function(objects) {
	return objectIDs;
}

/**
* @name Clotho.destroy
* @param objects: One or more JSON object(s) describing an instance(s) of Clotho schema.
* @description Destroys object(s) as defined by the input.
*/
var destroy = function(objects) {
	//nothing to return
}

/**
* @name Clotho.set
* @param objectSpecs: A JSON object specification with the ID field(s) of the Clotho object instance to be altered. 
* @description Sets the fields present in the specificiation to the values defined by the spec. 
* @return An ID or list of IDs of objects updated.
*/
var set = function(objectSpecs){
	return objectIDs;
}

/**
* @name Clotho.get
* @param objectSelectors: JSON object selector(s) describing an instance(s) of Clotho schema.
* @description Gets object(s) as defined by the input parameter(s). 
* @return Object description for every input object requested.
*/
var get = function(objectSelectors) {
	return objects;
}

/**
* @name Clotho.query
* @param objectSpec: Clotho object specification.
* @description Seeks all Clotho object instances that match the object specification. 
* @return All objects that match the spec.
*/
var query = function(objectSpec) {
	return objects;
}

/**
* @name Clotho.queryAll
* @param objectSpec: Clotho object specification.
* @description Seeks Clotho object instances that match the object specification. 
* @return The first Clotho object that matches the spec.
*/
var queryOne = function(objectSpec) {
	return object;
}

/**
* @name Clotho.run
* @param function: object selector indicating function to run.
		 args: JSON object with key-value pairs providing the argument values to the function.
* @description Executes specified function with args as its input.
*/
var run = function(function, args) {
	//nothing to return
}


