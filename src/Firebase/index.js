// import firebase modules
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import ReduxSagaFirebase from 'redux-saga-firebase'

/* *
 * Initialise firebase context to allow the application to communicate with firebase services
 * (firestore in particular, to store user preference data and user account information)
   * 
   * @author Koh Tong Liang
   * @version 1.0
   * @since 19/10/2018
   * */
const myFirebaseApp = firebase.initializeApp({
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_DATABASE_URL,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APPID,
        measurementId: process.env.REACT_APP_MEASUREMENT_ID,
})

const firebaseApp = new ReduxSagaFirebase(myFirebaseApp)
export default firebaseApp;