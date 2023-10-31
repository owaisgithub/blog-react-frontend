import React from 'react';
// import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Createuser from './components/Createuser';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Blogs from './components/Blogs';
import Createblog from './components/Createblog';
import Profile from './components/Profile';

function Router() {
  // const [isToken, setIsToken] = useState(false)

  // if (localStorage.getItem('token')) {
  //   setIsToken(true)
  // }

  // console.log(isToken)

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Blogs />}/>
        <Route path='user' element={<Createuser />} />
        <Route path='login' element={<Login />} />
        <Route path='create-blog' element={<Createblog />} />
        <Route path='profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
