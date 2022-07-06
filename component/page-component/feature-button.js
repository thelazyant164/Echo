import {React} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const Featurebutton=(props)=>
{
    const {feature,navigation} = props;
    if( feature!=null)
    {
    return(
        <TouchableOpacity onPress={() => navigation.navigate(feature)} style={style.button }>
            <View style={style.content}>
            <MaterialCommunityIcons name={
                ()=>{
                    if(feature.toLowerCase()=="Noise cancelling"){
                        return ""

                    }
                    else{
                        return ""
                    }
                }
                }

                size={20}/>
            <Text>{feature}</Text>
            </View>
        </TouchableOpacity>
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
    button:{
        width:90,
        height:90,
        backgroundColor:"#D9D9D9",
        marginBottom:"10px",
        marginTop:"10px",
        marginRight:4,
        marginLeft:4,
        borderRadius:12
    },
    content:{
        margin:"3px",
        textAlign:"center",
        justifyContent:"center"
    }

})

