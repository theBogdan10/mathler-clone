import React from 'react';
import styled from 'styled-components/native';
import {SafeAreaView, Text, View} from 'react-native';
import OperationsBlock from '../../components/OperationsBlock/OperationsBlock';
import Grid from '../../components/Grid/Grid';
import useMathler from '../../hooks/useMathler';
import Header from '../../components/Header/Header';

const Mathler = () => {
  const {
    onPressValue,
    onPressAction,
    rows,
    colors,
    onButtonColor,
    currentEquationResult,
  } = useMathler();

  return (
    <SafeAreaView style={{flex: 1}}>
      <MathlerWrapper>
        <View>
          <Header />
          <Text
            style={{
              textAlign: 'center',
              marginVertical: 10,
              fontWeight: 'bold',
            }}>
            Find the hidden calculation that equals {currentEquationResult}
          </Text>
          <Grid rows={rows} colors={colors} />
        </View>
        <OperationsBlock
          onPressValue={onPressValue}
          onPressAction={onPressAction}
          onButtonColor={onButtonColor}
        />
      </MathlerWrapper>
    </SafeAreaView>
  );
};

const MathlerWrapper = styled.View`
  flex: 1;
  height: 100%;
  justify-content: space-around;
  padding: 20px;
`;

export default Mathler;
