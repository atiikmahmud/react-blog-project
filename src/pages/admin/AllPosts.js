import React from 'react';
import '../../css/dashboard.css';
import Sidebar from '../../components/Sidebar';

export default function AllPosts() {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 sidebar bg-light shadow">
            <Sidebar/>
          </div>
          <div className="col-md-10">
          <h1>Posts</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
