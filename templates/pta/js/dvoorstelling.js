(function($) {

	jQuery.noConflict();
    $("document").ready(function() {
		/* ----------------------------------------------------------------
		Set cookie variable
		-----------------------------------------------------------------*/
		var COOKIE_NAME = window.EPS.cookie;

		var protocol = window.location.protocol;
		var hostname = window.location.host; // includes hostname, colon and
												// port (if specified)
		var host = protocol;
		host += '//';
		host += hostname;
		// base name
		var base='/' + document.location.pathname.split('/')[1];

		var relationDataJSON=$.cookie('relationData');
		var relationData=JSON.parse(relationDataJSON);
		var authenticated = $.cookie(COOKIE_NAME);

//     	var bestellen=$('body.bestellen');
// 		alert(bestellen.length);
//     	if ( bestellen.length > 0  && authenticated != 'authenticated'  && ( relationData === null || relationData === 'undefined') ){
// 		var activity = $.getUrlVar('activity');
// 			// niet ingelogd, ga naar inlogscherm
// 			var newWindowLocation = host + '/inloggen?activity='+activity;
// 			window.location = newWindowLocation;
//     	} else{
// 		alert('x');
//     	}
		/* ----------------------------------------------------------------
		General function for transforming a string (EPSVenue date) into a date
		-----------------------------------------------------------------*/
		function str2date(str) {
			try {
				var t = (str).split(/[- :]/);
				return new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
			} catch (err) {
				alert(err);
			}
		}
		/* ----------------------------------------------------------------
		PURE function for displaying one activity
		-----------------------------------------------------------------*/

		var activity = $.getUrlVar('activity');
		if (activity==undefined) {
			activity=0;
		}
		var production = jlinq.from(productions.EPSVenue.getReportData.Record)
			.equals("Id", activity)
			.first({
				succes:false,
				message:"Oeps! Er is geen activiteit gevonden"
			});

		var directive = {
					'div.image': 'Image',
					'h1.uitvoerenden': 'Uitvoerenden',
					'h2.titel': 'Titel',
					'h2.titel': 'Subtitel',
					'li.datum': '<h3>datum</h3>#{Datum}',
					'li.tijd': '<h3>tijd</h3>#{Tijd}',
					'li.locatie': '<h3>zaal</h3>Grote Zaal',
					'li.prijs': '<h3>prijs</h3>#{Prijs}',
					'li.arrangement a@href':'/theater-diner?activity=#{'+activity+'}',
 					'div.bestelknop a@href': '/bestellen?activity=#{'+activity+'}',
					'div.omschrijving': 'Omschrijving'
		};
		$('#voorstelling').render(production, directive);

		/* ----------------------------------------------------------------
		PURE function for displaying one activity
		-----------------------------------------------------------------*/
// 		var directives = {
// 			'li.voorstelling': {
// 				'obj<-EPSVenue.getReportData.Record': { // "for obj in items"
// 					'@class': function(){
// 						return str2date(this.attributes.StartDatum).getMonth();
// 					},
// 					'div.datum': function(){
// 						return str2date(this.attributes.StartDatum);
// 					},
// 					'div.uitvoerenden': 'obj.Uitvoerenden',
// 					'a.titel': 'obj.Titel',
// 					'a.titel@href': 'obj.Id',
// 					'a.meerinfo@href':'/voorstelling?activity=#{obj.pos}#{&t=}#{obj.Titel}',
// 					'span.prijs': 'obj.Prijs',
// 					'a.meerinfo@href':'/voorstelling?activity=#{obj.pos}#{&t=}#{obj.Titel}',
// 					
// 				}
// 			}
// 		};
// 	
// 		$('#voorstellingen').render(productions, directives);

    });

})(jQuery)