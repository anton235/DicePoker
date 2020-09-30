import React, { Component, useState  } from 'react';
import { StyleSheet, TextInput, View } from "react-native";

export default function CellElement(props) {
    const [points, setPoints] = React.useState();
    return(      
      <View>
        <TextInput 
          style={styles.inputStyle}
          // instead of setState it will call function that calculate colSum (sumTable)
          // onChangeText={value => setPoints(value)} 
          // value = {points}

          onChangeText={text => {
            props.colSum += parseInt(text);
          }}
        /> 
      </View>
    );
  }

  const styles = StyleSheet.create({
    inputStyle: {textAlign: "center" , backgroundColor: '#e1ffe3'},
  });