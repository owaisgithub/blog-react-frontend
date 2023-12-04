import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import config from '../../config/config'
import { Button } from '@material-tailwind/react'

export default function User() {
    const { handle } = useParams()

    const [id, setId] = useState(0)
    const [btnText, setBtnText] = useState('Follow')
    const [loader, setLoader] = useState(false)
    const [following, setFollowing] = useState(false)

    const user_url = config.authEndPoint
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')

    const followUser = (userId) => {
        axios.post(user_url.concat(`follow/${userId}/`), {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data)
                setLoader(!loader)
                if (btnText == 'Follow') {
                    setBtnText('Following')
                } else {
                    setBtnText('Follow')
                    setFollowing(false)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        axios.get(user_url.concat(`${handle}/`), {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data)
                setId(res.data.id)
                res.data.followers.map((follow) => {
                    if (follow.handle == user) {
                        setBtnText('Following')
                        setFollowing(true)
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })
    }, [loader, setLoader])
    return (
        <div
            className='bg-gray-600 text-white 
            text-3xl items-center p-4 text-center'
        >
            User: {handle}
            {following ? (
                <Button size='sm' className='text-white ml-4'  variant='outlined'
                    onClick={() => followUser(id)}>
                    {btnText}
                </Button>
            ) : (
                <Button size='sm' className='bg-blue-500 ml-4'
                    onClick={() => followUser(id)}>
                    {btnText}
                </Button>
            )}

        </div>
    )
}
