import React from 'react'
import { useParams } from 'react-router-dom'

export default function User() {
    const {userId} = useParams()
    console.log()
    return (
        <div
            className='bg-gray-600 text-white 
            text-3xl items-center p-4 text-center'
        >
            User: {userId}
        </div>
    )
}
