(function($) {
	jQuery.noConflict();
	//var options = { path: '/', expires: 0 };
	jQuery.noConflict();
    $("document").ready(function() {
	});

	
	function getTest() {

		try {
			var host = window.location.host;
			var url = 'http://217.149.214.212/posttheater/js.php';
	
			// get cookie	
			var sessionId=$.cookie(COOKIE_NAME);
		
			$.ajax({
				url: url,
				type: "post",
				dataType:'jsonp',
				data: {
					a: 'test',
					host: host
				},
				success: function(e) {
					var Code=e.EPSVenue.Result.Code;
					var Message=e.EPSVenue.Result.Message;
				}
			});	
		} catch(err) {
			alert(err);
		}
	}
})(jQuery)