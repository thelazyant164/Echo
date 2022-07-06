import { React, useState } from 'react';
import { StyleSheet, Text, View,FlatList } from 'react-native';
import { Featurebutton } from './page-component/feature-button';
<<<<<<< HEAD
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Header } from './page-component/header';
const Stack = createNativeStackNavigator();
export const Homepage =({navigation})=>{

    const [data,setData]= useState(["Home","Files storage"])
    const allfeature =["Noise cancelling", "Volume adjust","Speech to text","Noise reduction record"];
    return(
        <View>
        <Header></Header>
        <View style={{marginTop:60 }}>
            
                <Text style={{textAlign: "center",fontSize:20}}>Home</Text>
                <View style={style.feature_container}>
                <Text>Recently</Text>
                <View style={style.container}>
                <FlatList
                    numColumns={4}
                    
                    data={data}
                    renderItem={
                    ({item,key}) => 
                    {
                    return(
                        <Featurebutton feature={item} navigation={navigation}></Featurebutton>
                    )
                    }
                }
               
                />
                </View>
            </View>

            <View style={style.feature_container}>
                <Text>Feature</Text>
                <View style={style.container}>
                    <FlatList
                    numColumns={4}
                        data={allfeature}
                        renderItem={
                        ({item,key}) => 
                        {
                        return(
                            <Featurebutton feature={item} navigation={navigation}></Featurebutton>
                        )
                        }
                    }
                    >

                    </FlatList>

                </View>

            </View>
        </View>
        </View>
    )
=======


export const Homepage = ({navigation}) => {

	const [data, setData] = useState(["Home", "Files storage"])
	const allfeature = ["Noise cancelling", "Adjust volume", "Speech-to-text","Noise-reduced record","asdfs","eawfw"]
	return(
		<View >
			<View style={style.feature_container}>
				<Text>Recently</Text>
				<View style={style.container}>
				<FlatList
					numColumns={4}
					data={data}
					renderItem={({item, key}) => 
						<Featurebutton feature={item} navigation={navigation}></Featurebutton>
					}
				/>
				</View>
			</View>

			<View style={style.feature_container}>
				<Text>Feature</Text>
				<View style={style.container}>
					<FlatList
						numColumns={4}
						data={allfeature}
						renderItem={({item, key}) =>
							<Featurebutton feature={item} navigation={navigation}></Featurebutton>
						}
					/>
				</View>
			</View>
		</View>
	)
>>>>>>> aa829a1eace25df28073de501b7a68cf1f2432fb
}


const style=StyleSheet.create({
	feature_container:{
		marginTop:100,
		marginLeft:10,
		marginRight:10
		
	},
	container: {
		backgroundColor:"#F8F5F5",
		borderRadius:12,        
	},
	list:{
		flexDirection: "row",
		flexWrap: "wrap",
	},

});
