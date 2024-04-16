import axios from 'axios';
import { SuperQueries } from './SuperQueries';

export class UserQueries extends SuperQueries {
    static baseUrl = super.baseUrl + '/auth/'

    static async login(username: string, password: string) {
        const response = await axios.post(this.baseUrl + "login", { username, password } )
        return response.data;
    }
    static async signup(username: string, password: string) {
        const response = await axios.post(this.baseUrl + "signup", { username, password } )
        // console.log("userQueries", response.data);
        
        return response.data;
    }
    static async logout() {
        console.log("Not implemented yet")
    }
}