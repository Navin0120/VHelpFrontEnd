import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom';
import base_url from '../../api/bootapi';
import Navbar2 from '../../Navbar/Navbar2';
import TaskerSidebar from '../../SideBar/TaskerSidebar';
import "./CompletedTask.css"
import { FaRegStar} from "react-icons/fa";

export default function TaskerHistory() {
  const { taskerid } = useParams()
  const [rating, setRating] = useState()
  const [page, setPage] = useState(0);
  const [Jobs, setJobs] = useState([]);
  const [tasker, setTasker] = useState(JSON.parse(localStorage.getItem("user")));
  const AllCompletedTask = () => {

    axios.get(`${base_url}/tasker/taskerHistory/${tasker.id}/${page}`).then(
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

    document.title = "History";

  }, []);
  return (
    <>
      <Navbar2 />
      <div className='row back'>
        <div className='col col-1'>
          <TaskerSidebar history={true} key={tasker.id} Name={tasker.firstName + " " + tasker.lastName} />
        </div>
        <div className='col col-11'>
          <div className=' row sub-heading justify-content-center   '>
            <h1 className='text-center head1 head2'> Task History</h1>
            <div className=' main-outer-table  opacity-55%'>
            </div>
            <div className='table-outer '>
              {Jobs.length > 0 ?
                <table className="table table-striped  table-hover history ">
                  <thead>
                    <tr >
                      <th scope="col">Task Details</th>
                      <th scope="col">Customer Details</th>
                      <th scope="col">Ratings/5</th>
                      <th scope="col">Payment Status</th>
                    </tr>
                  </thead>
                  {(Jobs.map((job) => {
                    return (
                      <tbody key={job.id}>
                        <tr className='tabledata'>
                          <td>{job.skillName}<br />
                            Date:{job.jobDate}<br />
                            Amount:{job.cost}<br />
                            Details:{job.jobDetails}<br />
                            Status:{job.jobStatus}<br /></td>
                          <td>{job.customer.firstName + " " + job.customer.lastName}<br />
                            {job.customer.contactNo}<br />
                            {job.jobAddress}</td>
                          <td>{job.rating ? [...Array(job.rating)].map((e,i)=><FaRegStar key={i}/>)
                           :
                           "Not Rated"}</td>

                          <td>{job.paymentStatus ? "Paid" : "Not Paid"}</td>

                        </tr>
                      </tbody>
                    )

                  }))}

                </table> : <h3>No History</h3>}
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

