var marvelAPI = {
	_API_KEY: "ba66c86c420e7ca36eaec55044792546",
	_PRV_KEY: "f402e5215aaaac69583eb43f3fb4a06146722476",
	_URL: "http://gateway.marvel.com/v1/public/",
	_PATH: "/wp-content/themes/topten/assets/tpls/",
	results: "",

	series: function(terme) {
		console.log(terme);
		var method = 'series';
		var myTs = new Date().getTime();
		var params = {
			title: terme.replace('+', ' '),//$('#s').val(),
			ts: myTs,
			apikey: this._API_KEY,
			hash: md5(myTs+this._PRV_KEY+this._API_KEY),
		};
		var url = this.constructURL(method, params);
		console.log(url);
		var data = this.getData(url, method);
	},
	comics: function(idSerie) {
		var method = 'comics';
		var myTs = new Date().getTime();
		var params = {
			series: idSerie,
			ts: myTs,
			apikey: this._API_KEY,
			hash: md5(myTs+this._PRV_KEY+this._API_KEY),
		};
		var url = this.constructURL(method, params);
		var data = this.getData(url, method);
	},
	single: function(idComics) {
		var method = 'comics';
		var myTs = new Date().getTime();
		var params = {
			ts: myTs,
			apikey: this._API_KEY,
			hash: md5(myTs+this._PRV_KEY+this._API_KEY),
		};
		var segment = '/'+idComics;
		var url = this.constructURL(method, params, segment);
		var data = this.getData(url, 'single');
	},

	getData: function(url, method) {
		var self = this;
		return $.ajax({
  			url: url ,
			beforeSend: function( xhr ) {
    			xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
  			}
		}).done(function( response ) {
			response = JSON.parse(response);
    		if ( console && console.log ) {
      			//console.log( "Sample of data:", response);//response.data.results[0] );
				self.results = response;
				$.get( self._PATH+'mytpl.html', function(template) {
					var currtpl = $(template).filter('#'+method).html();
					Mustache.parse(currtpl);
					var myMachin = {};//response.data.results;
					myMachin.bidule = response.data.results;
					var rendered = Mustache.render(currtpl, myMachin);
					$('.resultats').html(rendered);
  				});
			}
		});
	},

	callBack: function() {
		return 'ok---';
	},

	constructURL: function(method, params, segment) {
		segment = (segment !== undefined) ? segment : '' ;
		return this._URL+method+segment+'?'+$.param(params);
	}
};


//console.log(marvelAPI._URL);







$(function() {

	$('#searchsubmit').on('click', function(e) {
		//e.preventDefault();
		//marvelAPI.series();
	});
$('body').on('click', '.comicslink', function(){
	// Prevent default
	// apeler ton résultat
});

	console.log(window.location.search.substr(3));

	if (window.location.search !== "")
	{
		//var idSerie = window.location.hash.substr(1);
		var searchTerm = window.location.search.substr(3);
		console.log(searchTerm);
		//var idSerie = window.location.hash.substr(1);
		marvelAPI.series(searchTerm);
	}
	if (window.location.hash !== "")
	{
		console.log(window.location.pathname);
		if (window.location.pathname.indexOf('series') !== -1)
		{
			var idSerie = window.location.hash.substr(1);
			marvelAPI.comics(idSerie);
		}
		else
		{
			var idComics = window.location.hash.substr(1);
			marvelAPI.single(idComics);

		}


		//var searchTerm = window.location.search.substr(3);
		//console.log(searchTerm);
		//var idSerie = window.location.hash.substr(1);

	}

});
