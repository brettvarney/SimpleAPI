/*
  Application database functions
*/

const fs = require('fs');

/* config */
const databaseFile = 'database/pharmacies.csv';
const encoding = 'utf8';

// read CSV file; parse into array "table" and column names
let parseDb = function() {
  let data = fs.readFileSync(databaseFile, encoding, (err, contents) => {
    if (err) throw err;
    return contents;
  });

  if (!data) {
    throw 'No data in database.';
  }
  data = data.replace(/[\\"]/g, '').split('\n');  // make into "table" array, strip backslash-quote combos
  let cols = data[0].split(',');
  return JSON.stringify(cols[0]);
}

// verify existence of critical column names for search/results
let verifyData = function(){

}

module.exports = {
  getList: function() {
    return parseDb();
  }
}
