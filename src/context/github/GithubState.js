// This file holds the initial state and actions (search users, make a request to github etc)
// Making requests to github as well in this file

// What happens is I call an action (make a request to github), get a response 
// and then I dispatch a response back to our reducer
// Most of the time it is an object which has a type 
// Sometimes a payload

import React, { useReducer } from 'react';
import axios from 'axios'; // to make requests to github
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS    
} from '../types';

const GithubState = (props) => {
    const initialState = {
        users: [],
        user: {},
        loading: false,
        repos: []
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    // Search users
    const searchUsers = async text => {
        setLoading();
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
        client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  
        //setUsers(res.data.items);
        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items 
        });
      }
    // Get user
    const getUser = async (username) => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
        client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        
        dispatch({
            type: GET_USER,
            payload: res.data,
            
        })
    } // something to be done with dispatch()
  
    // Get Repos
    const getUserRepos = async (username) => {

        setLoading()
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
        client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
    }
    // Clear users 
    const clearUsers = () => dispatch ( { type: CLEAR_USERS } );
    // Set Loading
    const setLoading = () => dispatch( { type: SET_LOADING } );

    return <GithubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos
        }}> 
        {props.children}
</GithubContext.Provider>
//making the above content available to our entire app
}

export default GithubState;