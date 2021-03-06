import { StyleSheet } from 'react-native';

const constants = {
  kironGrey: '#969696',
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#001E8C',
  },
  googleSigninButton: {
    width: 212,
    height: 48,
  },
  sideMenuStyle: {
    flex: 1,
    backgroundColor: '#ededed',
    paddingTop: 57,
  },
  navbar: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    height: 44,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottombar: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  navbarIcon: {
    position: 'absolute',
    marginTop: 34,
    marginLeft: 25,
  },
  userAvatar: {
    borderRadius: 20,
    height: 40,
    width: 40,
  },
  userAvatarContainer: {
    position: 'absolute',
    marginTop: 15,
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
    height: 35,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingRight: 70,
    paddingTop: 15,
  },
  statusText: {
    fontSize: 14,
  },
  center: {
    textAlign: 'center',
  },
  hideModal: {
    position: 'absolute',
    marginTop: 8,
    marginLeft: 8,
    zIndex: 1,
  },
  listview: {
    marginTop: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: { // the rounded "card" container
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  notifContainer: {
    backgroundColor: '#dbd6d6',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  notifItem: { // the middle part of the notification item
    height: 78,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
  },
  notifItemChevron: { // the right part of the notification item
    width: 20,
    borderRadius: 5,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    backgroundColor: 'rgba(150, 150, 150, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',

  },
  notifItemIndicatorContainer: { // the left part of the notification item (for read/ unread)
    width: 20,
    borderRadius: 5,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    paddingTop: 15, // distance of dot from top of notification
    paddingLeft: 5,
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
    lineHeight: 16,
    minHeight: 0,
    overflow: 'hidden',
  },
  notifItemTitle: {
    color: '#444',
    fontSize: 18,
    lineHeight: 26,
    minHeight: 0,
    overflow: 'hidden',
  },
  notificationListContainer: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideMenuContainer: {
    flex: 1,
    backgroundColor: '#ededed',
    paddingTop: 57,
  },
});

module.exports = styles;
module.exports.constants = constants;
