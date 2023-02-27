import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { UserContext } from '../App';
import { BiLogIn } from "react-icons/bi";

const Register = () => {

  const {state, dispatch} = useContext(UserContext);

  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '', email: '', phone: '', work: '', password: ''
  })
  
  let name,value;
  const handleInputs = (e)=> {
    name = e.target.name;
    value = e.target.value;
    setUser({...user, [name]: value})
  };
  
  // REGISTER USER
  const saveDetails = async (e)=> {
    e.preventDefault();
    const {name, email, phone, work, password} = user;
    
    const res = await fetch(`${process.env.REACT_APP_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, phone, work, password})
    })
    
    const data = await res.json();

    if(res.status === 400 || !data) {
      window.alert("Invalid Registration")
      console.log("Invalid Registration")
    } else {
      window.alert("Successfull Registration")
      console.log("Successfull Registration")
      navigate('/login')
    }
  };

  useEffect(()=> {
    if(localStorage.getItem("authToken")) {
      dispatch({type: "USER", payload: true})
    } else {
      dispatch({type: "USER", payload: false})
    }
  }, []); 

  return (
    <>
    <div className="main_container">
      <div className="outer">
        <Container className='view'>
          <div className='mt-lg-5 m-4 text-center'>
            <h1 className='fw-bold'>Already a user</h1>
            <NavLink style={{textDecoration: "none"}} to='/login'> <p className='links fw-bold'>Sign In<BiLogIn/> </p> </NavLink>
          </div>
        </Container>
    <Container className='mt-2'>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label className='fs-5 fw-bold'>Name</Form.Label>
        <Form.Control className='input_tag' type="text" onChange={handleInputs} value={user.name} name='name' placeholder="Name" />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='fs-5 fw-bold'>Email address</Form.Label>
        <Form.Control className='input_tag' type="email"onChange={handleInputs} value={user.email} name='email' placeholder="Enter email" />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label className='fs-5 fw-bold'>Phone</Form.Label>
        <Form.Control className='input_tag' type="number" onChange={handleInputs} value={user.phone} name='phone'  placeholder="Phone" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicWork">
        <Form.Label className='fs-5 fw-bold'>Work</Form.Label>
        <Form.Control className='input_tag' type="text" onChange={handleInputs} value={user.work} name='work' placeholder="Work" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='fs-5 fw-bold'>Password</Form.Label>
        <Form.Control className='input_tag' type="password" onChange={handleInputs} value={user.password} name='password' placeholder="Password" />
      </Form.Group>
      <div className='text-center'>
      <Button variant="outline-primary mb-3" onClick={saveDetails} className='fw-bold' type="submit">
        Sign Up
      </Button>
      </div>
    </Form>
    </Container>
      </div>
  </div>
    </>
  )
}

export default Register;