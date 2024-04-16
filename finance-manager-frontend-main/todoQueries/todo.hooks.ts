import axios from "axios"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateTodoDTO, TodoEntity } from "./todo.entity";

const url = 'http://localhost:3000/todos';

export const useGetTodos = () => {
    return useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            const response = await axios.get<TodoEntity[]>(url)
            console.log("Got data");
            
            return response.data;
        },
      })
}

export const usePostTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newTodo: CreateTodoDTO) => {
            return axios.post(url, newTodo)
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos']    })
    })
}