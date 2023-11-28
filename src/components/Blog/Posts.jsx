import React, { useEffect, useState } from 'react'
import BlogService from '../../services/BlogService'
import Post from './Post'
import { BlogProvider } from '../../context/blogContext'

const Posts = () => {
    const [posts, setPosts] = useState([])
    const token = localStorage.getItem('token')
    const [liked, setLiked] = useState(false)
    const [loader, setLoader] = useState(false)

    const changeLoader = () => {
        setLoader(!loader)
    }

    useEffect(() => {
        BlogService.getPosts(token)
            .then(res => {
                // console.log(res.data)
                setPosts(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [liked, setLiked, loader, setLoader])

    return (
        <>
            {posts.map((post, index) => {
                return (
                    <BlogProvider value={{loader, changeLoader}}>
                        <Post key={post.id} post={post} />
                    </BlogProvider>
                )
            })}
        </>
    );
}

export default Posts