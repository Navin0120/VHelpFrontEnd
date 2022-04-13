import React from 'react'
import image from './social-care.png'
import './navbar.css'
import { Link } from 'react-router-dom'
export const Navbar = () => {
    return (
        <div className='navbar-body header'>
            <nav className="navbar navbar-expand-sm navbar-dark ">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <img className='logo' src={image}></img>
                    <Link className="navbar-brand" to="/">

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
                        <form className="d-flex">

                            {/* <Link className="btn btn-outline-success me-auto mb-2 mb-lg-0" aria-current="page" to="/tasker/login">Tasker Login</Link> */}
                            <Link className="btn btn-outline-success me-auto mb-2 mb-lg-0 mx-2" to="/tasker/signup">Become a Tasker</Link>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}
