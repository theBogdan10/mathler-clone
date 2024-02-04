import React from 'react';
import {IUseMathlerResult} from '../../hooks/useMathler';
import Cell from '../Cell/Cell';
import styled from 'styled-components/native';

interface IGrid extends Pick<IUseMathlerResult, 'rows' | 'colors'> {}

const Grid = ({rows, colors}: IGrid) => {
  return (
    <GridWrapper>
      {rows.map((row, rowIndex) => {
        return (
          <RowWrapper key={rowIndex}>
            {row.map((col, columnIndex) => (
              <Cell
                key={columnIndex}
                value={col}
                color={colors[rowIndex][columnIndex]}
              />
            ))}
          </RowWrapper>
        );
      })}
    </GridWrapper>
  );
};

const GridWrapper = styled.View`
  gap: 5px;
  width: 100%;
`;

const RowWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

export default Grid;
