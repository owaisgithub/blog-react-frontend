import { useEffect, useState } from 'react'
import AuthService from '../../services/AuthService'
// import axios from 'axios';

function Createuser() {
  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  })

  const [msg, setMsg] = useState('')
  const [isError, setIsError] = useState(false)

  const [emailErr, setEmailErr] = useState(null)
  const [passErr, setPassErr] = useState(null)


  const changeInput = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(data)
    AuthService.create(data)
      .then(res => {
        console.log(res.data)
        setMsg('Now Login')
        setData({ ...data, first_name: '', last_name: '', email: '', password: '' })
        setEmailErr(null)
        setPassErr(null)
        setIsError(false)
      })
      .catch(err => {
        console.log(err)
        setIsError(true)
        setMsg('Error Occurred')
        setEmailErr(err.response.data.email)
        setPassErr(err.response.data.password)
      })
  }

  useEffect(() => { }, [msg, isError])

  return (
    <>
      <div className="flex items-center justify-center mb-10">
        <div className="max-w-md w-full">
          <div className="text-center text-2xl text-gray-700 pt-5 font-semibold">Register</div>
          <form className="p-6 flex flex-col justify-center" onSubmit={handleSubmit}>
            {isError ? (
              <div className='bg-white rounded-lg py-3 text-lg'>
                <p className='flex items-center justify-center text-red-600'>{msg}</p>
              </div>
            ) : (
              <div className='bg-white rounded-lg py-3 text-lg'>
                <p className='flex items-center justify-center text-green-600'>{msg}</p>
              </div>
            )}
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
                value={data.first_name}
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
                value={data.last_name}
                onChange={changeInput}
                placeholder='Last Name'
              />
            </div>

            <div className="flex flex-col mt-2">
              <label htmlFor="email" className="hidden">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className='w-100 mt-2 py-3 px-3 rounded-lg bg-white border 
                          border-gray-400 text-gray-800 font-semibold 
                          focus:border-orange-500 focus:outline-none'
                value={data.email}
                onChange={changeInput}
                placeholder='Email eg:- example@gmail.com'
              />
              {emailErr && (
                <div className='bg-white rounded-lg py-3 text-lg'>
                <p className='flex items-center justify-center text-red-600'>{emailErr}</p>
              </div>
              )}
            </div>

            <div className="flex flex-col mt-2">
              <label htmlFor="password" className="hidden">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className='w-100 mt-2 py-3 px-3 rounded-lg bg-white border 
                          border-gray-400 text-gray-800 font-semibold 
                          focus:border-orange-500 focus:outline-none'
                value={data.password}
                onChange={changeInput}
                placeholder='Password'
              />
              {passErr && (
                <div className='bg-white rounded-lg py-3 text-lg'>
                <p className='flex items-center justify-center text-red-600'>{passErr}</p>
              </div>
              )}
            </div>

            <button
              type="submit"
              className="md:w-32 bg-orange-700 hover:bg-blue-dark text-white 
                      font-bold py-3 px-6 rounded-lg mt-3 hover:bg-orange-600 
                      transition ease-in-out duration-300"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Createuser;