import { React, useState } from 'react';
import { StyleSheet, Text, View,FlatList } from 'react-native';
import { Featurebutton } from './page-component/feature-button';


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
