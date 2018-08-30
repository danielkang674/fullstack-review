import React from 'react';
import AlertBanner from './AlertBanner.jsx';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
  }

  handleChange(e) {
    this.setState({
      term: e.target.value
    });
  }

  search() {
    this.props.onSearch(this.state.term);
    this.setState({ term: '' });
  }

  render() {
    return (<div>
      <h4>Add more repos!</h4>
      <div className="form-inline">
        <div className="form-group mb-2">
          Enter a github username: <input className="form-control ml-2" value={this.state.term} onChange={(e) => this.handleChange(e)} placeholder="Enter a username" />
        </div>
        <button className="btn btn-primary ml-2 mb-2" onClick={() => this.search()}> Add Repos </button>
      </div>
      <AlertBanner alert={this.props.alert} />
    </div>)
  }
}

export default Search;