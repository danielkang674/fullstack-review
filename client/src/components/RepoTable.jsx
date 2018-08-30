import React from 'react';
import RepoSingleRow from './RepoSingleRow.jsx';

const RepoTable = (props) => {
  let demrepos = props.repos.map((repo, index) => <RepoSingleRow key={repo.github_id} repo={repo} index={index} />);
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Repo Name</th>
          <th scope="col">Repo Description</th>
          <th scope="col">Repo Owner</th>
          <th scope="col"># of Stars</th>
        </tr>
      </thead>
      <tbody>
        {demrepos}
      </tbody>
    </table>
  )
};

export default RepoTable;