// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyD0ZB74rJGKM-S0jSnWJxGpheUsc2FEzf0",
    authDomain: "antisocial-network-187818.firebaseapp.com",
    databaseURL: "https://antisocial-network-187818.firebaseio.com",
    projectId: "antisocial-network-187818",
    storageBucket: "antisocial-network-187818.appspot.com",
    messagingSenderId: "538567016572"
  };
  firebase.initializeApp(config);


  var database = firebase.database();

function getEntry() {
  var html = $('#entry').summernote('code');
  // var entry = $("#entry").val().trim();
  return html;
}
// Grabs user input  var html = $('#summernote').summernote('code');
function setEntry(value) {
  $('#entry').summernote('code', value);
}

function clearEntry() {
  setEntry("");
}

// 2. Button for adding journal html 34
$(function() {
      $("#add-journal-btn").on("click", function(event) {
        event.preventDefault();

        var entry = getEntry();
        // Uploads employee data to the database

        console.log(entry)
        database.ref("entries/").push(entry);

        // Alert
        alert("Entry successfully added");

        // Clears all of the text-boxes
        clearEntry();   
      });

  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref("entries/").on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val())
    // debugger;
  });
});