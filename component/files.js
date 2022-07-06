import { React,useState,useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Featurebutton } from './page-component/feature-button';
import { FolderInput } from './page-component/newfolder-input';



export const Files = ({ navigation }) => {
    
    const [data, setData] = useState("");
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
    // setData(RNFS.DocumentDirectoryPath)
    })

    return(
        <View >
            {showModal && <FolderInput setShowModal={ setShowModal }></FolderInput>}
            <TouchableOpacity style={style.addbutton} onPress={() => {setShowModal(true)}}>
                <Text style={{fontSize:30,textAlign:"center",marginTop:2}}>+</Text>
            </TouchableOpacity>
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
                        data={data}
                        renderItem={({item, key}) =>
                            <Featurebutton feature={item} navigation={navigation}></Featurebutton>
                        }
                    >
                    </FlatList>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
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
    addbutton:{
        backgroundColor:"#D9D5D5",
        width:50,
        height:50,
        borderRadius:30,
        position:"absolute",
        marginTop:700,
        marginLeft:350
    }
})