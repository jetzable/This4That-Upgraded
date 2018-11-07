initializeFirebase();
let db = firebase.firestore();
let dbSettings = { timestampsInSnapshots: true };
db.settings(dbSettings);

const storage = firebase.storage();

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
    // location.href = "dashboard.html";
    // ...
  }
});

document.getElementById("signUp-button").addEventListener("click", event => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("pwd").value;
  const name = document.getElementById("name").value;
  const city = document.getElementById("city").value;
  const photo = document.getElementById("profilePhoto").files[0];
  const storageRef = firebase.storage().ref("profile_photos/" + photo.name);
  createUserProfileWithEmail(name, email, city, photo, storageRef);

  newAccount(email, password);
});
