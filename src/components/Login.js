import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

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
    
    const apiUrl = 'http://localhost:8000/api/users/authenticate/'

    axios.post(apiUrl, data)
      .then((response) => {
        localStorage.setItem('token', response.data.token)
        navigate('/')
      })
      .catch((error) => {
        setMsg(error.response.data.detail)
        setIsError(true)
      });
  }

    return ( 
        <>
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="text-center text-2xl font-semibold mb-4 text-white">Login</div>
        <form className="bg-gray-400 p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
          {isError ? (
            <div className='bg-white rounded-lg py-3 text-lg'>
              <p className='flex items-center justify-center text-red-600'>{msg}</p>
            </div>
          ) : (
            <p></p>
          )}
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
            Login
          </button>
        </form>
      </div>
    </div>
        </>
    );
}

export default Login;