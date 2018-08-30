const request = require('request');
const config = require('../config.js');
const { model } = require('../database/index.js');

let getReposByUsername = (username, cb) => {
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
      return cb(body);
    }
    model.save(body, (err, data) => {
      if (err) {
        return cb(err);
      } else {
        return cb(null, 'Successfully got repos!');
      }
    });
  });
}

module.exports.getReposByUsername = getReposByUsername;
