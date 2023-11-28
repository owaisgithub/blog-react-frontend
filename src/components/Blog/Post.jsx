import React, { useState } from 'react'
import { Button } from '@material-tailwind/react'

import BlogService from '../../services/BlogService'
import useBlog from '../../context/blogContext'

const Post = ({ post }) => {
    const [content, setContent] = useState('')
    const token = localStorage.getItem('token')

    let {loader, changeLoader} = useBlog()

    const likePost = (id) => {
        BlogService.likedPost(id, token)
            .then(res => {
                console.log(res.data)
                changeLoader()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const postComment = (id) => {
        const data = {
            'content': content
        }
        BlogService.postComment(id, token, data)
            .then(res => {
                console.log(res.data)
                changeLoader()
                setContent('')
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className="mx-auto w-full max-w-7xl" key={post.id}>
            <aside className="relative overflow-hidden text-black rounded-lg sm:mx-16 mx-2 sm:py-10">
                <div className="relative z-10 max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
                    <h1 className='text-3xl'>{post.title}</h1>
                    <p>{post.content}</p>
                    <div className="max-w-xl sm:mt-1 mt-80 space-y-8 text-center sm:text-right sm:ml-auto">
                        <p className="text-gray-500 text-sm mr-2">{post.updated_at} {post.post_user}</p>
                    </div>
                    <div className='flex items-center'>
                        <p>Likes: {post.like_count}</p>
                        {post.like ? (
                            <Button size='sm' className='bg-blue-500 ml-4'
                                onClick={() => likePost(post.id)}>
                                Liked
                            </Button>
                        ) : (
                            <Button size='sm' className='ml-4' variant='outlined'
                                onClick={() => likePost(post.id)}
                            >
                                Like
                            </Button>
                        )}

                    </div>
                    <p>Comments: {post.comment_count}</p>
                    <form className="flex items-center" onSubmit={(e) => {
                        e.preventDefault()
                        postComment(post.id)
                        }}>
                        <label htmlFor="comment"
                            className="block text-gray-600 text-md mr-3 font-medium">
                            Comment
                        </label>
                        <input
                            type="text"
                            className="bg-gray-200 outline-none py-1 px-2
                          text-red-600 rounded-lg"
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                        />
                        <button
                            className="bg-blue-500 text-white py-1 px-2 
                          rounded-lg"

                        >Comment</button>
                    </form>
                    {post.comments.map((comment, idx) => {
                        return (
                            <>
                                <div className="flex items-center">
                                    <p className="text-gray-500 text-sm mr-2">{comment.comment_user} {comment.created_at}</p>
                                    <p>{comment.content}</p>
                                </div>
                            </>
                        )
                    })}
                </div>
            </aside>
        </div>
    )
}

export default Post