import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import img1 from './cleaning1.jpg';
import img2 from './plumbing-service.jpg';
import img3 from './carpenter1.jpg';
import img4 from './medical1.jpg';
import Navbar2 from '../../Navbar/Navbar2'
import "./card.css";
import "./TaskDetails.css"
import CustomerSidebar from '../../SideBar/CustomerSidebar';

import FooterComponent2 from '../../HomePage/Footer/FooterComponent2';
import Alert from '../../ALERT/Alert';

export default function CustomerHome(props) {
    const [customer, setCustomer] = useState({})
    const [date, setDate] = useState()
    const [alert, setAlert] = useState({});
    useEffect(() => {
        const cust = (JSON.parse(localStorage.getItem("user")))
        //console.log(customer)
        setCustomer(cust)
        document.title = "Sign Up";
    }, []);
    const [taskData, setTaskData] = useState({
        city: "",
        skillName: "",
        jobDate: "",
        jobDetails: "",
        jobAddress: ""
    });

    const handleTask = (event) => {
        const target = event.target
        // const name = target.name
        const id = target.id
        setTaskData({
            ...taskData,
            skillName: id
        })
    }
    const submitHandler = (e) => {
        var today = new Date();
        console.log(today)
        if (new Date(taskData.jobDate) > today) {
            localStorage.setItem("taskData", JSON.stringify(taskData))
            window.location.href = "/customer/location/" + taskData.city + "/skill/" + taskData.skillName
            e.preventDefault();
        }
        else {
            showalert("back date not allowed", "danger")
        }
    }
    const handleCity = (event) => {
        const target = event.target
        const value = target.value
        setTaskData({
            ...taskData,
            city: value
        })
    }
    const handledate = (event) => {
        setDate(event.target.value)
    }
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
        <>
            <Navbar2 />
            <div className='row back-g'>
                <div className='col col-1'>
                    <CustomerSidebar home={true} key={customer.id} Name={customer.firstName+" "+customer.lastName} />
                </div>
                <div>
                    <form onSubmit={submitHandler} >
                        <div className=' container my-3'>

                            <div className=' col offset-md-3 head1  col-6'>
                                <h4 className='display-5 book'>BOOK YOUR TASK</h4>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <div className='row justify-content-center w-100 '>
                                        <div className='col-8 offset-md-1  my-3 '>
                                            <select className="form-select form-control my-1" name="city" id="city" aria-label="Default select example" onChange={handleCity}>
                                                <option className='text-white'>Select Your City</option>
                                                <option value="Indore">Indore</option>
                                                <option value="Bhopal">Bhopal</option>
                                                <option value="Gwalior">Gwalior</option>
                                                <option value="Mumbai">Mumbai</option>
                                                <option value="Pune">Pune</option>
                                            </select>

                                            <h4 className='text-black'>Choose a Date  :</h4>  <input type="date" required className='form-control text' placeholder='choose Date' onChange={(e) => setTaskData({ ...taskData, jobDate: e.target.value })} /><p />
                                            <Alert alert={alert} />
                                            <h4 className='text-black'>Address         :</h4> <textarea col="10" row="7" maxLength="50" required className='form-control text' onChange={(e) => setTaskData({ ...taskData, jobAddress: e.target.value })} /><p />
                                            <h4 className='text-black'> Task Details    :</h4> <textarea col="10" row="7" maxLength="25" required className='form-control text' onChange={(e) => setTaskData({ ...taskData, jobDetails: e.target.value })} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="main--card--container  card1" style={{ height: "6cm" }}>
                                        <img src={img1} className="card-img-top image1" alt="..." />
                                        <div className="card-body">
                                            <h5 className='text-light'>Cleaning</h5>

                                            <input type="radio" className="btn-check" name="task" id="CLEANING" autoComplete="off" onChange={handleTask} />
                                            <label className="btn btn-outline-success offset-my-4 my-5 btn-lg" htmlFor="CLEANING">Select</label>
                                        </div>

                                    </div>

                                    <div className="main--card--container  card1" style={{ height: "6cm" }}>
                                        <img src={img2} className="card-img-top image1" alt="..." />
                                        <div className="card-body">
                                            <h5 className='text-light' >Plumbing</h5>

                                            <input type="radio" className="btn-check" name="skillName" id="PLUMBING" autoComplete="off" onChange={handleTask} />
                                            <label className="btn btn-outline-info offset-my-4 my-5 btn-lg" htmlFor="PLUMBING">Select</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-4">
                                    <div className="main--card--container  card1" style={{ height: "6cm" }}>
                                        <img src={img4} className="card-img-top image1 " alt="..." />
                                        <div className="card-body">
                                            <h5 className='text-light'>HealthCare</h5>

                                            <input type="radio" className="btn-check" name="skillName" id="MEDICAL_ASSISTANCE" autoComplete="off" onChange={handleTask} />
                                            <label className="btn btn-outline-danger offset-my-4 my-5 btn-lg" htmlFor="MEDICAL_ASSISTANCE">Select</label>
                                        </div>
                                    </div>
                                    <div className="main--card--container card1" style={{ height: "6cm" }}>
                                        <img src={img3} className="card-img-top image1" alt="..." />
                                        <div className="card-body">
                                            <h5 className='text-light'>Carpentary</h5>

                                            <input type="radio" className="btn-check" name="skillName" id="CARPENTRY" autoComplete="off" onChange={handleTask} />

                                            <label className="btn btn-outline-danger offset-my-4 my-5 btn-lg" htmlFor="CARPENTRY">Select</label>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-2 offset-md-4 my-3'>
                                    <button type='submit' className='btn btn-primary btn-lg '>NEXT</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <FooterComponent2 />
        </>
    );
}
