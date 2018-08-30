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
  getReposByUsername(username, model.save, (err, data) => {
    if (err) {
      return res.status(500).send(err.message + ' CHECK YO INPUT BRUH!');
    } else {
      model.Repo.find((err, repo) => {
        if (err) return res.status(500).send('GET req server route repos:' + err);
        return res.status(200).send(repo);
      })
      // return res.status(200).send(data);
    }
  });
});

app.get('/repos', function (req, res) {
  model.Repo.find((err, repo) => {
    if (err) return res.status(500).send('GET req server route repos:' + err);
    return res.status(200).send(repo);
  });
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});