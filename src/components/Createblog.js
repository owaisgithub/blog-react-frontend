import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Createblog() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
  }, [])

  const [blog, setBlog] = useState({
    title : '',
    content : ''
  })

  const changeInput = (e) => {
    const { name, value } = e.target

    setBlog({...blog, [name]: value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    const apiUrl = "http://localhost:8000/api/blog/post/"
    axios.post(apiUrl, blog, {
      headers : {
        'Authorization' : `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      console.log("Response Data: ", response.data)
    })
    .catch(error => {
      console.log("Error: ", error)
    })
    console.log(blog)
  }


  return (
    <>
    <div className="min-h-screen flex items-center justify-center">
    <div className="max-w-md w-full">
      <div className="bg-white p-1 rounded-lg">
        <p className="flex justify-center pt-3 text-xl font-bold text-gray-700">Create Blog</p>
        <form className="bg-gray-800 mx-10 my-8 p-10" onSubmit={handleSubmit}>
          <div className="mb-4">
              <label htmlFor="title" 
                  className="block text-gray-400 text-sm font-medium">
                      Title
              </label>
              <input 
                  type="text" 
                  id="title" 
                  name="title" 
                  className='outline-none w-full py-1 px-3 rounded-lg'
                  value={blog.title}
                  onChange={changeInput}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="content" 
                  className="block text-gray-400 text-sm font-medium">
                      Content
              </label>
              <textarea
                  type="text"
                  cols="10"
                  rows="10"
                  id="content" 
                  name="content" 
                  className='outline-none w-full py-1 px-3 rounded-lg'
                  value={blog.content}
                  onChange={changeInput}
              />

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold 
                py-2 px-4 mt-2 rounded-full w-full"
              >
                Create
              </button>
            </div>
        </form>
      </div>
      </div>
      </div>
    </>
  );
}

export default Createblog;
