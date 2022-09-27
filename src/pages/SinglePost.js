import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import '../css/singlepost.css'
import AuthUser from '../components/AuthUser';
import Comment from '../components/Comment';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function SinglePost() {
    
    const params = useParams();
    const {user} = AuthUser();

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/posts/" + params.id)
            .then((res) => res.json())
            .then((data) => setData(data));
            getComments();
    }, []);

    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])
    const post_id = params.id
    const user_id = user.id
    const [validationError, setValidationError] = useState({})

    const getComments = () => {
        fetch(`http://127.0.0.1:8000/api/comment/${post_id}`)
              .then((res) => res.json())
              .then((data) => setComments(data));
    }

    const createComment = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('comment', comment)
        formData.append('post_id', post_id)
        formData.append('user_id', user_id)

        await axios.post(`http://localhost:8000/api/comment`, formData).then
            (({data})=>{
                Swal.fire({
                    icon: "success",
                    text:data.message
            })
            getComments();
            setComment("");
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


  
    return ( data ?
    <div>
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-9">
                    <div className="card mt-5 mb-5">
                        <div className="card-header h5">
                            {data.title}
                        </div>
                        <div className="card-body">
                            <div className="post-image-section">
                                <img src="https://us.123rf.com/450wm/creativepriyanka/creativepriyanka1905/creativepriyanka190500599/124082851-demo-icon.jpg?ver=6" alt="" className='d-block mx-auto' style={{ height: "300px", width: "300px" }} />
                            </div>
                            <div className="post-body pt-3">
                                {data.body}
                            </div>
                            <div className="post-tags mt-3">
                                <small><strong>Tags: </strong>{data.tag}</small>
                            </div>
                            <hr />
                            <div className="comments-section">
                                <div className='h5'>
                                    Comments
                                </div>
                                <div className="row">
                                    
                                    <Comment id={params.id} comments={comments} /> 
                                    
                                    <div className="col-md-6">                                 
                                        {user ? (
                                            <div className="comment-box pt-3" style={{ marginLeft: "50px" }}>
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
                                                <form onSubmit={createComment}>
                                                    <textarea value={comment} id="comment" cols="30" rows="3" className='form-control' onChange={e=>setComment(e.target.value)}></textarea>
                                                    <button type="submit" className='btn btn-sm btn-primary mt-2'>Comment</button>
                                                </form>
                                            </div>
                                        ):(
                                            <p className='pt-3'>* If you login here, you can comment in this post.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>:<></>
  )
}
