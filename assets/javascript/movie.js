function displayMovies(date) {

	// call TMDb API using ajax and display repsonses 
	// sample request searching by release date
	// https://api.themoviedb.org/3/discover/movie?api_key=c8aa2c9356ba04f47abb6bbc2d1a4077&&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=1980-12-04&primary_release_date.lte=1980-12-14

	// expecting date in certain format (YYYY-MM-DD)

	var beginningDateFormat = "MM/DD/YYYY";
	var endingDateFormat = "YYYY-MM-DD";

	// returns up to 10 movies sorted by popularity around the timeframe you selected

	var primary_release_date_gte = moment(date, beginningDateFormat).subtract(14, 'days').format(endingDateFormat);
	var primary_release_date_lte = moment(date, beginningDateFormat).add(7, 'days').format(endingDateFormat);

	var queryurl = 'https://api.themoviedb.org/3/discover/movie';
	  	queryurl += '?' + $.param({
	    'api_key': 'c8aa2c9356ba04f47abb6bbc2d1a4077',
	    'language': 'en-US',
	    'region': 'US',
	    'sort_by': 'popularity.desc',
	    'include_adult': 'false',
	    'include_video': 'false',
	    'page': '1',
	    'primary_release_date.gte': primary_release_date_gte,
	    'primary_release_date.lte': primary_release_date_lte,
	    'release_date.gte': primary_release_date_gte,
	    'release_date.lte': primary_release_date_lte
	});

	$.ajax({
		url: queryurl,
		method: 'GET',
	}).done(function(response) {

		var movies = response.results;
		var posterCount = 0;

		$('#movies').empty();

		// var p = $('<p>').html('<small>Popular movies at the time</small>');
		// $('#movies').append(p);

		for (var i = 0; i < movies.length && i < 10; i++) {

			if (movies[i].poster_path) {
				posterCount++;
				var div = $('<div class="img-movie">');
				var a = $('<a>');
				a.attr('href', 'https://www.themoviedb.org/movie/' + movies[i].id);
				a.attr('target', '_blank');
				var img = $('<img class="img-responsive">');
				img.attr('src', 'https://image.tmdb.org/t/p/w154/' + movies[i].poster_path);
				img.attr('alt', movies[i].title);	
				a.append(img);
				div.append(a);
				$('#movies').append(div);

				if (posterCount % 2 == 0) {
					var clear = $('<div class=clearfix>');
					$('#movies').append(clear);					
				}
			}
		}

		var img = $('<img class="img-responsive">');
		img.attr('src', 'assets/images/tmdb.png');
		img.attr('alt', 'TMDb attribution');
		img.css('padding-top','10px');
		$('#movies').append(img);
	});
}