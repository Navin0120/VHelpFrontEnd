import React from 'react';
import { Link } from 'react-router-dom';
import img from '../social-care.png'
export default function Navbar2() {
    const handlelogout=()=>{
        localStorage.removeItem("user")
        window.location.href="/"
      }
      const updateprofile=()=>{
          alert("update profile")
      }
      const history=()=>{
           
      }
    return (
        <div className='navbar-body header'>
            <nav className="navbar navbar-expand-sm navbar-dark ">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <img className='logo' src={img}/>
                    
                    <Link className="navbar-brand" to="#">
                   
                        <h2 className='brand-name' >VHelp</h2></Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#footer_id">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active " href="#footer_id">Mission & Vision</a>
                            </li>
                            </ul>
                        
                        {/* <button className="btn btn-outline-warning  mb-2 mb-lg-0 "  onClick={handlelogout} >Logout</button>
                        <button className="btn btn-outline-info  mb-2 mb-lg-0 mx-2 " aria-current="page"onClick={updateprofile} >UpdateProfile</button>
                        <button className="btn btn-outline-info  mb-2 mb-lg-0 " to="/tasker/signup" onClick={history}>History</button>
                         */}
                    </div>
                </div>
            </nav>
        </div>
    );
}
