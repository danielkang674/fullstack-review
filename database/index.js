const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');


let repoSchema = mongoose.Schema({
  github_id: { type: Number, unique: true },
  name: String,
  description: String,
  owner_id: Number,
  owner_name: String,
  html_url: String,
  stargazers_count: Number,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (err, ghrepos, cb) => {
  if (err) {
    console.error("Couldn't save to database", err);
    return err;
  } else {
    for (let ghrepo of ghrepos) {
      let { id, name, description, html_url, stargazers_count, forks } = ghrepo;
      Repo.find({ github_id: id }, (err, duplicate) => {
        if (err) {
          console.error(err);
          return err;
        }
        if (duplicate.length === 0) {
          let repo = new Repo({ github_id: id, name, description, owner_id: ghrepo.owner.id, owner_name: ghrepo.owner.login, html_url, stargazers_count, forks });
          repo.save(err => {
            if (err) console.error(err);
          });
        }
      });
    }
    cb(null, 'test');
  }
};

module.exports.model = { save: save, Repo: Repo };