import {React,useState} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Image} from 'react-native';
import { Audio } from 'expo-av';
import { PermissionsAndroid } from "react-native";
import Feather from 'react-native-vector-icons/Feather';




export const RecordPage = ({navigation}) =>
{
    
   
    const [recording, setRecording] = useState(false);

    async function startRecording() {
        try {
          console.log('Requesting permissions..');
          await Audio.requestPermissionsAsync();
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          }); 
          console.log('Starting recording..');
          const { recording } = await Audio.Recording.createAsync(
             Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
          );
          setRecording(recording);
          console.log('Recording started');
        } catch (err) {
          console.error('Failed to start recording', err);
        }
      }
    
      async function stopRecording() {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI(); 
        console.log('Recording stopped and stored at', uri);
      }
   
    return (
        <View style={{alignItems:"center"}}>
            <Text style={{fontSize:20,textAlign:"center",marginTop:60}}>Noise reduction record</Text>
         
            <TouchableOpacity onPress={()=>{
                setRecording(!recording)
                recording ? stopRecording : startRecording
                }}>
            { recording?<Feather name="play" size={50} style={{marginTop:200}}></Feather>:<Feather name="pause" size={50} style={{marginTop:200}}></Feather>}
            </TouchableOpacity>
        </View>
    )
}