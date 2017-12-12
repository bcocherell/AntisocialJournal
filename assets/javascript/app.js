$(document).ready(function () {

  $(function() {
    $('#calendar').datepicker( {
        onClose: function(date) {
          if (date) {
            displayStuff();
          }
        }
    });
  });
});

function renderSections() {
    
    var date = moment($("#calendar").datepicker("getDate")).format('MM/DD/YYYY');

    if (date === "Invalid date") {
      date = moment().format('MM/DD/YYYY');
    }

    $('#calendar').val(date);
    console.log(date);
    displayMovies(date);
    displayWeather(date);
    displayArticles(date);
    displayEntries(date);
  }