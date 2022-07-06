import { React, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
// Requires Expo-compatible RNFS -> to be done last

export const FolderInput = ({ setShowModal }) =>{
  const [activeFolderName, setActiveFolderName] = useState(null);
  // useEffect(() => {
  //     setActiveFolderName(RNFS.DocumentDirectoryPath); // Run on first render to identify platform-specific directory name
  // }, [])

  const [files, setFiles] = useState([]);

  // const getFileContent = async (path) => {
  //   const reader = await RNFS.readDir(path);
  //   setFiles(reader);
  // };

  // useEffect(() => {
  //   getFileContent(activeFolderName); // Read content of current active directory
  // }, [activeFolderName]);

  return (
    <View style={styles.centeredView}>
      <Modal
//        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}


const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
});