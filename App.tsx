/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {evaluate} from 'mathjs';
import {
  Alert,
  Button,
  SafeAreaView,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import mockedEquantations from './src/mock/equantations.json';

import {Colors} from 'react-native/Libraries/NewAppScreen';

export const DEFAULT_ROWS_STATE = {
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null,
};

function RowInput({value, color}) {
  return (
    <View
      style={{
        width: 50,
        height: 50,
        borderColor: 'gray',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color,
      }}>
      <Text>{value}</Text>
    </View>
  );
}

const initialRows = Array.from({length: 6}, () => Array(6).fill(null));
const initialColors = Array.from({length: 6}, () => Array(6).fill('white'));

function App(): React.JSX.Element {
  const [currentRowIndex, setCurrentRowIndex] = useState(0);
  const [currentColumnIndex, setCurrentColumnIndex] = useState(0);

  const [rows, setRows] = useState(initialRows);
  const [colors, setColors] = useState(initialColors);

  const equation = mockedEquantations['1'];

  const onSubmitRow = () => {
    const row = rows[currentRowIndex].filter(el => el !== null);

    if (row.length < 6) {
      return Alert.alert('Error', 'Not enough numbers');
    }

    const userGuess = row.join('');
    const validValue = evaluate(equation);
    const isValid = validValue === evaluate(userGuess);

    if (!isValid) {
      return Alert.alert('Error', `Every guess must equal ${validValue}`);
    }

    const newColors = colors.map(row => [...row]);

    row.forEach((el, index) => {
      const hiddenChar = equation[index];
      newColors[currentRowIndex][index] =
        el === hiddenChar ? 'green' : equation.includes(el) ? 'orange' : 'grey';
    });

    setColors(newColors);

    if (newColors[currentRowIndex].every(el => el === 'green')) {
      Alert.alert('Success', 'You win!');
      setTimeout(() => {
        setCurrentRowIndex(0);
        setCurrentColumnIndex(0);
        setRows(initialRows);
        setColors(initialColors);
      }, 1000);
      return;
    } else {
      if (currentRowIndex < 5) {
        setCurrentRowIndex(prevState => prevState + 1);
        setCurrentColumnIndex(0);
      }
    }
  };

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onPressValue = value => {
    const newRows = [...rows].map(row => row.slice());

    if (!newRows[currentRowIndex][currentColumnIndex]) {
      newRows[currentRowIndex][currentColumnIndex] = value;

      setRows(newRows);

      if (currentColumnIndex < 5) {
        setCurrentColumnIndex(prevState => prevState + 1);
      }
    }
  };

  const onPressAction = type => {
    const newRows = [...rows].map(row => row.slice());

    if (type === 'Delete') {
      const shouldMoveToPreviousColumn =
        currentColumnIndex > 0 && !newRows[currentRowIndex][currentColumnIndex];

      if (shouldMoveToPreviousColumn) {
        setCurrentColumnIndex(prevState => prevState - 1);
      }

      newRows[currentRowIndex][
        currentColumnIndex - (shouldMoveToPreviousColumn ? 1 : 0)
      ] = null;
      setRows(newRows);
    } else {
      onSubmitRow();
    }
  };

  const memoForBottomColor = () => {
    const row = rows[currentRowIndex - 1];
    const color = colors[currentRowIndex - 1];

    const obj: Record<string, string> = {};

    row.forEach((el: string, index) => {
      obj[el] = color[index];
    });

    return {row, color, obj};
  };

  const onButtonColor = (value: string) => {
    if (currentRowIndex < 1) {
      return 'gray';
    }

    const {row, obj, color} = memoForBottomColor();

    if (!row.length || !color.length || row.length !== color.length) {
      return 'gray';
    }

    return obj[value] ?? 'gray';
  };

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
            <View
              key={rowIndex}
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              {row.map((col, columnIndex) => (
                <RowInput
                  key={columnIndex}
                  value={col}
                  color={colors[rowIndex][columnIndex]}
                />
              ))}
            </View>
          );
        })}
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 100,
        }}>
        <Button
          title={'0'}
          onPress={() => onPressValue('0')}
          color={onButtonColor('0')}
        />
        <Button
          title={'1'}
          onPress={() => onPressValue('1')}
          color={onButtonColor('1')}
        />
        <Button
          title={'2'}
          onPress={() => onPressValue('2')}
          color={onButtonColor('2')}
        />
        <Button
          title={'3'}
          onPress={() => onPressValue('3')}
          color={onButtonColor('3')}
        />
        <Button
          title={'4'}
          onPress={() => onPressValue('4')}
          color={onButtonColor('4')}
        />
        <Button
          title={'5'}
          onPress={() => onPressValue('5')}
          color={onButtonColor('5')}
        />
        <Button
          title={'6'}
          onPress={() => onPressValue('6')}
          color={onButtonColor('6')}
        />
        <Button
          title={'7'}
          onPress={() => onPressValue('7')}
          color={onButtonColor('7')}
        />
        <Button
          title={'8'}
          onPress={() => onPressValue('8')}
          color={onButtonColor('8')}
        />
        <Button
          title={'9'}
          onPress={() => onPressValue('9')}
          color={onButtonColor('9')}
        />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Button title={'Enter'} onPress={() => onPressAction('Enter')} />
        <Button
          title={'+'}
          onPress={() => onPressValue('+')}
          color={onButtonColor('+')}
        />
        <Button
          title={'-'}
          onPress={() => onPressValue('-')}
          color={onButtonColor('-')}
        />
        <Button
          title={'*'}
          onPress={() => onPressValue('*')}
          color={onButtonColor('*')}
        />
        <Button
          title={'/'}
          onPress={() => onPressValue('/')}
          color={onButtonColor('/')}
        />
        <Button title={'Delete'} onPress={() => onPressAction('Delete')} />
      </View>
    </SafeAreaView>
  );
}

export default App;
