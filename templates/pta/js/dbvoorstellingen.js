(function($) {

	jQuery.noConflict();
	
    $("document").ready(function() {
		var sysDate = new Date();

		/* ----------------------------------------------------------------
		Filter function for filtering the activities on the page
		-----------------------------------------------------------------*/
		$("input#zkvoorstellingen").keyup(function() {
			var terms = $(this).val().toLowerCase();
			if (!terms) {
				$("div#voorstellingen ul li").show();
			} else {
				$("div#voorstellingen ul li").hide().filter(function() {
					return ($(this).children("a").text().toLowerCase().indexOf(terms) > -1 );
				}).show();
			}
		});
		
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
		General function for formatting a date
		-----------------------------------------------------------------*/
		function dateFormat(datum){
			console.log(datum);
 			var day = datum.getDay();
			console.log(datum);
 			var date = datum.getDate();
			console.log(datum);
 			var month = datum.getMonth();
			console.log(month);
 			var year = datum.getYear();
			console.log(year);
 			var hour = datum.getHours();
			console.log(hour);
 			var minutes = datum.getMinutes();
			console.log(minutes);
 			console.log(day +' '+ date +' '+ month +' '+ year +' '+ hour +' '+ minutes);
		}

		/* ----------------------------------------------------------------
		PURE function for displaying one activity
		-----------------------------------------------------------------*/
// 
// 					var activity = $.getUrlVar('activity');
// 				
// 					if (activity==undefined) {
// 						activity=0;
// 					}
// 			
// 					var production = productions.EPSVenue.getReportData.Record[activity];
// 			
// 					var directive = {
// 								'a.datum': 'attributes.StartDatum',
// 								'a.uitvoerenden': 'Uitvoerenden',
// 								'a.titel': 'Titel',
// 								'a.prijs': 'Prijs',
// 								'span.omschrijving': 'Omschrijving',
// 					};
// 					$('#voorstelling').render(production, directive);

		/* ----------------------------------------------------------------
		PURE function for displaying one activity
		-----------------------------------------------------------------*/
		var i = 0;
		var directives = {
			'li.voorstelling': {
				'obj<-EPSVenue.getReportData.Record': { // "for obj in items"
					'@class': function(){
						if (str2date(this.attributes.StartDatum) > sysDate && i < 3){
							i++;
							return 'show';
						} else {
							return 'hide';
						}
					},
					'div.row1 div.afbeelding@style':'background: url(http://www.keizerkarelpodia.nl/pub/images/media/assets/#{obj.attributes.AfbeeldingBestandsnaam}) center center',
					'a.datum': '#{obj.attributes.LeesbareDatum}',
					'a.datum@href':'/voorstelling?activity=#{obj.Id}',
					'a.uitvoerenden': 'obj.Uitvoerenden',
					'a.uitvoerenden@href': '/voorstelling?record=#{obj.pos}&activity=#{obj.Id}',
					'div.row1 div.titeldiv a.titel': 'obj.Titel',
					'a.titel@href':'/voorstelling?record=#{obj.pos}&activity=#{obj.Id}',
					'div.row1 div.titeldiv a.titel@title':'klik voor details #{obj.Titel}'
				}
			}
		};
	
		$('#binnenkortvoorstellingen').render(productions, directives);

		/* ----------------------------------------------------------------
		The month selector for filtering activities per month
		-----------------------------------------------------------------*/
		$("ul.selectMonth li a").click(function() {
			var month = $(this).attr('id');
 			filterActivitiesPerMonth(month);
		});

		/* ----------------------------------------------------------------
		Preparation for displaying this months activities - determine this month
		-----------------------------------------------------------------*/
		var todaysMonth = sysDate.getMonth();
		var todaysDay = sysDate.getDate();

		/* ----------------------------------------------------------------
		On body load filter only the activities of the current month
		-----------------------------------------------------------------*/
		filterActivitiesOnHomepage();

		/* ----------------------------------------------------------------
		Function to filter the activities on the homepage
		-----------------------------------------------------------------*/
		function filterActivitiesOnHomepage(){
			$("div#binnenkortvoorstellingen ul li").hide().filter(function() {
				return $(this).hasClass('show');
			}).show('slow');
		}

    });

})(jQuery)