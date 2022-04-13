import React from 'react';
import { useState, useEffect } from "react";

import axios from 'axios';
import base_url from '../api/bootapi';
import { useParams } from 'react-router-dom';
import TaskerSidebar from '../SideBar/TaskerSidebar';
import Navbar2 from '../Navbar/Navbar2';


export default function UpdatePicture() {
    
    const [imageData, setImageData] = useState(null)
    const [tasker, setTasker] = useState(JSON.parse(localStorage.getItem("user")))
    const handleUploadClick = event => {
        let file = event.target.files[0];
        const imageData = new FormData();
        imageData.append('imageFile', file);
        setImageData(imageData);
    };

    const handleSubmit = (e) => {
        if(imageData==null){
            alert("File cannot be blank")
        }
        else{
        e.preventDefault();
        axios.post(`${base_url}/tasker/image/${tasker.id}`, imageData,
            { headers: { "Content-type": "multipart/form-data" } }
        ).then(
            (response) => {
                console.log(response.data);
                alert("image upload succesfully");
                window.location.href = "/job/home/" + tasker.id
            }, (error) => {
                alert(error.response.data.message)
            }
        );
        }
    };
    useEffect(() => {
        document.title = "Upload Image";
      }, []);

    return (
        <>
            <Navbar2 />
            <div className="row back ">
                <div className='col col-2'>
                    <TaskerSidebar picture={true} key={tasker.id} Name={tasker.firstName + " " + tasker.lastName} />
                </div>
                <div className='col col-8 offset-md-1'>
                    <div className='justify-content-center col-3 ' style={{ color: 'green' }}>
                    </div>
                    <div className=" col col-md-8  content" >
                        <div className=" justify-content-center col-5 offset-md-3 head">
                            <h2 className='head1 head2'> Upload Image</h2>
                        </div>
                        <form className='form my-5' onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="form-outline">
                                    <input type="file" className="form-control form-control-lg" placeholder='First Name' onChange={handleUploadClick} />
                                <span>Image must be less than 1 mb in size</span>
                                </div>
                            </div>
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </form>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}