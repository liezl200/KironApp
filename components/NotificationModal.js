// TODO: COMPONENT NOT IN USE YET, refactor later
import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View } from 'react-native';

class NotificationModal extends Component {

  state = {
    modalVisible: false,
  }

  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{marginTop: 22}}>
          <View>
            <Text>Hello World!</Text>

            <TouchableHighlight onPress={() => {
              this._setModalVisible(!this.state.modalVisible)
            }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>

          </View>
         </View>
        </Modal>

    );
  }
}

module.exports = NotificationModal;