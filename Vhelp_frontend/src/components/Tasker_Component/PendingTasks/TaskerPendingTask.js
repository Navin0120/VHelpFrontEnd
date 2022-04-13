import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import base_url from '../../api/bootapi';
import Navbar2 from '../../Navbar/Navbar2';
import TaskerSidebar from '../../SideBar/TaskerSidebar';
import "../TaskerHistory/CompletedTask.css"


export default function TaskerPendingTask() {
  const [page, setPage] = useState(0);
  const [jobcost, setjobCost] = useState({})
  const [Jobs, setJobs] = useState([]);
  const [tasker, setTasker] = useState(JSON.parse(localStorage.getItem("user")));
  const AllCompletedTask = () => {
    axios.get(`${base_url}/tasker/pendingJobs/${tasker.id}/${page}`).then(
      (response) => {
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
  useEffect(() => {
    document.title = "Submit Cost";

  }, []);
  useMemo(() => {
    AllCompletedTask();
  }, [page]);
  return (
    <>
      <Navbar2 />
      <div className='row back'>
        <div className='col col-1'>
          <TaskerSidebar save={true} key={tasker.id} Name={tasker.firstName + " " + tasker.lastName} />
        </div>
        <div className='col col-11'>
          <div className=' row sub-heading justify-content-center   '>
            <h1 className='text-center head1 head2'> Submit Cost</h1>
            <div className=' main-outer-table  opacity-55%'>
            </div>
            <div className='table-outer my-3'>
              {Jobs.length > 0 ?
                <table className="table table-striped  table-hover pendingtask ">
                  <thead>
                    <tr >
                      <th scope="col">Task Details</th>
                       <th scope="col">Customer Details</th>
                      
                     {/* <th scope="col">Date</th>
                      <th scope="col">JobDetails</th>
                      <th scope="col">JobAddress</th> */}
                      <th scope="col">Cost</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  {(Jobs.map((job) => {
                    return (
                      <tbody key={job.id}>
                        <tr className='tabledata'>
                          <td scope="row">{job.skillName}<br/>
                          DATE: {job.jobDate}<br/>
                          Task Details: {job.jobDetails}</td>
                          <td>{job.customer.firstName + " " + job.customer.lastName}<br/>
                          {job.customer.contactNo}<br/>
                          
                          {job.jobAddress}</td>
                          
                          <td><input type="number" id={job.id} className='form-control rating' onChange={(e) => setjobCost({ ...jobcost, cost: e.target.value, jobId: job.id })}></input></td>
                          <td><button className='btn btn-info' onClick={() => {
                            var Cost = document.getElementById(job.id).value;
                            axios.patch(`${base_url}/tasker/updateJobStatusAndCost`, jobcost).then(
                              (response) => {
                                console.log(response.data);
                                AllCompletedTask();
                              },
                              (error) => {
                                alert("Something went Wrong");
                              }
                            );
                          }} >Task Finished </button></td>
                        </tr>
                      </tbody>
                    )
                  }))}
                </table> : <h3>No More Jobs</h3>}
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

