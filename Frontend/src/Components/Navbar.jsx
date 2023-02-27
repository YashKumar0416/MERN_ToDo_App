import React, { useContext } from 'react'
import { UserContext } from '../App';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { BiTask } from "react-icons/bi";

const NavbarHeader = () => {

    const {state, dispatch} = useContext(UserContext)

    // LOGOUT USER
    const logout = ()=> {
      localStorage.removeItem('authToken')
      localStorage.removeItem('email')
      dispatch({type: "USER", payload: false})
      navigate('/')
    }

  return (<>
    {state ?
          <Navbar bg="light" expand="lg" className='navbar p-3'>
          <Container>
            <Navbar.Brand className='fs-2 fw-bold'>To-Do App <BiTask/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto d-flex flex-row m-2">
                <NavLink to="/profile" className="mx-2"><Button variant='outline-primary' className='fw-bold'> Profile </Button></NavLink>
                <NavLink to="/home" className="mx-2"><Button variant='outline-primary' className='fw-bold'> Tasks </Button></NavLink>
                <NavLink to="/" className="mx-2"><Button onClick={logout} variant='outline-danger' className='fw-bold'> Logout </Button></NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        
      : 
          <Navbar bg="light" expand="lg" className='navbar p-3'>
          <Container>
            <Navbar.Brand className='fs-2 fw-bold'>To-Do App <BiTask /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto d-flex flex-row m-2">
                <NavLink to="/" className="mx-2"> <Button variant='outline-primary' className='fw-bold'> Home</Button></NavLink>
                <NavLink to="/register" className="mx-2"> <Button variant='outline-primary' className='fw-bold'> Register</Button></NavLink>
                <NavLink to="/login" className="mx-2"> <Button variant='outline-success' className='fw-bold'> Login</Button></NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    }
    </>
  )
};

export default NavbarHeader;