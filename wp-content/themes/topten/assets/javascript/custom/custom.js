var marvelAPI = {
	_API_KEY: "ba66c86c420e7ca36eaec55044792546",
	_PRV_KEY: "f402e5215aaaac69583eb43f3fb4a06146722476",
	_URL: "http://gateway.marvel.com/v1/public/",
	_PATH: "/wp-content/themes/topten/assets/tpls/",
	results: "",

	series: function() {
		var method = 'series';
		var myTs = new Date().getTime();
		var params = {
			title: $('#s').val(),
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
				$.get( self._PATH+method+'.mst', function(template) {
					Mustache.parse(template);
					var myMachin = {};//response.data.results;
					myMachin.bidule = response.data.results;
					var rendered = Mustache.render(template, myMachin);
					$('.resultats').html(rendered);
  				});
			}
		});
	},

	callBack: function() {
		return 'ok---';
	},

	constructURL: function(method, params) {
		return this._URL+method+'?'+$.param(params);
	}
};


console.log(marvelAPI._URL);







$(function() {

	$('.myClick').on('click', function(e) {
		e.preventDefault();
		marvelAPI.series();
	});

	if (window.location.hash !== "")
	{
		var idSerie = window.location.hash.substr(1);
		marvelAPI.comics(idSerie);
	}

});
