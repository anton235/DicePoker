import React, { Component, useState  } from 'react';
import { StyleSheet, Text, TextInput, Button, View } from "react-native";
import GameTable from './GameTable';

export default function PlayersDataForm(props) {
    const [playersNames, setPlayersNames] = React.useState(2);
    const [playersNamesSubmitted, submitPlayersNames] = React.useState(false);

    let schoolSum = [...Array(3 * props.playersNumber)].fill(0,0,1).fill(9,1,2).fill(0,2);
    let colSum = [...Array(3 * props.playersNumber)].fill(0,0);

    let nameForm = [];

    props.playersNamesArray.forEach((player,index) => {
        nameForm.push(
            <View> 
                <Text>Player Name: </Text>
                <TextInput 
                    style={styles.inputStyle}
                    onChangeText={text => {
                        //let inputValues = props.playersNamesArray;
                        props.playersNamesArray[index] = text;
                        // this.setState({inputValues})
                    }}
                    maxLength = {10}
                />
            </View>
        )
    })

    return (
        <View style={styles.container}> 
        {/* <Text style={styles.title}>{props.playersNamesArray[0]}</Text> */}
        { playersNamesSubmitted ?
            <View style={styles.container}>
                <GameTable 
                    playersNumber = {props.playersNumber} 
                    playersNamesArray = {props.playersNamesArray}
                    schoolSum = {schoolSum}
                    colSum = {colSum}
                    />
            </View>
            : 
            <View style={styles.container}> 

                {nameForm}

                <View style={styles.buttonContainer}>  
                    <Button
                        onPress={() => {submitPlayersNames(!playersNamesSubmitted);}}
                        title="Submit"
                        color="#841584"
                    />
                </View>
            </View>
        }
        </View>
    );
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
  },
});


