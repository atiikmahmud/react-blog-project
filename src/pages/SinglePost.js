import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import '../css/singlepost.css'
import AuthUser from '../components/AuthUser';
import Comment from '../components/Comment';

export default function SinglePost() {
    
    const params = useParams();
    const {user} = AuthUser();

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/posts/" + params.id)
            .then((res) => res.json())
            .then((data) => setData(data));
    }, []);
  
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
                                    
                                    <Comment id={params.id} /> 
                                    
                                    <div className="col-md-6">                                 
                                        {user ? (
                                            <div className="comment-box pt-3" style={{ marginLeft: "50px" }}>
                                                <textarea name="comment" id="" cols="30" rows="3" className='form-control'></textarea>
                                                <button className='btn btn-sm btn-primary mt-2'>Comment</button>
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
