/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from "react";
import type {PropsWithChildren} from 'react';
import { evaluate } from "mathjs";
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View
} from "react-native";
import mockedEquantations from './src/mock/equantations.json'

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import RowComponent from "./Row";


export const DEFAULT_ROWS_STATE = {
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null,
}

function countMatches(inputString, pattern) {
  const regex = new RegExp(pattern, 'g');
  const matches = inputString.match(regex);

  return matches ? matches.length : 0;
}


function RowInput({ value, color }) {
  return (
    <View style={{width: 50, height: 50, borderColor: 'gray', borderWidth: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: color}}>
      <Text>{value}</Text>
    </View>
  );
}

const initialRows = Array.from({ length: 6 }, () => Array(6).fill(null));
const initialColors = Array.from({ length: 6 }, () => Array(6).fill('white'));


function App(): React.JSX.Element {
  const [currentRowIndex, setCurrentRowIndex] = useState(0)
  const [currentColumnIndex, setCurrentColumnIndex] = useState(0)

  const [rows, setRows] = useState(initialRows);
  const [colors, setColors] = useState(initialColors);

  const equation = mockedEquantations['1'];

  const onSubmitRow = () => {
    const arr = rows[currentRowIndex]
    const enteredAmount = arr.filter(el => el !== null).length

    if (enteredAmount < 6){
      return Alert.alert("Error", 'Not enough numbers')
    }

    const userGuess = arr.join('');

    const validValue = evaluate(equation);
    const isValid = validValue === evaluate(userGuess)

    if (!isValid){
      return Alert.alert("Error", `Every guess must equal ${validValue}`)
    }

    const newColors = [...colors];



    arr.forEach((el, index) => {
      const hiddenChar = equation[index];

      if (el === hiddenChar) {
        newColors[currentRowIndex][index] =  'green';
      } else if (equation.includes(el)) {
        newColors[currentRowIndex][index] = 'orange';
      } else {
        newColors[currentRowIndex][index] = 'grey';
      }
    });

    setColors(newColors)

    if (newColors[currentRowIndex].every(el => el === 'green')){
      Alert.alert('Success', 'You win!');
      setCurrentRowIndex(0);
      setCurrentColumnIndex(0);
      setRows(initialRows)
      setColors(initialColors);
      return;
    }

    if (currentRowIndex < 5){
      setCurrentRowIndex(prevState => prevState + 1);
      setCurrentColumnIndex(0);
    }
  }

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  const onPressValue = (value) => {
    const newRows = [...rows];

    if (!newRows[currentRowIndex][currentColumnIndex]){
      newRows[currentRowIndex][currentColumnIndex] = value;

      setRows(newRows);

      if (currentColumnIndex < 5){
        setCurrentColumnIndex(prevState => prevState + 1);
      }
    }

  }

  const onPressAction = (type) => {
    const newRows = [...rows];

    if (type === 'Delete') {
      const shouldMoveToPreviousColumn = currentColumnIndex > 0 && !newRows[currentRowIndex][currentColumnIndex];

      if (shouldMoveToPreviousColumn) {
        setCurrentColumnIndex(prevState => prevState - 1);
      }

      newRows[currentRowIndex][currentColumnIndex - (shouldMoveToPreviousColumn ? 1 : 0)] = null;
      setRows(newRows);
    } else {
      onSubmitRow();
    }

  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <View
        style={{
          marginHorizontal: 'auto',
          gap: 20,
        width: '100%',
      }}>
        {rows.map((row, rowIndex) => {
          return (
            <View key={rowIndex} style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              {row.map((col, columnIndex) => (
                <RowInput
                  key={columnIndex}
                  value={col}
                  color={colors[rowIndex][columnIndex]}
                />
              ))}
            </View>
          )
        })}
      </View>

      <View style={{flexDirection: 'row',justifyContent: 'center', marginTop: 100}}>
        <Button title={'0'} onPress={() => onPressValue('0')} />
        <Button title={'1'} onPress={() => onPressValue('1')}/>
        <Button title={'2'} onPress={() => onPressValue('2')}/>
        <Button title={'3'} onPress={() => onPressValue('3')}/>
        <Button title={'4'} onPress={() => onPressValue('4')}/>
        <Button title={'5'} onPress={() => onPressValue('5')} />
        <Button title={'6'} onPress={() => onPressValue('6')}/>
        <Button title={'7'} onPress={() => onPressValue('7')}/>
        <Button title={'8'} onPress={() => onPressValue('8')}/>
        <Button title={'9'} onPress={() => onPressValue('9')}/>
      </View>
      <View style={{flexDirection: 'row',justifyContent: 'center'}}>
        <Button title={'Enter'} onPress={() => onPressAction('Enter')} />
        <Button title={'+'} onPress={() => onPressValue('+')}/>
        <Button title={'-'} onPress={() => onPressValue('-')}/>
        <Button title={'*'} onPress={() => onPressValue('*')}/>
        <Button title={'/'} onPress={() => onPressValue('/')}/>
        <Button title={'Delete'} onPress={() => onPressAction('Delete')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
