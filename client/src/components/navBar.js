import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBIcon,
  MDBNavbarNav,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {

  const navigate = useNavigate('')
  const handleLogOut= async(e)=>{
    const res = await fetch('/api/users/logout')
    if(res.ok){
      navigate('/')
    }
  }
   const [showNavNoTogglerSecond, setShowNavNoTogglerSecond] = useState(false);
    return (
        <div className="NavBar">
             <MDBNavbar fixed='top' expand='lg' light bgColor='light'>
        <MDBContainer>
          <MDBNavbarBrand href='#' className='text-primary'><b><MDBIcon fab icon="connectdevelop" /> CreerLink</b></MDBNavbarBrand>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarTogglerDemo02'
            aria-controls='navbarTogglerDemo02'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavNoTogglerSecond(!showNavNoTogglerSecond)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showNavNoTogglerSecond}>
            <MDBNavbarNav className='justify-content-end  mb-2 mb-lg-0'>
              <MDBNavbarItem>
                <MDBNavbarLink active aria-current='page' href='#'>
                  <Link to="/home" > Home</Link>
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink active><Link to="/home/myjobs" >My Jobs</Link></MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='#' active>Search</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink active>
                  <Link onClick={(e)=>{handleLogOut(e)}} >Logout</Link>
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
        </div>
      );
}
 
export default NavBar;