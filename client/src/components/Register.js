import React, { useState } from "react";
import "./register.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role is user
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (name === "" || email === "" || password === "") {
        return toast.error("Please Enter The Credentials");
      }
      const body = {
        name: name,
        email: email,
        password: password,
        is_admin: role === "admin",
      };
      const response = await fetch(`http://13.232.33.62:9000/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      console.log(data);
      toast(data.message);
      console.log("Is admin:", data.is_admin);
      if (data.status === true) {
        if (role === "admin") {
          navigate("/dashboard");
        } else {
          // Normal user registration
          // Redirect to a different page or show a message
          toast("/registered-successfully");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 gradient-background">
      <div className="col-md-6">
        <div className="card p-3">
          <h2 className="text-center mb-4">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
            <div className="form-group mb-3">
              <label htmlFor="role">Role:</label>
              <select
                className="form-control"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
