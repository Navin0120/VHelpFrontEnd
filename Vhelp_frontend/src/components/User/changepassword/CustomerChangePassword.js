import axios from 'axios';
import React, { useEffect, useState } from 'react'
import base_url from '../../api/bootapi';
import CustomerSidebar from "../../SideBar/CustomerSidebar";
import "./ChangePassword.css"
import { useParams } from 'react-router-dom';
import Alert from '../../ALERT/Alert'

import FooterComponent2 from '../../HomePage/Footer/FooterComponent2';
import Navbar2 from '../../Navbar/Navbar2';
axios.interceptors.request.use((config) => {
    if (localStorage.getItem("user") != null) {
      config.headers.authorization = 'Bearer ' + JSON.parse(localStorage.getItem("user")).jwt;
    }
    return config
  });
  

const CustomerChangePassword = () => {
    const[customer,setCustomer]=useState(JSON.parse(localStorage.getItem("user")))
    const{customerid}=useParams()
    const [changePassword, setChangePassword] = useState({
        id:customerid,
        password:"",
        newPassword:""})
    const [confirmPassword, setConfirmPassword] = useState("");
    const submitHandler=(e)=>{
        e.preventDefault();
        if(confirmPassword!=changePassword.newPassword){
            showalert("password mismatch","danger")
        }
        else{
            console.log(changePassword);
            submitData(changePassword);
            
        }
    }
    const submitData = (data) => {
        axios.patch(`${base_url}/user/changePassword`, data).then(
            (response) => {
                showalert("password changed succesfully","success")
                window.location.reload();
            },
            (error) => {
                showalert("wrong old password ","danger")
            }
        );
    };
    useEffect(() => {
        document.title="Change Password"
        
    }, []);

    const [alert, setAlert] = useState({});

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
        <Navbar2/>
            <div className="row ">
                <div className="col col-2">
                    <CustomerSidebar password={true} key={customer.id} Name={customer.firstName + " " + customer.lastName} />
                </div>
               
                    <div className="col col-sm-2"></div>
                   
                    <div className="border-primary col col-sm-7">
                    <h1></h1>
                        <h1 >Change Your Password</h1>
                       < div className="changePassform">
                        <form onSubmit={submitHandler}>
                            <div className="mback">
                                <div className="col-sm-8">
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form label head1" >Old Password</label >
                                        <div className="col-sm-8">
                                            <input className="form-control" autoFocus required type="password" onChange={(e) => setChangePassword({ ...changePassword, password: e.target.value })}
                                                 />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form label head1" >New Password</label >
                                        <div className="col-sm-8">
                                            <input className="form-control" required type="password" onChange={(e) => setChangePassword({ ...changePassword, newPassword: e.target.value })}
                                             />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form label head1" >Confirm Password</label >
                                        <div className="col-sm-8">
                                            <input className="form-control" required type="passsword" onChange={(e) => setConfirmPassword(e.target.value)}/>
                                        <Alert alert={alert}/>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-info text-center" >
                                        Change Password
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            
            </>
        );

    }
    export default CustomerChangePassword;
