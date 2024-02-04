import {useState} from 'react';
import mockedEquantations from '../util/mock/equantations.json';
import {Alert} from 'react-native';
import {evaluate} from 'mathjs';
import {COLORS} from '../util/colors';

const initialRows = Array.from({length: 6}, () => Array(6).fill(null));
const initialColors = Array.from({length: 6}, () => Array(6).fill('white'));

export interface IUseMathlerResult {
  onButtonColor(value: string): string;
  onPressAction(type: string): void;
  onPressValue(value: string): void;
  rows: (string | null)[][];
  colors: (string | null)[][];
  currentEquationResult: number;
}

const useMathler = (): IUseMathlerResult => {
  const [currentRowIndex, setCurrentRowIndex] = useState(0);
  const [currentColumnIndex, setCurrentColumnIndex] = useState(0);

  const [rows, setRows] = useState(initialRows);
  const [colors, setColors] = useState(initialColors);

  const [equation, setEquation] = useState(mockedEquantations['4']);

  const currentEquationResult = evaluate(equation);

  const resetAllState = (value: number) => {
    setCurrentRowIndex(0);
    setCurrentColumnIndex(0);
    setRows(initialRows);
    setColors(initialColors);
    setEquation(mockedEquantations[`${value}`]);
  };

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
        el === hiddenChar
          ? COLORS.GREEN
          : equation.includes(el)
          ? COLORS.ORANGE
          : COLORS.DARK_GREY;
    });

    setColors(newColors);

    if (newColors[currentRowIndex].every(el => el === COLORS.GREEN)) {
      Alert.alert('Success', 'You win!');
      setTimeout(() => {
        resetAllState(Math.floor(Math.random() * 10) + 1);
      }, 500);
      return;
    } else {
      if (currentRowIndex < 5) {
        setCurrentRowIndex(prevState => prevState + 1);
        setCurrentColumnIndex(0);
      } else {
        Alert.alert('Failed', 'Unfortunately...You lose. Try again :)');
        setTimeout(() => {
          resetAllState(Math.floor(Math.random() * 10) + 1);
        }, 500);
      }
    }
  };

  const onPressValue = (value: string) => {
    const newRows = [...rows].map(row => row.slice());

    if (!newRows[currentRowIndex][currentColumnIndex]) {
      newRows[currentRowIndex][currentColumnIndex] = value;

      setRows(newRows);

      if (currentColumnIndex < 5) {
        setCurrentColumnIndex(prevState => prevState + 1);
      }
    }
  };

  const onPressAction = (type: 'Delete' | 'Enter') => {
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
      return COLORS.LIGHT_GREY;
    }

    const {row, obj, color} = memoForBottomColor();

    if (!row.length || !color.length || row.length !== color.length) {
      return COLORS.LIGHT_GREY;
    }

    return obj[value] ?? COLORS.LIGHT_GREY;
  };

  return {
    onButtonColor,
    onPressAction,
    onPressValue,
    rows,
    colors,
    currentEquationResult,
  };
};

export default useMathler;
