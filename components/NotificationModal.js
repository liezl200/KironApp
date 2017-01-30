// TODO: COMPONENT NOT IN USE YET, refactor later
import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View} from 'react-native';
import {
  Button,
  Icon,
  Card
} from 'react-native-elements';

const styles = require('../styles.js');

class NotificationModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      notif: null,
    };
  }

  _setModalVisible(visible, notif) {
    this.setState({modalVisible: visible, notif: notif});
  }

  render() {
    return (
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}} >

          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Card
                title={this.state.selectedNotif == null? 'Title' : this.state.selectedNotif.title}
                image={{uri:'http://thedomeproject.net/assets/img/editorials/kiron%20student.jpg'}}>
                <Text style={{marginBottom: 10}}>
                  The idea with React Native Elements is more about component structure than actual design.
                </Text>
                <Button
                  icon={{name: 'code'}}
                  backgroundColor='#03A9F4'
                  fontFamily='Lato'
                  buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                  title='VIEW NOW' />
                <TouchableHighlight onPress={() => {
                  this._setModalVisible(!this.state.modalVisible, this.state.selectedNotif)
                }}>
                  <Text>Hide Modal</Text>
                </TouchableHighlight>
              </Card>


            </View>
          </View>

        </Modal>

    );
  }
}

module.exports = NotificationModal;