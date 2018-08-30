const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, cb, errcb) => {
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    },
    json: true
  };
  request(options, (err, res, body) => {
    if (err) {
      console.error('Github API request error', err);
      return cb(err);
    }
    if (!Array.isArray(body)) {
      console.error('weird api call to github', body);
      return errcb(body);
    }
    cb(null, body, errcb);
  });
}

module.exports.getReposByUsername = getReposByUsername;


// 'Accept': 'application/vnd.github.v3+json'