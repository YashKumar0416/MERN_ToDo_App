import React from 'react';
import { NavLink } from 'react-router-dom';

const Error = () => {

  return (
    <>
    <div className="main_container">
      <div className="errorPage">
        <p className='errorLogo'>404</p>
        <h1 className='error_message'>Oops... Page Not Found</h1>
        <NavLink to='/'><p className='home_link fw-bold'> Go back</p></NavLink>
      </div>
    </div>
    </>
  )
}

export default Error;