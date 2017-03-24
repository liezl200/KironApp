SETUP NOTES


https://firebase.googleblog.com/2016/07/firebase-react-native.html
	npm install firebase --save
https://www.npmjs.com/package/react-native-firebase-auth
	npm install --save react-native-firebase-auth
	npm install --save firebase react-native-facebook-login react-native-google-signin
	https://github.com/devfd/react-native-google-signin#project-setup-and-initialization
http://stackoverflow.com/questions/32634352/react-native-android-build-failed-sdk-location-not-found
	add line "sdk.dir = /Users/USERNAME/Library/Android/sdk" to android/local.properties
	MUST HAVE android 23 installed (used Android Studio's Tools > SDK Manager)
	also need to install Build Tools revision 23.0.1 in the standalone SDK manager
https://github.com/devfd/react-native-google-signin/blob/master/ios-guide.md
	-- note: after downloading the configuration plist, drag it into xcode project
	-- note: after you drag GoogleSDK folder, if the necessary libraries aren't installed, just drag the CONTENTS into the library as well (to make the project setup look like the screenshot) [xcode_dependencies SCREENSHOT]
	-- also follow android installation for google sign in
NOTE: For Google sign in, you will need to enable keychain sharing [wrong_signin_error_fix SCREENSHOT ]
	http://stackoverflow.com/questions/38812761/gidsignin-keychain-error-ios-10-xcode-8/38818137#38818137
	'WRONG SIGNIN', { message: 'Error Domain=com.google.GIDSignIn Code=-2 "keychain error"
MUST ENABLE https://console.firebase.google.com/project/kirontestapp/authentication/providers Google authentication

DATABASE RULES public w/o firebase auth yet

### BEFORE PUSHING
1. change database rules
2. add API keys to .gitignore
3. android/local.properties in .gitignore?

### QUESTIONS/ notes
1. need paid apple developer account to enable push notifications in your app
2. Note: In order to use FCM you will need to set up a server (I used Django for my routes and PyFCM to make interacting with firebase easier)


### GOOGLE SIGN IN PROJECTE ACTUAL SETUP
MUST ENABLE https://console.firebase.google.com/project/kirontestapp/authentication/providers Google authentication


### GOOGLE SIGN IN TEST SETUP
	#### Google Account: kironappdev@gmail.com
		p: kirngo555
		bday: Dec 25, 1998
		name: Kiron Appdev
		gender: other
		no mobile phone
		no current email address
	Google Project name: KironTestApp
	iOS bundle ID: ngo.kiron.testapp


	#### IOS https://developers.google.com/mobile/add?platform=ios
		* Google Project name: KironTestApp
		* iOS bundle ID: ngo.kiron.testapp [screenshot of dev console]
		> Add Google Sign-In service
		> Download GoogleService-Info.plist and add to XCode project as part of RN Google Sign-In setup

	#### ANDROID
		1) Open Android SDK Manager. I use Android Studio so to access the SDK manager, I launch Android Studio, select a project (doesn't matter which one), then Tools > Android > SDK Manager[sdk_manager SCREENSHOT]
		2) Click Launch Standalone SDK Manager link at the bottom of the window that pops up [sdk_manager_popup SCREENSHOT] -- the extras don't appear directly in the basic Android Studio SDK Manager which is why you have to launch the standalone one
		3) https://github.com/devfd/react-native-google-signin/blob/master/android-guide.md#config
		4) install emulator and create virtual device. I installed Genymotion and used API 23 (Android 6.0.0)
		5) install Google Play onto virtual device https://github.com/codepath/android_guides/wiki/Genymotion-2.0-Emulators-with-Google-Play-support
			https://z3ntu.github.io/2015/12/10/play-services-with-genymotion.html has good instructions too
		6) http://stackoverflow.com/questions/37389905/change-package-name-for-android-in-react-native MAKE SURE TO EDIT BUCK FILE ALSO AS COMMENT SAYS
			FAILURE: Build failed with an exception.

			* What went wrong:
			Execution failed for task ':app:processDebugGoogleServices'.
			> No matching client found for package name 'com.kironapp'
		7) https://github.com/airbnb/react-native-maps/issues/249
		ISSUES:
			run-android Build failed http://stackoverflow.com/questions/38191170/multiple-dex-files-define-lcom-google-firebase-firebaseexception
			App Crash https://github.com/airbnb/react-native-maps/issues/249
				>> https://github.com/airbnb/react-native-maps/pull/731/commits/dd107530a95dc1db35d1f505fab379404386e304
			add web client ID: https://github.com/devfd/react-native-google-signin/issues/98
				find it here https://console.developers.google.com/apis/credentials?project=kirontestapp
				https://developer.android.com/studio/publish/app-signing.html#sign-auto
			when generating google-services.json using https://developers.google.com/identity/sign-in/android/start-integrating make sure you add the SHA-1 fingerprint on the site BEFORE downloading google-services.json from the website
			on `react-native run-android`, if you get an error `SDK location not found. Define location with sdk.dir in the local.properties file or with an ANDROID_HOME environment variable`, then add `android/local.properties` file with the line `sdk.dir = /Users/<username>/Library/Android/sdk`. (most likely path to Android sdk if you are using Android Studio)
				http://stackoverflow.com/questions/34532063/finding-android-sdk-on-mac-and-adding-to-path


