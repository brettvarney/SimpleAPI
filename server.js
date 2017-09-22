/*
  Main application; http server
*/

const express = require('express');
const app = express();

const database = require('./database/db.js');

/* config */
const serverPort = 8080;

/* routing */
app.get('/', function(request, response) {
  response.send(database.getList());
});

/* server */
const server = app.listen(serverPort, () =>
  console.log(`Server started, listening on port ${server.address().port}...`)    // to verify port is correct
);
