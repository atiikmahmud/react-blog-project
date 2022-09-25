import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import '../css/singlepost.css'

export default function SinglePost() {
    
    const params = useParams();

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
                                    <div className="col-md-6">
                                        <div className="comments mt-4 d-flex">
                                            <div className="comment-user-img">
                                                <img src="https://templates.joomla-monster.com/joomla30/jm-news-portal/components/com_djclassifieds/assets/images/default_profile.png" alt="" className='border rounded-circle d-inline' style={{ height: "40px", width: "40px" }}/>
                                            </div>
                                            <div className="comment-details bg-light border rounded p-2" style={{ marginLeft: "10px" }}>
                                                <strong>Atik Mahmud</strong>
                                                <p>Lorem ipsum dolor sit amet.</p>
                                            </div>
                                        </div>
                                        
                                        <div className="comments my-4 d-flex">
                                            <div className="comment-user-img">
                                                <img src="https://templates.joomla-monster.com/joomla30/jm-news-portal/components/com_djclassifieds/assets/images/default_profile.png" alt="" className='border rounded-circle d-inline' style={{ height: "40px", width: "40px" }}/>
                                            </div>
                                            <div className="comment-details bg-light border rounded p-2" style={{ marginLeft: "10px" }}>
                                                <strong>SM Sejan</strong>
                                                <p>Lorem ipsum dolor sit amet.</p>
                                            </div>
                                        </div>
                                        <div className="comment-box" style={{ marginLeft: "50px" }}>
                                            <textarea name="comment" id="" cols="30" rows="3" className='form-control'></textarea>
                                            <button className='btn btn-sm btn-primary mt-2'>Comment</button>
                                        </div>
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
