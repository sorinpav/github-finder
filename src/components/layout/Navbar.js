import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // curly braces used because that's not the default export
// using React Link to preserve the state (a.k.a if I am already displaying search results, I don't want to lose them when 
// switching pages)
const Navbar = ({ icon, title }) => {
  return (
    <nav className="navbar bg-primary">
      <h1>
        <i className={icon}></i> {title}
      </h1>
      <ul>
        <li>
          <Link to='/'> Home </Link>
        </li>
        <li>
          <Link to='/about'> About </Link>
        </li>
      </ul>
    </nav>
  )
}

Navbar.defaultProps = {
  title: "Github Finder",
  icon: "fab fa-github"
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
}


export default Navbar
