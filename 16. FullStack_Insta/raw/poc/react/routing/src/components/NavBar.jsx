import React from 'react';
import { Link } from "react-router-dom";
const NavBar = () => {
    return (<ul>
        <li>
            <Link to="/Home">Home</Link>
        </li>
        <li>
            <Link to="/profile">Profile</Link>
        </li>
    </ul>);
}

export default NavBar;