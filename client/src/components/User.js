import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import "./user.css";
import { toast } from "react-toastify";

const User = () => {
  const { user } = useAuth();
  const [fname, setfname] = useState("");
  const [date, setdate] = useState("");
  const [gender, setgender] = useState("");
  const [address, setaddress] = useState("");
  const [phone, setphone] = useState("");
  const [isformsubmit, setisformsubmit] = useState(true);
  const [userdet, setuserdet] = useState(null);

  useEffect(() => {
    const getuserdet = async (employee_id) => {
      try {
        const det = await fetch(
          `http://localhost:9000/user/empdet/${employee_id}`
        );
        const data = await det.json();
        console.log(data);
        if (data.length !== 0) {
          setisformsubmit(false);
          setuserdet(data);
          console.log(userdet);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getuserdet(user.user_id);
  }, [isformsubmit, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:9000/user/empdet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.user_id,
          full_name: fname,
          date_of_birth: date,
          gender: gender,
          address: address,
          phone_number: phone,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      console.log(data);

      toast(data.message);
      setisformsubmit(true);
      // Log the response from the server
    } catch (error) {
      console.error(error.message);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h1>WELCOME {user.user_name}</h1>
        <ul>
          <li>
            <span className="username">User Name: {user.user_name}</span>
          </li>
          <li>
            <span className="useremail">User Email: {user.user_email}</span>
          </li>
          {/* Add more user details as needed */}
        </ul>
      </div>
      {isformsubmit ? (
        <div className="container-md">
          {" "}
          {/* Use container-md to make the container medium-sized */}
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div
                className="card"
                style={{
                  padding: "20px",
                  borderRadius: "5px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
              >
                <h1 className="text-center">Please enter other details</h1>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="full_name" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="full_name"
                      className="form-control"
                      value={fname}
                      onChange={(e) => setfname(e.target.value)}
                      placeholder="Full Name"
                      style={{
                        color: "#333",
                        backgroundColor: "#f8f9fa",
                        border: "1px solid #ced4da",
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="date_of_birth" className="form-label">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="date_of_birth"
                      className="form-control"
                      value={date}
                      onChange={(e) => setdate(e.target.value)}
                      placeholder="Date of Birth"
                      style={{
                        color: "#333",
                        backgroundColor: "#f8f9fa",
                        border: "1px solid #ced4da",
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="gender" className="form-label">
                      Gender
                    </label>
                    <input
                      type="text"
                      id="gender"
                      className="form-control"
                      value={gender}
                      onChange={(e) => setgender(e.target.value)}
                      placeholder="Gender"
                      style={{
                        color: "#333",
                        backgroundColor: "#f8f9fa",
                        border: "1px solid #ced4da",
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      className="form-control"
                      value={address}
                      onChange={(e) => setaddress(e.target.value)}
                      placeholder="Address"
                      style={{
                        color: "#333",
                        backgroundColor: "#f8f9fa",
                        border: "1px solid #ced4da",
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone_number" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phone_number"
                      className="form-control"
                      value={phone}
                      onChange={(e) => setphone(e.target.value)}
                      placeholder="Phone Number"
                      style={{
                        color: "#333",
                        backgroundColor: "#f8f9fa",
                        border: "1px solid #ced4da",
                      }}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>User Details</h1>
          <p>Full Name: {userdet.full_name}</p>
          <p>Date of Birth: {userdet.date_of_birth}</p>
          <p>Gender: {userdet.gender}</p>
          <p>Address: {userdet.address}</p>
          <p>Phone Number: {userdet.phone_number}</p>
        </div>
      )}
    </>
  );
};

export default User;
