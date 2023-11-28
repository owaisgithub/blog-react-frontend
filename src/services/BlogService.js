import axios from "axios";
import config from "../config/config";


export class BlogService {

    constructor() {
        this.url = config.blogEndPoint;
    }

    getPosts(token) {
        const blogs_url = this.url.concat('all-posts/');
        const headers = {
            'Authorization' : `Bearer ${token}`,
        };
        return axios.get(blogs_url, { headers });
    }

    likedPost(id, token) {
        const like_url = this.url.concat(`like/${id}/`);
        const headers = {
            'Authorization' : `Bearer ${token}`,
        };
        return axios.post(like_url, {}, { headers })
    }

    postComment(id, token, data) {
        const like_url = this.url.concat(`comment/${id}/`);
        const headers = {
            'Authorization' : `Bearer ${token}`,
        };
        return axios.post(like_url, data, { headers })
    }

    // getBlog(id) {
    //     return this.http.get('/api/blogs/' + id);
    // }

    createBlog(data, token) {
        const post_url = this.url.concat('post/')
        const headers = {
            'Authorization' : `Bearer ${token}`,
        };
        return axios.post(post_url, data, { headers })
    }

    // updateBlog(id, blog) {
    //     return this.http.put('/api/blogs/' + id, blog);
    // }
}

export default new BlogService();