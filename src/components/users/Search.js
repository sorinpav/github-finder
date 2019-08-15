import React, {useState, useContext} from 'react'
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext'


const Search = () => {

    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);


    const [text, setText] = useState('');
    //this text is now attached to the state, and it is used in the input field in the form. 
    // We need to change the state to be able to type in the field, because otherwise it's always going to be blank.

    const onChange = (e) => setText(e.target.value );
    const onSubmit = (e) => {
        e.preventDefault();
        if (text === ''){
            alertContext.setAlert(' Please enter something', 'light'); // alert text shown above search bar
        } else {
            githubContext.searchUsers(text);
            setText('');
        }
    } 

        return (
            <div>
                <form onSubmit={onSubmit} className="form" >
                    <input type="text" name="text" placeholder="Search users..."
                        value={text}
                        onChange={onChange} />
                    {/* When we have a form in react, I usually will need state for the input */}
                    {/* Once we submit the form, it's calling onSubmit in the search component Search.js, and then we're
                        calling a prop method searchUsers. In app.js I set the prop in the search component to call
                        this.searchUsers. this.searchUsers makes a call to get the users from github. */}
                    <input onSubmit={onSubmit} type="submit" value="Search" className="btn btn-dark btn-block" />
                    { githubContext.users.length >0 
                    && 
                    <button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>Clear</button>
                    }
                    
                </form>
            </div>
        )
    
    
    
}



export default Search
