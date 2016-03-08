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
					//var rendered = Mustache.render(template, {name: "Luke"});
    				//$('#target').html(rendered);
  				});
				/*var template = $('#series').html();

				//console.log(myMachin);
				var rendered = Mustache.render(template, myMachin);
				//console.log(response.data.results[0]);
				$('.resultats').html(rendered);*/
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





	$('#searchsubmit').on('click', function(e) {
		e.preventDefault();

		var ts = new Date().getTime();
		var myMd = md5(ts+_PRV_KEY+_API_KEY);
		var mySearch = $('#s').val();



$('.resultats').html('');
		//var myUrl = 'http://gateway.marvel.com/v1/public/comics?dateRange=2016-02-24%2C2016-02-24&orderBy=onsaleDate&limit=10&offset=10&ts='+ts+'&apikey='+_API_KEY+"&hash="+myMd;
		var myUrl = 'http://gateway.marvel.com/v1/public/series?title='+mySearch+'&ts='+ts+'&apikey='+_API_KEY+"&hash="+myMd;

		$.ajax({
  			url: myUrl ,
  			beforeSend: function( xhr ) {
    			xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
  			}
		})
  		.done(function( response ) {
			response = JSON.parse(response);
    		if ( console && console.log ) {
      		console.log( "Sample of data:", response);//response.data.results[0] );

			if (response.data.count > 0)
			{
				for (var c in response.data.results)
				{
					var serie = response.data.results[c];
					var html = "";
					html += '<div class="small-3 columns"><a href="#'+serie.id+'"><img src="'+serie.thumbnail.path+'/portrait_small.jpg">';
					html += '<h3>'+serie.title+'</h3></a></div>';
					$('.resultats').append(html);
					console.log(serie.title);
				}
			}
			else
			{
				alert('Aucun résultat');
			}

			/*var myHTML = $(".clone").html();
			myHTML = myHTML.replace("{{DATE}}", response.data.results[0].dates[0].date);
			myHTML = myHTML.replace("{{COVER}}", response.data.results[0].thumbnail.path+'.jpg');
			$('body').append(myHTML);*/


    }
  });


	//});
});

});
$(window).on('hashchange', function() {
	var myHash = window.location.hash;
	myHash = myHash.replace('#','');
	var ts = new Date().getTime();
	var myMd = md5(ts+_PRV_KEY+_API_KEY);
	$('.resultats').html('');
	var newUrl = 'http://gateway.marvel.com/v1/public/comics?series='+myHash+'&ts='+ts+'&apikey='+_API_KEY+"&hash="+myMd;
	$.ajax({
		url: newUrl ,
		beforeSend: function( xhr ) {
			xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
		}
	})
	.done(function( response ) {
		response = JSON.parse(response);
		if ( console && console.log ) {
		console.log( "Sample of data:", response);//response.data.results[0] );

		if (response.data.count > 0)
		{
			for (var c in response.data.results)
			{
				var serie = response.data.results[c];
				var html = "";
				html += '<div class="small-3 columns"><a href="#'+serie.id+'"><img src="'+serie.thumbnail.path+'.jpg">';
				html += '<h3>'+serie.title+'</h3></a></div>';
				$('.resultats').append(html);
				console.log(serie.title);
			}
		}
		else
		{
			alert('Aucun résultat');
		}

		/*var myHTML = $(".clone").html();
		myHTML = myHTML.replace("{{DATE}}", response.data.results[0].dates[0].date);
		myHTML = myHTML.replace("{{COVER}}", response.data.results[0].thumbnail.path+'.jpg');
		$('body').append(myHTML);*/


}
});
});
