import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Profile = () => {
    const [data, setData] = useState({});
    const token = localStorage.getItem('token')
    const headers = {
        'Authorization': `Bearer ${token}`,
    }

    useEffect(() => {
        
        axios.get("http://localhost:8000/api/v1/user/profile/", { headers })
        .then(res => {
            setData(res.data)
        })
        .catch(error => console.error(error))
    }, [])

    return (
        <div
            className='text-center m-4 bg-gray-600 text-white
                        p-4 text-3xl'
        >
            Name:  {data.first_name} {data.last_name} <br /> Email:  {data.email}

            <img className='rounded-xl '
                src=''
                alt='Gitgub profile'
                width={300}
            />
        </div>
    )
}

export default Profile