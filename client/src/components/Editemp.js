import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Editemp = ({ emp }) => {
  const [name, setname] = useState(emp.name);
  const [dob, setdob] = useState(emp.dob);
  const [gen, setgen] = useState(emp.gen);
  const [address, setaddress] = useState(emp.address);
  const [ph, setph] = useState(emp.ph);
  const updatedet = async (e) => {
    e.preventDefault();
    try {
      const body = {
        full_name: name,
        date_of_birth: dob,
        gender: gen,
        address: address,
        phone_number: ph,
      };
      const response = await fetch(
        `http://localhost:5000/user/updateemp/${emp.employee_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      /* console.log(response); */
      window.location = "/";
    } catch (error) {
      console.log(error.message);
    }
  };

  const [showModal, setShowModal] = useState(false);

  const onClose = async () => {
    try {
      const body = {
        full_name: name,
        date_of_birth: dob,
        gender: gen,
        address: address,
        phone_number: ph,
      };
      const update = await fetch(
        `http://localhost:9000/user/updateemp/${emp.employee_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      console.log(update);
      // Update the UI or close the modal after successful update
      // setShowModal(false);
      // Fetch updated data from the database
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div class="modal" id={`id${emp.employee_id}`}>
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">EDIT EMPLOYEE DETAIL</h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setname(e.target.value)}
              ></input>
            </div>
            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                value={dob}
                onChange={(e) => setdob(e.target.value)}
              ></input>
            </div>
            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                value={gen}
                onChange={(e) => setgen(e.target.value)}
              ></input>
            </div>
            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
              ></input>
            </div>
            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                value={ph}
                onChange={(e) => setph(e.target.value)}
              ></input>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setShowModal(true)}
      >
        EDIT
      </button>
      <div className="modal" style={{ display: showModal ? "block" : "none" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Employee</h4>
              <button
                type="button"
                className="close"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <label htmlFor="">Edit Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="modal-body">
              <label htmlFor="">Edit dob</label>
              <input
                type="text"
                value={dob}
                onChange={(e) => setdob(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="modal-body">
              <label htmlFor="">Edit gender</label>
              <input
                type="text"
                value={gen}
                onChange={(e) => setgen(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="modal-body">
              <label htmlFor="">Edit address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="modal-body">
              <label htmlFor="">Edit phone</label>
              <input
                type="text"
                value={ph}
                onChange={(e) => setph(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-danger"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Editemp;
