import React from 'react';
import RepoSingleRow from './RepoSingleRow.jsx';

const RepoTable = (props) => {
  let demrepos = props.repos.map(repo => <RepoSingleRow key={repo.github_id} repo={repo} />);
  return (
    <table>
      <thead>
        <tr>
          <th>Repo Name</th>
          <th>Repo Description</th>
          <th>Repo Owner</th>
          <th># of Stars</th>
        </tr>
      </thead>
      <tbody>
        {demrepos}
      </tbody>
    </table>
  )
};

export default RepoTable;