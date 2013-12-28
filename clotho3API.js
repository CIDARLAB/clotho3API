// Pull q library hosted at cdnjs
<script src="//cdnjs.cloudflare.com/ajax/libs/q.js/0.9.6/q.min.js"></script>
// Pull Socket.IO from cdn
<script src="http://cdn.socket.io/stable/socket.io.js"></script>

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// 								 Websocket socket and event handlers								 //
///////////////////////////////////////////////////////////////////////////////////////////////////////////

var socket = new WebSocket('ws://localhost:8080/websocket');	//creates new web socket socket
var socketPromises = {}; //key request id, value: promise
var requestID = 0;	

//websocket socket open
socket.onopen = function(evt) {
	//TODO: Authenticate websocket socket
};

//websocket socket closed
socket.onclose = function(evt) {
	alert("Closing websocket socket");
};

//websocket error occurs
socket.onerror = function(evt) {
	alert("Socket error. Is Clotho running?");
};

//client sends message to server
var send = function(channel, data, callback) {
    if (socket.readyState === 1) {
        //Request ID is assigned current time value
        var requestID = new Date().getTime();
        //Construct message to send
        var message = '{"channel":"' + channel + '", "data":' + data + ',"requestId":"' + requestID + '"}';
        //Hash callback function with its corresponding requestID
        socketPromises[requestID] = callback;
        //Send message
        socket.send(message);
    } else {
        //Open new websocket if one is not detected
        socket = new WebSocket('ws://localhost:8080/websocket');
    }
};

//Client receives data from the server
socket.onmesssage = function(evt) {
    //Parse message into JSON
    var dataJSON = $.parseJSON(evt.data);
    //Ignore say messages which have no requestId
    var channel = dataJSON["channel"];
    var requestId = dataJSON["requestId"];
    if (requestId !== null) {
        //If callback function exists, run it
        var callback = socketPromises[requestId];
        if (callback !== undefined) {
            callback(dataJSON["data"]);
            delete socketPromises[requestId];
        }
    }
};



///////////////////////////////////////////////////////////////////////////////////////////////////////////
// 												 Methods											     //
///////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
* @name clientAPI.create
* @param objects: set of one or more JSON objects describing an instance(s) of Clotho schema.
* @description Creates object(s) as defined by the input parameter. 
* @return An ID or list of IDs created.
*/
var create = function(objects) {
	return objectIDs;
}

/**
* @name clientAPI.destroy
* @param objects: One or more JSON object(s) describing an instance(s) of Clotho schema.
* @description Destroys object(s) as defined by the input.
*/
var destroy = function(objects) {
	//nothing to return
}

/**
* @name clientAPI.set
* @param objectSpecs: A JSON object specification with the ID field(s) of the Clotho object instance to be altered. 
* @description Sets the fields present in the specificiation to the values defined by the spec. 
* @return An ID or list of IDs of objects updated.
*/
var set = function(objectSpecs){
	return objectIDs;
}

/**
* @name clientAPI.get
* @param objectSelectors: JSON object selector(s) describing an instance(s) of Clotho schema.
* @description Gets object(s) as defined by the input parameter(s). 
* @return Object description for every input object requested.
*/
var get = function(objectSelectors) {
	return objects;
}

/**
* @name clientAPI.query
* @param objectSpec: Clotho object specification.
* @description Seeks all Clotho object instances that match the object specification. 
* @return All objects that match the spec.
*/
var query = function(objectSpec) {
	return objects;
}

/**
* @name clientAPI.queryAll
* @param objectSpec: Clotho object specification.
* @description Seeks Clotho object instances that match the object specification. 
* @return The first Clotho object that matches the spec.
*/
var queryOne = function(objectSpec) {
	return object;
}

/**
* @name clientAPI.run
* @param function: object selector indicating function to run.
		 args: JSON object with key-value pairs providing the argument values to the function.
* @description Executes specified function with args as its input.
*/
var run = function(function, args) {
	//nothing to return
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////
// BASIC_PART
// function BasicPart(name, description, seq, format, author) {	// Command server to create new Basic Part
// 	send("create", '{"schema":"BasicPart", "name":'+name+', "description":'+description+', "seq":'+seq+', "format":'+format+', "author":'+author+'}', ... );
// }
// function getBasicPart(name) {	// Query server to get existing Basic Part.
// 	// Should I not specify "BasicPart" schema here? Should I query for uuid in place of name?
// 	send("query", '{"schema":"BasicPart", "name":'+name+'}', function(data) {
// 		return data;
// 	});	
// }
// BasicPart.prototype = {
// 	getId: function() { return this.id; };	// Returns id of part	
// 	getName: function() { return this.name; };	// Returns name of part
// 	getAuthorId: function() { return this.author; }; 	// Returns author id associated with this part
// 	getDescription: function() { return this.shortDescription; };	// Returns description of this part
// 	getFormat: function() { return this.form };	// Returns Part Format object
// }

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
// // COMPOSITE_PART
// function CompositePart() {	// Command server to create new Composite Part

// }
// function getCompositePart(name) {	// Query server to get existing Composite Part
// 	send("query", '{"schema":"CompositePart", "name":'+name+'}', function(data) {
// 		return data;
// 	});
// }
// CompositePart.prototype = {

// }

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
// // PLASMID
// function Plasmid(part, vector, author, format) {	// Plasmid object constructor
	
// };
// function getPlasmid(name) {	// Query server to get existing plasmid using entered specifics
// 	send("query", '{"schema":"Plasmid", "name":'+name+'}', function(data) {
// 		return data;
// 	});
// };
// Plasmid.prototype = {
// 	getVectorId: function() {  };	// Returns id of vector object associated with this plasmid.
// 	getPartId: function() {  };	// Returns id of part object associated with this plasmid.		
// 	getAuthorId: function() {  };	// Returns id of author object associated with this plasmid.
// 	getFormatId: function() {  };	// Returns id of format table object associated with this plasmid.
// 	getName: function() {  };	// Returns plasmid name
// 	getConstructionFile: function() {  };	// Returns plasmid's construction file
// 	getUUID: function() {  };	// Returns plasmid's UUID
// 	getDateCreated: function() {  };	// Returns date plasmid was created
// 	getLastModified: function() {  };	// Returns date plasmid was last modified
// };

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// ANNOTATION

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// COLLECTION

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// DATA_SOURCE

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// FEATURE

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// FORMAT

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// INSTITUTION

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// LAB

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// NUCSEQ

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// PERSON

