import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import base_url from '../../api/bootapi';
import "./TaskerHome.css"
import Alert from '../../ALERT/Alert';
import Navbar2 from '../../Navbar/Navbar2';
import TaskerSidebar from '../../SideBar/TaskerSidebar';


export default function AssignedTask({ j }) {
  const [jobs, setJob] = useState({})
  const [page, setPage] = useState(0);
  const [alert, setAlert] = useState({

  });
  const [tasker, setTasker] = useState((JSON.parse(localStorage.getItem("user"))));

  const AllAssignedTask = () => {
    axios.get(`${base_url}/tasker/home/${tasker.id}/${page}`).then(
      (response) => {
        console.log(response.data);
        setJob(response.data);
      },
      (error) => {
        showalert(error.response.data.message)
      }
    );
  };
  const showalert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert({});
    }, 2000)
  }
  const handlePrevious = () => {
    if (page > 0) {
      setPage(page - 1)
    }
    else {
      setPage(0)
    }
  }
  const handleNext = () => {
    if (jobs.length > 0) {
      setPage(page + 1)
    }
  }

  useMemo(() => {
    
    AllAssignedTask();
  }, [page]);


  useEffect(() => {

    document.title = "Home";
  
  }, []);


  return (
    <><Navbar2 />
      <div className='back'>

        <div className='row'>
          <div className='col col-1'>
            <TaskerSidebar key={tasker.id} Name={tasker.firstName + " " + tasker.lastName} />
          </div>
          <div className='col col-11'>

            <div className='container' >
              <div>
                <h2 className='display-4 head1 mx-5 text-center head2'>Assigned Tasks</h2>
                <div className='alert'>
                  <Alert alert={alert} />
                </div>
              </div>
              {jobs.length > 0?
              <table className="table my-5 task-table align-middle table-striped as  mb-0 bg-white table-hover">
                
                <thead className="bg-light">
                  <tr className='table--row'>
                    <th >Customer Name</th>
                    <th >Customer No</th>
                    <th>Job Name</th>
                    <th>Job City</th>
                    <th>Job Details</th>
                    <th>Job Date</th>
                    <th>Job Address</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                 {jobs.map((job) => {
                  return (
                    <tbody key={job.id}>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">

                            <div className="ms-3">
                              <p className="fw-bold mb-1 text-white" >{job.customer.firstName} {job.customer.lastName}</p>

                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="fw-normal mb-1 text-white">{job.customer.contactNo}</p>
                        </td>
                        <td>
                          <p className="fw-normal mb-1 text-white">{job.skillName}</p>
                        </td>
                        <td>
                          <p className="fw-normal mb-1 text-white">{job.city}</p>
                        </td>
                        <td>
                          <span className="fw-bold mb-1 text-white">{job.jobDetails}</span>
                        </td>
                        <td className='text-white'>{job.jobDate}</td>
                        <td className='text-white'>{job.jobAddress}</td>
                        <td>
                          <button id={job.id} className="btn btn-success mx-2 " onClick={() => {
                            showalert("Processing....", "info")
                            axios.patch(`${base_url}/tasker/accept/${job.id}`).then(
                              (response) => {
                                showalert("task accepted...!!", "success")

                                AllAssignedTask();
                              },
                              (error) => {
                                showalert(error.response.data.message)
                              }
                            );
                          }}>Accept</button>
                          <button id={job.id} className="btn btn-danger" onClick={() => {
                            showalert("Processing....", "info")
                            axios.patch(`${base_url}/tasker/reject/${job.id}`).then(
                              (response) => {
                                showalert("task rejected...!!", "danger")

                                AllAssignedTask();
                              },
                              (error) => {
                                alert(error.response.data.message)
                              }
                            );
                          }} >Reject</button>
                        </td>
                      </tr>


                    </tbody>
                  )
                })}
              </table>:<h3>No New Job</h3>}
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
  );
}
