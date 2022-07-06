import {React, useState,useEffect} from 'react';
import { StyleSheet, Text, View,FlatList,TouchableOpacity} from 'react-native';
import { FileUploadForm } from './page-component/file-upload-form';

export const SpeedToTextPage = ({navigation}) =>{
return (
    <View>
        <Text>Speed to text works !!!</Text>
        <FileUploadForm></FileUploadForm>
    </View>
)
};
