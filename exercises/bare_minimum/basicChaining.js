/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var promiseConstructor = require('./promiseConstructor');
var promisification = require('./promisification');

Promise.promisifyAll(fs);

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // read file first
  return promiseConstructor.pluckFirstLineFromFileAsync(readFilePath)
  // get github username
    .then(function(firstLine) {
      return promisification.getGitHubProfileAsync(firstLine);
    })
  // get github profile info
    .then(function(profile) {
      return fs.writeFileAsync(writeFilePath, JSON.stringify(profile));
    })
    .catch((err) => {
      console.log('Error:', err);
    });
  //   fs.writeFile(writeFilePath, profile, (err) => {
  //     if (err) {
  //       throw err;
  //     } else {
  //       throw err;
  //     }
  //   });
  // })
  // sends request to github API for profile
  // write JSON response of the API to 'writeFilePath'
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
