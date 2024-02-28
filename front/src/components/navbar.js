import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'


export const NavBar = () => {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <div className="navbar">
      <ul> {location.pathname == '/' ? '' : <li>
          <Link to="/">Home</Link>
        </li>}
        
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signin">Sign In</Link>
        </li>
      </ul>
    </div>
  );
};
