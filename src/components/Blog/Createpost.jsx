import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BlogService from '../../services/BlogService'
import useBlog from '../../context/blogContext'

const Createpost = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const navigate = useNavigate()

    const {changeLoader} = useBlog()
    const token = localStorage.getItem('token')

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            'title': title,
            'content': content
        }
        BlogService.createBlog(data, token)
            .then(res => {
                console.log(res.data)
                changeLoader()
                navigate('/')
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <>
            <div className="flex items-center justify-center mb-10">
                <div className="max-w-md w-full">
                    <div className="text-center text-3xl text-gray-700 pt-5 font-semibold">
                        Create A Post
                    </div>
                    <form className="p-6 flex flex-col justify-center"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-col mt-2">
                            <label for="title" className="hidden">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="titlw"
                                className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border 
                            border-gray-400 text-gray-800 font-semibold 
                            focus:border-orange-500 focus:outline-none"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Title of a Post"
                            />
                        </div>

                        <div className="flex flex-col mt-2">
                            <label for="content" className="hidden">
                                Content
                            </label>
                            <textarea
                                id="content"
                                name="content"
                                placeholder="Content of Post"
                                className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border 
                            border-gray-400 text-gray-800 font-semibold 
                            focus:border-orange-500 focus:outline-none"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={10}
                            />
                        </div>

                        <button
                            type="submit"
                            className="md:w-32 bg-orange-700 hover:bg-blue-dark text-white 
                          font-bold py-3 px-6 rounded-lg mt-3 hover:bg-orange-600 
                          transition ease-in-out duration-300"
                        >
                            Post
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Createpost