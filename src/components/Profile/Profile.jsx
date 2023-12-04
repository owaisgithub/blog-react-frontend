import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { UserService } from '../../services/UserService';
import config from '../../config/config';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [data, setData] = useState({});
    const token = localStorage.getItem('token')

    const [file, setFile] = useState(null)
    const [loader, setLoader] = useState(false)

    const [followers, setFollowers] = useState([])
    const [followings, setFollowing] = useState([])

    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        handle: '',
        dob: '',
        mobile: '',
        gender: ''
    })

    const changeInput = (e) => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const isUserChange = () => {
        if (data.first_name == userData.first_name && data.last_name == userData.last_name) {
            return false
        }
        return true
    }

    const isUserDataChange = () => {
        if (data.dob == userData.dob && data.mobile == userData.mobile && data.gender == userData.gender) {
            return false
        }
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(userData)
        const update_url = config.authEndPoint
        if (isUserChange()) {
            const user = {
                'first_name': userData.first_name,
                'last_name' : userData.last_name,
            }
            axios.put(update_url.concat('profile/'), user, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })   
        }
        if (isUserDataChange) {
            const userDetail = {
                'dob' : userData.dob,
                'mobile' : userData.mobile,
                'gender': userData.gender
            }
            console.log(userDetail)
            axios.put(update_url.concat('user-detail/'), userDetail, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        }
        setLoader(!loader)
        hideForm()
    }

    const handleUpload = (e) => {
        e.preventDefault()

        const upload_url = config.authEndPoint.concat('upload/')
        console.log(file)
        const formData = new FormData()
        formData.append('image', file)

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-date'
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

    const showForm = () => {
        const user_info = document.querySelector('#user-info')
        const user_form = document.querySelector('#user-form')
        user_info.classList.add('hidden')
        user_form.classList.remove('hidden')
    }

    const hideForm = () => {
        const user_info = document.querySelector('#user-info')
        const user_form = document.querySelector('#user-form')
        user_form.classList.add('hidden')
        user_info.classList.remove('hidden')
    }

    useEffect(() => {
        axios.get(config.authEndPoint.concat("profile/"), {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                setData(res.data)
                console.log(res.data)
                setFollowers(res.data.followers)
                setFollowing(res.data.followings)
                setUserData({
                    ...userData,
                    first_name: res.data.first_name,
                    last_name: res.data.last_name,
                    handle: res.data.handle,
                    dob: res.data.dob,
                    mobile: res.data.mobile,
                    gender: res.data.gender
                })
            })
            .catch(error => console.error(error))
    }, [loader, setLoader])

    return (
        <div className='m-4 bg-gray-500 text-white p-4 flex justify-center px-20 py-10'
        >
            {data.image ? (
                <div className='mx-4'>
                    <img
                        src={`http://localhost:8001${data.image}`}
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
            <div className='mx-4' id='user-info'>
                Name:  {data.first_name} {data.last_name} <br /> Handle:  {data.handle}
                <br /> DOB: {data.dob} <br /> Mobile Number: {data.mobile} <br />
                Gender: {data.gender} <br /> Followers: {data.follower_count} <br />
                {followers.map((follow) => {
                    return (
                        <>
                        <Link to={`/${follow.handle}`}>{follow.handle}</Link> <br />
                        </>
                    )
                })}
                <br />Following: {data.following_count} <br />
                {followings.map((follow, id) => {
                    return(
                        <div className='my-5'>
                        <Link to={`/${follow.handle}`} className='text-white bg-blue-600 hover:bg-blue-800 focus:right-4 focus:ring-blue-300 font-mediam rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>{follow.handle}</Link>
                        </div>
                    )
                })}
                <br />
                <button className='py-2 px-4 bg-orange-700 rounded-lg' onClick={showForm} id='btn'>Edit</button>
            </div>

            <div className='mx-4 hidden' id='user-form'>
                <form className="p-6 flex flex-col justify-center" onSubmit={handleSubmit}>
                    <div className="flex flex-col mt-2">
                        <label htmlFor="first_name" className="hidden">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            className='w-100 mt-2 py-3 px-3 rounded-lg bg-white border 
                          border-gray-400 text-gray-800 font-semibold 
                          focus:border-orange-500 focus:outline-none'
                            value={userData.first_name}
                            onChange={changeInput}
                            placeholder='First Name'
                        />
                    </div>

                    <div className="flex flex-col mt-2">
                        <label htmlFor="last_name" className="hidden">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            className='w-100 mt-2 py-3 px-3 rounded-lg bg-white border 
                          border-gray-400 text-gray-800 font-semibold 
                          focus:border-orange-500 focus:outline-none'
                            value={userData.last_name}
                            onChange={changeInput}
                            placeholder='Last Name'
                        />
                    </div>

                    <div className="flex flex-col mt-2">
                        <label htmlFor="dob" className="hidden">
                            DOB
                        </label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            className='w-100 mt-2 py-3 px-3 rounded-lg bg-white border 
                          border-gray-400 text-gray-800 font-semibold 
                          focus:border-orange-500 focus:outline-none'
                            value={userData.dob}
                            onChange={changeInput}
                            placeholder='DOB'
                        />
                    </div>
                    <div className="flex flex-col mt-2">
                        <label htmlFor="mobile" className="hidden">
                            Mobile Number
                        </label>
                        <input
                            type="text"
                            id="mobile"
                            name="mobile"
                            className='w-100 mt-2 py-3 px-3 rounded-lg bg-white border 
                          border-gray-400 text-gray-800 font-semibold 
                          focus:border-orange-500 focus:outline-none'
                            value={userData.mobile}
                            onChange={changeInput}
                            placeholder='Mobile Number'
                        />
                    </div>

                    <div className="flex flex-col mt-2">
                        <label htmlFor="gender" className="hidden">
                            Gender
                        </label>
                        <select
                            name="gender"
                            id="gender"
                            className='w-100 mt-2 py-3 px-3 rounded-lg bg-white border 
                          border-gray-400 text-gray-800 font-semibold 
                          focus:border-orange-500 focus:outline-none'
                            value={userData.gender}
                            onChange={changeInput}
                          >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                    <div className="flex">
                        <button
                            type="submit"
                            className="md:w-32 bg-orange-700 hover:bg-blue-dark text-white 
                      font-bold py-3 px-6 rounded-lg mt-3 hover:bg-orange-600 
                      transition ease-in-out duration-300"
                        >
                            Update
                        </button>
                        <button
                            className="bg-orange-700 hover:bg-blue-dark text-white py-3 px-6 rounded-lg mt-3 ml-3 hover:bg-orange-600 
                      transition ease-in-out duration-300"
                            onClick={hideForm}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default Profile