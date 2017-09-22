/*
  Application database functions
*/

const fs = require('fs');

/* config */
const databaseFile = 'database/pharmacies.csv';
const encoding = 'utf8';

module.exports = {
  getList: function() {
    return fs.readFileSync(databaseFile, encoding, (err, contents) => {
      if (err) throw err;
      return contents;
    })
  }
}
