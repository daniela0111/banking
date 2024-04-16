import React from 'react';
import { View, Text, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './../screens/HomeScreen';
import EntryListScreen from './../screens/EntryListScreen';
import EntryEditScreen from './../screens/EntryEditScreen';
import EntryDeleteScreen from './../screens/EntryDeleteScreen';
import { Categories } from './Categories';
import SignupScreen from './SignupScreen';
import LoginScreen from './LoginScreen';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { logout } from '../store/userSlice';
import { Picture } from '../components/picture';
import TodoScreen from '../todoQueries/TodoScreen';

export type RootStackParamList = {
    EntryList: undefined;
    EntryEdit: { entryId: number };
    EntryDelete: { entryId: number };
    AuthSignup: undefined;
    AuthLogin: undefined;
  };
  
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const EntryStackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="EntryList" component={EntryListScreen} />
        <Stack.Screen name="EntryEdit" component={EntryEditScreen} />
        <Stack.Screen name="EntryDelete" component={EntryDeleteScreen} />
      </Stack.Navigator>
  )
}


const MainNavigation = () => {
  const dispatch = useDispatch<AppDispatch>();
    const isSignedIn = useSelector((state: RootState) => state.users.token);

    return (
        <NavigationContainer>
        { isSignedIn ? (
            <>
                <Tab.Navigator screenOptions={({ navigation }) => ({
                    headerRight: () => (
                      <Button title="Logout" onPress={() => dispatch(logout())} />
                    )})}>
                    <Tab.Screen name="Home" component={EntryStackNavigator} />
                    <Tab.Screen name="Settings" component={Categories} />
                </Tab.Navigator>
            </>
          ) : (
            <>
            <TodoScreen />
              {/* <Stack.Navigator>
                    <Stack.Screen name="AuthSignup" component={SignupScreen} />
                    <Stack.Screen name="AuthLogin" component={LoginScreen} />
                </Stack.Navigator> */}
            </>
          )
        }
      </NavigationContainer>
    );
};
export default MainNavigation;