initializeFirebase();
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
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
