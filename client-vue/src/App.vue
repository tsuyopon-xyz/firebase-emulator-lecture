<template>
  <div id="app">
    <h1>Firebaseエミュレーター講座</h1>
    <div>
      <button type="button" @click="signup">
        メール認証（アカウント作成）
      </button>
      <button type="button" @click="signin">
        メール認証（ログイン）
      </button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyCs5OtAT6Tos4N3QeIQrlKVYLpGSYV1XTs',
  authDomain: 'fir-emulator-lecture.firebaseapp.com',
  projectId: 'fir-emulator-lecture',
  storageBucket: 'fir-emulator-lecture.appspot.com',
  messagingSenderId: '878189659308',
  appId: '1:878189659308:web:1cfee4e311742807ae4b09',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().useEmulator('http://localhost:9099');

export default {
  name: 'App',
  methods: {
    async signup() {
      console.log('Clicked signupButton!');
      const email = 'test@example.com';
      const password = 'Test_1234';
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log({ userCredential });
    },

    async signin() {
      console.log('Clicked signinButton!');
      const email = 'test@example.com';
      const password = 'Test_1234';
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      console.log({ userCredential });
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
