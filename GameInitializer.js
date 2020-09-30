import React, { Component, useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View } from "react-native";
// import GameTable from './GameTable';
import PlayersDataForm from './PlayersDataForm';

export default function GameInitializer() {
  const [playersNumber, setPlayersNumber] = React.useState(2);
  const [playersNumberSubmitted, submitPlayersNumber] = React.useState(false);

  function createPlayersNamesArray(playersNumber){
    let playersNamesArray = [...Array(parseInt(playersNumber))].fill('nameMe',0);
    return playersNamesArray;
  }

  return (
    <View>
      { playersNumberSubmitted ?
        <View style={styles.container}>
          <PlayersDataForm playersNamesArray = {createPlayersNamesArray(playersNumber)} playersNumber = {playersNumber}/>
        </View>
        : 
        <View style={styles.container}> 
          <View>
            <TextInput 
                style={styles.inputStyle}
                onChangeText={text => setPlayersNumber(text)}
                onSubmitEditing = {(event) => (submitPlayersNumber(!playersNumberSubmitted))}
                playersNumber = {playersNumber}
                placeholder = "Number of Players"
                maxLength = {2}
              />

            <View style={styles.buttonContainer}>  
              <Button
                onPress={() => {submitPlayersNumber(!playersNumberSubmitted);}}
                title="Submit"
                color="#841584"
              />
            </View>
            
            <View>
              <Text>Number of Players is: {playersNumber}</Text>
              <Text>Was Number of Players submitted: {playersNumberSubmitted.toString()}</Text>
            </View>
          </View>
        </View>
      }
    </View>
  )
}
 
const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 35,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  },
  buttonContainer: {
    marginTop: 10,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  inputStyle: {
    marginTop: 10,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#b9e4c9',
    textAlign: "center",
  },
  // gameGrid:{
  //   marginTop: 30,
  // }
});
