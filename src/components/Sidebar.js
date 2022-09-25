import React from 'react';
import { Link } from 'react-router-dom';
import '../css/dashboard.css';

export default function Sidebar() {
    return (
        <div className="menu-list-item">
            <ul>
            <li><Link to="/dashboard" className='links'><i class="fas fa-tachometer-alt"></i> Dashboard</Link></li>
            <li><Link to="/users" className='links'><i class="fas fa-user"></i> Users</Link></li>
            <li><Link to="/all-posts" className='links'><i class="far fa-file-alt"></i> Posts</Link></li>
            </ul>
        </div>
    )
}
