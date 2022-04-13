import axios from 'axios';
import React, { useMemo } from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Tasker from './Tasker';
import base_url from '../../api/bootapi';

import "./TaskerList.css"
import Navbar2 from '../../Navbar/Navbar2';
import CustomerSidebar from '../../SideBar/CustomerSidebar';


axios.interceptors.request.use((config) => {
  if (localStorage.getItem("user") != null) {
    config.headers.authorization = 'Bearer ' + JSON.parse(localStorage.getItem("user")).jwt;
  }
  return config
});


export default function TaskerList() {
  const [page, setPage] = useState(0);
  const [taskers, setTaskers] = useState([
  ])

  const [customer, setCustomer] = useState(JSON.parse(localStorage.getItem("user")))

  const { city, task } = useParams();
 
  const AllTaskers = () => {
    const cust = (JSON.parse(localStorage.getItem("user")));
    setCustomer(cust)
   
    axios.get(`${base_url}/customer/location/${city}/skill/${task}/${page}`).then(
      (response) => {
        console.log(response.data);
        setTaskers(response.data);
      },
      (error) => {
        alert(error.response.data.message)
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
    if (taskers.length > 0) {
      setPage(page + 1)
    }
  }
  useMemo(() => {
    AllTaskers();
  }, [page])

  useEffect(() => {
    document.title = "Home";
    
  }, []);
  return (
    <>
      <Navbar2 />
      <CustomerSidebar home={true} key={customer.id} Name={customer.firstName+" "+customer.lastName} />
      <div className='back row justify-content-center'>
        <div className='col col-8'>
          <h3 className='text-center head1'>List of Available Taskers</h3>
          <h5 className='text-center head1'>City : {city} Task : {task}</h5>
          {taskers.length > 0 ? taskers.map((item) => <Tasker key={item.id} tasker={item} />) : "No Taskers Available"}
        

        <div className='pages1'>
          <button className="btn btn-info" onClick={handlePrevious}>Previous</button>
          <span>    </span>
          <button className="btn btn-warning" onClick={handleNext}>Next</button>
        </div>
      </div>
      </div>
    </>
  );
}
