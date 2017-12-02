//https://firebase.google.com/docs/auth/web/google-signin
// firebase key for the project 


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD0ZB74rJGKM-S0jSnWJxGpheUsc2FEzf0",
    authDomain: "antisocial-network-187818.firebaseapp.com",
    databaseURL: "https://antisocial-network-187818.firebaseio.com",
    projectId: "antisocial-network-187818",
    storageBucket: "",
    messagingSenderId: "538567016572"
  };
  firebase.initializeApp(config);

  var userDate = "19720501";	//Year must be in the format YYYYMMDD

  var urlNYT = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  urlNYT += '?' + $.param({
		'api-key': "421ad4f235d44b1d98214fda597d20bd",	//NY Times API key
		'begin_date': userDate,
		'end_date': userDate,
		//This will return just a snippet of the article, including the web_url will allow
		//the user to investigate further
		'fl': "web_url, snippet",	//could also use lead_paragraph instead of snippet
		'page': 0,	//a value of 0 returns the first 10 items (0-9), 1 returns (10-19), etc.
		// 'facet_field': "section_name",
		// 'facet_filter': "true"
	});
	$.ajax({
  	url: urlNYT,
  	method: 'GET',
	}).done(function(result) {
  	console.log(result);
	}).fail(function(err) {
  	throw err;
	});