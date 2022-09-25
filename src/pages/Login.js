import AuthUser from '../components/AuthUser';
import { Link } from 'react-router-dom';
import GuestNavbar from '../components/GuestNavbar';
import React, { useState } from 'react';

export default function Login() {
    const {http, setToken} = AuthUser();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const submitForm = () =>{
        //api call
        http.post('/login',{email:email, password:password}).then((res)=>{
            setToken(res.data.user, res.data.access_token);
        });
    }

    return (
    <div>
        <GuestNavbar/>
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="login-image">
                        <img src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=2000" alt="login_image" className='d-block mx-auto mt-3' style={{ height: "600px" }} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="login-form px-4" style={{ marginTop: "150px", }}>
                        <div className="card shadow">
                            <div className="card-header">
                                <div className='h3 text-center'>Login</div>
                            </div>
                            <div className="card-body">
                                                        
                            <div className="form-group mb-3">
                                <label>Email</label>
                                <input type="email" className='form-control mt-1' id="email" onChange={e => setEmail(e.target.value)} autoComplete='off' required/>
                            </div>
                            <div className="form-group mb-3">
                                <label>Password</label>
                                <input type="password" className='form-control mt-1' id="pwd" onChange={e => setPassword(e.target.value)} autoComplete='off' required />
                            </div>
                            <div className="form-group mb-2">
                                <small>If you are not register, <Link to="/register">click here</Link>.</small>
                            </div>
                            <div className="form-group">
                                <button type="button" onClick={submitForm} className='btn btn-primary'>Login</button>
                            </div>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
