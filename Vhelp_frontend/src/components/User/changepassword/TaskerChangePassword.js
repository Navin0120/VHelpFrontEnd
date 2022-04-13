import axios from 'axios';
import React, { useEffect, useState } from 'react'
import base_url from '../../api/bootapi';
import "./ChangePassword.css"
import { useParams } from 'react-router-dom';
import Alert from '../../ALERT/Alert';
import TaskerSidebar from '../../SideBar/TaskerSidebar';
import FooterComponent2 from '../../HomePage/Footer/FooterComponent2';
import Navbar2 from '../../Navbar/Navbar2';
axios.interceptors.request.use((config) => {
    if (localStorage.getItem("user") != null) {
      config.headers.authorization = 'Bearer ' + JSON.parse(localStorage.getItem("user")).jwt;
    }
    return config
  });
  

const TaskerChangePassword = () => {
    const[user,setUser]=useState(JSON.parse(localStorage.getItem("user")))
    const{taskerid}=useParams()
    const [changePassword, setChangePassword] = useState({id:taskerid,password:"",newPassword:""})
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
                showalert("password changed successfully","success")
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
            <div className="row back">
                <div className="col col-2">
                    <TaskerSidebar password={true} key={user.id} Name={user.firstName + " " + user.lastName} />
                </div>
               
                    <div className="col col-sm-2"></div>
                   
                    <div className="border-primary col col-sm-7">
                    <h1></h1>
                        <h1 className='head1 head2' >Change Password</h1>
                       < div className="changePassform">
                        <form onSubmit={submitHandler}>
                            <div className="mback">
                                <div className="col-sm-8">
                                    <div className="form-group row">
                                        
                                        <div className="col-sm-8">
                                            <input className="form-control"required type="password" onChange={(e) => setChangePassword({ ...changePassword, password: e.target.value })}
                                                placeholder="enter old password" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        
                                        <div className="col-sm-8">
                                            <input className="form-control"  required type="password" onChange={(e) => setChangePassword({ ...changePassword, newPassword: e.target.value })}
                                                placeholder="enter new password" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        
                                        <div className="col-sm-8">
                                            <input className="form-control" required type="password" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="enter confirm password"/>
                                       <Alert alert={alert}/>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary" >
                                        Change Pasword
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
            <br/>
<FooterComponent2/>
        </>);

}
export default TaskerChangePassword;