import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthUser from '../components/AuthUser';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Profile() {
    const {user} = AuthUser();

    const navigate = useNavigate();

    // const [user,setUser] = useState(AuthUser());
    const [name, setName] = useState("")
    const [role, setRole] = useState("")
    const [image, setImage] = useState(null)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState(null)
    const [validationError,setValidationError] = useState({})

    useEffect(()=>{
        fetchUser()
    },[])

    const fetchUser = async () => {
        await axios.get(`http://localhost:8000/api/users/${user.id}`).then(({data})=>{
            const { name,email,role,image } = data.user
            setName(name)
            setEmail(email)
            setRole(role)
            setImage(image)
        }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.message,
                icon:"error"
            })
        })
    };

    const changeHandler = (event) => {
		setImage(event.target.files[0]);
	};

    const updateUser = async (e) => {
        e.preventDefault();
    
        const formData = new FormData()
        formData.append('_method', 'PATCH');
        formData.append('name', name)
        formData.append('role', role)
        formData.append('email', email)
        // formData.append('password', password)
        if(password!==null){
          formData.append('password', password)
        }
        if(image!==null){
            formData.append('image', image)
          }
    
        await axios.post(`http://localhost:8000/api/users/${user.id}`, formData).then(({data})=>{
          Swal.fire({
            icon:"success",
            text:data.message
          })
          console.log(data)
          if(data.user){
            sessionStorage.setItem('user', JSON.stringify(data.user))
          }
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
    <div className='container'>
        <div className="row d-flex justify-content-center">
            <div className="col-md-7">
                <div className="card mt-4">
                    <div className="card-header h4 text-center">
                        {user.name}'s Profile
                    </div>
                    <div className="card-body">
                        <div className="user-image">
                            <img src={`http://localhost:8000/storage/user/image/${user.image}`} alt="" className='d-block mx-auto border rounded-circle' style={{ height: "150px" }} />
                        </div>
                        <div className="user-details">
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
                            <form onSubmit={updateUser}>
                                <div className="row d-flex justify-content-center mt-3">
                                    <div className="form-group col-md-5">
                                            <input type="file" className='form-control' onChange={changeHandler}/>
                                        </div>
                                    </div>
                                <div className="row mt-3">
                                    <div className="form-group col-md-6 ">
                                        <label>Name</label>
                                        <input type="text" className='form-control mb-3' value={name} onChange={(event)=>{
                                        setName(event.target.value) }} autoComplete='off' required/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Role</label>
                                        <input type="text" className='form-control mb-3' value={role === '1' ? 'Admin' : 'User'} onChange={(event)=>{
                                        setRole(event.target.value) }} autoComplete='off' disabled/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Email</label>
                                        <input type="email" className='form-control mb-3' value={email} onChange={(event)=>{
                                        setEmail(event.target.value) }} autoComplete='off' required/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Password</label>
                                        <input type="password" className='form-control mb-3' onChange={(event)=>{
                                        setPassword(event.target.value) }} autoComplete='off'/>
                                    </div>
                                    <div className="form-group mt-1 d-flex justify-content-between">
                                        <Link to="/users" className="btn btn-danger">Go back</Link>
                                        <button type='submit' className='btn btn-primary'>Update</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
