import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { UserService } from '../../services/UserService';
import config from '../../config/config';

const Profile = () => {
    const [data, setData] = useState({});
    const token = localStorage.getItem('token')

    const [file, setFile] = useState(null)
    const [loader, setLoader] = useState(false)

    const handleUpload = (e) => {
        e.preventDefault()

        const upload_url = config.authEndPoint.concat('upload/')
        console.log(file)
        const formData = new FormData()
        formData.append('image', file)

        const headers = {
            'Authorization' : `Bearer ${token}`,
            'Content-Type' : 'multipart/form-date'
        }
        axios.post(upload_url, formData, { headers })
            .then(res => {
                console.log(res.data)
                setLoader(!loader)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        axios.get(config.authEndPoint.concat("profile/"), {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                setData(res.data)
            })
            .catch(error => console.error(error))
    }, [loader, setLoader])

    return (
        <div className='m-4 bg-gray-500 text-white p-4 flex items-center px-20 py-10'
        >
            {data.profile_image ? (
                <div className='mx-4'>
                    <img
                        src={`http://localhost:8000${data.profile_image.image}`}
                        alt="Selected file"
                        width={200}
                        height={200}
                        className='my-2 rounded-3xl'
                    />
                </div>
            ) : (
                <div className='mx-4'>
                    <input className='my-2' type="file" onChange={(e) => setFile(e.target.files[0])} />
                    {file && (
                        <>
                            <img
                                src={URL.createObjectURL(file)}
                                alt="Selected file"
                                width={200}
                                height={200}
                                className='my-2 rounded-3xl'
                            />
                            <button className="text-white bg-orange-700 
                            hover:bg-orange-800 focus:ring-4 
                            focus:ring-orange-300 font-medium 
                            rounded-lg text-sm px-4 lg:px-5 py-2 
                            lg:py-2.5 mr-2 focus:outline-none" onClick={handleUpload}>Upload file</button>
                        </>
                    )}
                </div>
            )
            }
            <div className='mx-4'>
                Name:  {data.name} <br /> Email:  {data.email}
            </div>
        </div >
    )
}

export default Profile