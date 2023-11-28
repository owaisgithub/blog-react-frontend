import React, { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { AuthProvider } from './context/authContext'

const Layout = () => {
  const [authenticated, setAuthenticated] = useState(false)

  const login = () => {
    setAuthenticated(!authenticated)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setAuthenticated(true)
    }
  }, [authenticated])

  return (
    <AuthProvider value={{authenticated, login}}>
      <Header />
      <Outlet />
      <Footer />
    </AuthProvider>
  )
}

export default Layout