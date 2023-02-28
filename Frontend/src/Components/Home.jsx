import React, {useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BiTrash } from 'react-icons/bi'
import { BiEdit } from 'react-icons/bi'
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

const Home = () => {

    const {state, dispatch} = useContext(UserContext);

    const navigate = useNavigate();
    const [task, setTask] = useState('')
    const [tasks, setTasks] = useState([]);
    const [update, setUpdate] = useState(false)
    const [updatedTask, setUpdatedTask] = useState({id: '', updatedTask: ''})

    // GET TASKS
    const getData = async ()=> {
      const res = await fetch(`${process.env.REACT_APP_URL}/gettasks`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: localStorage.getItem("authToken")
        })
      })
      const json = await res.json();
      setTasks(json.tasks)
    };

    //SAVE TASK
    const saveData = async (e)=> {
      e.preventDefault();
        
        try {
            const res = await fetch(`${process.env.REACT_APP_URL}/addtask`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  email: localStorage.getItem("email"),
                  task: task
                })
            });

            const data = await res.json();
            if(res.status === 401) {
              alert(data.message)
            }else if (res.status === 400) {
              alert("Task failed to add")
            }else {
              setTask('')
              getData();
            }
            
        } catch (err) {
            console.log(err)
        }
    };

    //DELETE TASK
    const deleteTask = async (id)=> {
      try {
        const res = await fetch(`${process.env.REACT_APP_URL}/deletetask`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: localStorage.getItem("email"),
            id: id
          })
      })
      const json = await res.json();

      if(json.success) {
        getData();
      } else {
        alert("Deletion Failed")
      }

      } catch (error) {
        console.log(error)
      }
    }

    // UPDATE TASK
    const updateTask = async ()=> {
      const {id} = updatedTask;
      try {
        const res = await fetch(`${process.env.REACT_APP_URL}/updatetask`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: id,
            email: localStorage.getItem("email"),
            task: task
          })
      })

      const json = await res.json()
      setUpdatedTask({id: '', updatedTask: ''})
      setTask('')
      setUpdate(false)

      if(json.success) {
        getData();
      } else {
        alert("Update Failed")
      }

      } catch (error) {
        console.log(error)
      }
    }

  //CHANGE TASK
    const changeTask = (id, task)=> {
      setTask(task)
      setUpdatedTask({id: id, updatedTask: task})
      setUpdate(true)
    }

    // CANCEL UPDATE
    const canCelUpdate = ()=> {
      setUpdate(false)
      setTask('')
    }

    useEffect(()=> {
      if(localStorage.getItem("authToken")) {
        dispatch({type: "USER", payload: true})
        getData();
        if(state) {
        }
      }
    }, []);

  return (
    <>
    <div className='main_outer'> 
    {state ?
                <div className='main_container mt-5 overflow_handle'>
                <h2 className='mb-lg-5 mb-3'>Add New Tasks</h2>
                <div className='border border-info rounded container text-center p-3 task_div mb-lg-3'>
                <Form>
                <Form.Group className="m-3" controlId="formBasicEmail">
                    <Form.Control className='text_input input_tag' type="text" required={true} onChange={(e)=> setTask(e.target.value)} value={task} placeholder="Enter Task" />
                </Form.Group>
                {update ? 
                <div className='d-flex'>
                  <Button className='w-50 m-2 fw-bold' variant='outline-primary' onClick={()=> updateTask()}> Update </Button>
                  <Button className='w-50 m-2 fw-bold' variant='outline-danger' onClick={()=> canCelUpdate()}> Cancel </Button>
                </div> :                
                 <Button className='w-50 m-2 fw-bold' variant='outline-primary'  onClick={saveData}> Add  </Button>}
                </Form>
                {tasks.length !== 0 ?
                    <>
                    {tasks.map((value, index)=> {
                    return (
                      <div>
                        <Container className='m-lg-2 p-3 p-lg-1'>
                          <Row className='border border-info rounded gap-4 gap-lg-0 m-lg-1 p-lg-1 message_div'>
                            <Col lg={10} xs={9} className='d-flex p-lg-0 mt-1 text-break'>
                              <h4>{value.task}</h4>
                            </Col>
                            <Col lg={2} xs={2} className='p-0'>
                              <div className='d-flex gap-lg-2 gap-2 p-1 justify-content-end'>
                                <Button variant='outline-danger fw-bold p-lg-2 p-1' onClick={()=> {deleteTask(value._id)}}> <BiTrash/> </Button>
                                <Button variant='outline-success fw-bold p-lg-2 p-1' onClick={()=> {changeTask(value._id, value.task)}} > <BiEdit /> </Button>
                              </div>
                            </Col>
                          </Row>
                        </Container>
                      </div>)
                    })}
                    </>
                    :<h4>No Tasks to show</h4>}
                </div>
            </div>
        : <div className="main_container mt-5"><h1>Login Required</h1></div>
    }
        </div>
    </>
  )
}

export default Home;
