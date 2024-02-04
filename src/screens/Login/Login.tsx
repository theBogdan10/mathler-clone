import React from 'react';
import styled from 'styled-components/native';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CustomInput from '../../components/CustomInput/CustomInput';
import useLogin from '../../hooks/useLogin';
import CustomButton from '../../components/CustomButton/CustomButton';
import {COLORS} from '../../util/colors';

const Login = (): JSX.Element => {
  const {email, setEmail, setPassword, password, isSubmitDisabled} = useLogin();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{flex: 1}}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <LoginWrapper>
              <CustomInput
                label={'Email'}
                value={email}
                onChange={text => setEmail(text)}
              />
              <CustomInput
                label={'Password'}
                value={password}
                isSecureTextEntry
                onChange={text => setPassword(text)}
              />
              <CustomButton
                title={'Login'}
                color={isSubmitDisabled ? COLORS.LIGHT_GREY : COLORS.DARK_GREY}
                onPress={() => {}}
                isDisabled={isSubmitDisabled}
              />
            </LoginWrapper>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;

const LoginWrapper = styled.View`
  align-self: center;
  gap: 20px;
  width: 100%;
  padding: 20px;
`;
