# SimpleAPI
A Very simple REST API to demonstrate competence in ES6, node.js, express.js and general programming

## General Notes

This project requires node.js (written for v 8.2.1) and npm; all other dependencies are in package-lock.json, so 'npm install' should do it. Then just execute 'node server.js' in the root folder to start it locally, any Web client should work (browser, cURL, Postman, etc)
For simplicity, several assumptions/configurations have been made that would be more flexible in a production environment:
* The "database" is a CSV file with a header row of column names, and all rows are complete sets of data in the same order. No validation is performed on this, except to ignore blank lines. However, the data headers are checked for column names required for processing.
* The data file is small enough to be completely read into and manipulated in memory. The data functions are abstracted into a class to update this in the future as needed.
* The API only responds to GET requests on the root, and two query-style parameters are required: "lat" (or "latitude") and "long" (or "longitude"). Other parameters are ignored, other HTTP verbs produce an appropriate response.
* The returned data is JSON, or a status code indicating the problem. Server errors are logged to stderr with a 500 response.
* Returned data includes distance in miles to the nearest row data (pharmacies in this case), without forced rounding.
* Distance is direct point-to-point, with no consideration for Earth's curvature. A better approach would be to use a map API to compare driving paths, but that was beyond the current scope.
* No unit tests are included in this project. This is simply to reduce the complexity and dependencies; even a project this simple should have tests for end-user interactions, internal functions, and database access/manipulation.
