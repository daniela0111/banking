import React, { useState } from 'react';
import { View, TextInput, Button, Text, FlatList } from 'react-native';
import { useQuery, useMutation } from '@tanstack/react-query'
import { TodoQueries } from './todo.queries';
import { CreateTodoDTO, TodoEntity } from './todo.entity';
import { useGetTodos, usePostTodo } from './todo.hooks';

type ItemProps = {todo: TodoEntity};

const Item = ({todo}: ItemProps) => (
    <View>
      <Text>{todo.text} - {todo.done.toString()}</Text>
    </View>
  );

const TodoScreen = () => {
    const [todoText, setTodoText] = useState('');
    const mutation = usePostTodo();
    const { isPending, isError, data, error } = useGetTodos()
    
      if (isPending) {
        return <Text>Loading...</Text>
      }
    
      if (isError) {
        return <Text>Error: {error.message}</Text>
      }
    

    const handleAddTodo = () => {
        // Add your logic here to handle adding the todo
        console.log('Adding todo:', todoText);
        setTodoText('');
        mutation.mutate(new CreateTodoDTO(todoText, false))
    };

    return (
        <View style={{flex: 1, justifyContent: 'center', marginTop: 60, marginLeft: 20}}> 

<TextInput
                placeholder="Enter todo"
                value={todoText}
                onChangeText={setTodoText}
            />
            <Button title="Add Todo" onPress={handleAddTodo} />

            
            <FlatList data={data}
            renderItem={({item}) => <Item todo={item} />}
            keyExtractor={item => item.id.toString()} />


            
        </View>
    );
};

export default TodoScreen;