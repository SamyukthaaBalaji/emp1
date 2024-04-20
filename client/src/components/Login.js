import React, { useEffect, useState } from "react";
import "./login.css";
import { useAuth } from "./AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        return toast("Enter Email &  Password");
      }
      const body = { email: email, password: password };
      const response = await fetch(`https://13.232.33.62:9000/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      console.log( data );
      console.log("Is admin:", data.isAdmin);
     

      login(data.token);

     
      setTimeout(() => {
        if (data.isAdmin === true) {
          navigate("/dashboard");
          toast("Logged in as Admin");
        } else {
          navigate("/user");
          toast("Logged in as user");
        }
      }, 5000);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 gradient-background">
      <div className="container">
        <Link to="/home" className="btn btn-primary home-button">
          Home
        </Link>
        <div className="col-md-6">
          <div className="card p-3">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
