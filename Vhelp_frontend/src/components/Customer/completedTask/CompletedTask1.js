import axios from 'axios';
import React, { useEffect, useState,useMemo } from 'react'
import { useParams } from 'react-router-dom';
import base_url from '../../api/bootapi';
import Navbar2 from '../../Navbar/Navbar2';
import CustomerSidebar from '../../SideBar/CustomerSidebar';


import "../bookedTask/CompletedTask.css"


export default function CompletedTask() {
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  document.body.appendChild(script);
  const [Jobs, setJobs] = useState([]);
  const [page, setPage] = useState(0);
  const [Customer, setCustomer] = useState(JSON.parse(localStorage.getItem("user")))
  const AllCompletedTask = () => {
    axios.get(`${base_url}/customer/completedJob/${page}`).then(
      (response) => {
        console.log(response.data);
        setJobs(response.data);
      },
      (error) => {
        alert("Something went Wrong");
      }
    );
  };

  const handlePrevious = () => {
    if (page > 0) {
      setPage(page - 1)
    }
    else {
      setPage(0)
    }
  }
  const handleNext = () => {
    if (Jobs.length > 0) {
      setPage(page + 1)
    }
  }
  useMemo(() => {
    AllCompletedTask();
  }, [page]);

  useEffect(() => {
    document.title = "Payment";
    
  }, []);
  return (
    <>
      <Navbar2 />
      <div className='row'>
        <div className='col col-1'>
          <CustomerSidebar rating={true} key={Customer.id} Name={Customer.firstName + " " + Customer.lastName} />
        </div>
        <div className='col col-11'>
          <div className=' row sub-heading justify-content-center   '>
            <h2 className='text-center heading1 '>FeedBack </h2>
            <div className=' main-outer-table  opacity-55%'>
            </div>
            <div className='table-outer'>
            {Jobs.length > 0 ? <table className="table table-striped  table-hover completedTask ">
                <thead>
                  <tr>
                    <th scope="col">Task Details</th>
                    <th scope="col">Tasker Details</th>
                
                    <th scope="col">Cost</th>
                  
                    <th scope="col">Feedback</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                { (Jobs.map((job) => {
                  return (
                    <tbody key={job.id}>
                      <tr className='tabledata'>
                        <td>{job.skillName}<br/>
                        Details: {job.jobDetails}<br/>
                        Date: {job.jobDate}</td>
                        <td>{job.tasker.firstName + " " + job.tasker.lastName}
                        <br/>{job.city}</td>
                        <td>{job.cost}</td>
                        <td><input id={job.id} type="range" min="1" max="5" placeholder='ratings' className='form-control rating'></input></td>
                        <td><button className='btn btn-info' onClick={() => {
                          var Rating = document.getElementById(job.id).value;
                          var JobRating = {
                            "jobId": job.id,
                            "rating": Rating
                          }
                          axios.post(`${base_url}/customer/create_order`, JobRating).then(
                            (response) => {
                              
                              if (response.data.status == 'created') {
                                const { amount, id, currency } = response.data;
                                const options = {
                                  key: "rzp_test_oQkaRRmRbbzbrZ", // Enter the Key ID generated from the Dashboard
                                  amount: amount.toString(),
                                  currency: currency,
                                  name: "VHelp",
                                  description: "Test Transaction",
                                  image: "https://vhelp.herokuapp.com/logo.png",
                                  order_id: id,
                                  handler: function (response) {
                                    const data = {
                                      orderCreationId: id,
                                      razorpayPaymentId: response.razorpay_payment_id,
                                      razorpayOrderId: response.razorpay_order_id,
                                      razorpaySignature: response.razorpay_signature,
                                    };
                                  
                                    axios.patch(`${base_url}/customer/paymentStatus/${job.id}`).then(
                                      (response) => {
                                        alert("Payment Completed")
                                      },
                                      (error) => {
                                        alert("Payment Failed")
                                      }
                                    );
                                  },
                                  prefill: {
                                    name: "",
                                    email: "",
                                    contact: "",
                                  },
                                  notes: {
                                    address: "Book Your Task and Ease Your Life",
                                  },
                                  theme: {
                                    color: "#61dafb",
                                  },
                                };
                                const paymentObject = new window.Razorpay(options);
                                paymentObject.open();
                              }
                              AllCompletedTask();

                            },
                            (error) => {
                              
                              alert("Something went Wrong");
                            }
                          );
                        }} > Payment  </button></td>
                      </tr>
                    </tbody>
                  )}
                )) }
              </table>: <h3>No More Jobs</h3>}
            </div>
            <div className='pages'>
              <button className="btn btn-info" onClick={handlePrevious}>Previous</button>
              <span>    </span>
              <button className="btn btn-warning" onClick={handleNext}>Next</button>
            </div>
          </div>
        </div>
      </div>
 
    
    </>
  )
}

