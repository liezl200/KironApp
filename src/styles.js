const React = require('react-native');
const {StyleSheet} = React;
const constants = {
  actionColor: '#24CE84'
};

var styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  container: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  listview: {
    flex: 1,
  },
  liContainer: {
    flex: 2,
  },
  liText: {
    color: '#333',
    fontSize: 16,
  },
  navbar: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    height: 34,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  navbarIcon: {
    position: 'absolute',
    marginTop: 24,
    marginLeft: 25,
  },
  userAvatar: {
    borderRadius: 20,
    height: 40,
    width: 40,
  },
  userAvatarContainer: {
    position: 'absolute',
    marginTop: 5,
    right: 20,
    top: 2,
  },
  navbarTitle: {
    color: '#444',
    fontSize: 16,
    fontWeight: '500',
  },
  statusbar: {
    backgroundColor: '#fff',
    height: 25,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingRight: 70,
    paddingTop: 5,
  },
  statusText: {
    fontSize: 14,
  },
  center: {
    textAlign: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  action: {
    backgroundColor: constants.actionColor,
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20
  },
  notifContainer: {
    backgroundColor: '#dbd6d6',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  notifItem: {
    maxHeight: 78,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
  },
  notifItemChevron: {
    width: 30,
    borderRadius: 5,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    backgroundColor: 'rgba(150, 150, 150, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  notifItemIndicatorContainer: {
    width: 20,
    borderRadius: 5,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    paddingTop: 10,
    paddingLeft: 5,
  },
  notifItemContentWrapper: {
    padding: 5,
  },
  notifItemContent: {
    backgroundColor: '#dbd6d6',
    padding: 5,
    marginBottom: 10,
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  notifItemText: {
    fontSize: 12,
  },
  notifItemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

module.exports = styles;
module.exports.constants = constants;