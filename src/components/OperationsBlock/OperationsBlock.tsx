import React from 'react';
import styled from 'styled-components/native';
import {
  OPERATIONS_FIRST_ROW,
  OPERATIONS_SECOND_ROW,
} from '../../util/constants';
import CustomButton from '../CustomButton/CustomButton';
import {IUseMathlerResult} from '../../hooks/useMathler';

interface IOperationBlock
  extends Pick<
    IUseMathlerResult,
    'onPressValue' | 'onPressAction' | 'onButtonColor'
  > {}

const OperationsBlock = ({
  onPressValue,
  onPressAction,
  onButtonColor,
}: IOperationBlock): JSX.Element => {
  return (
    <OperationsBlockWrapper>
      <FirstRowWrapper>
        {OPERATIONS_FIRST_ROW.map((el, index) => (
          <CustomButton
            key={index}
            title={el}
            color={onButtonColor(el)}
            onPress={() => onPressValue(el)}
          />
        ))}
      </FirstRowWrapper>
      <SecondRowWrapper>
        <CustomButton
          title={'Enter'}
          color={onButtonColor('Enter')}
          onPress={() => onPressAction('Enter')}
        />
        {OPERATIONS_SECOND_ROW.map((el, index) => (
          <CustomButton
            key={index}
            title={el}
            color={onButtonColor(el)}
            onPress={() => onPressAction(el)}
          />
        ))}
        <CustomButton
          title={'Delete'}
          color={onButtonColor('Delete')}
          onPress={() => onPressAction('Delete')}
        />
      </SecondRowWrapper>
    </OperationsBlockWrapper>
  );
};

export default OperationsBlock;

const OperationsBlockWrapper = styled.View`
  gap: 5px;
`;

const FirstRowWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const SecondRowWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;