1. Node is a runtime environment that makes it posible  to write serverside javascript 
-  released in 2011
- TypeScript - is a typed superset for javascript that can help with building and managing largescale javascript projects 

## Advantages of using Typescript 
- Strong static Typing (optional)
- Type inference  (Ability to automatically determine the type of a variable , parameter , or expression based on the value assigned to it  )
- 

## Steps to setting up a node project with typescript 
1. Initialize the project 
2. Configure  the typescript compiler 
   - Ts uses tsconfig.json to configure the compiler options for a project 
3. Creating a minimal typescript Express server 


## app.uddlese()ng mi
### Adding middleware to your express application 

- Middleware functions are functions that have access to the request object , response object and the Next function in the applications request-response cycle . 
- They perfrom tasks like parsing request bodies , logging and authentication 


### app.use(express.json())


### What it is: 
This is built-in middleware provided by Express itself.
###  What it does:
 It parses incoming requests with JSON payloads. When a client sends data in the body of a request (like in a POST or PUT request) with the Content-Type header set to application/json, this middleware will:

- Read the JSON data from the request body.
- Parse the JSON string into a JavaScript object.
- Attach the parsed object to the req.body property of the request object.


### Why you use it:
 This is essential for handling data sent from frontend applications or APIs that communicate using JSON. Without it, req.body would be undefined when receiving JSON data.
### In Node/TypeScript: 
The functionality is the same. You're telling your Express app to automatically handle and parse incoming JSON.

## Response Time -
-  Time taken from when the server recieved the request until it send the final response back to the client

## ODM and ORM 
ODM - Object Document mapper
ORM - Object relational mapper

## for validation of user input one can use joi library or even express validator
