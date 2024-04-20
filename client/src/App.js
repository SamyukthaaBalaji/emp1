import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

import DashBoard from './components/DashBoard';
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider } from "./components/AuthContext";
import Home from "./components/Home";
import NavBar from "./components/Navbar";
import User from "./components/User";



function App() {
  return (
    
    <AuthProvider>
      <ToastContainer/>
    
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>} />
          <Route path="/dashboard" element={<DashBoard/>} />
          <Route path="/Home" element={<Home/>} />
          <Route path="/user" element={<User/>} />

        </Routes>
      </Router>
      </AuthProvider>
  );
}

export default App;

