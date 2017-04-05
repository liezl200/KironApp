import React, { Component, PropTypes } from 'react';
import { Modal, TouchableOpacity, ListView, ScrollView, View } from 'react-native';
import {
  Icon,
  Card,
} from 'react-native-elements';
import HTMLView from 'react-native-htmlview';
import styles from '../styles';
import firebaseApp from '../modules/Firebase';
import Tag from './Tag';

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
      userGroups: [],
    };

    this.userGroupsRef = firebaseApp.database().ref()
      .child('users')
      .child(this.props.firebaseUserKey)
      .child('groups');

    this.renderTag = this.renderTag.bind(this);
  }

  componentWillMount() {
    this.listenForUserGroups(this.userGroupsRef);
  }

  setModalVisible(visible, notif) {
    // update the tag list based on the selected notif if modal becomes visible
    const groupList = [];
    if (notif && notif.groups) {
      const userGroups = this.state.userGroups;
      notif.groups.forEach((group) => {
        const subscribed = userGroups.indexOf(group) !== -1;
        groupList.push({
          text: group,
          _key: group, // use the unique group name as the key
          subscribed,
        });
      });
    }
    this.setState({
      tagsDataSource: this.state.tagsDataSource.cloneWithRows(groupList),
      selectedNotif: notif,
      modalVisible: visible, // finally, set the modal visible
    });
  }

  listenForUserGroups(userGroupsRef) {
    userGroupsRef.on('value', (snap) => {
      // get children as an array
      const groups = [];
      snap.forEach((child) => {
        groups.push(
          child.val(),
        );
      });

      this.setState({
        userGroups: groups,
      });
    });
  }

  renderTag(tag) {
    const onPress = () => {
      const groups = this.state.userGroups;
      if (!tag.subscribed) {
        groups.push(tag.text);
      } else {
        const unsubscribedGroupIndex = groups.indexOf(tag.text);
        groups.splice(unsubscribedGroupIndex, 1);
      }
      this.userGroupsRef.set(groups);
    };

    return (
      <Tag text={tag.text} subscribed={!tag.subscribed} onPress={onPress} />
    );
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

              <ScrollView style={{ maxHeight: 300 }}>
                <HTMLView value={this.state.selectedNotif == null ? '' : this.state.selectedNotif.text} />
              </ScrollView>

              <ListView
                dataSource={this.state.tagsDataSource}
                renderRow={this.renderTag}
                enableEmptySections
                horizontal
                contentContainerStyle={styles.listview}
              />
            </Card>
          </View>
        </View>
      </Modal>
    );
  }
}
NotificationModal.propTypes = propTypes;
module.exports = NotificationModal;
