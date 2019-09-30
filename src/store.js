import { createStore, combineReducers, compose } from 'redux';

//boilerplate to integrate firestore into the redux store
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/firestore'; 
//this enables all the authentication in the app
import 'firebase/auth'; 



//initialize firebase
firebase.initializeApp(firebaseConfig);

//react-redux configuration
//also enable to use firestore
const rrfConfig = {
    userProfile: 'user',
    useFirestoreForProfile: true
}
 
//creates enacer to redux compose and firestore
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

//reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer
})

const initialState = {};

//creating the store
const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;

 
