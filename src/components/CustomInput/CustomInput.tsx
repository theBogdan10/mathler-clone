import React from 'react';
import styled from 'styled-components/native';
import {Text} from 'react-native';

interface ICustomInput {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  isSecureTextEntry?: boolean;
}

const CustomInput = ({
  label,
  value,
  onChange,
  isSecureTextEntry = false,
}: ICustomInput) => {
  return (
    <ViewWrapper>
      {label && <Text style={{fontWeight: 'bold'}}>{label}</Text>}
      <TextInputWrapper
        value={value}
        onChangeText={onChange}
        secureTextEntry={isSecureTextEntry}
      />
    </ViewWrapper>
  );
};

export default CustomInput;

const ViewWrapper = styled.View`
  gap: 5px;
`;

const TextInputWrapper = styled.TextInput`
  border-radius: 5px;
  font-size: 18px;
  border-width: 1px;
  border-color: gray;
  padding: 5px;
  width: 100%;
  height: 50px;
`;
