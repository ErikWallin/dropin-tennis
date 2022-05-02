import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDz8zFvT7b75U8R2zJzgt2xI35kH363xJw',
	authDomain: 'dropin-tennis.firebaseapp.com',
	projectId: 'dropin-tennis',
	storageBucket: 'dropin-tennis.appspot.com',
	messagingSenderId: '730872876181',
	appId: '1:730872876181:web:8837028083afaef9aedf9c'
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
