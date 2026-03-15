// js/upload.js
import { storage } from "./firebase.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

window.uploadSite = function() {
    const file = document.getElementById("sitefile").files[0];

    if (!file) {
        alert("Please select a file to upload!");
        return;
    }

    const storageRef = ref(storage, 'sites/' + file.name);

    uploadBytes(storageRef, file)
    .then(snapshot => {
        getDownloadURL(snapshot.ref)
        .then(url => {
            alert("Website uploaded successfully! Access URL: " + url);
        });
    })
    .catch(err => alert(err.message));
}