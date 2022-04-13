// import React, { Component } from "react";
import React from 'react';
import { Carousel, Col, Container, Row } from "react-bootstrap";
import image3 from './Carouselimages/green.jpg';
import image2 from "./Carouselimages/7628.jpg";
import image1 from "./Carouselimages/all.png";
import './carousel.css';
import LoginForm from '../Login/LoginForm';



const CarouselComponent2 = () => {
    return (

        <div className="row">
        <div className="col-8 justify-content-center ">
            
            <Carousel variant="dark" className="carousel img-fluid">
            
                <Carousel.Item className="item" interval={5000}>
                
                    <img className="d-block " src={image3} alt="First slide" />
                    <Carousel.Caption>
                        
                        <h1 className="text-dark text-right image-text reviews1">
                            Your House Deserves Better</h1>
                            <h4 className='image-text reviews1'>Schedule when it works for you — as early as today</h4>
                        
                        
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item interval={5000} className="carousel-item ">
                    <img className="d-block w-60" src={image1} alt="Second slide" />
                    <Carousel.Caption>
                        <h1 className="text-dark goto image-text">A go-to team at your fingertips</h1>
                        <h4 className="text-white-60 image-text">Choose and connect with the best person for the job</h4>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item interval={5000}>
                    <img className="d-block  w-60" src={image2} alt="Third slide" />
                    <Carousel.Caption>
                        <h1 className="text-dark text-left image-text">Everyday life made easier</h1>
                        <h3 className="text-dark-50 text-left image-text reviews">Choose your Tasker by reviews, skills, and price</h3>

                    </Carousel.Caption>
                </Carousel.Item>



            </Carousel>
        </div>
        <div className="mx-5">
            <LoginForm></LoginForm>
        </div>

        <hr className='mt-5'></hr>
       
        
        </div>
    )
}

export default CarouselComponent2;