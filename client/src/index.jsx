import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import RepoTable from './components/RepoTable.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
    this.getRepos = this.getRepos.bind(this);
  }

  componentDidMount() {
    this.getRepos();
  }

  search(term) {
    $.ajax({
      method: "POST",
      url: "http://localhost:1128/repos",
      data: { term: term }
    })
      .done((data) => {
        console.log('i was run', data);
        this.getRepos(data);
      })
      .fail(err => {
        console.error('from react POST request to my server', err);
      });
  }

  getRepos() {
    console.log('i was called getrepos');
    $.ajax({
      method: "GET",
      url: "http://localhost:1128/repos",
    })
      .done(data => {
        this.setState({ repos: data });
      })
      .fail(err => {
        console.error('from react GET request to my server failed', err);
      });
  }

  render() {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} />
      <Search onSearch={this.search.bind(this)} getRepos={this.getRepos} />
      <RepoTable repos={this.state.repos} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));