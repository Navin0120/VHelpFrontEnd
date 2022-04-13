import { useState } from "react"


const RoleHome=()=>{
   const[user,setUser]=useState(JSON.parse(localStorage.getItem("user")))
    if(user.role==="ROLE_CUSTOMER"){
        window.location.href = "/customerHome/" + user.id
        }
        else{
          window.location.href = "/job/home/" + user.id
    }
}
export default RoleHome