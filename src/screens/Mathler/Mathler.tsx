import React from 'react';
import styled from 'styled-components/native';
import {SafeAreaView, View} from 'react-native';
import OperationsBlock from '../../components/OperationsBlock/OperationsBlock';
import Grid from '../../components/Grid/Grid';
import useMathler from '../../hooks/useMathler';
import Header from '../../components/Header/Header';

const Mathler = () => {
  const {onPressValue, onPressAction, rows, colors, onButtonColor} =
    useMathler();

  return (
    <SafeAreaView style={{flex: 1}}>
      <MathlerWrapper>
        <View>
          <Header />
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
