import config from "../config/config";

import axios from "axios";

export class AuthService {
    url;

    constructor() {
        this.url = config.authEndPoint;
    }

    async create(data) {
        const create_url = this.url.concat("create/");
        try {
            return axios.post(create_url, data);
        } catch (error) {
            throw error;
        }
    }

    async authenticate(data) {
        const auth_url = this.url.concat("authenticate/");
        return axios.post(auth_url, data);
    }

    async logout(token) {
        const logout_url = this.url.concat("logout/");
        const headers = {
            'Authorization' : `Bearer ${token}`,
        };

        try {
            return axios.get(logout_url, { headers });
        } catch (error) {
            throw error;
        }
    }
}


export default new AuthService();