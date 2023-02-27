import React, { createContext, useReducer } from 'react';
import { Routes, Route } from 'react-router-dom';
import { initialState, reducer } from './Reducer/UseReducer';
import Login from './Components/Login'
import Home from './Components/Home';
import Register from './Components/Register';
import Profile from './Components/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar';
import Error from './Components/Error';
import "./Styles.css";
import Welcome from './Components/Welcome';

export const UserContext = createContext();

const App = () => {
  
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <>
    <UserContext.Provider value={{state, dispatch}}>
    <Navbar />
    <Routes>
      <Route  path='/' element={<Welcome />}/>
      <Route  path='/login' element={<Login />}/>
      <Route  path='/home' element={<Home />}/>
      <Route  path='/register' element={<Register />}/>
      <Route  path='/profile' element={<Profile />}/>
      <Route  path='*' element={<Error />}/>
    </Routes>
    </UserContext.Provider>
    </>
  )
}

export default App;