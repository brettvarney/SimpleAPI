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
  try {
    let lat = request.query.lat || request.query.latitude;
    if (lat) {
      let long = request.query.long || request.query.longitude;
      if (long) {

        // get only specific properties to return to requester
        let {name, address, distance} = database.findNearest(lat, long);
        response.json({
          "name": name,
          "address": address,
          "distance": distance
        });
      } else {
        response.status(422).end('Required parameter missing: "long" (or "longitude")\n\n');
      }
    } else {
      response.status(422).end('Required parameter missing: "lat" (or "latitude")\n\n');
    }
  } catch (err) {
    console.error(err);
    response.status(500).end("I'm afraid I can't do that. It's not you, it's me.\n\n")
  }
});

/* server */
const server = app.listen(serverPort, () =>
  console.log(`Server started, listening on port ${server.address().port}...\n\n`) // to verify port is correct
);
