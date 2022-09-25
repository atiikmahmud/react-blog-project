import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

export default function Posts() {
  
  const params = useParams();
  
  const [posts, setPosts] = useState([])

    useEffect(()=>{
      fetchUsers() 
    },[])

    const fetchUsers = async () => {
        await axios.get(`http://127.0.0.1:8000/api/posts/user/${params.id}`).then(({data})=>{
          setPosts(data)
        })
    }  
  
  return (
    <div>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-9">
          <div className="card mt-5">
            <div className="card-header h5 text-center">
              Your posts
            </div>
            <div className="card-body">
              <div className="user-post-table">
                <table className='table table-hover'>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Post title</th>
                      <th>Post tag</th>
                      <th style={{ width: "20%" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        posts.length > 0 && (
                        posts.map((row, key)=>(
                        <tr key={row.id}>
                        <td>{key+1}</td>
                        <td>{row.title}</td>
                        <td>{row.tag}</td>
                        <td>
                          <Link to={"/blog/post/" + row.id } className='btn btn-sm btn-primary' style={{ marginRight: "5px" }}>View</Link>
                          <Link className='btn btn-sm btn-warning' style={{ marginRight: "5px" }}>Edit</Link>
                          <Link className='btn btn-sm btn-danger'>Delete</Link>
                        </td>
                      </tr>
                        ))
                      )
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
