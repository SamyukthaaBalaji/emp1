import React, { useState, useEffect } from "react";
import Editemp from "./Editemp";

function DashBoard() {
  const [det, setdet] = useState([]);
  const deleteemp = async (employee_id) => {
    try {
      const delemp = await fetch(
        `http://13.232.33.62:9000/user/delemp/${employee_id}`,
        {
          method: "DELETE",
        }
      );
      setdet(det.filter((item) => item.employee_id !== employee_id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const userdet = async () => {
    try {
      const response = await fetch("http://13.232.33.62:9000/user/getemp");
      const jsondata = await response.json();
      setdet(jsondata);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    userdet();
  }, []);

  return (
    <>
      {/* <h1>WELCOME {user.user_name}</h1> */}

      <h1 className="mb-4">Employee Details</h1>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Phone Number</th>

              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {det.map((detail) => (
              <tr key={detail.employee_id}>
                <td>{detail.full_name}</td>
                <td>{detail.date_of_birth}</td>
                <td>{detail.gender}</td>
                <td>{detail.address}</td>
                <td>{detail.phone_number}</td>
                {/* <td>
                  <EditStud stud={det} />
                </td> */}
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteemp(detail.employee_id);
                    }}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <Editemp emp={detail} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DashBoard;
