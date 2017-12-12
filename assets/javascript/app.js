$(document).ready(function () {

  // This will track if the date has changed in the date picker
  $(function() {
    $('#calendar').datepicker( {
        onClose: function(date) {
          if (date) {
            renderSections();
          }
        }
    });
  });
});

function renderSections() {
    
    // This will update the different sections

    var date = moment($("#calendar").datepicker("getDate")).format('MM/DD/YYYY');

    // If user enters invalid date, update it to today's date

    if (date === "Invalid date") {
      date = moment().format('MM/DD/YYYY');
    }

    $('#calendar').val(date);
    displayMovies(date);
    displayWeather(date);
    displayArticles(date);
    displayEntries(date);
  }