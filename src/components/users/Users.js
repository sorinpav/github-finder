import React, { useContext } from 'react';
import UserItem from '../users/userItem';
import Spinner from '../layout/Spinner';
import GithubContext from '../../context/github/githubContext';

const Users = () => {

  const githubContext = useContext(GithubContext);

  // users are coming in as props, fetched from Github

  const {users,loading} = githubContext;

  if (loading) {
    return <Spinner />
  } else {
    return (
      <div style={userStyle}>
        {users.map(user => (
          <UserItem key={user.id} user={user} /> // users get passed from props, being fetched in app.js, using axios with async                                        // & await.   
        ))}
      </div>
    )
  }

}



const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
};
export default Users
