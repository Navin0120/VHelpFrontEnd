import React from 'react';
import { useState, useEffect } from "react";
import './signup.css';
import axios from 'axios';
import base_url from '../../api/bootapi';
import { Navbar } from '../../HomePage/NewComponents/Navbar';
import Alert from '../../ALERT/Alert';

export default function SignUp() {
  const [confirmPassword, setConfirmPassword]=useState();
  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    aadharNo: "",
    contactNo: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if(confirmPassword===customer.password){
    console.log(customer);
    submitData(customer);
    }
    else{
      alert("Password and Confirm Password doesn't match");
    }
  };

  const submitData = (data) => {
    axios.post(`${base_url}/user/customer/register`, data).then(
      (response) => {
        console.log(response);
        alert("successfully registered");
        window.location.href = "/";
      },
      (error) => {
        console.log(error.responce)
        alert(error.response.data.message)
      }
    );
  };

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
                    <h3 className="mb-4 text-center text-uppercase">Customer Registration </h3>
                    <form className='form' onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input type="text" required className="form-control form-control-lg" placeholder='First Name' onChange={(e) => setCustomer({ ...customer, firstName: e.target.value })} />
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input type="text" required className="form-control form-control-lg" placeholder='Last Name' onChange={(e) => setCustomer({ ...customer, lastName: e.target.value })} />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-outline mb-4">
                          <input type="email" required className="form-control form-control-lg" placeholder='Email' onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-outline mb-4">
                          <input type="password" required className="form-control form-control-lg" placeholder='Password' onChange={(e) => setCustomer({ ...customer, password: e.target.value })} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-outline mb-4">
                          <input type="password" required className="form-control form-control-lg" placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                      </div>
                      <div className="form-outline mb-4">
                        <textarea required className="form-control form-control-lg" placeholder='Address' onChange={(e) => setCustomer({ ...customer, address: e.target.value })} />
                      </div>
                      <div className="form-outline mb-4">
                        <input type="number" required className="form-control form-control-lg" placeholder='Contact Number' onChange={(e) => setCustomer({ ...customer, contactNo: e.target.value })} />
                      </div>
                      <div className="form-outline mb-4">
                        <input type="number" required className="form-control form-control-lg" placeholder='Aadhar Number' onChange={(e) => setCustomer({ ...customer, aadharNo: e.target.value })} />
                      </div>
                      <div className="d-flex justify-content-end pt-3">
                        <button type="reset" className="btn btn-info btn-lg ms-2">Reset </button>
                        <button type="submit" className="btn btn-warning btn-lg ms-2">Submit </button>
                      </div>
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
