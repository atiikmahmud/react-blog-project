import React from 'react'

export default function About() {
  return (
    <div>
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="contact-image">
                        <img src="https://img.freepik.com/free-vector/about-us-concept-illustration_114360-639.jpg?w=2000" alt="contact_image" className='d-block mx-auto mt-5' style={{ height: "500px" }} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="login-form" style={{ marginTop: "80px"}}>
                        <div className="card shadow">
                            <div className="card-header">
                                <div className='h3 text-center'>About us</div>
                            </div>
                            <div className="card-body">
                              <div className="demo-1">
                                <h4>Blog</h4>
                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                              </div>
                              <div className="demo-2">
                                <h4>React JS</h4>
                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
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