FIREBASE STUFF
	* Google Account: kironappdev@gmail.com
	Firebase Project Name: KironTestApp
	http://stackoverflow.com/questions/37493699/get-apikey-to-firebase
		1) Hit add App on console
		2) Hit Web
		3) Copy popup contents
	Debugging tips: https://facebook.github.io/react-native/docs/debugging.html
	> Initially, i just allowed read/write access to everyone for testing purposes, until roles are in place
	MUST ENABLE https://console.firebase.google.com/project/kirontestapp/authentication/providers Google authentication
	copy paste google console web client to firebase client http://stackoverflow.com/questions/37769033/oauth2-issues-after-upgrading-firebase

ANDROID FCM CLIENT SETUP https://github.com/evollu/react-native-fcm
- npm install react-native-fcm --save
- rnpm link react-native-fcm
- classpath 'com.google.gms:google-services:3.0.0' and apply plugin: 'com.google.gms.google-services' has already been added with google sign in setup
- ???   apply plugin: "com.android.application" might not be a necessary line
- don't worry about compile 'com.google.firebase:firebase-core:10.0.1' //this decides your firebase SDK version it was already added to android/app/build.gradle
- ??? probably ignore the custom click_actions, we just need main
	this is not in the context of react native: click_action needs firebase API to use it (can't be done from Firebase console: http://stackoverflow.com/questions/37407366/firebase-fcm-notifications-click-action-payload) -- all this does is open a specific activity on click -- we don't really need this, especially since there are no specific activities we will be specifying in the native code

ANDROID REMOTE DEBUGGING
- just connect, enable USB debugging, and run react-native run-android
/Users/liezl/Library/Android/sdk/platform-tools/adb devices to check if connected
/Users/liezl/Library/Android/sdk/platform-tools/adb reverse tcp:8081 tcp:8081
	- solves BatchedBridge issue
http://localhost:8081/debugger-ui

### IOS FCM CLIENT SETUP
* Install Cocoapods (at least version 1.0.0)
* `cd ios && pod install`
* If you run into a problem with Xcode not being able to build for your iOS version, you probably have to update Xcode
* If you run into a problem with React/RCTBridgeModule.h, update Xcode and try http://stackoverflow.com/questions/41477241/react-native-xcode-upgrade-and-now-rctconvert-h-not-found if it still doesn't work
restrict login by kiron [insert incompatible_ios_xcode.png]

DESIGN QUESTIONS:
should I initialize firebase only once and pass the reference around?? YES

AUTH FILES
KironApp/android/app/google-services.json
	TODO before release: REMOVE CERTIFICATE HASH PORTION??
GoogleService-Info.plist

REACT NATIVE ELEMENTS
npm i react-native-vector-icons --save && react-native link react-native-vector-icons

NODE SERVER SETUP
- simpleNotificationServer
- http://stackoverflow.com/questions/41874398/what-is-serviceaccountkey-json-referring-to-in-the-firebase-device-to-device-n to create a service account and download serviceAccountKey.json
- get Cloud Messagin API key (screenshot)

TODO:
x - familiarize with react native elements, read code examples
x - add navigation menu
	x - add rough side menu with button
	x - clean up side menu list: Campus, Settings, Support, Help, Logout
	x - add side menu button to status bar
	- fix open / close behavior
	x - hook up side menu button to trigger side menu
x - add modal on notification press
	x - add rough modals on notif press: to separate the components, probably have to use a navigator to display it
	x - fix modal style
	- add blur component
x - add logout functionality
- ESLint setup
x - notification title + text
	x - change data schema and parts that interface with backend
	x - title + subtitle list view
x - consolidate styles
x - restrict user domain
	x - read how to restrict user domain google sign in
	x - read how to handle domain restriction errors
	x - implement domain restriction
	x - implement alert in case of wrong email domain
	x	- in firebase console Authentication rules (https://console.firebase.google.com/project/kirontestapp/database/rules). there is an OAuth request parameter (hd) that will do domain restriction but it is completely client side, enforcing this rule + having app logic will prevent unauthorized access:

				{
				  "rules": {
				    ".read": "auth.token.email.endsWith('kiron.ngo')",
				    ".write": "auth.token.email.endsWith('kiron.ngo')"
				  }
				}

- schemas
	- user-notification Firebase schema
		x - store FCM token in user
	- user-topic Firebase schema
		x - auto-subscribe all users to "all" topic
	x - user-deviceId Firebase schema
		x - save "FCM token" as device id -- associate user with multiple devices
	- allow a dynamically created set of users to receive and see specific notifications (don't rely on topic subscriptions)
x - add persistence + offline (offline might be default) capability to the notifs ref
- implement more activity indicators
- FCM Setup on iOS
	- https://firebase.google.com/docs/cloud-messaging/ios/certs


NITS:
x - scrollable content margins w/ List
x - use TouchableHighlight + Kiron logo for side menu toggle
- add blur / fade component at bottom of notification card


------------
DATABASE DESIGN
Users
	email
	roles
	starred
	read
	groups -- by default all users are in group 0 but we won't actually explicitly encode this
	ungroupedNotifs -- any notifications sent to this user that isn't part of a pre-set topic (group dynamically created with admin dashboard)
	fcmTokens
Notifs
	title
	text
	groups -- group 0 means all
	timestamp
Roles
	role
	no_of_users
Groups (key)
	name -- plain text name for this group
	members -- keys of users in this group
	topicId -- firebase topic (unique string identifier for topic that this group is subscribed to)
---------

By default, every notif in all-notifs will be unread, unstarred, and unarchived. When the user interacts with the notification, then we can add the appropriate user interaction record into notifsInfo. So if we have a notif in all-notifs whose key we can't find in notifsInfo, we know the user hasn't interacted with it.