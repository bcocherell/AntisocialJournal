$(document).ready(function () {

	moment().format('YYYY-MM-DD');
	
	// var userDate = "19720501";	//Year must be in the format YYYYMMDD	
	$('#dateSubmit').on('click', function(){

		var date = $('#calendar').val();

		console.log(date);

		var beginningDateFormat = "MM/DD/YYYY";
		var endingDateFormat = "YYYYMDD";

		// returns up to 10 movies sorted by popularity around the timeframe you selected

		var beginDate = moment(date, beginningDateFormat).format(endingDateFormat);
		var endDate = moment(date, beginningDateFormat).add(1, 'days').format(endingDateFormat);

		// console.log(date);
		console.log('begin: ' + beginDate);
		console.log('end: ' + endDate);

		if (date) {

			// console.log(formattedDate);

			var urlNYT = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
		  urlNYT += '?' + $.param({
				'api-key': "421ad4f235d44b1d98214fda597d20bd",	//NY Times API key
				'begin_date': beginDate,
				'end_date': endDate,
				//This will return just a snippet of the article, including the web_url will allow
				//the user to investigate further
				'fl': "web_url, snippet",	//could also use lead_paragraph instead of snippet
				'page': 0,	//a value of 0 returns the first 10 items (0-9), 1 returns (10-19), etc.
				// 'facet_field': "section_name",
				// 'facet_filter': "true"
			});

		  if (beginDate) {
		  	$.ajax({
			  	url: urlNYT,
			  	method: 'GET',
				}).done(function(result) {
			  	console.log(result);
			  	for (var i = 0; i < 5; i++) {
						console.log(result.response.docs[i].web_url);
						console.log(result.response.docs[i].snippet);
						var newsDiv = $('<div class="news-div">' + result.response.docs[i].snippet + '</div>');
						var urlDiv = $('<div class="url-div">').html('<a href=' + result.response.docs[i].web_url + ' rel="noopener noreferrer" target="_blank">' + result.response.docs[i].web_url + '</a></div>');
						$('#NewsArticlesAPI').append(newsDiv);
						$('#NewsArticlesAPI').append(urlDiv);
						$('#NewsArticlesAPI').append('<br>');
					}
				}).fail(function(err) {
			  	throw err;
				});
		  }
		  var user = firebase.auth().currentUser;
		  console.log('current user: ' + user);
		}

	});

});
