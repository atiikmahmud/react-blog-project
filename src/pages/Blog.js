import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  },[]);

  const fetchPosts = async () => {
    await axios.get(`http://localhost:8000/api/posts`).then(({data})=>{
      setPosts(data)
    })
  }

  return (
    <div className="blog">
      <div className="container">
        <div className="row">
          {
            posts.length > 0 && (
              posts.map((row, key) => (
                <div key={row.id} className="col-md-3 my-3">
                <div class="card" style={{ height: "100%" }}>
                  <img
                    src="https://us.123rf.com/450wm/creativepriyanka/creativepriyanka1905/creativepriyanka190500599/124082851-demo-icon.jpg?ver=6"
                    class="card-img-top"
                    alt="demo_image"
                    style={{ height: "300px", width: "300px" }}
                  />
                  <div class="card-body" style={{ height: "90%" }}>
                    <h5 class="card-title d-inline">{row.title}</h5>
                    <p className="d-inline"> by <span className="text-primary">{row.users.name}</span> </p>
                    <p class="card-text">
                      {row.body.substring(0, 100)} <Link to={"/blog/post/" + row.id } className="text-decoration-none">more...</Link>
                    </p>
                  </div>
                </div>
              </div>
              ))
            )
          }  
        </div>
      </div>
    </div>
  );
}
