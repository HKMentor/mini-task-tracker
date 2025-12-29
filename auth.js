import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// 🔹 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyARSqWLOvck2ZqJR-neFd0KPeJG-zKhHX4",
  authDomain: "mini-task-tracker-ed1db.firebaseapp.com",
  projectId: "mini-task-tracker-ed1db",
  storageBucket: "mini-task-tracker-ed1db.firebasestorage.app",
  messagingSenderId: "314695213558",
  appId: "1:314695213558:web:0d67e9a847372e4873a7d7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 🔹 Signup
window.signup = function () {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Signup successful 🎉 Please login now.");
      window.location.href = "index.html";
    })
    .catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already registered. Please login.");
      } 
      else if (error.code === "auth/weak-password") {
        alert("Password must be at least 6 characters.");
      } 
      else {
        alert(error.message);
      }
    });
};


// 🔹 Login
window.login = function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Login Successful ✅");
      window.location.href = "dashboard.html";
    })
    .catch(err => alert(err.message));
};

// 🔹 Google Login
window.googleLogin = function () {
  signInWithPopup(auth, provider)
    .then(() => {
      alert("Google Login Successful 🔥");
      window.location.href = "dashboard.html";
    })
    .catch(err => alert(err.message));
};
