# users-manager

This project was developped by David Enriquez for the TTMC company.

## Prerequisites

- [Node.js and npm](nodejs.org) Node >= 4.x.x, npm >= 2.x.x
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [MySQL Community Server]

### Run the project

1. Run `npm install` to install server dependencies.

2. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

#### Explanation

This project is built with the following layers : 
 - MySQl as database 
 - Express as front end web server
 - Node as back end web server
 - Sequilize as interaction framework between MySQL and Node 
 - Angular 5.2.4 as Front end developement framework

 The first layer of MySQl is hosted on localhost for development,
 Please edit connection string of file server/config/environment/developement.js according to your database server.
 The empty database "ttmc" must exist before the start of the application.
 The script to create database (create_and_populate_tables) has been updated accordinately to the new schema with users-privileges relation n-m
 Every time the node server start (in dev mode by default), the database is dropped and created from the beggining with data.

 I developped a Rest API for the users and privileges entities with node. Every CRUD access is made through it.
 You will find it in server/api folder.
 The URL for the API is dedicated by the pattern */api/*

 I used the Sequilize framework for the interaction between MySQL and Node which is a powerfull framework that allow to deal with complex relationned database schema.
 I declared the models and their types and the framework provides methods to send instructions to the database.

 I think the after running the app, it's pretty simple to use, it's works like the description in the document.
 I choose to challenge myself with the "extra credit" demand and it was a good experience.

 I hope you will enjoy the app !
 If you have any question, It will be a pleasure to answer.
 
 David Enriquez.
 
