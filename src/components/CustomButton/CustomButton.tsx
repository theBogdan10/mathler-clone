import React from 'react';
import styled from 'styled-components/native';

interface IButton {
  title: string;
  color: string;
  onPress: () => void;
}

const CustomButton = ({title, color, onPress}: IButton): JSX.Element => {
  return (
    <ButtonWrapper activeOpacity={0.8} color={color} onPress={onPress}>
      <TextWrapper>{title}</TextWrapper>
    </ButtonWrapper>
  );
};

export default CustomButton;

const ButtonWrapper = styled.TouchableOpacity<{
  color: string;
}>`
  background-color: ${({color}) => color};
  padding: 15px;
  border-radius: 5px;
`;

const TextWrapper = styled.Text`
  font-weight: bold;
  color: black;
`;
