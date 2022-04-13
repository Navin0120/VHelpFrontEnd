import React from 'react'
import './footer.css'
const FooterComponent = () => {
  return (
    <div className=' footer-main 'id="footer_id">
      <footer className="page-footer  font-small teal pt-4">


        <div className="container-fluid text-center  text-md-left">


          <div className="row ">


            <div className="col-md-6  ">


              <h5 className="text-uppercase footer-headings text-white font-weight-bold">Our Mission</h5>
              <p>'VHelp',redefining the work culture. With the helping hand of Spring boot we are trying to work for society,
                regarding household general chores like carpentry, delivery, cleaning, errands etc.'Hibernate' helped you to choose a
                helper by review, skills, and price. So, by this people can earn money. 'React' brought the magic on table by making
                it user friendly.'MySql' helped us to remember these kind souls and 'Spring Security' cared for your safety as we
                care for those you care for other.</p>

            </div>


            <hr className="clearfix w-100 d-md-none" />


            <div className="col-md-6 mb-md-0 mb-3">


              <h5 className="footer-headings text-uppercase bg-dark text-white font-weight-bold">Services</h5>
              <p>'VHelp',redefining the work culture. With the helping hand of Spring boot we are trying to work for society,
                regarding household general chores like carpentry, delivery, cleaning, errands etc.'Hibernate' helped you to choose a
                helper by review, skills, and price. So, by this people can earn money. 'React' brought the magic on table by making
                it user friendly.'MySql' helped us to remember these kind souls and 'Spring Security' cared for your safety as we
                care for those you care for other.</p>
              <p></p>

            </div>


          </div>


        </div>


        
         
            <div className="footer-copyright text-center bg-dark py-3 ">
            <div className="row">
            <div className="col-md-6">
              <h4><a href="/">www.vhelp.com</a></h4>
              <h3 className='text-white'>© 2022 Copyright</h3>
              <h3 className='text-white'>📞 Tollfree Number 1800 0000 1212</h3>
              <h3 className='text-white'>📞 Email :vhelpeveryone@gmail.com</h3>
            </div>
            <div className="col-6">
              <h3 className='text-white'>Our Locations<hr className='w-50 mx-auto'></hr></h3>
              
              <h3 className='text-white mx-5'>○Pune ○Mumbai ○Indore ○Gwalior ○Bhopal</h3>
            </div>
          </div>

        </div>
      </footer>
    </div>
  )
}

export default FooterComponent