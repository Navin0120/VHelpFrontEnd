import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import SignUp from './components/Customer/CustomerSignUp/SignUp';

import TaskerList from "./components/Customer/TaskerList/TaskerList";
import { useState } from "react";
import ConfirmPage from "./components/Customer/confirmpage/ConfirmPage"

import ImageUpload from "./components/Tasker_Component/SignUp/imageUpload";
import HomePage from "./components/HomePage/HomePage";
import TaskerHistory from "./components/Tasker_Component/TaskerHistory/TaskerHistory";
import CustomerHistory from "./components/Customer/CustomerHistory/CustomerHistory";
import UpdatePicture from "./components/Tasker_Component/Updatepicture";
import TaskerPendingTask from "./components/Tasker_Component/PendingTasks/TaskerPendingTask";
import TaskerSignUp from "./components/Tasker_Component/SignUp/TaskerSignUp"
import AssignedTask from "./components/Tasker_Component/taskerhomeLatest/AssignedTask";

import CustomerHome from "./components/Customer/Home/CustomerHome";
import CompletedTask from "./components/Customer/completedTask/CompletedTask1";
import BookedTask from "./components/Customer/bookedTask/BookedTask";

import CustomerChangePassword from "./components/User/changepassword/CustomerChangePassword";
import TaskerChangePassword from "./components/User/changepassword/TaskerChangePassword";
import RoleHome from "./components/User/RoleHome";
import Logout from "./components/User/logout/Logout";
function App() {
  
  const [alert, setAlert] = useState({});
  const [Customer, setCustomer] = useState(JSON.parse(localStorage.getItem("user")))
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
     
      <Router>
       
        <Routes>
          <Route path='/' element={Customer?<RoleHome/>:<HomePage />} />
          <Route path='customer/changepassword' element={<CustomerChangePassword/>} />
          <Route path='user/home' element={<RoleHome/>} />
          <Route path='tasker/changepassword' element={<TaskerChangePassword/>} />
           <Route path='/tasker/pendingTask/:taskerid' element={<TaskerPendingTask />} />
          <Route path='/job/home/:taskerid' element={<AssignedTask/>} />
          <Route path='/customerHome/:customer' element={<CustomerHome />} />
          <Route path='/Customer/signup' element={<SignUp />} />
          <Route path='/tasker/signup' element={<TaskerSignUp/>} />
          <Route path='/tasker/history/:taskerid' element={<TaskerHistory />} />
          <Route path='/customer/history/:customerid' element={<CustomerHistory/>} />
          <Route path='/customer/signup' element={<SignUp />} />
          <Route path='/CompletedTask/:customerid' element={<CompletedTask />} />
          <Route path='/customer/bookedTask/:customerid' element={<BookedTask />} />
          <Route path='/tasker/uploadimage/:taskerid' element={<ImageUpload />} />
          <Route path='/tasker/updateimage/:taskerid' element={<UpdatePicture />} />
          <Route path='/customer/location/:city/skill/:task' element={<TaskerList />} />
          <Route path='/confirmPage/:taskerid' element={<ConfirmPage/>} />
          <Route path='/logout' element={<Logout/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
