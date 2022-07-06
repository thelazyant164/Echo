import {React,useState} from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';


export const Filebutton = (props) =>{

    const {type,name} = props;
    return(
        <View>
            <Text>{name}</Text>
            <Image></Image>
        </View>
    );

}

const style = StyleSheet.create({

});