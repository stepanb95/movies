import React, { useState } from 'react';
import './Login.css';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import Main from './Main'; 

const firebaseConfig = {
  apiKey: "AIzaSyA3lETbXesshCvkORVZ_V_X-W0YA9jQMF4",
  authDomain: "moviedatabase-cd74d.firebaseapp.com",
  projectId: "moviedatabase-cd74d",
  storageBucket: "moviedatabase-cd74d.appspot.com",
  messagingSenderId: "893345009026",
  appId: "1:893345009026:web:e9f041392da706347d939b",
  measurementId: "G-TW3XNSRRP3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, username, password)
      .then(() => {
        setLoggedIn(true);
      })
      .catch((error) => {
        console.error(error.message);
        alert('Přihlášení se nezdařilo, zkontrolujte své údaje');
      });
  };

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, username, password)
      .then(() => {
        setRegistered(true);
      })
      .catch((error) => {
        console.error(error.message);
        alert('Registrace se nezdařila');
      });
  };

  if (loggedIn) {
    return <Main username={username} />; 
  }

  if (registered) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h2>Registrace proběhla úspěšně</h2>
          <button className="login-button" onClick={handleLogin}>Pokračovat na přihlášení</button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <input
          type="text"
          placeholder='Přihlašovací jméno'
          className="login-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder='Heslo'
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button className="login-button" onClick={handleLogin}>Přihlásit</button>
        <br />
        <button className="login-button" onClick={handleRegister}>Registrovat</button>
      </div>
    </div>
  );
}

export default Login;
