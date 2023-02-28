import Button from 'react-bootstrap/Button';
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import UserImage from "../assets/ic_user.svg";

const Profile = () => {

  const {state, dispatch} = useContext(UserContext);
  const [user, setUser] = useState({name: '', email: '', phone: '', work: ''});
  const [totalTasks, setTotalTasks] = useState();
  const [edit, setEdit] = useState(false);

  //GET PROFILE DATA
  const getData = async ()=> {

    const res = await fetch(`${process.env.REACT_APP_URL}/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: localStorage.getItem("authToken")
      })
    })
    const json = await res.json();
    const {name, email, phone, work} = json.userdata;
    setUser({name, email, phone, work})
    setTotalTasks(json.userdata.tasks.length)
  };

  const handleInputs = (e)=> {
    let {name , value} = e.target;
    setUser({...user, [name]: value})
  }

  //UPDATE PROFILE DATA
  const saveDetails = async (e)=> {
    e.preventDefault();

    const {name, phone, work} = user;
    const token = localStorage.getItem("authToken")
    
    const res = await fetch(`${process.env.REACT_APP_URL}/updateuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token, name, phone, work })
    })
    
    const data = await res.json();

    if(res.status === 400 || !data) {
      window.alert("Profile Update Failed")
    } else {
      window.alert("Profile Updated Successfully")
      setEdit(false)
      getData();
    }
  };

  // CANCEL EDIT
  const cancelEdit = ()=> {
    getData()
    setEdit(false)
  }

  useEffect(()=> {
    if(localStorage.getItem('authToken')) {
      dispatch({type: "USER", payload: true})
      getData();
    }
  }, [])

  return (
    <>
    {state ? <>
    <Container className='border border-info p-lg-5 p-3 mt-5 profile_div'>
      <Row className='border border-info m-lg-1 p-2 rounded highlight'>
        <Col xs={2}>
          <img src={UserImage} className="userImg" alt="Iser_Img" srcSet="" />
        </Col>
        <Col xs={10} className='rounded h-25 p-1'>
          <h2 className='text-center mt-lg-4 mt-2'>Login Id: {user.email}</h2>
        </Col>
      </Row>

      <br />
      
      <div className='border border-info rounded p-2 highlight'>

      <Row className='text-center m-lg-3 m-3'>
        <Col xs={5}><h3>Name :</h3></Col>
        <Col xs={7}>
        {!edit ? <h4>{user.name}</h4>: 
        <input type="text" className='w-100 text-center p-1' name='name' value={user.name} onChange={handleInputs} />
        }
        </Col>
      </Row>
      <Row className='text-center m-lg-3 m-3'>
        <Col xs={5}><h3>Phone :</h3></Col>
        <Col xs={7}>
        {!edit ? <h4>{user.phone}</h4> : 
         <input type="number" className='w-100 text-center p-1' name='phone' value={user.phone} onChange={handleInputs} />
        }
         </Col>
      </Row>
      <Row className='text-center m-lg-3 m-3'>
        <Col xs={5}><h3>Work :</h3></Col>
        <Col xs={7}>
        {!edit ? <h4>{user.work}</h4> : 
         <input type="text" className='w-100 text-center p-1' name='work' value={user.work} onChange={handleInputs} />
        }
         </Col>
      </Row>
      <Row className='text-center m-lg-3 m-3'>
        <Col xs={6}><h3>Tasks :</h3></Col>
        <Col xs={6}>
          <h4>{totalTasks}</h4>
         </Col>
      </Row>
      <Row>
        <Col className='text-center m-2'>
          {!edit ? 
          <Button variant='outline-dark fs-5 fw-bold' onClick={()=> setEdit(true)}> Edit</Button>
          : 
          <div className='d-flex align-items-lg-center justify-content-lg-center gap-5'>
          <Button variant='outline-info fs-5 fw-bold' onClick={saveDetails}> Save Changes</Button>
          <Button variant='outline-danger fs-5 fw-bold' onClick={cancelEdit}> Cancel</Button>
          </div>
          }
        </Col>
      </Row>
      </div>

      </Container>
    </>
    : <div className="main_container mt-5">
    <h1>Login Required</h1></div>}
    </>
  )
}

export default Profile;
