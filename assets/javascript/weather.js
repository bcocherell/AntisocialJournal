var latitude = 41.5042
var longitude =  -81.6067;

function success(pos) {
  latitude = pos.coords.latitude;
  longitude = pos.coords.longitude;
};

navigator.geolocation.getCurrentPosition(success);

function displayWeather(date) {

  // call dark sky api using ajax and display repsonses 
  // sample request searching by release date
  // https://api.darksky.net/forecast/a1514747c9e6cf3e0135fa384759ee73/41.50427080000001,-81.60676649999999,1481259600?exclude=currently,flags

  // expecting date in certain format (YYYY-MM-DD)

  var beginningDateFormat = "MM/DD/YYYY";
  var endingDateFormat = "X";

  // returns historic weather for place & time

  var time = moment(date, beginningDateFormat).format(endingDateFormat);

  var queryurl = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/a1514747c9e6cf3e0135fa384759ee73/' + latitude + ',' + longitude + ',' + time;
      queryurl += '?exclude=currently,flags';

  $.ajax({
    url: queryurl,
    method: 'GET',
  }).done(function(response) {

    var weather = response.daily.data;
        
    $('#weather').empty();

    var summary = $('<p class="lead">').text(weather[0].summary);
    var high = $('<small>').html('<br />High: ' + Math.round(weather[0].temperatureHigh) + '&deg;'); 
    var low = $('<small>').html('<br />Low: ' + Math.round(weather[0].temperatureLow) + '&deg;'); 
    var icon = $('<canvas id="icon" width="64" height="64">');

    if (typeof(user_hood) != "undefined"){
      $('#weather').append(hood);  
    }

    if (typeof(user_city) != "undefined"){
      $('#weather').append(cityState);  
    }

    $('#weather').append(summary);
    $('#weather').append(icon);

    weatherIcon(weather[0].icon);

    $('#weather').append(high);    
    $('#weather').append(low);  

    var p = $('<p>').html('<small>Powered by <a href="https://darksky.net/poweredby/">Dark Sky</a></small>');
    $('#weather').append(p);        

  });
}

function weatherIcon (weatherType) {
  var skycon = new Skycons({"color": "blue"});
  
  switch (weatherType) {
    case "clear-day":
      skycon.add("icon", Skycons.CLEAR_DAY);
      break;
    case "clear-night":
      skycon.add("icon", Skycons.CLEAR_NIGHT);
      break;
    case "partly-cloudy-day":
      skycon.add("icon", Skycons.PARTLY_CLOUDY_DAY);
      break;
    case "partly-cloudy-night":
      skycon.add("icon", Skycons.PARTLY_CLOUDY_NIGHT);
      break;
    case "cloudy":
      skycon.add("icon", Skycons.CLOUDY);
      break;
    case "rain":
      skycon.add("icon", Skycons.RAIN);
      break;
    case "sleet":
      skycon.add("icon", Skycons.SLEET);
      break;
    case "snow":
      skycon.add("icon", Skycons.SNOW);
      break;
    case "wind":
      skycon.add("icon", Skycons.WIND);
      break;
    case "fog":
      skycon.add("icon", Skycons.FOG);
      break;
  }
  skycon.play();
}
