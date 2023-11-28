import config from "../config/config";

import axios from "axios";

export class AuthService {

    constructor() {
        this.url = config.authEndPoint;
    }

    create(data) {
        const create_url = this.url.concat("create/");
        return axios.post(create_url, data);
    }

    authenticate(data) {
        const auth_url = this.url.concat("authenticate/");
        return axios.post(auth_url, data);
    }

    logout(token) {
        const logout_url = this.url.concat("logout/");
        const headers = {
            'Authorization' : `Bearer ${token}`,
        };
        return axios.get(logout_url, { headers });
    }
}


export default new AuthService();