// Add script tag to html for Q Promise library hosted at cdnjs and JQuery library
//<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/q.js/0.9.6/q.min.js"></script>

//Encapsulate all code in this immediately-invoked function expression (aka: self-evoking anonymous function).
//Maintains scope and state for entirety of the library's execution.
(function(Clotho) {

    // Callback function hash table --> Key: request id, Value: callback function
    var callbackHash = {};
    var socket;

    window.Clotho = Clotho.prototype = { //Clotho function prototypes
        /**
         * Clotho.create
         * Creates specified object(s) and associated UUIDs in the order they are found in the list (if more than one).
         * @param {Object} A list of one or more JSON objects describing an instance(s) of Clotho schema.
         * @return {Object} A list of created objects
         */
        create: function(objects) {
            return send('create', objects);
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
        get: function(name, callback) {
            socket = new newSocket();
            socket.onopen = function() {
                socket.emit("get", name, callback);
            }
        },

        /**
         * Clotho.query
         * Seeks all Clotho object instances that match the object specification.
         * @param {Object} Clotho object specification.
         * @return {Object} All objects that match the spec.
         */
        query: function(objectSpec) {
            return objects;
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

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                              WebSocket                                                //
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    var newSocket = function() {
        
        socket = new WebSocket("wss://localhost:8443/websocket");
        
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
        
        // Helper function: Sends message to server 
        socket.emit = function(channel, data, callback) {
            if (socket.readyState != 1) {
                alert("Not ready");
                // socket = new WebSocket('ws://localhost:8443/websocket');
            }
            // Create 'deferred' object ... Q is a global variable
            // var deferred = Q.defer();
            var requestID = new Date().getTime();
            var message = '{"channel":"' + channel + '","data":"' + data + '","requestId":"' + requestID + '"}';
            // Hash callback function: (channel + requestID) because we need to distinguish between "say" messages and desired responses from server. 
            callbackHash[channel + requestID] = callback;
            // function(serverData) {
            //     // deferred.resolve(serverData);
            // };
            socket.send(message);
            // Return promise
            // return deferred.promise;
        };
        return socket;
    };
}(Clotho = window.Clotho || {}));
