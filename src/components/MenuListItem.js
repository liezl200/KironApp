import React, { PropTypes } from 'react';
import { Linking } from 'react-native';

import {
  ListItem,
} from 'react-native-elements';

const propTypes = {
  onPress: PropTypes.func,
  url: PropTypes.string,
  title: PropTypes.string.isRequired,
  leftIcon: PropTypes.object.isRequired,
  hideChevron: PropTypes.bool.isRequired,
};

function MenuListItem(props) {
  let onPress = props.onPress;
  if (onPress === null && props.url !== '') {
    onPress = () => {
      Linking.canOpenURL(props.url).then((supported) => {
        if (supported) {
          try {
            Linking.openURL(props.url);
          } catch (e) {
            // do nothing
          }
        }
      });
    };
  }

  return (
    <ListItem
      onPress={onPress}
      title={props.title}
      leftIcon={props.leftIcon}
      hideChevron={props.hideChevron}
    />
  );
}

MenuListItem.defaultProps = {
  onPress: null,
  url: '',
};

MenuListItem.propTypes = propTypes;
module.exports = MenuListItem;
