import config from "../config/config";

export class AuthService {
    url;

    constructor() {
        this.url = config.authEndPoint;
    }

    async create(data) {
        const create_url = this.url.concat("create/");
        try {
            const response = await fetch(create_url, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
        
                body: JSON.stringify(data)
            });

            return await response.json();
        } catch (error) {
            throw error;
        }
    }

    async authenticate(data) {
        const auth_url = this.url.concat("authenticate/");
        try {
            const response = await fetch(auth_url, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
        
                body: JSON.stringify(data)
            });

            return await response.json();
        } catch (error) {
            throw error;
        }
    }

    async logout(token) {
        const logout_url = this.url.concat("logout/");

        try {
            const response = await fetch(logout_url, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body: null
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            throw error;
        }
    }
}

export default AuthService;