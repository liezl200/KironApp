// TODO: COMPONENT NOT IN USE YET, refactor later
import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, ListView, ScrollView, View} from 'react-native';
import {
  Button,
  Icon,
  Card
} from 'react-native-elements';

const styles = require('../styles.js');
const firebaseApp = require('../modules/Firebase').firebaseApp;
const Tag = require('./Tag');
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
  }

  _setModalVisible(visible, notif) {
    // update the tag list based on the selected notif if modal becomes visible
    var groupList = [];
    if(notif && notif.groups) {
      // this.userGroupsRef
      //   .once(snapshot){
      //     var userGroups = [];
      //     snapshot.forEach(group){
      //       userGroups.push(group);
      //     }
      //     this.
          var userGroups = this.state.userGroups;
          notif.groups.forEach(function(gr) {
            var subscribed = userGroups.indexOf(gr) !== -1;
            groupList.push({
              text: gr,
              _key: gr, // use the unique group name as the key
              subscribed: subscribed,
            });
          });
        //}
    }
    this.setState({
      tagsDataSource: this.state.tagsDataSource.cloneWithRows(groupList), // set the new tag list data source
      selectedNotif: notif, // keeps the currently selected notif in this NotificationModal component's state
      modalVisible: visible // finally, set the modal visible
    });
  }

  listenForUserGroups(userGroupsRef) {
    userGroupsRef.on('value', (snap) => {

      // get children as an array
      var groups = [];
      snap.forEach((child) => {
        groups.push(
          child.val()
        );
      });

      this.setState({
        userGroups: groups
        // selectedNotif: this.state.selectedNotif // shouldn't need this
      });

    });
  }

  componentWillMount() {
    this.listenForUserGroups(this.userGroupsRef);
  }
  render() {
    return (
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this._setModalVisible(!this.state.modalVisible, this.state.selectedNotif)} >

          <View style={styles.modalBackground}>

            <View style={styles.modalContainer}>
              <TouchableOpacity onPress={() => {
                this._setModalVisible(!this.state.modalVisible, this.state.selectedNotif)
              }} style={styles.hideModal}>
                <Icon
                  size={25}
                  name='cancel' />
              </TouchableOpacity>

              <Card
                title={this.state.selectedNotif == null? 'Title' : this.state.selectedNotif.title}>

                <ScrollView style={{minHeight: 0}}>
                  <Text>
                    {this.state.selectedNotif == null? '' : this.state.selectedNotif.text}
                  </Text>
                </ScrollView>

                <ListView
                  dataSource = {this.state.tagsDataSource}
                  renderRow = {this._renderTag.bind(this)}
                  enableEmptySections = {true}
                  horizontal = {true}
                  contentContainerStyle = {styles.listview} />



              </Card>
            </View>
          </View>

        </Modal>
    );
  }

  _renderTag(tag) {

    const onPress = () => {
      // TODO: handle on press here in addition to the Tag itself to actually change our user's group subscriptions
      tag.subscribed = !tag.subscribed; // toggle subscription
      var groups = this.state.userGroups;
      if (tag.subscribed) {
        console.log('user subscribed')
        groups.push(tag.text);
      } else {
        var unsubscribedGroupIndex = groups.indexOf(tag.text);
        groups.splice(unsubscribedGroupIndex, 1);
      }
      this.userGroupsRef.set(groups);
    }

    return (
      <Tag text={tag.text} subscribed={tag.subscribed} onPress={onPress}/>
    );
  }

}

module.exports = NotificationModal;