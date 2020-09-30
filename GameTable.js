import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper,Col, Cols, Cell } from 'react-native-table-component';
import CellElement from './CellElement';
 
export default class GameTable extends Component {
  constructor(props) {
    super(props);

    // const CellElement = () => {
    //   const [value, setPoints] = React.useState();
    //   return(      
    //     <View>
    //       <TextInput 
    //         style={styles.inputStyle}
    //         // instead of setState it will call function that calculate colSum (sumTable)
    //         onChangeText={value => setPoints({value})} 
    //         value = {value}
    //       /> 
    //     </View>
    //   );
    // }

    const sumElement = () => (
      <View>
        <Text style={styles.inputStyle}>
          {this.sumTable()}
        </Text> 
      </View>
    );

    const schoolSumCalc = (schoolSum,index) => {
      console.log("index typeof is: ",typeof(index));
      console.log("schoolSum is: ",this.schoolSum);
      return this.state.schoolSum[index];
    }

    this.state = {
      tableTitle: ['1','2','3','4','5','6','SchoolSum',
      'Pair','Two-Pair','Three of a kind','Full-House','Small Straight','Big Straight',
      'Four of a kind','Five of a kind','Card Sum','ColSum']  ,
      // schoolSum: [...Array(3 * this.props.playersNumber)].fill(0,0,1).fill(9,1,2).fill(0,2),
      // colSum: [...Array(3 * this.props.playersNumber)].fill(0,0),

      //create 3 columns for each player and fill them with 18 rows, first row player name, next challenges
      // tableData: [...Array(3 * this.props.playersNumber)].map(x=>Array (18).fill('a',0,1).fill(cellElement(),1,17).fill(this.colSum().toString(),17)) ,

      tableData: [...Array(3 * this.props.playersNumber)].map((x ,index)=>
        Array (18).fill((index + 0) % this.props.playersNumber ? 
        ((index + 1) % this.props.playersNumber ? 'c' : 'b') : 'a',0,1)
        .fill(<CellElement colSum = {this.props.colSum[index]}/>,1,7) 
        .fill(50,7,8)
        .fill(<CellElement/>,8,17)
        .fill(this.colSum().toString(),17)) ,
    }
  }



  colSum(){
    let arr = this.tableData;
    console.log("tableData is: ",arr);
    // let sum = 0;
    // for(let i = 1; i < 15;i++){
    //   if(typeof(arr[0][i]) == "string")
    //     sum += parseInt(arr[0][i],10)
    //   else
    //     sum += arr[0][i]
    // }
    // return sum
    return 23
  }

  sumTable(){
    return this.state.tableData[0][17]
    // return this.props.playersNumber
  }
 
  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        {/* <Text style={styles.btnText}>{this.props.playersNumber}</Text> */}
        <Text style={styles.btnText}>{this.sumTable()}</Text>
        <Table style={{flexDirection: 'row'}} borderStyle={{borderWidth: 1}}>
          {/* Right Wrapper */}
          <TableWrapper style={{flex:1}}>
            <Cols data={state.tableData} heightArr={[40, 30, 30, 30, 30, 30, 30, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35]} textStyle={styles.text}/>
          </TableWrapper>
          {/* Left Wrapper */}
          <TableWrapper style={{width: 90}}>
            <Cell data="Challenge" style={styles.singleHead}/>
            <TableWrapper style={{flexDirection: 'row'}}>
              <Col data={state.tableTitle} style={styles.title} heightArr={[30, 30, 30, 30, 30, 30, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35]} textStyle={styles.titleText}></Col>
            </TableWrapper>
          </TableWrapper>
        </Table>
      </View>
    )
  }
}
 
const styles = StyleSheet.create({
  container: { padding: 10, paddingTop: 60, backgroundColor: '#fff' },
  inputStyle: {textAlign: "center"},
  singleHead: { width: 90, height: 40, backgroundColor: '#62a34e'},
  head: { flex: 1, backgroundColor: '#62a34e' },
  title: { flex: 2, backgroundColor: '#f6f8fa' },
  titleText: { marginRight: 6, textAlign:'right' },
  text: { textAlign: 'center' },
  btn: { width: 58, height: 18, marginLeft: 15, backgroundColor: '#c8e1ff', borderRadius: 2 },
  btnText: { textAlign: 'center' }
});
