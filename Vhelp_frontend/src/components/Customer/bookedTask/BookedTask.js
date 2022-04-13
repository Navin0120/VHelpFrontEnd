import axios from 'axios';
import React, { useEffect, useState,useMemo } from 'react'

import base_url from '../../api/bootapi';
import Navbar2 from '../../Navbar/Navbar2';
import CustomerSidebar from '../../SideBar/CustomerSidebar';
import "./CompletedTask.css"


export default function BookedTask() {
  const [page, setPage] = useState(0);
  const [Jobs, setJobs] = useState([]);
  const [Customer, setCustomer] = useState((JSON.parse(localStorage.getItem("user"))))
  const AllCompletedTask = () => {
    axios.get(`${base_url}/customer/bookedJob/${Customer.id}/${page}`).then(
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
  }, [page]);
  useEffect(() => {
    document.title = "BOOKED TASKS";
    
  }, []);
  return (
    <>
      <Navbar2 />
      <div className='row'>
        <div className='col col-1'>
          <CustomerSidebar booked={true} key={Customer.id} Name={Customer.firstName + " " + Customer.lastName} />
        </div>
        <div className='col col-11'>
          <div className=' row sub-heading justify-content-center   '>
            <h2 className='text-center head1 heading1'>Booked TaskList </h2>
            <div className=' main-outer-table  opacity-55%'>
            </div>
            <div className='table-outer'>
              {Jobs.length > 0 ?
              <table className="table table-striped  table-hover bookedtask ">
                <thead>
                  <tr>
                    <th scope="col">Task Details</th>
                    <th scope="col">Tasker Details</th>
                    <th scope="col">Tasker Contact</th>
                    <th scope="col">Date</th>
                    <th scope="col">City</th>
                    <th scope="col">Job Address</th>
                    <th scope="col">JobDetails</th>
                  </tr>
                </thead>
                { (Jobs.map((job) => {
                  return (
                    <tbody key={job.id}>
                      <tr className='tabledata'>
                        <td>{job.skillName}</td>
                        <td>{job.tasker.firstName + " " + job.tasker.lastName}</td>
                        <td>{job.tasker.contactNo}</td>
                        <td>{job.jobDate}</td>
                        <td>{job.city}</td>
                        <td>{job.jobAddress}</td>
                        <td>{job.jobDetails}</td>
                      </tr>
                    </tbody>
                  )
                }))} 
              </table>:<h3> No Job Booked</h3>}
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

