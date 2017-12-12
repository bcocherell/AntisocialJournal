var database = firebase.database();

// Adding journal entry after clicking button

$(document).on('click','#add-journal-btn', function(event) {
  event.preventDefault();

  var user = firebase.auth().currentUser;

  if (user) {
    var html = $('#summernote').summernote('code');

    var date = moment($("#calendar").datepicker("getDate")).format('YYYYMMDD');

    database.ref(user.uid + '/' + date).push(html);

    // reset and place focus on summernote

    $('#summernote').summernote('reset');
    $('#summernote').summernote('focus');
  }
});

// Displays entries for the date specificed for the logged in user

function displayEntries(date) {

  var user = firebase.auth().currentUser;

  // Checking if user logged in or not

  if (user) {
    $('#posts').empty();

    // Query firebase for posts

    var ref = firebase.database().ref(user.uid + '/' + moment(date, 'MM/DD/YYYY').format('YYYYMMDD'));

    ref.orderByKey().on("child_added", function(snapshot) {
      var panel = $('<div class="panel panel-default">');
      var panelBody = $('<div class="panel-body post">').html(snapshot.val());
      panel.append(panelBody);
      $('#posts').prepend(panel);

    });
  }
}
