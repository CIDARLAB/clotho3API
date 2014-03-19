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
> Creates a new Clotho object. <br/>
> 
> **Input:** (JSON object) An object describing an instance or instances of a Clotho schema.<br/>
> **Returns:**

### .destroy()
> Destroys the specified Clotho object. <br/>
> 
> **Input:** (Object selector) A String representing the Clotho object's *name* or *unique ID* targeted for deletion. <br/>
> **Returns:**

### .set()
> Sets all fields present in the object spec to their associated values for the Clotho object represented by the object ID. <br/>
> 
> **Input:** (JSON object) An object spec or list of multiple object specs containing field-value pairs to be set. Each object spec must contain the object ID to be modified. <br/> 
> **Returns:**

### .get()
> Gets a specified Clotho object. <br/>
> 
> **Input:** (Object selector) A String representing the desired Clotho object's *name* or *unique ID*. <br/>
> **Returns:**

### .query()
> Queries for all Clotho objects matching the specified criteria. <br/>
> 
> **Input:** (JSON object) An object spec. <br/>
> **Returns:**

### .queryOne()
> Queries for any single Clotho object matching the specified criteria. <br/>
> 
> **Input:** (JSON object) An object spec. <br/>
> **Returns:**

### .run()
> Runs a specified function with the given input parameters. <br/>
> 
> **Input:** (JSON object) An object containing the following two field-value pairs <br/>
> > 'function': An object selector for the desired function to be executed. <br/>
> > 'args': An ordered list of input arguments. <br/>

> **Returns:**

### .submit()
> Runs the input script. <br/>
> 
> **Input:** (String) The script to be executed as a String. <br/>
> **Returns:**

### .login()
> Attempts to log in with the specified *username* and *password*. <br/>
> 
> **Input:** (JSON object) An object containing the following two field-value pairs <br/>
> > 'username': The login username. <br/>
> > 'password': The password for the the login attempt. <br/>

> **Returns:**

### .logout()
> Attempts to log out if a user is currently logged in. <br/>
> 
> **Input:** (N/A) Logout does not take any input. <br/>
> **Returns:**

## Examples

## Tests
TODO: Add a link to the Q test suite HTML (use rawgithub or htmlpreview)? Or not.

## Contact

![](http://cidarlab.org/wp-content/uploads/2013/08/logo-adjusted.png)