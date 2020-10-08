import React, { Component, useState  } from 'react';
import { StyleSheet, Text, TextInput, Button, View } from "react-native";
import GameTable from './GameTable';

export default function PlayersDataForm(props) {
    const [playersNamesSubmitted, submitPlayersNames] = React.useState(false);
    const [stepNumber, setStepNumber] = React.useState(0);

    function schoolSum(col){
        let sum = 0;
        for(let i = 0; i < 6; i++){
            if(!(isNaN(pointsTable[col][i])))
                sum += parseInt(pointsTable[col][i]);
            else if(isNaN(pointsTable[col][i]))
                sum += 0;
        }
        if(sum < 0)
            sum -= 100;
        else 
            sum += 50;
        return sum;
    }

    function colSum(col){
        let sum = this.schoolSum(col);
        for(let i = 7; i < 16; i++){
            if(!(isNaN(pointsTable[col][i])))
                sum += parseInt(pointsTable[col][i]);
            else if(isNaN(pointsTable[col][i]))
                sum += 0;
        }
        return sum;
    }

    const [pointsTable, setPointsTable] = React.useState([...Array(3 * props.numberOfPlayers)]
        .map((x,index)=>Array (17)
        .fill()
        // .fill(0,0,6)
        // .fill(`school ${index} sum`,6,7)
        // .fill(schoolSum(index),6,7)
        // .fill(0,7,16)
        // .fill(`col ${index} sum`,16)
        // .fill(colSum(index),16)
        ));

    let nameForm = [];

    props.playersNamesArray.forEach((player,index) => {
        nameForm.push(
            <View key={index}>  
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
        <View> 
        { playersNamesSubmitted ?
            <View>
                <GameTable 
                    numberOfPlayers = {props.numberOfPlayers} 
                    playersNamesArray = {props.playersNamesArray}
                    schoolSum = {schoolSum}
                    colSum = {colSum}
                    pointsTable = {pointsTable}
                    setPointsTable = {setPointsTable}
                    stepNumber ={stepNumber}
                    setStepNumber ={setStepNumber}
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


