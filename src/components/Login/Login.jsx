import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../context/authContext'
import AuthService from '../../services/AuthService'

function Login() {
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const [msg, setMsg] = useState('')
  const [isError, setIsError] = useState(false)
  const { authenticated, login } = useAuth()

  const changeInput = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(data)
    AuthService.authenticate(data)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        setData({ ...data, email: '', password: '' })
        console.log(res.data)
        login()
        navigate('/')
      })
      .catch(err => {
        setIsError(true)
        setMsg(err.response.data.detail)
      })
  }

  useEffect(() => {}, [msg, setMsg])

  return (
    <>
      <div className="flex items-center justify-center mb-10">
        <div className="max-w-md w-full">
          <div className="text-center text-2xl text-gray-700 pt-5 font-semibold">
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
              className="md:w-32 bg-orange-700 hover:bg-blue-dark text-white 
                      font-bold py-3 px-6 rounded-lg mt-3 hover:bg-orange-600 
                      transition ease-in-out duration-300"
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