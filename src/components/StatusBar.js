import React, { PropTypes } from 'react';
import { Text, View, Image } from 'react-native';

import styles from '../styles';

const propTypes = {
  user: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  menuButton: PropTypes.element.isRequired,
};

function StatusBar(props) {
  return (
    <View>

      <View style={styles.statusbar}>
        <Text style={styles.statusText}>{props.user.email}</Text>
      </View>
      <View style={styles.navbar}>

        <Text style={styles.navbarTitle}>{props.title}</Text>
      </View>
      <View style={styles.navbarIcon}>
        {props.menuButton}
      </View>
      <View style={styles.userAvatarContainer}>
        <Image style={styles.userAvatar} source={{ uri: props.user.photo }} />
      </View>
    </View>
  );
}
StatusBar.propTypes = propTypes;
module.exports = StatusBar;
