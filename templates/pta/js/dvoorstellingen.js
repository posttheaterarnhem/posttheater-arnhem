(function($) {

	jQuery.noConflict();
	
    $("document").ready(function() {
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
		var directives = {
			'li.voorstelling': {
				'obj<-EPSVenue.getReportData.Record': { // "for obj in items"
					'@class': function(){
						return str2date(this.attributes.StartDatum).getMonth();
					},
					'div.column1 div.datum a.datum': '#{obj.attributes.LeesbareDatum}',
					'div.column1 div.datum a.datum@href':'/voorstelling?activity=#{obj.Id}',
					'div.column2 div.afbeelding@style':'background: url(http://www.keizerkarelpodia.nl/pub/images/media/assets/#{obj.attributes.AfbeeldingBestandsnaam}) center center',
					'a.uitvoerenden': 'obj.Uitvoerenden',
					'a.uitvoerenden@href': '/voorstelling?activity=#{obj.Id}',
					'div.column3 div.titeldiv a.titel': 'obj.Titel',
					'a.titel@href':'/voorstelling?activity=#{obj.Id}',
					'div.column3 div.titeldiv a.titel@title':'klik voor details #{obj.Titel}',
					'div.column4 span.prijs': 'obj.Prijs',
					'a.kaartenkopen@href': '/bestellen?activity=#{obj.Id}'
				}
			}
		};
	
		$('#voorstellingen').render(productions, directives);

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
		var sysDate = new Date();
		var todaysMonth = sysDate.getMonth();
		var todaysDay = sysDate.getDate();

		/* ----------------------------------------------------------------
		On body load filter only the activities of the current month
		-----------------------------------------------------------------*/
		filterActivitiesPerMonth(todaysMonth);

		/* ----------------------------------------------------------------
		General function to filter the activities per month
		-----------------------------------------------------------------*/
		function filterActivitiesPerMonth(todaysMonth){
			/* mark the selected month in the date navigator */
			$("ul.selectMonth li a").removeClass();
			$('ul.selectMonth li a#'+todaysMonth).addClass('selectedPage');
			
			if (!todaysMonth) {
				$("div#voorstellingen ul li").show();
			} else if (todaysMonth == '12') {
				$("div#voorstellingen ul li").show('slow');
			} else {
				$("div#voorstellingen ul li").hide().filter(function() {
					return $(this).hasClass(todaysMonth);
				}).show('slow');
			}
		}

    });

})(jQuery)