
import { StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native';
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
import { StatusBar } from 'expo-status-bar';

// Create a client
const queryClient = new QueryClient()

return (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <MainNavigation />  
  </QueryClientProvider>
</Provider>
);

export default function App() {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useEffect();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const  [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const  cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
      })();
    }, []);

    if (!hasCameraPermission === undefined) {
      return <Text>Requesting for camera permission</Text>; // Camera permission is not determined yet
      } else if (!hasCameraPermission) {
        return <Text>No access to camera. Please set your camera</Text>; // Camera permission is denied
    }

    let takePhoto = async () => {
      let options = {
        quality: 1,
        base64: true,
        exif:  false,
        };
    
        let newPhoto = await cameraRef.current.takePhotoAsync(options);
        setPhoto(newPhoto);
      };

      if (photo) {
        let sharePhoto = () => {

        };
        let savePhoto = () => {

        };
      }
    }

    return (
      <Camera style={styles.container} ref={cameraRef}>
        <View style={styles.buttonContainer}> 
          <Button title="Take Photo" onPress={takePhoto} />
        </View>
        <StatusBar style='auto'/>
      </Camera>
    );
    };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end',
});
