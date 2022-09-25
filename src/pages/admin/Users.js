import React, { useEffect, useState } from 'react';
import '../../css/dashboard.css';
import Sidebar from '../../components/Sidebar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Users() {
  
  const [users, setUsers] = useState([])

    useEffect(()=>{
      fetchUsers() 
    },[])

    const fetchUsers = async () => {
        await axios.get(`http://localhost:8000/api/users`).then(({data})=>{
          setUsers(data)
        })
    }
  
    const deleteUser = async (id) => {
      const isConfirm = await Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          return result.isConfirmed
        });

        if(!isConfirm){
          return;
        }

        await axios.delete(`http://localhost:8000/api/users/${id}`).then(({data})=>{
          Swal.fire({
              icon:"success",
              text:data.message
          })
          fetchUsers()
        }).catch(({response:{data}})=>{
          Swal.fire({
              text:data.message,
              icon:"error"
          })
        })
    }
  
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 sidebar bg-light shadow">
            <Sidebar/>
          </div>
          <div className="col-md-10">
            <div className="container">
              <div className="card mt-4">
                <div className="card-header">
                  <div className='h4'>
                    Users List
                  </div>
                </div>
                <div className="card-body">
                  <div className="users-list-table">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Status</th>
                        <th scope="col" style={{ width: "20%" }}>Action</th>

                      </tr>
                    </thead>
                    <tbody>
                      {
                        users.length > 0 && (
                          users.map((row, key)=>(
                              <tr key={row.id}>
                              <td>{key+1}</td>
                              <td><img src={`http://localhost:8000/storage/user/image/${row.image}`} alt="" className='user-image-style rounded-circle border' /></td>
                              <td>{ row.name }</td>
                              <td>{ row.email }</td>
                              <td>{row.role === '1' ? (<span class="badge text-bg-danger">Admin</span>) : (<span class="badge text-bg-warning">User</span>) }</td>
                              <td><span class="badge text-bg-success">Active</span></td>
                              <td>
                                <Link to="#" className='btn btn-sm btn-primary link-style'>Posts</Link>
                                <Link to={`/edit-user/${row.id}`} className='btn btn-sm btn-success link-style'>Edit</Link>
                                <Link onClick={()=>deleteUser(row.id)} className='btn btn-sm btn-danger'>Delete</Link>
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
    </div>
  )
}
