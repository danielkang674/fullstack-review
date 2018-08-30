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
      repos: [],
      alert: ""
    }
    this.getRepos = this.getRepos.bind(this);
  }

  componentDidMount() {
    this.getRepos();
  }

  search(term) {
    $.ajax({
      method: "POST",
      url: "/repos",
      data: { term: term }
    })
      .done((data) => {
        this.getRepos();
        this.setState({ alert: data });
      })
      .fail(err => {
        this.setState({ alert: err.responseText });
        console.error('from react POST request to my server', err);
      });
  }

  getRepos() {
    $.ajax({
      method: "GET",
      url: "/repos",
    })
      .done(data => {
        this.setState({ repos: data });
      })
      .fail(err => {
        console.error('from react GET request to my server failed', err);
      });
  }

  render() {
    return (<div className="container">
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} />
      <Search onSearch={this.search.bind(this)} getRepos={this.getRepos} alert={this.state.alert} />
      <RepoTable repos={this.state.repos} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));