import {React, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export const Featurebutton=(props)=>{
    const {feature}=props
    if( feature!=null)
    {
    return(
        <View>
            
            <MaterialCommunityIcons name={feature.toLowerCase()}/>
            <Text>{feature}</Text>
        </View>
    )
    }
    else {
        return(
            <View>
            </View>
        )

    }
}


const style = StyleSheet.create({

})