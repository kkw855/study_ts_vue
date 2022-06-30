import { initializeApp } from 'firebase/app'

export default function initializeFirebase() {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: 'AIzaSyC0flyUARc5Zj_HiOls4N5ixt-314Cos9M',
    authDomain: 'vue-full-course-5c351.firebaseapp.com',
    projectId: 'vue-full-course-5c351',
    storageBucket: 'vue-full-course-5c351.appspot.com',
    messagingSenderId: '582785983638',
    appId: '1:582785983638:web:dacabb7a88334b02f3ceb7',
  }

  // Initialize Firebase
  initializeApp(firebaseConfig)
}
