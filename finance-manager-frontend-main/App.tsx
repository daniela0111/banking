
import { StyleSheet, Text, View } from 'react-native';
import { store } from './store/store'
import { Provider } from 'react-redux'
import MainNavigation from './screens/MainNavigation';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import TodoScreen from './todoQueries/TodoScreen';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import {Camera} from 'expo-camera';
import {shareAsync} from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library'

// Create a client
const queryClient = new QueryClient()

export default function App() {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useEffect();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();

  useEffect(() => {
    (async () => {
      const  cameraStatus = await Camera.requestPermissionsAsync();
      const mediaLibStatus = await MediaLibrary.getAuthorizationStatusAsync();
  return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MainNavigation />  
      </QueryClientProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
