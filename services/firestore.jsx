import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBboU2yfFI9OE0dJ5M-ejIZ2fCpWe2kqGc",
  authDomain: "wallet-web-application.firebaseapp.com",
  projectId: "wallet-web-application",
  storageBucket: "wallet-web-application.firebasestorage.app",
  messagingSenderId: "321983616834",
  appId: "1:321983616834:web:dc687cc24a15e76a71dadb",
  measurementId: "G-8RSY6JQBF3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db };
