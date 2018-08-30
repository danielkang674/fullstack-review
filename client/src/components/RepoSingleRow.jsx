import React from 'react';

const RepoSingleRow = (props) => (
  <tr>
    <th scope="row">{props.index + 1}</th>
    <td><a href={props.repo.html_url}>{props.repo.name}</a></td>
    <td>{props.repo.description}</td>
    <td>{props.repo.owner_name}</td>
    <td>{props.repo.stargazers_count}</td>
  </tr>
)

export default RepoSingleRow;