$(document).ready(function () {

  $(function() {
    $('#calendar').datepicker( {
        onClose: function(date) {
          if (date) {
            displayMovies(date);
            displayWeather(date);
            displayArticles(date);
            displayEntries(date)
          }
        }
    });
  });

  // setting up current date on page load
  var date = moment().format('MM/DD/YYYY');

  $('#calendar').val(date);
  displayMovies(date);
  displayWeather(date);
  displayArticles(date);
});