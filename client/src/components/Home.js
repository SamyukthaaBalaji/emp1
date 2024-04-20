import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
  return (
    <div className='container-fluid d-flex justify-content-center align-items-center vh-100 gradient-background'><div className="container text-center mt-5">
    <h1>Employee Management</h1>
    <div className="row mt-5">
      <div className="col">
        <Link to="/register">
          <button className="btn btn-primary">Register</button>
        </Link>
      </div>
      <div className="col">
        <Link to="/login">
          <button className="btn btn-primary">Login</button>
        </Link>
      </div>
    </div>
  </div></div>
    
  );
}

export default Home;

