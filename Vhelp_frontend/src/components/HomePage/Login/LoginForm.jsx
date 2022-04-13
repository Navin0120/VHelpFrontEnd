

import React, { useEffect, useState } from 'react'
import './style.css'

import axios from 'axios';
import base_url from '../../api/bootapi';
import Alert from '../../ALERT/Alert';
import RoleHome from '../../User/RoleHome';

const LoginForm = () => {
  useEffect(() => {
    document.title = " VHelp_HomePage";
  }, []);

  const [Customer, setCustomer] = useState({});

  const handleSubmit = (e) => {
    //console.log(Customer);
    submitData(Customer);
    e.preventDefault();
  };
  const handleSignup = () => {
    window.location.href = "/customer/signup"
  }
  const submitData = (data) => {
    axios.post(`${base_url}/user/login`, data).then(
      (response) => {
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        window.location.href = "/user/home"
      },
      (error) => {
        showalert(error.response.data.message, "danger")
      }
    );
  };

  const [alert, setAlert] = useState({});

  const showalert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert({});
    }, 3000)
  }
  return (
    <section className=" gradient-custom">
      
        <div className="row  justify-content-center align-items-center h-70 ">
        
          <div className="  card-main text-white" >
            <div className="card-body  text-center">
           

            <form className='form' onSubmit={handleSubmit}>
            <Alert alert={alert} />
              <h2 className="fw-bold text-uppercase">Login</h2>
              <p className="text-white-50 ">Please enter your login and password!</p>

              <div className="form-outline form-white textbox  ">
                <input placeholder="Enter Email" type="email" required id="typeEmailX" className="my-2 input-box form-control form-control-lg" onChange={(e) => setCustomer({ ...Customer, email: e.target.value })} />
               
              </div>

              <div className="form-outline form-white mt-2 ">
                <input type="password" placeholder='Enter Password' id="typePasswordX" className="mb-2 input-box  form-control form-control-lg" onChange={(e) => setCustomer({ ...Customer, password: e.target.value })} />

              </div>
              <button className="btn btn-outline-success btn-lg px-5 my-5 " type="submit">Login</button>
              </form>
              <div>
            <p className='text-center'>Don't have an account? <button id="signup" className="btn btn-primary mx-2 my-1" onClick={handleSignup}>SignUp</button>
            </p>
          </div>
            </div>
         
        </div>
      </div>
    </section>
  )
}

export default LoginForm
