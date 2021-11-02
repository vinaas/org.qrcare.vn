// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

var firebaseConfig = {
  apiKey: "AIzaSyCpP1I0ELs9-4hwYzbprww_AmWXWZXSxBA",
  authDomain: "qrcare-aab37.firebaseapp.com",
  projectId: "qrcare-aab37",
  storageBucket: "qrcare-aab37.appspot.com",
  messagingSenderId: "778751086282",
  appId: "1:778751086282:web:2ab7ddf07bf029a14a2e33",
  measurementId: "G-D1ZE9SQ2TH"
}

const app = firebase.initializeApp(firebaseConfig)
app.messaging().getToken({ vapidKey: 'BGxx-fjPINkBky_OPMHnaEt5I-Nw6T4b-tyQC9BBoXXGF3a0Romv0Y4PP2oB9heOK4pCh6EgNEXYj9yWWEAba6I' })
.then((currentToken) => {
  if (currentToken) {
    console.log('firebase-serviceworker token', currentToken)
    // localStorage.setItem('fcm-token', currentToken);
  } else {
    console.log('No registration token available. Request permission to generate one.');
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
})

const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});