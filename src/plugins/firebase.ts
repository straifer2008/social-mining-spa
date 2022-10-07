//@ts-nocheck

import { App } from 'vue'
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: 'AIzaSyC34m8r2XiOFfxyhh87CITXnnqHBZn7Mh0',
  authDomain: 'test-482d1.firebaseapp.com',
  projectId: 'test-482d1',
  storageBucket: 'test-482d1.appspot.com',
  messagingSenderId: '744022434221',
  appId: '1:744022434221:web:feecf3248f706227bc8124',
  measurementId: 'G-3BR52X8XES'
}

export default {
  install(app: App) {
    const firebase_app = initializeApp(firebaseConfig)
    const messaging = getMessaging(firebase_app)
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
          
        getToken(messaging, {
          vapidKey:
            'BHjbUKFLL9I2amiJSDtu5uvlnqQj9IeEcEkgV03sBW-vybKRo_UKLl-PLL8CJjw6ZSt5y_iJ3Ag4DD_X9i2_kow'
        })
          .then((currentToken) => {
            if (currentToken) {
              // Send the token to your server and update the UI if necessary
              // ...
            } else {
              // Show permission request UI
              console.log(
                'No registration token available. Request permission to generate one.'
              )
              // ...
            }
          })
          .catch((err) => {
            console.log('An error occurred while retrieving token. ', err)
            // ...
          })
      }
        // app.config.globalProperties.$firebase =
    })
  }
  
}
