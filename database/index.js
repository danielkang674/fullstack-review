const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');


let repoSchema = mongoose.Schema({
  github_id: Number,
  name: String,
  description: String,
  owner_id: Number,
  html_url: String,
  stargazers_count: Number,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (ghrepo) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  // const db = mongoose.connection;
  // db.on('error', console.error.bind(console, 'connection error:'));
  // db.once('open')
  let { id, name, description, html_url, stargazers_count, forks } = ghrepo;
  let repo = new Repo({ github_id: id, name, description, owner_id: ghrepo.owner.id, html_url, stargazers_count, forks });
  repo.save(err => {
    if (err) console.error(err);
  });
};

module.exports.save = save;