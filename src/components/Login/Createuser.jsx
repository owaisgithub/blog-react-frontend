import { useState } from 'react'
import AuthService from '../../services/AuthService'
// import axios from 'axios';

function Createuser() {
  const [data, setData] = useState({
    first_name : '',
    last_name : '',
    email : '',
    password : ''
  })

  const [msg, setMsg] = useState('')
  const [isError, setIsError] = useState(false)

  

  const changeInput = (e) => {
    const { name, value } = e.target
    setData({...data, [name]: value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log(data)
    const authService = new AuthService()
    const d = authService.create(data)
    console.log(d)
    
    // const url = 'http://localhost:8000/api/users/create/';

    // await fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // })
    // .then((response) => {
    //   console.log('Data posted successfully:', response.data);
    // })
    // .catch((error) => {
    //   setMsg(error.response.data.email)
    //   setIsError(true)
    //   console.error('API call error:', error);
    // });
  }

    return ( 
        <>
    <div className="flex items-center justify-center mb-10">
      <div className="max-w-md w-full">
        <div className="text-center text-2xl font-semibold mb-4 text-white">Register</div>
        <form className="bg-gray-800 p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
          {isError ? (
            <div className='bg-white rounded-lg py-3 text-lg'>
              <p className='flex items-center justify-center text-red-600'>{msg}</p>
            </div>
          ) : (
            <></>
          )}
          <div className="mb-4">
            <label htmlFor="username" 
                className="block text-gray-600 text-sm font-medium">
                    First Name
            </label>
            <input 
                type="text" 
                id="first_name" 
                name="first_name" 
                className='outline-none w-full py-1 px-3 rounded-lg'
                value={data.first_name}
                onChange={changeInput}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="username" 
                className="block text-gray-600 text-sm font-medium">
                    Last Name
            </label>
            <input 
                type="text" 
                id="last_name" 
                name="last_name" 
                className='outline-none w-full py-1 px-3 rounded-lg'
                value={data.last_name}
                onChange={changeInput}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" 
                className="block text-gray-600 text-sm font-medium">
                    Email
            </label>
            <input 
                type="email" 
                id="email" 
                name="email" 
                className='outline-none w-full py-1 px-3 rounded-lg'
                value={data.email}
                onChange={changeInput}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" 
                className="block text-gray-600 text-sm font-medium">
                    Password
            </label>
            <input 
                type="password" 
                id="password" 
                name="password" 
                className='outline-none w-full py-1 px-3 rounded-lg'
                value={data.password}
                onChange={changeInput}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full w-full"
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