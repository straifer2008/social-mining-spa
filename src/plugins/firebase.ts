//@ts-nocheck

import { App } from 'vue'
import { initializeApp } from 'firebase/app'
import { getMessaging } from 'firebase/messaging'

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
    app.config.globalProperties.$firebase = firebase_app
    app.config.globalProperties.$firebase_messaging = messaging
  }
}
