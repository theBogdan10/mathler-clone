import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../../util/colors';

interface ICell {
  value: string | null;
  color: string | null;
}

const Cell = ({value, color}: ICell): JSX.Element => {
  return (
    <CellWrapper color={color ?? 'white'} borderColor={COLORS.LIGHT_GREY}>
      <TextWrapper>{value}</TextWrapper>
    </CellWrapper>
  );
};

const CellWrapper = styled.View<{
  color: string;
  borderColor: string;
}>`
  width: 55px;
  height: 50px;
  border-color: ${({borderColor}) => borderColor};
  border-width: 2px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  background-color: ${({color}) => color};
`;

const TextWrapper = styled.Text`
  font-weight: bold;
  color: black;
`;

export default Cell;
