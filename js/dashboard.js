initializeFirebase();
let db = firebase.firestore();
let dbSettings = { timestampsInSnapshots: true };
db.settings(dbSettings);

const storage = firebase.storage();

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
    let displayName = user.displayName;
    const email = user.email;
    const emailVerified = user.emailVerified;
    let photoURL = user.photoURL;
    const isAnonymous = user.isAnonymous;
    const uid = user.uid;
    const providerData = user.providerData;

    if (displayName === null || photoURL === null) {
      db.collection("users")
        .get()
        .then(users => {
          users.forEach(user => {
            const userEmail = user.data().userEmail;
            if (email === userEmail) {
              displayName = user.data().userName;
              photoURL = user.data().profilePhoto;
              localStorage.setItem("city", user.data().city);
              localStorage.setItem("userName", displayName);
              localStorage.setItem("userPhoto", photoURL);
            }
          });
        })
        .catch(err => console.log(err));
    } else {
      localStorage.setItem("userName", displayName);
      localStorage.setItem("userPhoto", photoURL);
    }
    localStorage.setItem("userEmail", email);
    // ...
  } else {
    location.href = "../";
  }
});

document.getElementById("logOutBtn").addEventListener("click", event => {
  event.preventDefault();
  localStorage.setItem("userName", "");
  localStorage.setItem("userEmail", "");
  localStorage.setItem("userPoto", "");
  localStorage.setItem("city", "");
  signOutUser();
});
