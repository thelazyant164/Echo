import {React,useState} from 'react';
import { StyleSheet, Text, View,FlatList } from 'react-native';
import { Featurebutton } from './page-component/feature-button';


export const Homepage =()=>{

    const [data,setData]= useState(["home","devices"])
    return(
        <View>
            <View>
                <Text>Recently</Text>
                <View style={style.container}>
                <FlatList
                 data={data}
                  renderItem={
                ({item}) => 
                 <Featurebutton feature={item}></Featurebutton>
                }
                />
                </View>
            </View>
        </View>
    )
}


const style=StyleSheet.create({
    container: {
        backgroundColor:"#F8F5F5"
    }

});