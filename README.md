Yodlr Front End Engineer Code/Design Challenge
=======================

## Getting Started

To use this application, you will need to download and install [NodeJS](http://nodejs.org/download/).

Once you have NodeJS installed, you have two choices for downloading this source code:

1. Download & extract a [zip file](https://github.com/yodlr/frontend-code-challenge/archive/master.zip) of the source
2. Fork this repository and git clone your fork

Next, you need to install the package dependencies by running the following command in the top-level directory of this source tree:
```
npm install
```

Once the dependancies are installed, you can start the application server by running
```
npm start
```

Once the server is running, you can access the start page (index.html) by opening your browser to [http://localhost:3000](http://localhost:3000).

To stop the server, press CTRL-C.

## REST API

The Users JSON REST API is exposed at [http://localhost:3000/users](http://localhost:3000).

On server start, user data is read into memory from init_data.json. All subsequent actions are done against this memory store.  Stopping and starting the server will re-initialize data from init_data.json.

#### API Endpoints

* **/users**
HTTP GET: returns array of all users
HTTP POST: creates a new user, returns the created user data
* **/users/:id**
HTTP GET: returns the user with given id (numeric, auto-incrementing).  HTTP 404 if user not found
HTTP PUT: updates the user with given id and returns updated record. HTTP 404 if user not fund.
HTTP DELETE: removes the users with given id, returns nothing (HTTP 204)

Here is an example of results returned from HTTP GET on /users:
```
[{"id":1,"email":"kyle@getyodlr.com","firstName":"Kyle","lastName":"White","state":"active"},
{"id":2,"email":"jane@getyodlr.com","firstName":"Jane","lastName":"Stone","state":"active"},
{"id":3,"email":"lilly@getyodlr.com","firstName":"Lilly","lastName":"Smith","state":"pending"},
{"id":4,"email":"fred@getyodlr.com","firstName":"Fred","lastName":"Miles","state":"pending"},
{"id":5,"email":"alex@getyodlr.com","firstName":"Alexandra","lastName":"Betts","state":"pending"}]
```

## Features
* Users can register
* Admin page lists all users
* Sorting of users
* Admin button to activate accounts (set user status to 'active')
* Admin creation of new accounts
