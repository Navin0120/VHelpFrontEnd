import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import base_url from '../../api/bootapi';
import "./card.css"
import img2 from './default_img.png';

axios.interceptors.request.use((config) => {
    if (localStorage.getItem("user") != null) {
      config.headers.authorization = 'Bearer ' + JSON.parse(localStorage.getItem("user")).jwt;
    }
    return config
  });

export default function Tasker({ tasker }) {
    useEffect(() => {
        document.title = "Home";
        
      }, []);

const[xyz,setXyz]=useState(false)
    const[image,setImage]=useState()
    useEffect(() => {
        
        axios.get(`${base_url}/customer/tasker/image/`+tasker.id,{
            
            responseType:'blob',
        }).then((response) => {
            
            const reader = new FileReader();
            reader.readAsDataURL(response.data);
            
            reader.onloadend = () => {
            const base64data = reader.result;
            
            setImage(base64data);
            setXyz(true)
              };
        })
    })
    
    return (
        <>
            <div className='container mx-5 mt-5 '>
                <Card className=" my-3 card text-white text-end mt-5" style={{ width: '600px', height: '150px' ,backgroundColor:'#235282'}}>
                    <div className="row g-0">
                        <div className=" col-3 mx-2 image">
                            <img src={xyz?image:img2} className="img-fluid rounded-all image"  alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{tasker.firstName + " " + tasker.lastName}</h5>
                                 {tasker.bio}<br/>
                                <p className="card-text"> Rating :{tasker.overallRating}<br/>
                                Rate :{tasker.services[0].rate}</p>
                                <Link to={"/confirmPage/"+tasker.id} state={{Name:tasker.firstName + " " + tasker.lastName}} className="btn btn-primary my-2">Book Now</Link>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    );
}
