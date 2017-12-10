$(document).ready(function () {

  $(function() {
    $('#calendar').datepicker( {
        onSelect: function(date) {
            displayMovies(date);
            displayWeather(date);
            displayArticles(date);
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
