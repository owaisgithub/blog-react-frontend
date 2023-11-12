import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthService from '../../services/AuthService'
// import axios from 'axios'

function Login() {
  const [data, setData] = useState({
    email : '',
    password : ''
  })

  const navigate = useNavigate()

  const [msg, setMsg] = useState('')
  const [isError, setIsError] = useState(false)
  // const [isLogin, setIsLogin] = useState(false)

  const changeInput = (e) => {
    const { name, value } = e.target
    setData({...data, [name]: value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log(data)
    const authService = new AuthService()
    const d = authService.authenticate(data);
    console.log(d)
    // const url = 'http://localhost:8000/api/users/authenticate/'

    // await fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },

    //   body: JSON.stringify(data)
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data)
    //     // localStorage.setItem('token', response.data.token)
    //     // navigate('/')
    //   })
    //   .catch((error) => {
    //     setMsg(error.response.data.detail)
    //     setIsError(true)
    //   });
  }

    return ( 
    <>
    <div className="flex items-center justify-center mb-10">
      <div className="max-w-md w-full">
        <div className="text-center text-2xl font-semibold">
          Login
        </div>
        <form className="p-6 flex flex-col justify-center"
          onSubmit={handleSubmit}
        >
          {isError ? (
            <div className='bg-white rounded-lg py-3 text-lg'>
              <p className='flex items-center justify-center text-red-600'>{msg}</p>
            </div>
          ) : (
            null
          )}
          <div className="flex flex-col mt-2">
            <label for="email" className="hidden">
                Email
            </label>
            <input
              type="email" 
              id="email" 
              name="email" 
              className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border 
                        border-gray-400 text-gray-800 font-semibold 
                        focus:border-orange-500 focus:outline-none"
              value={data.email}
              onChange={changeInput}
              placeholder="Email"
            />
          </div>

          <div className="flex flex-col mt-2">
            <label for="password" className="hidden">
                Password
            </label>
            <input
              type="password" 
              id="password" 
              name="password" 
              placeholder="Password"
              className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border 
                        border-gray-400 text-gray-800 font-semibold 
                        focus:border-orange-500 focus:outline-none"
              value={data.password}
              onChange={changeInput}
            />
          </div>

          <button
            type="submit"
            className="md:w-32 bg-orange-700 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-orange-600 transition ease-in-out duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
    </>
    );
}

export default Login;