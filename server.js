/*
  Main application; http server
*/

const express = require('express');
const app = express();

const Database = require('./db/database.js');

/* config */
const serverPort = 8080;

const database = new Database; // initialize database

/* routing */
app.get('/', function(request, response) {
  try {
    let lat = request.query.lat || request.query.latitude;
    if (lat) {
      let long = request.query.long || request.query.longitude;
      if (long) {
        if (validInput(lat, long)) {

          // get only specific properties to return to requester
          let {name, address, city, state, zip, distance} = database.findNearest(lat, long);
          response.json({
            "name": name,
            "address": address,
            "city": city,
            "state": state,
            "zip": zip,
            "distance": distance
          });
        } else {
          response.status(422).end('Invalid input: latitude must be between -90 and 90, longitude must be between -180 and 180\n\n');
        }
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

// check input parameters
let validInput = function(lat, long) {
  if (isNaN(lat) || Math.abs(lat) > 90 || isNaN(long) || Math.abs(long) > 180) {
    return false;
  }
  return true;
}

/* server */
const server = app.listen(serverPort, () =>
  console.log(`Server started, listening on port ${server.address().port}...\n\n`) // to verify port is correct
);
