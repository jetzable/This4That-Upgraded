initializeFirebase();
let db = firebase.firestore();
let dbSettings = { timestampsInSnapshots: true };
db.settings(dbSettings);

const storage = firebase.storage();

const userInfoEmail = localStorage.getItem("userEmail");
const userInfoName = localStorage.getItem("userName");
const userInfoPhoto = localStorage.getItem("userPhoto");
const userInfoCity = localStorage.getItem("city");

if (userInfoEmail === "") {
  location.href = "../";
}

document.getElementById("profilePhoto").setAttribute("src", userInfoPhoto);
document.getElementById("profileName").innerHTML = `${userInfoName}`;
document.getElementById("profileEmail").innerHTML = `${userInfoEmail}`;
document.getElementById("profileCity").innerHTML = `${userInfoCity}`;

document.getElementById("logOutBtn").addEventListener("click", event => {
  event.preventDefault();
  localStorage.setItem("userName", "");
  localStorage.setItem("userEmail", "");
  localStorage.setItem("userPoto", "");
  localStorage.setItem("city", "");
  signOutUser();
});
