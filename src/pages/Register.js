import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GuestNavbar from '../components/GuestNavbar';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function NewRegister() {
    const navigate = useNavigate();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState("")
    const [validationError, setValidationError] = useState({})

    const changeHandler = (event) => {
        setImage(event.target.files[0]);
    }

    const createUser = async (e) => {
        e.preventDefault();

        const formData = new FormData()

        formData.append('name', name)
        formData.append('image', image)
        formData.append('email', email)
        formData.append('password', password)

        await axios.post(`http://localhost:8000/api/users`, formData).then(({data})=>{
        Swal.fire({
            icon:"success",
            text:data.message
        })
        navigate("/login")
        }).catch(({response})=>{
        if(response.status===422){
            setValidationError(response.data.errors)
        }else{
            Swal.fire({
            text:response.data.message,
            icon:"error"
            })
        }
        })
    }
    
    return (
    <div>
            <GuestNavbar/>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="login-image">
                            <img src="https://img.freepik.com/premium-vector/online-registration-illustration-design-concept-websites-landing-pages-other_108061-938.jpg?w=2000" alt="login_image" className='d-block mx-auto mt-5' style={{ height: "500px" }} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="login-form px-4" style={{ marginTop: "80px", }}>
                            <div className="card shadow">
                                <div className="card-header">
                                    <div className='h3 text-center'>Register</div>
                                </div>
                                <div className="card-body">
                                {
                                    Object.keys(validationError).length > 0 && (
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="alert alert-danger">
                                                    <ul className="mb-0">
                                                        {
                                                        Object.entries(validationError).map(([key, value])=>(
                                                            <li key={key}>{value}</li>   
                                                        ))
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                <form onSubmit={createUser}>
                                    <div className="form-group mb-3">
                                        <label>Name</label>
                                        <input type="name" className='form-control mt-1' onChange={e=>setName(e.target.value)}
                                        id="name" autoComplete='off' required/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Image</label>
                                        <input type="file" className='form-control mt-1'onChange={changeHandler}
                                        id="image" required/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Email</label>
                                        <input type="email" className='form-control mt-1' onChange={e=>setEmail(e.target.value)}
                                        id="email" autoComplete='off' required/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Password</label>
                                        <input type="password" className='form-control mt-1' onChange={e=>setPassword(e.target.value)}
                                        id="password" autoComplete='off' required />
                                    </div>
                                    <div className="form-group">
                                        <button type='submit' className='btn btn-primary'>Submit</button>
                                    </div>
                                </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}
