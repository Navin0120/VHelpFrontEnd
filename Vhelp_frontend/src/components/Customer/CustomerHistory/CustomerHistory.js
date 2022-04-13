import axios from 'axios';
import { useMemo } from 'react';
import React, { useEffect, useState } from 'react'

import base_url from '../../api/bootapi';
import Navbar2 from '../../Navbar/Navbar2';
import { FaRegStar} from "react-icons/fa";
import CustomerSidebar from '../../SideBar/CustomerSidebar';
import "../bookedTask/CompletedTask.css"

axios.interceptors.request.use((config) => {
  if (localStorage.getItem("user") != null) {
    config.headers.authorization = 'Bearer ' + JSON.parse(localStorage.getItem("user")).jwt;
  }
  return config
});
export default function CustomerHistory() {
  const [page, setPage] = useState(0);
  
  const [Jobs, setJobs] = useState([]);
  const [customer, setCustomer] = useState((JSON.parse(localStorage.getItem("user"))));
  const AllCompletedTask = () => {
    axios.get(`${base_url}/customer/customerHistory/${customer.id}/${page}`).then(
      (response) => {
        console.log(response.data);
        setJobs(response.data);
      },
      (error) => {
        console.log(error);
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
  },[page]);
  useEffect(() => {
    document.title = "History";
  }, []);
  return (
    <>
      <Navbar2 />
      <div className='row'>
        <div className='col col-1'>
          <CustomerSidebar history={true} key={customer.id} Name={customer.firstName + " " + customer.lastName} />
        </div>
        <div className='col col-11'>
          <div className=' row sub-heading justify-content-center   '>
            <h2 className='head1 text-center heading1' > Task History</h2>
            <div className=' main-outer-table my-2 opacity-55%'>
              <div className='table-outer'>
                {Jobs.length > 0 ?<table className="table table-striped  table-hover bookedtask ">
                  <thead>
                    <tr>
                      <th scope="col">Task Details</th>
                      <th scope="col">Tasker Details</th>
                      <th scope="col">Cost</th>
                      <th scope="col">Rating</th>
                      <th scope="col">Payment Status</th>
                      <th scope="col">JobStatus</th>
                    </tr>
                  </thead>
                  {(Jobs.map((job) => {
                    return (
                      <tbody key={job.id}>
                        <tr className='tabledata'>
                          <td>{job.skillName}<br/>
                          {job.jobDate}<br/>
                          {job.jobDetails}</td>
                          <td>{job.tasker.firstName + " " + job.tasker.lastName}<br/>
                          {job.tasker.contactNo}</td>
                          <td>{job.cost?job.cost:"Not Rated"}</td>
                          <td>{job.rating ? [...Array(job.rating)].map((e,i)=><FaRegStar key={i}/>)
                           :
                           "Not Rated"}</td>
                          <td>{job.paymentStatus ? "Paid" : "Not Paid"}</td>
                          <td>{job.jobStatus}</td>
                        </tr>
                      </tbody>
                    )
                  }))}
                </table> : <h3>No More Jobs Available</h3>}
              </div>
            
            <div className='pages'>
              <button className="btn btn-info" onClick={handlePrevious}>Previous</button>
              <span>    </span>
              <button className="btn btn-warning" onClick={handleNext}>Next</button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

