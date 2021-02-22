import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom"
const Dashboard = () =>{
    return (
        <nav>
            <ul>
            <li>
                <Link to="/profile">Profile</Link>
            </li>
            </ul>
        </nav>
    );
}

export default Dashboard;