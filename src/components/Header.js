import React, { useEffect, useState } from 'react'
import { Button, ButtonToolbar, OverlayTrigger, Popover } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LogoImg from '../assets/logo.png'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginStatus } from '../reduxToolkit/slices/loginSlice';
import Swal from 'sweetalert2';
import { setCartDetails } from '../reduxToolkit/slices/cartSlice';
import { setWishlistDetails } from '../reduxToolkit/slices/wishlistSlice';
const Header = () => {
  let cartDetails = useSelector(state => state.cart);
  let wishlistDetails = useSelector(state => state.wishlist);
  let loginUser=localStorage.getItem('loginUser');
  let dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getLoginStatus())
  },[])
  useEffect(()=>{
    dispatch(setCartDetails())
    dispatch(setWishlistDetails())
  },[loginUser])
  const handleLogout=()=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to Logout!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Logged out!',       
         
        )
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('loginUser')
        dispatch(getLoginStatus())
      }
    })
  }
let loginStatus = useSelector(state => state.login.loggedIn)
const popoverBottom = (
  <Popover id="popover-positioned-bottom" title="Popover bottom" style={{ height: 100, padding:10, }} className='d-flex flex-column justify-content-around align-items-center '>
    <strong>{loginUser}</strong> 
    <Button  variant='danger' onClick={handleLogout}>LogOut</Button>

  </Popover>
);

  return (


    <Navbar expand="lg" className="bg-body-tertiary sticky-top py-0" >
      <Container>
        <Navbar.Brand as={Link} to="/" > <img
          alt=""
          src={LogoImg}
          width="140"
          height="40"
          className="d-inline-block align-top"
        /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/"><h5>Home</h5></Nav.Link>
            <Nav.Link as={Link} to="/products"><h5>Products</h5></Nav.Link>
            <Nav.Link as={Link} to="/category"><h5>Categories</h5></Nav.Link>

          </Nav>
        </Navbar.Collapse>
        <Link to="/wishlist" className='me-4 d-flex flex-column align-items-center justify-content-start text-decoration-none text-black'>
          <p >{loginStatus?wishlistDetails.totalItems:0}</p>

          <svg style={{ marginTop: "-16px" }} xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-bag-heart" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5Zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0ZM14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1ZM8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
          </svg>

        </Link>
        <Link to="/cart" className='me-3 d-flex flex-column align-items-center justify-content-start text-decoration-none text-black' >
          <p >{loginStatus?cartDetails.totalItems:0}</p>

          <svg style={{ marginTop: "-19px" }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
        </Link >

       
        {
          loginStatus ?

          <ButtonToolbar>
         <OverlayTrigger trigger="click" placement="bottom" overlay={popoverBottom} containerPadding={20}>
      <button className='rounded-circle btn mt-3 '><svg xmlns="http://www.w3.org/2000/svg" width="30" height="35" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
</svg></button>
    </OverlayTrigger>
    </ButtonToolbar>
: <Link to="/login">
<Button className='ms-4' variant='outline-primary'>Login</Button>
</Link>
        }
      </Container>
    </Navbar>

  );

}

export default Header