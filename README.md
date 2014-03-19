# Clotho 3.0   <img align="right" src="http://cidarlab.org/wp-content/uploads/2013/08/research-clotho.png" />
<!-- ![](http://cidarlab.org/wp-content/uploads/2013/08/research-clotho.png) -->

## Purpose

## Getting Started

### Installation
+ **Requirements:** 
    1. Kristopher Kowal's [Q Promise Library](https://github.com/kriskowal/q) for asynchronous server communication.<br />
    *Simplest Approach: Copy and paste the following source script into your HTML's head.*
    `<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/q.js/0.9.6/q.min.js"></script>` 
    
    2. **clotho3api.js:** Download the Clotho API, add it to your project files, and include it as a `<script>` tag within your HTML (loading this script will create a `Clotho` global variable which is used to call any of the listed Clotho functions below).
    
    3. **Install Clotho:** Follow the instructions outlined [here](https://github.com/CIDARLAB/clotho3/wiki/Installing-Clotho-3.0).

### Resources
* [Q Promise Reference](https://github.com/kriskowal/q/wiki/API-Reference)
* [Official Clotho Website](http://www.clothocad.org/)
* [About Clotho](http://cidarlab.org/clotho/)

## API
### .create()
> Creates the specified Clotho object(s). <br/>
> 
> **Input:** (JSON object) An object describing an instance or instances of a Clotho schema.<br/>
> **Returns:** The ID (or sequential list of IDs if more than one object was specified) of the successfully created object. <br/>

> **Notes:** 
> > + If the specification includes an 'id' field the object will receive that ID value. Otherwise a unique ID will be created.
> > + Status notifications are reported on the 'say' channel regarding successfulness of object creation. If an object failed to be created, an explanation will also be reported.

### .destroy()
> Destroys the specified Clotho object. <br/>
> 
> **Input:** (Object selector) A String representing the Clotho object's *name* or *unique ID* targeted for deletion. <br/>
> **Returns:** N/A <br/>

> **Notes:**
> > + Clotho will fail to destroy an object if given an ambiguous object selector.
> > + An error message is reported on the 'say' channel if `Clotho.destroy()` fails.

### .set()
> Sets all fields present in the object spec to their associated values for the Clotho object represented by the object ID. <br/>
> 
> **Input:** (JSON object) An object spec or list of multiple object specs containing field-value pairs to be set. Each object spec must contain the object ID to be modified. <br/> 
> **Returns:** The ID of the modified/created object. <br/>
 
> **Notes:**
> > + The object spec must include the object ID.
> > + Fields present in the original object but not in the input object spec are unchanged.
> > + If a new field is encoded in the object spec, it will be added to the existing object.
> > + If the object does not exist or if an object ID is not provided, the object is then constructed by way of `Clotho.create()`.

### .get()
> Gets a specified Clotho object. <br/>
> 
> **Input:** (Object selector) A String representing the desired Clotho object's *name* or *unique ID*. <br/>
> **Returns:** The object(s) specified by the input object selector(s). <br/>

> **Notes:**
> > + If the input object selector is ambiguous Clotho will return the first object posted by MongoDB (essentially arbitrarty).
> > + Clotho will report an error message on the 'say' channel if an object could not be retrieved.

### .query()
> Queries for all Clotho objects matching the specified criteria. <br/>
> 
> **Input:** (JSON object) An object spec. <br/>
> **Returns:** All objects matching the fields provided in the spec.

### .queryOne()
> Queries for any single Clotho object matching the specified criteria. <br/>
> 
> **Input:** (JSON object) An object spec. <br/>
> **Returns:** The *first* object matching the fields provided in the spec.

### .run()
> Executes the specified function with the given input parameters. <br/>
> 
> **Input:** (JSON object) An object containing the following two field-value pairs <br/>
> > 'function': An object selector for the desired function to be executed. <br/>
> > 'args': An ordered list of input arguments. <br/>

> **Returns:** The evaluated value of the function executed with the specified arguments. <br/>

> **Notes:**
> > + Clotho will send an error message on the 'say' channel if:
> >     1. There is an error during function execution,
> >     2. There is no function matching the function specifier, 
> >     3. There exist ambiguously specified arguments.

### .submit()
> Executes the input script. <br/>
> 
> **Input:** (String) The script to be executed as a String. <br/>
> **Returns:** The value returned from executing the specified script on the server-side scripting environment. <br/>

> **Notes:** JavaScript is currently the only language Clotho will accept.

### .login()
> Attempts to log in with the specified *username* and *password*. <br/>
> 
> **Input:** (JSON object) An object containing the following two field-value pairs <br/>
> > 'username': The login username. <br/>
> > 'password': The password for the the login attempt. <br/>

> **Returns:** True if login attempt succeeds and false if the login attempt fails. <br/>

> **Notes:**
> > + After successfully logging in, all commands thereafter will be executed with that user's identity.

### .logout()
> Attempts to log out if a user is currently logged in. <br/>
> 
> **Input:** (N/A) Logout does not take any input. <br/>
> **Returns:** True if the connection was previously bound to a user (i.e. a user was logged in) and false if no one is logged in.<br/>

## Examples

## Tests
TODO: Add a link to the Q test suite HTML (use rawgithub or htmlpreview)? Or not.

## Contact

![](http://cidarlab.org/wp-content/uploads/2013/08/logo-adjusted.png)