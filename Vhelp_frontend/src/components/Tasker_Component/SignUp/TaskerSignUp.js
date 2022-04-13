import React from 'react'
import "./TaskerSignup2.css"
import { useState, useEffect } from "react";

import axios from 'axios';
import base_url from '../../api/bootapi';
import { Navbar } from '../../HomePage/NewComponents/Navbar';
import Alert from '../../ALERT/Alert';
export default function TaskerSignup() {
  const [tasker, setTasker] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    bio: "",
    city: "",
    aadharNo: "",
    contactNo: "",
    services: [{}]
  });
  const [confirmPassword, setConfirmPassword] = useState();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(confirmPassword===tasker.password){
    console.log(tasker);
    submitData(tasker);
    }
    else{
      alert("Confirm Password doesn't match with Password","danger")
    }
  };
  const onInputrate = (e) => {
    const services = [
      {
        skillName: document.getElementById("task").value,
        rate: e.target.value,
      },
    ];
    setTasker({ ...tasker, services });
  };

  const submitData = (data) => {
    axios.post(`${base_url}/user/tasker/register`, data).then(
      (response) => {
        alert("Registration Successful")
        window.location.href = "/tasker/uploadimage/" + response.data.id
        
      }, (error) => {
       
        alert(error.response.data.message)
      }
    );
  }

  useEffect(() => {
    document.title = "Sign Up";
  }, []);

  return (
    <>
      <Navbar />
      <div className="container py-5 w-100  ">
        <div className="row">
          <div className="col">
            <div className=" card-registration my-4">
              <div className="row g-0">
                <div className="col-xl-6 d-none d-xl-block">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                    alt="Sample photo"
                    className="img-fluid"
                    style={{ borderTopLeftRadius: '.25rem', borderBottomLeftRadius: '.25rem' }}
                  />
                </div>
                <div className="col-xl-6">
                  <div className="card-body p-md-4 text-black">
                    <h3 className="mb-4 text-uppercase">Tasker registration form</h3>
                    <form className='form' onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input type="text" className="form-control form-control-lg" required placeholder='First Name' onChange={(e) => setTasker({ ...tasker, firstName: e.target.value })} />
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input type="text" className="form-control form-control-lg" required placeholder='Last Name' onChange={(e) => setTasker({ ...tasker, lastName: e.target.value })} />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-outline mb-4">
                          <input type="email" className="form-control form-control-lg" required placeholder='Email' onChange={(e) => setTasker({ ...tasker, email: e.target.value })} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-outline mb-4">
                          <input type="password" className="form-control form-control-lg" required placeholder='Password' onChange={(e) => setTasker({ ...tasker, password: e.target.value })} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-outline mb-4">
                          <input type="password" className="form-control form-control-lg" required placeholder='ConfirmPassword' onChange={(e) => setConfirmPassword( e.target.value )} />
                        </div>
                      </div>
                      <div className="form-outline mb-4">
                        <textarea className="form-control form-control-lg" required placeholder='Bio' onChange={(e) => setTasker({ ...tasker, bio: e.target.value })} />
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <select id="task" name="skillName" required className='select form-control' >
                            <option>Choose Your Task</option>
                            <option value="CLEANING">Cleaing</option>
                            <option value="CARPENTRY">Carpentry</option>
                            {/* <option value="PAINTING">Painting</option> */}
                            <option value="PLUMBING">Plumbing</option>
                            <option value="MEDICAL_ASSISTANCE">HealthCare</option>
                          </select>
                        </div>
                        <div className="col-md-6 mb-4">
                          <select onChange={(e) => setTasker({ ...tasker, city: e.target.value })} required className='form-control'>
                            <option>Choose Your City</option>
                            <option value="Gwalior">Gwalior</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Pune">Pune</option>
                            <option value="Bhopal">Bhopal</option>
                            <option value="Indore">Indore</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-outline mb-4" >
                        <input type="number" required className="form-control form-control-lg" placeholder='contactNo' onChange={(e) => setTasker({ ...tasker, contactNo: e.target.value })} />
                      </div>
                      <div className="form-outline mb-4">
                        <input type="number" required className="form-control form-control-lg" placeholder='Aadhar no' onChange={(e) => setTasker({ ...tasker, aadharNo: e.target.value })} />
                      </div>
                      <div className="form-outline mb-4">
                        <input id="rate" required className="form-control form-control-lg" placeholder='Rates' onChange={(e) => { onInputrate(e) }} />
                      </div>
                      <div className="d-flex justify-content-end pt-3">
                        <button type="button" className="btn btn-light btn-lg">Reset all</button>
                        <button type="submit" className="btn btn-warning btn-lg ms-2">Submit form</button>
                      </div>
                      <Alert alert={alert} />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
