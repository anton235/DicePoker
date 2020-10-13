import React, { Component, useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View } from "react-native";
// import GameTable from './GameTable';
import PlayersDataForm from './PlayersDataForm';

export default function GameInitializer() {
  const [numberOfPlayers, setNumberOfPlayers] = React.useState(2);
  const [numberOfPlayersSubmitted, submitNumberOfPlayers] = React.useState(false);

  function createPlayersNamesArray(numberOfPlayers){
    let playersNamesArray = [...Array(parseInt(numberOfPlayers))].fill('nameMe',0);
    return playersNamesArray;
  }

  return (
    <View>
      { numberOfPlayersSubmitted ?
        <View>
          <PlayersDataForm playersNamesArray = {createPlayersNamesArray(numberOfPlayers)} numberOfPlayers = {numberOfPlayers}/>
          <View style={styles.container}>
            <Button
                  onPress={() => {
                    submitNumberOfPlayers(!numberOfPlayersSubmitted);
                    setNumberOfPlayers(2);
                  }}
                  title="Home Page"
                  color="#841584"
                />
          </View>
        </View>
        : 
        <View style={styles.container}> 
          <View>
            {/* <label>Enter Number of Players:  */}
              <TextInput 
                  style={styles.inputStyle}
                  onChangeText={text => setNumberOfPlayers(text)}
                  onSubmitEditing = {(event) => (submitNumberOfPlayers(!numberOfPlayersSubmitted))}
                  numberOfPlayers = {numberOfPlayers}
                  placeholder = "Number of Players"
                  placeholderTextColor = "#73377e"
                  maxLength = {1}
                />
            {/* </label> */}

            <View style={styles.buttonContainer}>  
              <Button
                onPress={() => {submitNumberOfPlayers(!numberOfPlayersSubmitted);}}
                title="Submit"
                color="#841584"
              />
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
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
  },
});
