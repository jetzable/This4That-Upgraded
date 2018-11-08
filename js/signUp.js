initializeFirebase();
const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
    let displayName = user.displayName;
    let email = user.email;
    let emailVerified = user.emailVerified;
    let photoURL = user.photoURL;
    let isAnonymous = user.isAnonymous;
    let uid = user.uid;
    let providerData = user.providerData;
    location.href = "../views/dashboard.html";
  } else {
    // User is signOut.
  }
});
