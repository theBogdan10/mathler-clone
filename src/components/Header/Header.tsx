import React from 'react';
import styled from 'styled-components/native';
import {useState} from 'react';
import HelpModal from '../HelpModal/HelpModal';
import {Text, TouchableOpacity} from 'react-native';
import SettingsModal from '../SettingsModal/SettingsModal';

const Header = () => {
  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);

  return (
    <HeaderWrapper>
      <TouchableOpacity
        hitSlop={30}
        onPress={() => setIsHelpModalVisible(true)}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          ?
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        hitSlop={30}
        onPress={() => setIsSettingsModalVisible(true)}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Settings
        </Text>
      </TouchableOpacity>
      <HelpModal
        isVisible={isHelpModalVisible}
        onClose={() => setIsHelpModalVisible(false)}
      />
      <SettingsModal
        isVisible={isSettingsModalVisible}
        onClose={() => setIsSettingsModalVisible(false)}
      />
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;
