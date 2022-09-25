import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthUser from '../components/AuthUser';
import axios from 'axios';

export default function AddPost() {
  
  const { user } = AuthUser();
  const navigate = useNavigate();

  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [tag, setTag] = useState("")
  const user_id = user.id
  const [validationError, setValidationError] = useState({})

  const ceratePost = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('title', title)
    formData.append('body', body)
    formData.append('tag', tag)
    formData.append('user_id', user_id)

    await axios.post(`http://localhost:8000/api/create-post`, formData).then
    (({data})=>{
      Swal.fire({
          icon: "success",
          text:data.message
      })
      navigate("/posts")
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
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <div className="add-post-area">
              <div className="card mt-5">
                <div className="card-header h4">
                  Create Post
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
                  <div className="post-form-area">
                    <form onSubmit={ceratePost}>
                      <div className="form-group mb-3">
                        <label>Post title</label>
                        <input type="text" className='form-control mt-1' onChange={e=>setTitle(e.target.value)} id="title" />                        
                      </div>
                      <div className="form-group mb-3">
                        <label>Post body</label>
                        <textarea id="body" cols="30" rows="5" className='form-control mt-1' onChange={e=>setBody(e.target.value)}></textarea>                       
                      </div>
                      <div className="form-group mb-3">
                        <label>Post tag</label>
                        <input type="text" className='form-control mt-1' onChange={e=>setTag(e.target.value)} id="tag" />                        
                      </div>
                      <div className="form-group d-flex justify-content-end">
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
    </div>
  )
}
