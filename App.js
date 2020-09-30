import React, { Component, useState  } from 'react';
import { StyleSheet, Text, TextInput, Button, View } from "react-native";
import GameInitializer from './GameInitializer';

export default function App() {
  return (
  <View>
    <Text style={styles.title}>Dice Poker</Text>
    <GameInitializer/>
  </View>
  );
}

const styles = StyleSheet.create({
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
});


