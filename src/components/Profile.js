import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Profile() {
    const [blogs, setBlogs] = useState([])
    // let blogs = []

    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }

        const apiUrl = "http://localhost:8000/api/blog/post/"

        axios.get(apiUrl, {
            headers : {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            setBlogs(response.data)
            // console.log(response.data)
            //console.log(blogs)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    
        return (
            <>
            {blogs.map((blog, index) => {
                return (
                    <div className="bg-white justify-center 
                    items-center p-3 my-2 mx-20 rounded-xl  ">
                        <h1 className="text-3xl font-bold text-gray-700">{blog.title}</h1>
                        <p className="text-lg text-gray-600">{blog.content}</p>
                        <div className="flex">
                            <label htmlFor="email" 
                                className="block text-gray-600 text-md mr-3 font-medium">
                                    Comment
                            </label>
                            <input 
                                type="text" 
                                className="bg-gray-200 outline-none py-1 px-2
                                text-red-600 rounded-lg" 
                            />
                            <button 
                                className="bg-blue-500 text-white py-1 px-2 
                                rounded-lg"

                                >Comment</button>
                        </div>

                        {blog.comments.map((comment, idx) => {
                            return (
                                <>
                                <p>{comment.user}</p>
                                <p>{comment.content}</p>
                                </>
                            )
                        })}
                    </div>
                )
            })}
            </>
        )
}

export default Profile