
# What is rate Limiting 
- It is a technique used to control how frequently a user or a client can acceess your backend services (API endpoints). 
- It helps prevent abuse , ensure fair usage and protect your server from overload , and mitigate brute-force and DDoS attacks 

## In Detail
In Backend systems , you might wanat to limit : 
1. Number of requests per IP address 
2. Number of API calls. per user ( based on token / session )
3. Actions per resource (e.g., Login attempts).

## How to implement rate limiting in Node.js (with Typescript , Express , MongoDB)
1. Basic Rate Limiting using. - express-rate-limit
- This uses in-memory storage (not suitable for distributed systems or scaled apps )
