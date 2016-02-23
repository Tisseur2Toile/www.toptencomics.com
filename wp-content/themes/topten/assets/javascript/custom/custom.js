var _API_KEY = "ba66c86c420e7ca36eaec55044792546";
var _PRV_KEY = "f402e5215aaaac69583eb43f3fb4a06146722476";





$(function() {



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
