/*
  Application database functions
*/

const fs = require('fs');

/* config */
const databaseFile = 'db/pharmacies.csv';
const encoding = 'utf8';
const delimiter = ',';
const criticalColumnNames = ["name", "address", "latitude", "longitude"];

class Database {
  constructor() {
    // initialize data for internal access
    // for now, read entire CSV file & parse into in-memory object
    let data = fs.readFileSync(databaseFile, encoding, (err, contents) => {
      if (err) throw err;
      return contents;
    });

    if (!data) {
      throw 'No data in database.';
    }
    data = data.replace(/[\\"]/g, '').split('\n'); // make into "table" array, strip escaped quotes

    // get column (property) names
    let cols = data.shift().trim().split(delimiter);
    let check = this.missingColumns(cols);
    if (check.length > 0) {
      throw `Cannot find critical properties ${JSON.stringify (check)} in parsed data.`;
    }

    // create object of data
    let parsedData = [];
    try {
      data.slice(1).forEach((dataRow) => {
        let row = dataRow.split(delimiter);
        let newData = {};
        for (var i = 0; i++ < row.length;) {
          newData[cols[i]] = row[i];
        }
        parsedData.push(newData);
      });
    } catch (err) {
      throw `Problem parsing data:\n${err}`;
    }
    this.data = parsedData;
  }

  // check for missing critical column names for search & results, return array of missing names
  missingColumns(cols) {
    let missing = [];
    criticalColumnNames.forEach((col) => {
      if (cols.indexOf(col) === -1) {
        missing.push(col);
      }
    });
    return missing;
  }

  // find & return data item minimum total distance from given latitude/longitude
  findNearest(lat, long) {

  }

  // calculate the distance to each data row for the given lat/long, return array of miles in data-object order
  // NOTE: this is a "crow flies" calculation assuming a flat Earth grid; good enough for same metro area;
  //    would be better to use map API to find driving distance
  calcDistance(lat, long) {
    const degreesToMiles = 69.047; // yes, there are assumptions here that break down in larger areas

    let result = [];
    this.data.map((item) => {
      result.push(
        degreesToMiles * Math.sqrt(
          Math.pow(item.latitude - lat, 2) + Math.pow(item.longitude - long, 2)
        )
      );
    });
    return result;
  }

  // get entire database object
  getData() {
    return this.data;
  }

}

module.exports = Database;
