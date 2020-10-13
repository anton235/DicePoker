import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper,Col, Cols, Cell } from 'react-native-table-component';
import CellElement from './CellElement';
 
export default class GameTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepNumber : 0,
    }
  }

  setCellElement(col, row){
    if (row == 0)
      return <Text style={styles.text}>{(this.props.playersNamesArray[this.playerNumber(col)]).toUpperCase()}</Text>
    else if (row == 7)
      return <Text style={styles.text}>{this.props.schoolSum(col)}</Text>
    else if (row == 17)
      return <Text style={styles.text}>{this.props.colSum(col)}</Text>
    else
      return <CellElement 
                key = {'' + col + row}
                col = {col} 
                row = {row} 
                schoolSum = {this.props.schoolSum}
                colSum = {this.props.colSum}
                setPointsTable = {this.props.setPointsTable}
                pointsTable = {this.props.pointsTable}
                belongToPlayer = {this.playerNumber(col)}
                stepNumber = {this.props.stepNumber}
                setStepNumber = {this.props.setStepNumber}
                numberOfPlayers = {this.props.numberOfPlayers}
                
                canEdit = {this.checkEditable(col,row)}
              />
  }

  checkEditable(col,row){
    if(this.playerNumber(col) == (this.props.stepNumber % parseInt(this.props.numberOfPlayers))){
      if( this.checkFirstCols(col,row) == true || 
        this.checkSecondCols(col,row) == true || 
        ((this.playerNumber(col) + parseInt(this.props.numberOfPlayers) * 2) == col)
        ){
          return true;
      }
    }
    return false;
  }

  checkFirstCols(col,row){
    let pointsTable = this.props.pointsTable;
    if(this.playerNumber(col) == col){
      if(row == 1 && pointsTable[col][row - 1] == undefined && pointsTable[col][row] == undefined)
        return true;
      else if(((row > 1 && row < 7) || (row > 8 && row <= 16)) && pointsTable[col][row - 2] != undefined && pointsTable[col][row - 1] == undefined)
        return true;
      else if(row == 8 && pointsTable[col][row - 3] != undefined && pointsTable[col][row - 1] == undefined)
        return true;
      // else if(row == 16 && pointsTable[col][row - 1] == undefined && pointsTable[col][row - 2] != undefined)
      //   return true;
    }
    return false;
  }

  checkSecondCols(col,row){
    let pointsTable = this.props.pointsTable;
    if((this.playerNumber(col) + parseInt(this.props.numberOfPlayers)) == col){
      if(row == 16 && pointsTable[col][row - 1] == undefined)
        return true;
      else if(((row => 1 && row < 6) || (row > 7 && row < 16)) && pointsTable[col][row - 1] == undefined && pointsTable[col][row] != undefined)
        return true;
      else if(row == 6 && pointsTable[col][row - 1] == undefined && pointsTable[col][row + 1] != undefined)
        return true;
      // else if(row == 1 && pointsTable[col][row - 1] == undefined && pointsTable[col][row] != undefined)
      //   return true;
    }
    return false;
  }

  playerNumber(col){
    let numberOfPlayers = parseInt(this.props.numberOfPlayers);
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

  render() {
    const state = this.state;
    //create 3 columns for each player and fill them with 18 rows, first row player name, next challenges
    let tableData = [...Array(3 * this.props.numberOfPlayers)]
                    .map((x ,col)=> Array.from({length : 18}, (y,row) => this.setCellElement(col, row)));

    // let tableTitle = ['1','2','3','4','5','6','SchoolSum','Pair','Two-Pair','Three of a kind','Full-House',
    //                   'Small Straight','Big Straight','Four of a kind','Five of a kind','Card Sum','ColSum'] ;

    let tableTitle = ['1','2','3','4','5','6','SchoolSum','п','2п','тр','ф',
                      'MC','BC','K','P','Σ','ColSum'] ;
    return (
      <View>
        <Table style={{flexDirection: 'row'}} borderStyle={{borderWidth: 1}}>
          {/* Left Wrapper */}
          <TableWrapper style={{width: 90}}>
            <Cell data="Challenge" style={styles.singleHead}/>
            <TableWrapper style={{flexDirection: 'row'}}>
              <Col data={tableTitle} style={styles.title} heightArr={[30, 30, 30, 30, 30, 30, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35]} textStyle={styles.titleText}></Col>
            </TableWrapper>
          </TableWrapper>
          {/* Right Wrapper */}
          <TableWrapper style={{flex:1}}>
            <Cols data={tableData} heightArr={[40, 30, 30, 30, 30, 30, 30, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35]} textStyle={styles.text} numberOfPlayers={this.props.numberOfPlayers}/>
          </TableWrapper>
        </Table>
      </View>
    )
  }
}
 
const styles = StyleSheet.create({
  inputStyle: {textAlign: "center"},
  singleHead: { width: 90, height: 40, backgroundColor: '#62a34e'},
  head: { flex: 1, backgroundColor: '#62a34e' },
  title: { flex: 2, backgroundColor: '#f6f8fa' },
  titleText: { marginRight: 6, textAlign:'right' },
  text: { textAlign: 'center' },
  btn: { width: 58, height: 18, marginLeft: 15, backgroundColor: '#c8e1ff', borderRadius: 2 },
  btnText: { textAlign: 'center' }
});
