# [Personal Library](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/personal-library)

### About the project

This project is an assignment project created by FCC for Quality Assurance Certification.

Users can use this Personal Library to record books and add comments.

### Getting Started

[Express](https://expressjs.com/) is used as the Node.js web application framework in this project. See [hello-world example](https://expressjs.com/en/starter/hello-world.html).

#### Installing Node and NPM
This project depends on Nodejs and Node Package Manager (NPM). To install Node, go to https://nodejs.org and select the appropriate installation package depending on your computer's platform (Windows, MacOS or Linux).

`Note: On Windows machines, you may need to configure your PATH environmental variable in case you forgot to turn on the add to PATH during the installation steps.`

#### Verifying the Node Installation
To ensure that your NodeJS setup is working correctly, open the terminal and type the following to check for the version of Node and NPM
```
$ node -v
$ npm -v
```

#### Installing project dependencies
This project uses NPM to manage software dependencies. NPM Relies on the package.json file. To install dependencies, open the terminal, cd to the project directory and run:
```
$ npm install
```

#### Database setup
This project uses [MongoDB](https://www.mongodb.com/) as data framework and uses [Mongoose](https://mongoosejs.com/) for MongoDB object modeling. Model schema can be found in the `model.js` file.

To setup the database, assign your own database URL as the following environment variable, or put the following variable in a .env file:
```bash
DB="mongodb://localhost/test"
# or
DB=mongodb+srv://test@cluster0.mongodb.net/testdb
# or
DB="your connection URI here"

```

### Running the server

To run locally, cd to the project directory and type the following command:
```
$ node server.js
```
Then, load http://localhost:3000/ in a browser to see the output.

### Routes

This project has two main routes: `/api/books` and `/api/books/{bookid}`

#### For route /api/books :
##### GET /api/books

This API endpoint gets information about all books in the database. Response will be array of book objects in JSON format.
```js
[{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
```

##### POST /api/books

This API endpoint adds a new book item to the database. Id is generated by the database.

It expects a POST request with a json body and a `title` attribute. Sample request:
```js
{ title: "Best book to read during vacation" }
```

Sample response:
```js
// for request without title
'missing required field title'

// for successful request
{
    "comments":[],
    "commentcount":0,
    "_id":"604fbf629fdeb500d9a54a7d",
    "title":"Best book to read during vacation",
    "__v":0
}
```

##### DELETE /api/books

This API endpoint deletes all the book items from the database.
```js
// response for successful request
'complete delete successful'

```

#### For route /api/books/{bookid} :

##### GET /api/books/{bookid}

This API endpoint gets details of a book item from the database. Sample response:

```js
// for request with bookid not found in database
'no book exists'

// for successful request
{
    "comments":[],
    "commentcount":0,
    "_id":"604fbf629fdeb500d9a54a7d",
    "title":"Best book to read during vacation",
    "__v":0
}
```

##### POST /api/books/{bookid}

This API endpoint adds comments to a book item. It expects a valid bookid and a string comment in JSON body.

Sample request:
```js
{ "comment": "This book is relaxing" }
```

Sample reponse:
```js
// for request without comment
'missing required field comment'

// for bookid not found in database
'no book exists'

// for successful request
{
    "comments":["This book is relaxing", "Read again"],
    "commentcount":0,
    "_id":"604fbf629fdeb500d9a54a7d",
    "title":"Best book to read during vacation",
    "__v":0
}
```

##### DELETE /api/books/{bookid}

This API endpoint deletes a book item from the database. Sample response:
```js
// for bookid not found in database
'no book exists'

// response for successful request
'delete successful'

```

### Testing

Unittests and functional testes are located in the `/tests` folder. 

To run test, set up the following environment variable, or put the following variable in a `.env` file:
```
NODE_ENV=test
```

Then, run the app with the following command:
```
$ node server.js
```
