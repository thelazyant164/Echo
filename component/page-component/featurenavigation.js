import React from 'react';
import { Homepage } from '../homepage';
import { RecordPage } from '../record';
import { VolumeAdjustPage } from '../volume-adjust';
import { NoisecancellingPage } from '../noisecancelling';
import { SpeedToTextPage } from '../speed-to-text';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const  Stack= createStackNavigator();
export default function FeatureNavigation() {
  const allfeature =["Noise cancelling", "Volume adjust","Speech to text","Noise reduction record"]
  return (
    <Stack.Navigator>
       <Stack.Screen 
      name="Home" 
      component={Homepage}  
      options={{headerShown: false}}      
      />
      {allfeature.map(feature =>{
        return (
          <Stack.Screen 
          name={feature} 
          component={()=>{
            if (feature === "Noise cancelling")
            {
            return (
              
              <NoisecancellingPage></NoisecancellingPage>
            )
            }
            else if (feature ==="Volume adjust")
            {
              return (
                <VolumeAdjustPage></VolumeAdjustPage>
              )
            }
            else if (feature === "Speech to text")
            {
              return (
                <SpeedToTextPage></SpeedToTextPage>
              )
            }
            else if (feature ==="Noise reduction record")
            {
              return (
                <RecordPage></RecordPage>
              )
            }
          }}
          />

        )
      })}
     
     
    </Stack.Navigator>

  );
}