import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';

interface IHelpModal {
  isVisible: boolean;
  onClose: () => void;
}

const HelpModal = ({isVisible, onClose}: IHelpModal) => {
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
              How to play Mathler
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
          <Text style={{color: 'black'}}>
            Try to find the hidden calculation in 6 guesses!
          </Text>
          <Text style={{color: 'black'}}>
            After each guess, the color of the tiles will change to show how
            close you are to the solution.
          </Text>
          <Image
            source={require('../../public/images/guess-example.png')}
            style={{alignSelf: 'center'}}
          />
          <FlatList
            data={[
              {key: 'Green are in the correct place.'},
              {key: 'Orange are in the solution, but in a different place.'},
              {
                key: 'Gray are not in the solution.',
              },
            ]}
            renderItem={({item}) => {
              return (
                <View style={{marginBottom: 10}}>
                  <Text style={{color: 'black'}}>{`\u2022 ${item.key}`}</Text>
                </View>
              );
            }}
          />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              marginTop: 10,
              color: 'black',
            }}>
            Additional rules
          </Text>
          <FlatList
            data={[
              {key: 'Numbers and operators can appear multiple times.'},
              {key: 'Calculate / or * before - or + (order of operations).'},
              {
                key: 'Commutative solutions are accepted, for example 20+7+3 and 3+7+20.',
              },
              {
                key: 'Commutative solutions will be automatically rearranged to the exact solution',
              },
            ]}
            renderItem={({item}) => {
              return (
                <View style={{marginBottom: 10}}>
                  <Text style={{color: 'black'}}>{`\u2022 ${item.key}`}</Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default HelpModal;

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
