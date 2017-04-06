import React, { Component, PropTypes } from 'react';
import {
  Modal,
  TouchableOpacity,
  ListView,
  ScrollView,
  View,
} from 'react-native';

import {
  Icon,
  Card,
} from 'react-native-elements';
import HTMLView from 'react-native-htmlview';
import styles from '../styles';

const propTypes = {
  firebaseUserKey: PropTypes.string.isRequired,
};

class NotificationModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      selectedNotif: {},
      tagsDataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }

  setModalVisible(visible, notif) {
    this.setState({
      selectedNotif: notif,
      modalVisible: visible, // finally, set the modal visible
    });
  }

  render() {
    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={this.state.modalVisible}
        onRequestClose={() =>
          this.setModalVisible(!this.state.modalVisible, this.state.selectedNotif)
        }
      >

        <View style={styles.modalBackground}>

          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible, this.state.selectedNotif);
              }}
              style={styles.hideModal}
            >
              <Icon
                size={25}
                name="cancel"
              />
            </TouchableOpacity>


            <Card
              title={this.state.selectedNotif == null ? 'Title' : this.state.selectedNotif.title}
              containerStyle={{ overflow: 'scroll' }}
            >
              <ScrollView style={{ maxHeight: 500 }}>
                <HTMLView
                  value={this.state.selectedNotif == null ? '' : this.state.selectedNotif.html}
                />
              </ScrollView>
            </Card>
          </View>
        </View>
      </Modal>
    );
  }
}
NotificationModal.propTypes = propTypes;
module.exports = NotificationModal;
