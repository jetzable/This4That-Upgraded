initializeFirebase();
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
    const displayName = user.displayName;
    const email = user.email;
    const emailVerified = user.emailVerified;
    const photoURL = user.photoURL;
    const isAnonymous = user.isAnonymous;
    const uid = user.uid;
    const providerData = user.providerData;
    location.href = "views/dashboard.html";
    // ...
  } else {
    // User is signed out.
    // ...
  }
});

document.getElementById("login-button").addEventListener("click", event => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("pwd").value;
  loginUser(email, password);
});

// document.getElementById("google-sign-in").addEventListener("click", event => {
//   event.preventDefault();
//   googleUserLogin();
// });
