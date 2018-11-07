// Initialize Firebase //
window.initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyDo3-zw_oeSbAoLY1xuYSau0U3XLRPwIaE",
    authDomain: "this4that-4cc91.firebaseapp.com",
    databaseURL: "https://this4that-4cc91.firebaseio.com",
    projectId: "this4that-4cc91",
    storageBucket: "this4that-4cc91.appspot.com",
    messagingSenderId: "1028442353236"
  });
};

// Register new Account //
window.newAccount = (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      verifyAccountWithEmail();
      swal(
        "Great!",
        "An email has been sent to your account to verify your info.",
        "info"
      ).then(() => {
        signOutUser();
        location.href = "../";
      });
    })
    .catch(error => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorMessage);
      if (errorCode === "auth/invalid-email") {
        swal("Try again!", "Provide a valid address", "error");
      } else if (errorCode === "auth/weak-password") {
        swal("Try again!", "Provide a valid password", "error");
      } else if (errorCode === "auth/email-already-in-use") {
        swal("Try again!", "User already exist!", "error");
      }
    });
};

// Send email to verify email account //
window.verifyAccountWithEmail = () => {
  let user = firebase.auth().currentUser;

  user
    .sendEmailVerification()
    .then(() => {
      // Email sent.
      console.log("Email sent.");
    })
    .catch(error => {
      // An error happened.
      console.log(error);
    });
};

// Login function //
window.loginUser = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      location.href = "views/dashboard.html";
    })
    .catch(error => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode === "auth/wrong-password") {
        swal("Try again", "Wrong Password!", "error");
      } else if (
        errorCode === "auth/user-not-found" ||
        errorCode === "auth/invalid-email" ||
        errorCode === "auth/argument-error"
      ) {
        swal("Try again", "User doesn't exist!", "error");
      } else if (
        errorCode === "auth/account-exists-with-different-credential"
      ) {
        swal("Try again", "User already exist!", "error");
      }
    });
};

// Google Sign-In //
window.googleUserLogin = () => {
  let provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  firebase.auth().useDeviceLanguage();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      let token = result.credential.accessToken;
      // The signed-in user info.
      let user = result.user;
      location.href = "views/dashboard.html";
      // ...
    })
    .catch(error => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      // The email of the user's account used.
      let email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      let credential = error.credential;
      if (errorCode === "auth/account-exists-with-different-credential") {
        swal("Try again!", "Email already registered.", "error");
      }
      // ...
    });
};

// LogOut function //
window.signOutUser = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {})
    .catch(error => {
      // An error happened.
      console.log(error);
    });
};

// Reset password //
window.passwordReset = userEmail => {
  let auth = firebase.auth();

  auth
    .sendPasswordResetEmail(userEmail)
    .then(() => {
      // Email sent.
      swal(
        "Great!",
        "Email has been sent to your email to reset your password.",
        "success"
      );
      location.href = "../index.html";
    })
    .catch(error => {
      // An error happened.
      console.log(error);
    });
};

// Creating profile //
window.createUserProfileWithEmail = (name, email, location, image, ref) => {
  ref
    .put(image)
    .then(snapshot => {
      snapshot.ref.getDownloadURL().then(url => {
        localStorage.setItem("profilePhotoUrl", url);
      });
    })
    .then(() => {
      const photoUrlId = localStorage.getItem("profilePhotoUrl");
      console.log(photoUrlId);
      db.collection("users")
        .add({
          userName: name,
          userEmail: email,
          city: location,
          trades: [],
          profilePhoto: photoUrlId
        })
        .then(docRef => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(error => {
          console.error("Error adding document: ", error);
        });
    });
};
