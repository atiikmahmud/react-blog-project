import React from 'react';
import { Link } from 'react-router-dom';

export default function NoPage() {
  return (
    <div className='no-page'>
        <img src="https://img.freepik.com/premium-vector/error-404-page-file-found-with-people-concept-illustration-web-page_173706-128.jpg" alt="no_page_image" style={{ height: "500px" }} className="d-block mx-auto" />
        <div className="back-button text-center">
            <Link to="/" className="btn btn-primary">Go back</Link>
        </div>
    </div>
  )
}
