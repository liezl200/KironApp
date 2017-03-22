// TODO: COMPONENT NOT IN USE YET, refactor later
import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, ListView, View} from 'react-native';
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
    if(this.state.selectedNotif && this.state.selectedNotif.groups) {
      this.state.selectedNotif.groups.forEach(function(gr) {
        groupList.push({
          text: gr,
          _key: gr // use the unique group name as the key
        });
      });
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

  componentDidMount() {
    this.listenForUserGroups(this.userGroupsRef);
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
                title={this.state.selectedNotif == null? 'Title' : this.state.selectedNotif.title} containerStyle={{overflow: 'scroll'}}>

                <Text style={{marginBottom: 10}}>
                  {this.state.selectedNotif == null? '' : this.state.selectedNotif.text}
                </Text>

                <ListView
                  dataSource = {this.state.tagsDataSource}
                  renderRow = {this._renderTag.bind(this)}
                  enableEmptySections={true}
                  style = {styles.listview} />

                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
                  <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
                  <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
                </View>

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

  _renderTag(tag) {

    const onPress = () => {
      // TODO: handle on press here in addition to the Tag itself to actually change our user's group subscriptions
    }

    return (
      <Tag text={tag.text} onPress={onPress}/>
    );
  }

}

module.exports = NotificationModal;