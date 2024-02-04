import React, {useContext} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {AuthContext} from '../../../App';
import CustomButton from '../CustomButton/CustomButton';
import {COLORS} from '../../util/colors';

interface IHelpModal {
  isVisible: boolean;
  onClose: () => void;
}

const SettingsModal = ({isVisible, onClose}: IHelpModal) => {
  const {onLogout} = useContext(AuthContext);

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>
              Settings
            </Text>
            <TouchableOpacity hitSlop={30} onPress={onClose}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                X
              </Text>
            </TouchableOpacity>
          </View>

          <CustomButton
            title={'Logout'}
            color={COLORS.RED}
            onPress={() => {
              onLogout();
              onClose();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default SettingsModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    //alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
