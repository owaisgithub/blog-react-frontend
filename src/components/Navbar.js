import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
    const [isAuth, setIsAuth] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuth(true)
        }
    }, [isAuth, setIsAuth])

    return (
        <nav>
            <ul className="flex border-b">
                <li className="-mb-px mr-1">
                    <NavLink
                        className="bg-white inline-block border-l border-t border-r
                        rounded-t py-2 px-4 font-semibold" 
                        to="/">
                            Home
                    </NavLink>
                </li>

                {isAuth ? null : <li className="-mb-px mr-1">
                    <NavLink 
                    className="bg-white inline-block border-l border-t border-r
                    rounded-t py-2 px-4 font-semibold" 
                    to="/user">
                        Create Account
                    </NavLink>
                </li> }

                {isAuth ? null : <li className="-mb-px mr-1">
                    <NavLink 
                    className="bg-white inline-block border-l border-t border-r
                    rounded-t py-2 px-4 font-semibold" 
                    to="/login">
                        Login
                    </NavLink>
                </li> }

                {isAuth ? <li className="-mb-px mr-1">
                    <NavLink
                        className="bg-white inline-block border-l border-t border-r
                        rounded-t py-2 px-4 font-semibold" 
                        to="/create-blog">
                            Create Blog
                    </NavLink>
                </li> : null }

                {isAuth ? <li className="-mb-px mr-1">
                    <NavLink
                        className="bg-white inline-block border-l border-t border-r
                        rounded-t py-2 px-4 font-semibold" 
                        to="/logout"
                        onClick={() => {
                            const apiUrl = "http://localhost:8000/api/users/logout/"
                            axios.post(apiUrl, {}, {
                                headers : {
                                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                                  }
                            })
                            .then(response => {
                                console.log(response.data)
                            })
                            .catch(error => {
                                console.log(error)
                            })
                            localStorage.removeItem('token')
                            setIsAuth(false)
                            navigate('/')
                        }}>
                            Logout
                    </NavLink>
                </li> : null }

                {isAuth ? <li className="-mb-px mr-1">
                    <NavLink
                        className="bg-white inline-block border-l border-t border-r
                        rounded-t py-2 px-4 font-semibold" 
                        to="/profile"
                        >
                            Profile
                    </NavLink>
                </li> : null }
            </ul>
        </nav>
    );
}

export default Navbar;