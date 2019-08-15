import React, { Fragment, useEffect, useContext } from 'react'; 
import Spinner from '../layout/Spinner';
import {Link} from 'react-router-dom';
import Repos from '../repos/Repos';
import GithubContext from '../../context/github/githubContext';

const User = ({match}) => {

   const githubContext = useContext(GithubContext);
   const {getUser, user, loading, getUserRepos} = githubContext;

    useEffect(() => {
        getUser(match.params.login);
        getUserRepos(match.params.login);
        //eslint-disable-next-line
    },[]); 
    // way to solve the warning about adding getUser and getUserRepos as dependencies is to deactivate eslint. 
    // if I do add them as dependencies, it means it will be stuck in a loop.
    
    // to mimic the behaviour of componentDidMount(), I put an empty set of brackets here. 
    // I want this to only run once, not run in a loop. 
    // this is how to grab params, grabbing login from URL from App.js; route: /user/:login 
    // pass it it to getUser(), because it takes in a username to generate // all the data from a user. 
    // getUser() will make the request, get the info, fill the user state /// with res.data. Then, the user state which is altered by getUser() //// is passed back in into the User component in App.js and rendered.   
        

        const {
            name,
            avatar_url,
            location,
            bio,
            company,
            blog,
            login,
            html_url,
            followers,
            following,
            public_repos,
            public_gists,
            hireable
        } = user;

        if (loading) return <Spinner/>
        return (
            <Fragment>
                <Link to='/' className='btn btn-light btn-sm'> Back </Link>
                
            <div className="card grid-2">
                <div className="all-center">
                    <img src={avatar_url} alt="" className="round-img" style={{width:'150px'}}/>
                    <h1>{name}</h1>
                    <p>Location: {location}</p>
                </div>
                <div>
                    {bio && <Fragment>
                        <h3>Bio</h3>
                        <p>{bio}</p>
                        </Fragment>
                    }
                    <a href={html_url} className="btn btn-dark my-1">Visit Github Profile</a>
                    <ul>
                        <li>{login && <Fragment><strong>Username: </strong>{login}</Fragment>}</li>
                        <li>{company && <Fragment><strong>Company: </strong>{company}</Fragment>}</li>
                        <li>{blog && <Fragment><strong>Website: </strong>{blog}</Fragment>}</li>
                        <li>Hireable: {' '}
        {hireable ? <i className="fas fa-check text-success" /> : <i className="fas fa-times-circle text-danger" /> } </li>
                    </ul>
                </div>
            </div>
            <div className="card text-center">
                <div className="badge badge-primary">Followers: {followers}</div>
                <div className="badge badge-success">Following: {following}</div>
                <div className="badge badge-light">Public Repos: {public_repos}</div>
                <div className="badge badge-dark">Public Gists: {public_gists}</div>
            </div>
                <Repos/>
            
            </Fragment>
        )
    
}



export default User
