
import React, { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent, } from "react-pro-sidebar";
//import icons from react icons
import { FaList, FaRegHeart, FaThLarge, FaPeopleArrows,FaSave ,FaRupeeSign} from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle,FiUser } from "react-icons/fi";
import { RiPencilLine,RiKeyFill } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import "./Sidebar.css";
const TaskerSidebar = (props) => { //create initial menuCollapse state using useState hook 
    const [menuCollapse, setMenuCollapse] = useState(true)
    const[tasker,SetTasker]=useState({})
    //create a custom function that will change menucollapse state from false to true and true to false
    const menuIconClick = () => { //condition checking to change state from true to false and vice versa
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };
    useEffect(() => {
       
        const task=(JSON.parse(localStorage.getItem("user")))
        SetTasker(task)
        
       
    },[]);

    return (<>
        <div id="header1">
            {/* collapsed props to change menu size using menucollapse state */}
            <ProSidebar collapsed={menuCollapse}>
                <SidebarHeader> <div className="logotext1">
                    {/* small and big change using menucollapse state */} <p>{menuCollapse ? (<FaThLarge />) : props.Name}</p> </div>
                    <div className="closemenu" onClick={menuIconClick}>
                        {/* changing menu collapse icon on click */}
                        {menuCollapse ? (<FiArrowRightCircle />) : (<FiArrowLeftCircle />)}
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape="square">
                        <MenuItem active={props.home} icon={<FiHome />}><Link style={{color:"blue"}} className="head1" to={"/job/home/"+tasker.id}>Home</Link>   </MenuItem>
                        <MenuItem active={props.save} icon={<FaRupeeSign />}><Link style={{color:"blue"}} className="head1" to={"/tasker/pendingTask/"+tasker.id}>Pending Task</Link></MenuItem>
                        <MenuItem active={props.password} icon={<RiKeyFill />}><Link style={{color:"blue"}} className="head1"  to={"/tasker/changepassword"}>UpdatePassword</Link></MenuItem>
                        <MenuItem active={props.picture} icon={<FiUser />}><Link style={{color:"blue"}} className="head1" to={"/tasker/updateimage/"+tasker.id}>Update Picture</Link></MenuItem>
                        <MenuItem active={props.history} icon={<FaList />}><Link style={{color:"blue"}} className="head1" to={"/tasker/history/"+tasker.id}>History</Link></MenuItem>
                        <MenuItem icon={<FiLogOut />}><Link style={{color:"red"}} className="head1" to={"/logout"}>Logout</Link></MenuItem>
                    </Menu> </SidebarContent>
            
            </ProSidebar>
        </div>
    </>);
};
export default TaskerSidebar;