var randomDate = "02/23/1999";
var randomFormat = "MM/DD/YYYY";
var convertedDate = moment(randomDate, randomFormat);

displayMovies(convertedDate);

function displayMovies(date) {

	//call TMDb API using ajax and display repsonses 

	var primary_release_date_gte = '2017-11-15';
	var primary_release_date_lte = '2017-12-05';

	var queryurl = 'https://api.themoviedb.org/3/discover/movie';
	  	queryurl += '?' + $.param({
	    'api_key': 'c8aa2c9356ba04f47abb6bbc2d1a4077',
	    'language': 'en-US',
	    'region': 'US',
	    'sort_by': 'popularity.desc',
	    'include_adult': 'false',
	    'include_video': 'false',
	    'page': '1',
	    'primary_release_date.gte': '2017-11-15',
	    'primary_release_date.lte': '2017-12-05'
	});

	$.ajax({
		url: queryurl,
		method: 'GET',
	}).done(function(response) {

		var movies = response.results;

		$('#movies').empty();

		for (var i = 0; i < 3 && i < movies.length; i++) {

			var row = $('<div class="row">');
			var col1 = $('<div class="col-sm-4">');
			var p = $('<small>').text(movies[i].title);
			var col2 = $('<div class="col-sm-8">');
			var img = $('<img class="img-responsive">');
			img.attr('src', 'https://image.tmdb.org/t/p/w92/' + movies[i].poster_path);

			col1.append(p);
			col2.append(img);			
			row.append(col1);
			row.append(col2);

			$('#movies').append(row);
		}
	});
}