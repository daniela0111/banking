import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, AppState, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login, setToken } from '../store/userSlice';
import { AppDispatch, RootState } from '../store/store';
import * as SecureStore from 'expo-secure-store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './MainNavigation';
// import * as SecureStore from 'expo-secure-store';

type Props = NativeStackScreenProps<RootStackParamList>

const LoginScreen = (props: Props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    const token = useSelector((state: RootState) => state.users.token);

    const handleLogin = () => {
        dispatch(login({username: username, password: password}))
    };

    useEffect(() => {
        async function readFromSecureStore() {
            const token = await SecureStore.getItemAsync('token');
            token && dispatch(setToken(token))
        }
        readFromSecureStore();
    }, [])



    return (
        <View>
            <Text>{token}</Text>
            <TextInput
                placeholder="Username"
                value={username}
                autoCapitalize="none"
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Login" onPress={handleLogin} />
            <Button title="Go to Signup" onPress={() => props.navigation.navigate("AuthSignup")} />
        </View>
    );
};

export default LoginScreen;
