require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { model } = require('../database/index.js');
const { TOKEN } = require('../config.js');
const { getReposByUsername } = require('../helpers/github.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  let username = req.body.term;
  getReposByUsername(username, (err, data) => {
    if (err) {
      return res.status(500).send(err.message + '! CHECK YO INPUT BRUH!');
    } else {
      return res.status(200).send(data);
    }
  });
});

app.get('/repos', function (req, res) {
  model.rankRepos((err, repos) => {
    if (err) return res.status(500).send('GET req server route repos:' + err);
    return res.status(200).send(repos);
  });
});

let port = process.env.PORT || 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});