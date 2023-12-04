import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout'
import Home from './components/Home/Home'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import Login from './components/Login/Login'
import Createuser from './components/Login/Createuser'
import Logout from './components/Login/Logout'
import Createpost from './components/Blog/Createpost'
import Profile from './components/Profile/Profile'
import User from './components/User/User'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'contact',
        element: <Contact />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'create-user',
        element: <Createuser />
      },
      {
        path: 'logout',
        element: <Logout />
      },
      {
        path: 'create-post',
        element: <Createpost />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: ':handle',
        element: <User />
      }
    ]
  }
])
//   createRoutesFromElements(
//     <Route path='/' element={<Layout />}>
//       <Route path='' element={<Home />} />
//       <Route path='about' element={<About />} />
//       <Route path='contact' element={<Contact />} />
//       <Route path='login' element={<Login />} />
//       <Route path='create-user' element={<Createuser />} />
//       <Route path='logout' element={<Logout />} />
//       <Route path='create-post' element={<Createpost />} />
//       <Route path='profile' element={<Profile />} />
//       <Route path='user/:user-mail' element={<User />} />
//     </Route>
//   )
// )


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
