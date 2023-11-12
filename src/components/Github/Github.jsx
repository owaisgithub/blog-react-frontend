import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

export default function Github() {
    const data = useLoaderData()

    // const [data, setData] = useState({});

    // useEffect(() => {
    //     fetch('https://api.github.com/users/owaisgithub')
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data)
    //         setData(data)
    //     })
    //     .catch(error => console.error(error))
    // }, [])

    return (
        <div
            className='text-center m-4 bg-gray-600 text-white
                        p-4 text-3xl'
        >
            Github  Followers: {data.followers}

            <img className='rounded-xl '
                src={data.avatar_url} 
                alt='Gitgub profile' 
                width={300} 
            />
        </div>
    )
}

export const githubLoadInfo = async () => {
    const response = await fetch('https://api.github.com/users/owaisgithub')
    return response.json()
}
