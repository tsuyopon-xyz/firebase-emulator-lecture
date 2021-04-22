import firebase from 'firebase/app';
import 'firebase/auth';

import './App.css';
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

function App() {
  return (
    <div className="App">
      <h1>Firebaseエミュレーター講座</h1>
      <div>
        <button type="button" onClick={signup}>
          メール認証（アカウント作成）
        </button>
        <button type="button" onClick={signin}>
          メール認証（ログイン）
        </button>
      </div>
    </div>
  );
}

const signup = async (event) => {
  console.log('Clicked signupButton!');
  const email = 'test@example.com';
  const password = 'Test_1234';
  const userCredential = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
  console.log({ userCredential });
};

const signin = async (event) => {
  console.log('Clicked signinButton!');
  const email = 'test@example.com';
  const password = 'Test_1234';
  const userCredential = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);
  console.log({ userCredential });
};

export default App;
