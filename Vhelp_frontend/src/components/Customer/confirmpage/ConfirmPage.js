import './Confirm.css'

import React, { useEffect, useState } from 'react'

import "./Confirm.css"
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import base_url from '../../api/bootapi'
import CustomerSidebar from '../../SideBar/CustomerSidebar'
import Navbar2 from '../../Navbar/Navbar2'
import FooterComponent2 from '../../HomePage/Footer/FooterComponent2'
const ConfirmPage = (props) => {
    const [customer, setCustomer] = useState({})
    const location = useLocation()
    const { taskerid } = useParams()
    const { Name, Tasker } = location.state
    console.log(Tasker)
    const[taskdata,setTaskData]=useState({})
    const [job, SetJob] = useState({
        skillName: taskdata.skillName,
        jobDate: taskdata.jobDate,
        city: taskdata.city,
        jobAddress: taskdata.jobAddress,
        jobDetails: taskdata.jobDetails,

    })
  

    const submitHandler = () => {
        SetJob({
            skillName: taskdata.skillName,
            jobDate: taskdata.jobDate,
            city: taskdata.city,
            jobAddress: taskdata.jobAddress,
            jobDetails: taskdata.jobDetails,
        })
        console.log(taskdata)
        axios.post(`${base_url}/customer/addJob/${taskerid}`, taskdata).then(
            (response) => {
                console.log(response);
                localStorage.removeItem("taskData")
               alert("your task has been booked");
               
               
                    window.location.href = "/customerHome/" + customer.id;
                    
               
            },
            (error) => {
               alert(error.response.data.message)
            }
        );

    }
    const cancelHandler=()=>{
        window.location.href="/customerHome/" + customer.id;
    }
    useEffect(() => {
        const cust = (JSON.parse(localStorage.getItem("user")))
        setTaskData(JSON.parse(localStorage.getItem("taskData")))
        setCustomer(cust)
        
    }, []);
    
    return (
        <>
            <Navbar2 />
            <div className="row">
                <div className="col-1">
                    <CustomerSidebar home={true} key={customer.id}
                        Name={customer.firstName + " " + customer.lastName}  />
                </div>
                <div className="col-7 offset-md-2">
                </div><div className='confirm'>
                    <div className='img'>

                        <div className="backpic" >
                            <div className="row">
                                <div className="col-md-1"></div>
                                <div id="heading">Confirm Details</div>
                                <div className="col-md-1"></div>
                            </div>
                            <div className="col-sm-3"> </div>
                            <div className="col-sm-6 offset-md-3">
                                <table className="table border table-bordered " >
                                    <tbody className="border-0">
                                        <tr className="border-0">

                                            <th className="border-0">Tasker Name </th>
                                            <td className="border-0">{Name}</td>
                                        </tr>
                                        <tr className="border-0">
                                            <th className="border-0">Task name </th>
                                            <td className="border-0">{taskdata.skillName}</td>

                                        </tr>
                                        <tr className="border-0">

                                            <th className="border-0">Task city</th>
                                            <td className="border-0">{taskdata.city}</td>

                                        </tr>
                                        <tr className="border-0">

                                            <th className="border-0">Task date </th>
                                            <td className="border-0">{taskdata.jobDate}</td>

                                        </tr>
                                        <tr className="border-0">

                                            <th className="border-0">Task Address </th>
                                            <td className="border-0">{taskdata.jobAddress}</td>

                                        </tr>
                                        <tr className="border-0">

                                            <th className="border-0">Task details </th>
                                            <td className="border-0">{taskdata.jobDetails}</td>

                                        </tr>

                                    </tbody>
                                </table>

                                <div className="row">
                                    <div className="col-sm-2"></div>
                                    <div className="col-sm-2">
                                        <button type='button' className="btn-outline-success btn-lg btn btn1" onClick={submitHandler}>Confirm</button>
                                    </div>
                                    <div className="col-sm-4"></div>
                                    <div className="col-sm-2">
                                        <button className="btn-outline-danger btn-lg btn btn1" onClick={cancelHandler}>Cancel</button>
                                    </div>
                                   
                                    <div className="col-sm-2"></div>
                                </div>
                            </div>
                            <div className="col-sm-3"> </div>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
<FooterComponent2/>
        </>
    );
}
export default ConfirmPage;