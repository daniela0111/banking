import axios from "axios"
import { SuperQueries } from "../api/SuperQueries"

export class TodoQueries extends SuperQueries {
    
    static fetchTodoList = async () => {
        const url = this.baseUrl + "todos"
        console.log(url);
        
        const response: any = await axios.get(this.baseUrl + "todos")
        // console.log(response);
        
        return response.data;
    }
}