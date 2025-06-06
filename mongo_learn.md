 # Here Iam learning mongo db 
 - it is a document db , it stores data in  json format called BSON
 - A record in mongo db is a document which stores data in key value pairs , to the structure of json objects 

 ## SQL vs Document databases 
 - SQL are considered relational databases  , they store related data in separate tables ,
 When data is needed it is queried from multiple tables and joined back together 
 - Mongo db is a Document database which is non-relational . Relational data is stored differently 
 - A non tabular database (Document databases ). 
 - Mongo db stores your data in flexible documents . Instead of having multiple tables you can simply keep all 
 of your data together . this makes reading your data very fast . 
 - Tables in Mongo db are called collections 


 ## Connecting to mongo db database 
 - To connect you will need your mongo db specific connection string 
 - 

## Mongo DB Query Api 
- This is the way you interact with your data 
 - Can be used in two ways 
 1. CRUD operations 
 2. Aggregation Pipelines
 
 ### Mongo Db Query API Uses 
 - AdHOc queries with mongosh , Compass , VSCode or A Mongo Db driver (for the programming language in use ). 
 - Data Transformations using Aggregation pipelines 
 - Document join support to combine data from diffrent collections 
 - Graph and geospatial queries 
 - Full text search 
 - Indexing to improve MongoDb query Perfomance 
 - Time series analysis 

 #### NOte 
 - In Mongo DB a database is not actually created until it gets content 
 - Inserting documents into a collection that does not exist will lead to that collection 
 being automatically created by mongo db 

 # Insert 
 ## Inserting Document into a mongo db database 
  1. insertOne() - Inserts one doc to a collection 
  2. insertMany() - Inserts an array of objects into the db 

 # Find 
- There are two methods two find data from a mongoDB collection 
1. find() - Selects data from a mongoDb collection 
- Accepts query Object - if left empty , all documents will be returned 
2. findOne() - Selects only one document 
- Accepts a query object - if left empty it will return the first document it finds 
- It only returns the first match it finds 

## Querying data 
 - To query or filter data we can include a query in  the find() or findOne() methods 

##### eg db.post.find({category: "News});

## Projection 
- Both find() and findOne() accept a second parameter called Projection 
- This is an Object that describes which fields to include in the results 
- It is Optional . If omitted , all fields will be included in the results 
## only title and date will be returned 
- db.posts.find({}, {title: 1, date: 1}), 
 - _id field is always included unless specifically excluded 
 - Use 1 to include a field and 0 to omit 
 - You cannot use both 0 and 1 in the same Object . The only exception is the _id field 
- Should either specify the fields you want to include or the fields you would like to exclude 



## Update 
- To update and existing document we can either use UpdateOne() or UpdateMany() methods
- They have two parameters 
 1. The first parameter is a query object to define which document or documents should be updated 
 2. The second parameter is an object defining the Updated data  

## UpdateOne()
- Will update the first document thatr is found matching the provided query 
- To update a document use the Set Operator  
## Set Operator  - to update 



