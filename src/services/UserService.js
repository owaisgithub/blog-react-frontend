import axios from "axios";
import config from "../config/config";


export class UserService {
    constructor() {
        this.url = config.authEndPoint;
    }

    userProfile(token) {
        const profile_url = this.url.concat('profile/');
        const headers = {
            'Authorization': `Bearer ${token}`
        }

        return axios.get(profile_url, { headers })
    }

    imageUpload(file, token) {
        const upload_url = this.url.concat('/upload/');
        const formData = new FormData()
        formData.append('image', file);
        const headers = {
            'Authorization' : `Bearer ${token}`,
            'Content-Type' : 'multipart/form-date',
        }
        return axios.post(upload_url, formData, { headers });
    }
}

export default new UserService();