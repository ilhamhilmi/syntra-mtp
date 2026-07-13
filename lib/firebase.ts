import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBwY0N4va7pUaScxVWs_85OmwGuYX6IwxI",
  authDomain: "syntra-mtp.firebaseapp.com",
  databaseURL:
    "https://syntra-mtp-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "syntra-mtp",
  storageBucket: "syntra-mtp.firebasestorage.app",
  messagingSenderId: "654234509735",
  appId: "1:654234509735:web:b6dfb782771ba385939682",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth(app);

export default app;