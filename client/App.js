import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
var firebaseConfig = {
    apiKey: "AIzaSyBSF4DTIfBAs1B9OkVSmdSXKkx2FIGFpqU",
    authDomain: "voting-system-94342.firebaseapp.com",
    projectId: "voting-system-94342",
    storageBucket: "voting-system-94342.appspot.com",
    messagingSenderId: "390102264210",
    appId: "1:390102264210:web:0a35051ec937ecc635f94b",
    measurementId: "G-DJB7NYKSB4"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log(db);

// variable to access database collection
/*
// get submit test 
let submitButton = document.getElementById("submitTest")
// create Event Listen to Allow Form
submitButton.addEventListener("click",(e) =>{
    e.preventDefault

    // get form value
    let address = document.getElementById("voter-address").value
    let name = document.getElementById("voter-name").value
    let card = document.getElementById("voter-card").value
    let age = document.getElementById("voter-age").value
    let province = document.getElementById("voter-province").value

    // save data to firebase
    db.doc().set({
        address : address,
        age : age,
        card : card,
        name : name,
        province : province
    }).then(() => {
        console.log("Data saved")
    }).catch((error) => {
        console.log(error)
    })

})
*/