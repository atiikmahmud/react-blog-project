import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Contact() {
    const navigate = useNavigate();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [validationError, setValidationError] = useState({})

    const sendMessage = async (e) => {
        e.preventDefault();

        const formData = new FormData()

        formData.append('name', name)
        formData.append('email', email)
        formData.append('message', message)

        await axios.post(`http://localhost:8000/api/message`, formData).then(({data})=>{
            Swal.fire({
                icon: "success",
                text:data.message
            })
            navigate("/")
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
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="contact-image">
                        <img src="http://unblast.com/wp-content/uploads/2020/09/Contact-Us-Vector-Illustration-1.jpg" alt="contact_image" className='d-block mx-auto mt-5' style={{ height: "500px" }} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="login-form px-4" style={{ marginTop: "80px"}}>
                        <div className="card shadow">
                            <div className="card-header">
                                <div className='h3 text-center'>Contact</div>
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
                                <form onSubmit={sendMessage}>                            
                                    <div className="form-group mb-3">
                                        <label htmlFor="">Name</label>
                                        <input type="text" className='form-control mt-1' onChange={e=>setName(e.target.value)}
                                        id="name" required/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="">Email</label>
                                        <input type="email" className='form-control mt-1' onChange={e=>setEmail(e.target.value)}
                                        id="email" required/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="">Message</label>
                                        <textarea rows="5" cols="12" className='form-control' onChange={e=>setMessage(e.target.value)}></textarea>
                                    </div>
                                    <div className="form-group">
                                        <button type='submit' className='btn btn-primary'>Send</button>
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
