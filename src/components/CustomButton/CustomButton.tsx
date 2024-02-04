import React from 'react';
import styled from 'styled-components/native';

interface IButton {
  title: string;
  color: string;
  onPress: () => void;
  isDisabled?: boolean;
}

const CustomButton = ({
  title,
  color,
  onPress,
  isDisabled = false,
}: IButton): JSX.Element => {
  return (
    <ButtonWrapper
      activeOpacity={0.6}
      color={color}
      onPress={onPress}
      disabled={isDisabled}>
      <TextWrapper>{title}</TextWrapper>
    </ButtonWrapper>
  );
};

export default CustomButton;

const ButtonWrapper = styled.TouchableOpacity<{
  color: string;
}>`
  background-color: ${({color}) => color};
  padding: 20px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;

const TextWrapper = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: black;
`;
