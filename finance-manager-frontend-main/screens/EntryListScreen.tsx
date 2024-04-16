import { CommonActions, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Image } from 'react-native';
import { RootStackParamList } from './MainNavigation';
import { Picture } from '../components/picture';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { createEntry, fetchEntries } from '../store/entrySlice';
import { CreateEntryDTO } from '../entities/CreateEntryDTO';

type Props = NativeStackScreenProps<RootStackParamList, "EntryList">

const EntryListScreen = (props: Props) => {
    const [camera, setCamera] = useState(false);
    const [photoToDisplay, setPhotoToDisplay] = useState('')
    const entries = useSelector((state: RootState) => state.entries.entries)
    
    const dispatch = useDispatch<AppDispatch>()
    
    const handleSave = () => {
        // Since I do not have an entry form, I am hardcoding dummy values, to show how to save the photo.
        dispatch(createEntry(new CreateEntryDTO(120, new Date(), 'DKK', 'No', 'Not really', 'nope', photoToDisplay)))
    }
    useEffect(() => {
       dispatch(fetchEntries()) 
    }, [])

    return (
        <View style={{flex:1}}>
            <Text>Welcome to the EntryListScreen!</Text>
            <Button title="Go to Edit" onPress={() => props.navigation.navigate("EntryEdit", { entryId: 1 })} />

            {camera ? <Picture setCamera={setCamera} setPhotoToDisplay={setPhotoToDisplay}></Picture> : <>
          
          {/* Here I am just showing a photo from the first element to show how to use the photo */}
            <Image source={{uri: entries[0]?.photo}} style={{width: 400, height: 400}} />


            <Button title="Open camera" onPress={() => setCamera(true)}/>
            <Button title="Save" onPress={handleSave}/>
        </>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 200,
      height: 200,
      resizeMode: 'contain',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
    });

export default EntryListScreen;
