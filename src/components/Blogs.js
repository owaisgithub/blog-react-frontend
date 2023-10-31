import axios from "axios"
import { useEffect, useState } from "react"

import { getDate } from "../utils/utils"

function Blogs() {
  const [blogs, setBlogs] = useState([])

  const [data, setData] = useState({
    post : '',
    content : ''
  })

  useEffect(() => {

      const apiUrl = "http://localhost:8000/api/blog/all-posts/"

      axios.get(apiUrl)
      .then(response => {
          setBlogs(response.data)
          // console.log(response.data)
          // console.log(blogs)
      })
      .catch(error => {
          console.log(error)
      })
  }, [])

  const changeInput = (e) => {
    const { name, value } = e.target
    setData({...data, [name]: value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log(data)
    
    const apiUrl = 'http://localhost:8000/api/blog/comment/'

    axios.post(apiUrl, data, {
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
  }

  return (
      <>
      {blogs.map((blog, index) => {
          return (
              <div className="bg-white p-3 my-2 mx-20 rounded-xl">
                  <div className="relative">
                    <h1 className="text-3xl font-bold text-gray-700">{blog.title}</h1>
                    <p className="text-sm text-gray-400 float-right">{blog.blog_user}</p>
                  </div>
                  <p className="text-lg text-gray-600">{blog.content}</p>
                  <p className="text-xs">Write At: {getDate(blog.updated_at)}</p>
                  <form className="flex" onSubmit={handleSubmit}>
                      <input 
                          type="hidden" 
                          className="bg-gray-200 outline-none py-1 px-2
                          text-red-600 rounded-lg"
                          onChange={changeInput}
                          value={blog.id}
                      />
                      <label htmlFor="comment" 
                          className="block text-gray-600 text-md mr-3 font-medium">
                              Comment
                      </label>
                      <input 
                          type="text" 
                          className="bg-gray-200 outline-none py-1 px-2
                          text-red-600 rounded-lg"
                          onChange={changeInput}
                          value={data.content}
                      />
                      <button 
                          className="bg-blue-500 text-white py-1 px-2 
                          rounded-lg"

                          >Comment</button>
                  </form>

                  {blog.comments.map((comment, idx) => {
                      return (
                          <>
                          <div className="flex">
                            <p className="text-gray-500 text-sm mr-2">{comment.comment_user}</p>
                            <p>{comment.content}</p>
                          </div>
                          </>
                      )
                  })}
              </div>
          )
      })}
      </>
  )
}

export default Blogs