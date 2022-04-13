import React, { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent, } from "react-pro-sidebar";
//import icons from react icons
import { FaList, FaRegHeart, FaThLarge, FaPeopleArrows } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "./Sidebar.css";
import { Link } from "react-router-dom";
const CustomerSidebar = (props) => { //create initial menuCollapse state using useState hook 
    const [menuCollapse, setMenuCollapse] = useState(true)
    const[customer,setCustomer]=useState({})
    //create a custom function that will change menucollapse state from false to true and true to false
    const menuIconClick = () => { //condition checking to change state from true to false and vice versa
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };
    useEffect(() => {
        const cust=(JSON.parse(localStorage.getItem("user")))
        setCustomer(cust)
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
                </SidebarHeader >
                <SidebarContent>
                    <Menu iconShape="square">
                        <MenuItem active={props.home} icon={<FiHome />}> <Link  style={{color:"blue"}} className="head1" to={"/customerHome/"+customer.id}>Book A Task</Link>  </MenuItem>
                        <MenuItem active={props.rating} icon={<FaRegHeart />}> <Link style={{color:"blue"}} className="head1" to={'/CompletedTask/'+customer.id} >Rating</Link></MenuItem>
                        <MenuItem active={props.password} icon={<RiPencilLine />}><Link style={{color:"blue"}} className="head1" to={'/customer/changePassword'} >Update Password</Link></MenuItem>
                        <MenuItem active={props.history} icon={<FaList />}><Link style={{color:"blue"}} className="head1" to={'/customer/history/'+customer.id} >History</Link></MenuItem>
                        <MenuItem active={props.booked} icon={<FaPeopleArrows />}><Link style={{color:"blue"}} className="head1" to={'/customer/bookedTask/'+customer.id} >Booked</Link></MenuItem>
                        <MenuItem icon={<FiLogOut />}><Link style={{color:"red"}} className="head1" to={'/logout'} >Logout</Link></MenuItem>
                    </Menu> </SidebarContent>
                <SidebarFooter>
                    <Menu iconShape="square">
                       
                    </Menu>
                </SidebarFooter>
            </ProSidebar>
        </div>
    </>);
};
export default CustomerSidebar;