// Add script tag to html for Q Promise library hosted at cdnjs and JQuery library
//<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/q.js/0.9.6/q.min.js"></script>

//Encapsulate all code in this immediately-invoked function expression (aka: self-evoking anonymous function).
//Maintains scope and state for entirety of the library's execution.
(function(Clotho) {

    var callbackHash = {}; //Callback function hash table --> Key: request id, Value: callback function

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                              WebSocket                                                //
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    socket = new WebSocket("wss://localhost:8443/websocket");

    socket.onopen = function() {
        //TODO: Remember JS is single-threaded so the WebSocket will not reach readystate=1 until 
        ///the entire library finishes loading. In the off chance the user writes a script that calls
        ///a Clotho function immediately upon completion of dependencies loading, the socket will not 
        ///have had enough time to enter readystate. Handle this by storing those calls (if any are made)
        ///and executing them in this socket.onopen() method.
    };

    socket.onmessage = function(evt) {
        // Parse message into JSON  
        var dataJSON = JSON.parse(evt.data);
        var channel = dataJSON.channel;
        var requestId = dataJSON.requestId;
        if (requestId !== null) {
            // If callback function exists, run it
            var callback = callbackHash[channel + requestId];
            if (callback !== undefined) {
                callback(dataJSON.data);
                delete callbackHash[channel + requestId];
            }
        }
    };

    var Message = function(channel, data, requestID) {
        this.channel = channel;
        this.data = data;
        this.requestId = requestID;
    };

    // Helper function: Sends message to server 
    socket.emit = function(channel, data) {
        // Create 'deferred' object ... Q is a global variable
        var deferred = Q.defer();
        var requestID = new Date().getTime();
        // var message = '{"channel":"' + channel + '","data":"' + data + '","requestId":"' + requestID + '"}';
        var message = new Message(channel, data, requestID);
        var callback = function(dataFromServer) {
            deferred.resolve(dataFromServer);
        };
        // Hash callback function: (channel + requestID) because we need to distinguish between "say" messages and desired responses from server. 
        callbackHash[channel + requestID] = callback;
        socket.send(JSON.stringify(message));
        return deferred.promise;
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                          Clotho Object                                                //
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    window.Clotho = Clotho.prototype = { //Clotho function prototypes

        /**
         * Clotho.create
         * Creates specified object(s) and associated UUIDs in the order they are found in the list (if more than one).
         * @param {Object} A list of one or more JSON objects describing an instance(s) of Clotho schema.
         * @return {Object} A list of created objects
         */
        create: function(objects) {
            return send("create", objects);
        },

        /**
         * Clotho.destroy
         * Destroys object(s) as defined by the input.
         * @param {Object} One or more JSON object(s) describing an instance(s) of Clotho schema.
         */
        destroy: function(objects) {
            //nothing to return
        },

        /**
         * Clotho.set
         * Sets the fields present in the specificiation to the values defined by the spec.
         * @param {Object} A JSON object specification with the ID field(s) of the Clotho object instance to be altered.
         * @return {Object} An ID or list of IDs of objects updated.
         */
        set: function(objectSpecs) {
            return objectIDs;
        },

        /**
         * Clotho.get
         * Gets object(s) as defined by the input parameter(s).
         * @param {Object} JSON object selector(s) describing an instance(s) of Clotho schema.
         * @return {Object} Object description for every input object requested.
         */

        get: function(name) {
            return socket.emit("get", name);
        },

        /**
         * Clotho.query
         * Seeks all Clotho object instances that match the object specification.
         * @param {Object} Clotho object specification.
         * @return {Object} All objects that match the spec.
         */
        query: function(spec, name) {
            var obj = {};
            obj[spec] = name;
            return socket.emit("query", obj);
        },

        /**
         * Clotho.queryAll
         * Seeks Clotho object instances that match the object specification.
         * @param {Object} Clotho object specification.
         * @return {Object} The first Clotho object that matches the spec.
         */
        queryOne: function(objectSpec) {
            return object;
        },

        /**
         * Clotho.run
         * Executes specified function with args as its input.
         * @param {Object} Object selector indicating the function to run. Args: JSON object with key-value pairs providing the argument values to the function.
         */
        run: function(myFunction, args) {
            return object;
        }
    };
}(Clotho = window.Clotho || {}));