import React from 'react';
import { Link } from 'react-router-dom';
import AuthUser from './AuthUser';

export default function Navbar() {

    const {user, token, logout} = AuthUser();
    const logoutUser = () => {
        if(token !== undefined){
            logout();
        }
    }    

    return(
        <nav className="navbar navbar-expand-lg bg-light shadow sticky-top">
            <div className="container">
                <Link className="navbar-brand" to="/"><i className="fa-brands fa-react"></i> &nbsp;React Blog App</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/blog">Blog</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                        {user ? (
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src={`http://localhost:8000/storage/user/image/${user.image}`} alt="" className='border border-dark rounded-circle' style={{ height: "30px" }} /> {user.name}
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to={`/profile/${user.id}`}>Profile</Link></li>
                                {user.role === '1' ? (
                                <li><Link className="dropdown-item" to="/dashboard">Dashboard</Link></li>
                                ):(
                                <>
                                <li><Link className="dropdown-item" to="/add-post">Add post</Link></li>
                                <li><Link className="dropdown-item" to="/posts">Post List</Link></li>
                                </>
                                )}
                                <li><hr className="dropdown-divider"/></li>
                                <li><span role="button" className="dropdown-item" onClick={logoutUser}>Logout</span></li>
                            </ul>
                        </li>
                        ):(
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}