import React from 'react';
import { useState } from "react";
import axios from 'axios';
import base_url from '../../api/bootapi';
import { useParams } from 'react-router-dom';
import Navbar2 from '../../Navbar/Navbar2';


export default function ImageUpload() {
  const { taskerid } = useParams();
  const [imageData, setImageData] = useState(null)

  const handleUploadClick = event => {
    let file = event.target.files[0];
    const imageData = new FormData();
    imageData.append('imageFile', file);
    setImageData(imageData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${base_url}/user/image/${taskerid}`, imageData,
      { headers: { "Content-type": "multipart/form-data" } }

    ).then(
      (response) => {
        console.log(response.data);
        alert("Image uplaod succesfully");
        window.location.href = "/"
      }, (error) => {
        alert(error.response.data.message)
      }
    );
  };

  return (
    <>
      <Navbar2 />
      <div className="row ">

        <div className='justify-content-center col-5 offset-md-5' style={{ color: 'green' }}>
        </div>
        <div className="back col col-md-10  offset-1 content" >
          <div className=" justify-content-center col-5 offset-md-3 head">
            <h2>Tasker Image Upload</h2>
          </div>
          <form className='form my-5' onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="form-outline">
                  <input type="file" required className="form-control form-control-lg" placeholder='First Name' onChange={handleUploadClick} />
                  <span>Image must be less than 1 mb in size</span>
                </div>
              </div>
            </div>
            <button className="button-primary" type="submit">Submit</button>
          </form>
          <div>
          </div>
        </div>
      </div>
    </>
  )
}