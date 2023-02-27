import React, { useContext } from 'react';
import { UserContext } from '../App';
import { NavLink } from 'react-router-dom';

const Welcome = () => {

    const { state, dispatch } = useContext(UserContext);

  return (
    <>
    <div className='main_container'>
        <div className='home_wrapper fw-bold gap-2'>
            {!state ? <>
            <h1 className='fw-bold'>Welcome to my To-Do App</h1>
            <h4 className='fw-bold'>Based on MERN-Stack</h4>
            <div className='home_options'>
                <NavLink to='/login'>Add Task</NavLink>
                <p>or</p>
                <NavLink to='/register'>Add Yourself</NavLink>
            </div>
            </>
                :
                <div className='home_wrapper fw-bold gap-2'>
            <h1 className='fw-bold'>Welcome Back</h1>
        </div>
        }
        </div>
    </div>
    </>
  )
}

export default Welcome;