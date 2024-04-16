import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { RootStackParamList } from './MainNavigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { logout, setToken, signup } from '../store/userSlice';
import * as SecureStore from 'expo-secure-store';

type Props = NativeStackScreenProps<RootStackParamList>

const SignupScreen = (props: Props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    const handleSignup = () => {
        // Perform signup logic here
        dispatch(signup({username: username, password: password}))
        // console.log('Signing up with username:', username, 'and password:', password);
    };

    useEffect(() => {
        async function load() {
            const token = await SecureStore.getItemAsync('token');
            console.log("read token from SecureStore", token);

            dispatch(setToken(token || ''))
        }
        load()
    }, [])

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />


<View style={styles.button}>
            <Button title="Sign Up" onPress={handleSignup} />
            </View>
            <Text style={styles.loginText} onPress={() => props.navigation.navigate("AuthLogin")}>Go to Login</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
    },
    button: {
        marginTop: 10,
        padding: 10,
        width: '100%',
        // backgroundColor: 'blue',
    },
    loginText: {
        marginTop: 20,
        color: 'blue',
        fontSize: 16,
    },
});

export default SignupScreen;