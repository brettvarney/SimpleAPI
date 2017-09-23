/*
  Main application; http server
*/

const express = require('express');
const app = express();

const Database = require('./db/database.js');

/* config */
const serverPort = 8080;

var database = new Database; // initialize database

/* routing */
app.get('/', function(request, response) {
  let lat = request.query.lat || request.query.latitude;
  if (lat) {
    let long = request.query.long || request.query.longitude;
    if (long) {
      try {
        response.send(JSON.stringify(database.findNearest(lat, long)));
      } catch (err) {
        console.error(err);
        response.status(500).send("I'm afraid I can't do that. It's not you, it's me.\n\n")
      }
    } else {
      response.status(422).send('Required parameter missing: "long" (or "longitude")');
    }
  } else {
    response.status(422).send('Required parameter missing: "lat" (or "latitude")');
  }
});

/* server */
const server = app.listen(serverPort, () =>
  console.log(`Server started, listening on port ${server.address().port}...\n\n`) // to verify port is correct
);
