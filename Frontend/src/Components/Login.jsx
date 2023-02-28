import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BiLogIn } from "react-icons/bi";

const Login = () => {

  const { state, dispatch } = useContext(UserContext); 

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(false)

  // USER LOGIN
  const saveDetails = async (e)=> {
    e.preventDefault();

    const res = await fetch(`${process.env.REACT_APP_URL}/login`, {
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    })
    
    const data = await res.json();
    let status = res.status;
    // RESPONSE HANDLING
    if (res.status === 400 || !data) {
      window.alert("Error " + status +  " : Invalid Credentials")
    } else {
      dispatch({type: "USER", payload: true})
      window.alert("Status " + status + " : Login Successfull")
      localStorage.setItem("authToken", data.authToken)
      localStorage.setItem("email", data.loginuser.email)
      setUser(true)
      navigate('/home')
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
      <div className="outer border border-info">

      <Container className='mt-5'>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className='fs-5 fw-bold'>Email address</Form.Label>
          <Form.Control className='input_tag' type="email" onChange={(event)=> {setEmail(event.target.value)}} value={email} placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className='fs-5 fw-bold'>Password</Form.Label>
          <Form.Control className='input_tag' type="password" onChange={(event)=> {setPassword(event.target.value)}} value={password} placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
        </Form.Group>
        <Container>
          <Row>
            <Col>
        <Button variant="outline-primary" className='fw-bold' type="submit" onClick={saveDetails}>
          Sign In
        </Button>
        </Col>
        <Col>
          <NavLink style={{textDecoration: "none"}} to='/'> <p className='links forgot_password text-center mt-2'>Forgot Password?</p> </NavLink>
            </Col>
          </Row>
        </Container>
      </Form>
      </Container>
      <Container className='view'>
        <div className='mt-5 text-center'>
        <h1 className='fw-bold'>Sign up now</h1>
        <NavLink style={{textDecoration: "none"}} to='/register'> <p className='links fw-bold'>Register<BiLogIn /></p> </NavLink>
        </div>
      </Container>
      </div>
    </div>
    </>
  )
}

export default Login;
