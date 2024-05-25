// Firebase Cloud Messaging Configuration File.
// Read more at https://firebase.google.com/docs/cloud-messaging/js/client && https://firebase.google.com/docs/cloud-messaging/js/receive

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

var firebaseConfig = {
  //   apiKey: `BETbH-5zbRakR4MBLq8y9q4KF0oA6fav2_1gaXrU-WA3TWjDCDG_aR40Zrb9TS7jD7EFL_hM934GsBV9d1_tEJ8`,
  authDomain: `movie-system-7e4f4.firebaseapp.com`,
  projectId: `movie-system-7e4f4`,
  storageBucket: `movie-system-7e4f4`,
  //   messagingSenderId: `movie-system-7e4f4`,
  appId: `movie-system-7e4f4.appspot.com`,
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
  return getToken(messaging, {
    vapidKey: `BETbH-5zbRakR4MBLq8y9q4KF0oA6fav2_1gaXrU-WA3TWjDCDG_aR40Zrb9TS7jD7EFL_hM934GsBV9d1_tEJ8`,
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker `messaging.onBackgroundMessage` handler.
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});
