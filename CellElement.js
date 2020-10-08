import React, { Component, useState} from 'react';
import { ImagePropTypes, StyleSheet, TextInput, View } from "react-native";

export default function CellElement(props) {
  const setPointsTable = props.setPointsTable;
  const [cellPoints, setCellPoints] = React.useState();
  const [isFocussed , setIsFocussed ] = React.useState(false);

  const updateValue = (points) =>{
    // Get a copy of the expenses array
    const pointsTable = [ ...props.pointsTable ];
    // Replace the current expense item
    pointsTable[props.col][props.row - 1] = points;
    pointsTable[props.col][6] = props.schoolSum(props.col);
    pointsTable[props.col][16] = props.colSum(props.col);

    // Update the parent state
    setPointsTable(pointsTable);
    // Update cell value
    setCellPoints(points);
  }

  const updateStepNumber = (e) =>{
    console.log('im in cell blur');
    // Update step number on cell losing focus
    if(!isNaN(props.pointsTable[props.col][props.row - 1]) || props.pointsTable[props.col][props.row - 1] == '-'){

    // if(cellPoints){
      props.setStepNumber(props.stepNumber + 1);
      // setIsFocussed(false)
    }
  }

  const focus = (e) => { 
    setIsFocussed(true)
  }

  function playerNumber(col){
    let numberOfPlayers = parseInt(props.numberOfPlayers);
    if((col % numberOfPlayers) == 0){
      return 0;
    }
    else if (numberOfPlayers == 3){
      if(((col + 1) % numberOfPlayers) == 0 )
        return 2;
      else
        return 1;
    }
    else
      return 1;
  }

  function checkEditable(col,row){
    if(playerNumber(col) == (props.stepNumber % parseInt(props.numberOfPlayers))){
      if( checkFirstCols(col,row) == true || checkSecondCols(col,row) == true || ((playerNumber(col) + parseInt(props.numberOfPlayers) * 2) == col))
        return true;
    }
    return false;
  }

  function checkFirstCols(col,row){
    let pointsTable = props.pointsTable;
    if(playerNumber(col) == col){
      if(row == 1 && (pointsTable[col][row - 1] == undefined || isFocussed))
        return true;
      else if(((row > 1 && row < 7) || (row > 8 && row <= 16)) && pointsTable[col][row - 2] != undefined && (pointsTable[col][row - 1] == undefined || isFocussed))
        return true;
      else if(row == 8 && pointsTable[col][5] != undefined && (pointsTable[col][7] == undefined || isFocussed))
        return true;
    }
    return false;
  }

  function checkSecondCols(col,row){
    let pointsTable = props.pointsTable;
    if((playerNumber(col) + parseInt(props.numberOfPlayers)) == col){
      if(row == 16 && (pointsTable[col][row - 1] == undefined ||  isFocussed))
        return true;
      else if(((row => 1 && row < 6) || (row > 7 && row < 16)) && pointsTable[col][row] != undefined && (pointsTable[col][row - 1] == undefined || isFocussed))
        return true;
      else if(row == 6 && pointsTable[col][7] != undefined && (pointsTable[col][5] == undefined || isFocussed))
        return true;
    }
    return false;
  }

  return(      
    <View>
      <TextInput 
        style={{textAlign: "center" , backgroundColor : props.canEdit == true ? '#e1ffe3': '#f6f8fa'}}
        // keyboardType={'numeric'}
        keyboardType = {'phone-pad'}
        // value = {cellPoints}
        value = {props.pointsTable[props.col][props.row - 1]}
        editable = {checkEditable(props.col, props.row)}
        onChangeText = {text => updateValue(text)}
        onBlur= {updateStepNumber}
        onFocus = {focus}
        // editable = {isFocussed == true || props.canEdit ? true : false}
        maxLength = {3}
      /> 
    </View>
  );
}
