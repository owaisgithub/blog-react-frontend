import React, { useEffect } from 'react'
import AuthService from '../../services/AuthService'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../context/authContext'

const Logout = () => {
    const navigate = useNavigate()
    const {authenticated, login} = useAuth()

    useEffect(() => {
        const token = localStorage.getItem('token')
        AuthService.logout(token)
        .then(res => {
            // console.log(res.data)
            login()
            localStorage.removeItem('token')
            navigate('/')
        })
        .catch(err => {
            // console.log("Logout Error: \n", err)
        })
    },
    [])

    return (
        null
    )
}

export default Logout