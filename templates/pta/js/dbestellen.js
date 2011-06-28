(function($) {

	jQuery.noConflict();
	
    $("document").ready(function() {
    	console.log(shoppingcard);
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

		/* ----------------------------------------------------------------
		Check if visitor is logged in
		-----------------------------------------------------------------*/
		var relationDataJSON=$.cookie('relationData');
		var relationData=JSON.parse(relationDataJSON);
		var authenticated = $.cookie(COOKIE_NAME);

    	var voegtoe=$('body.voegtoe');
    	if ( voegtoe.length > 0  && authenticated != 'authenticated'  && ( relationData === null || relationData === 'undefined') ){
		var activity = $.getUrlVar('activity');
			// niet ingelogd, ga naar inlogscherm
			var newWindowLocation = host + '/inloggen?activity='+activity;
			window.location = newWindowLocation;
    	}
		
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
		General function for generating LOV with option numbers
		-----------------------------------------------------------------*/
		function buildlov(quantity){
			var optionvalue = '';

			for (var i=0; i<= quantity; i++) {
				optionvalue += '<option value="'+i+'">'+i+'</option>';
			}

			return optionvalue;
		}
		/* ----------------------------------------------------------------
		PURE function for displaying one activity
		-----------------------------------------------------------------*/

		/* [1] get the activity in the url                               */
		var activity = $.getUrlVar('activity');
		if (activity==undefined) {
			activity=0;
		}
		/* [2] pass the activityId in the query (using jlinkq)           */
		var production = jlinq.from(productions.EPSVenue.getReportData.Record)
			.equals("Id", activity)
			.first({
				succes:false,
				message:"Oeps! Er is geen activiteit gevonden"
			});
		/* TODO
			1. lijstje van aantal wisselt te bestellen tickets moet variabel zijn
			2. bestelknop dynamisch: pas later kunnen bestellen
		*/
		/* [3] map the content with the view elements                    */
		var directive = {
					'div.image': 'Image',
					'h1.uitvoerenden': 'Uitvoerenden',
					'h2.titel': 'Titel',
					'li.datum': '<h3>datum</h3>#{Datum}',
					'li.tijd': '<h3>tijd</h3>#{Tijd}',
					'li.locatie': '<h3>zaal</h3>Grote Zaal',
					'li.prijs': '<h3>prijs</h3>#{Prijs}',
					'select#ntickets': buildlov(10), /* TODO: attribute in JSON about max amount of tickets */
					'select#nmenus': buildlov(10),
					'li.arrangement a@href':'/theater-diner?activity=#{'+activity+'}'
		};
		/* [4] parse the content in the html                             */
		$('#bestellen').render(production, directive);


		var dshoppingcard = {
			'tr.item': {
				'obj<-EPSVenue.Data.activityAr': { // "for obj in items"
// 					'tr.item td.quantity-wrapper input.quantity': 'obj.tickets',
					'tr.item a.name': 'obj.performers',
					'tr.item a.name@href': '/voorstelling?activity=#{obj.Id}',
					'tr.item a.name@title': 'ga naar voorstelling #{obj.title}',
					'tr.item td.cart-total span.subtotal.currency': 'obj.price'
// 					'div.row1 div.afbeelding@style':'background: url(http://www.keizerkarelpodia.nl/pub/images/media/assets/#{obj.attributes.AfbeeldingBestandsnaam}) center center',
// 					'a.datum': '#{obj.attributes.LeesbareDatum}',
// 					'a.datum@href':'/voorstelling?record=#{obj.pos}&activity=#{obj.Id}',
// 					'a.uitvoerenden': 'obj.Uitvoerenden',
// 					'a.uitvoerenden@href': '/voorstelling?record=#{obj.pos}&activity=#{obj.Id}',
// 					'div.row1 div.titeldiv a.titel': 'obj.Titel',
// 					'a.titel@href':'/voorstelling?record=#{obj.pos}&activity=#{obj.Id}',
// 					'div.row1 div.titeldiv a.titel@title':'klik voor details #{obj.Titel}'
				}
			}
		};
		if(shoppingcard){
			$('#loading_cart').hide();
		}
		$('#cart').render(shoppingcard, dshoppingcard);
		$('#cart').show();
		/* ----------------------------------------------------------------
		CONTROLLERS in the Page
		-----------------------------------------------------------------*/
		$('#buttonwinkelwagen').click(function(){
			var ntickets = $("#ntickets");
			validateAmountTickets(ntickets);
		});
		$("#ntickets").change(function(){
			var nmenus = $("#nmenus");
			var ntickets = $("#ntickets");
			if(ntickets.val() == 0){
				$("span.error.tickets").html('Selecteer minimaal 1 ticket.').css({'display':'block','padding-top':'3px'});
				compareTicketMenus(ntickets, nmenus);
				return false;
			} else {
				compareTicketMenus(ntickets, nmenus);
				return true;
			}
		});
		$("#nmenus").change(function(){
			var nmenus = $("#nmenus");
			var ntickets = $("#ntickets");
			if(nmenus.val() == 0 ){
				$("div.theatermenu").hide();
			} else  {
				$("div.theatermenu").show();
				compareTicketMenus(ntickets, nmenus);
			}
		});
		/* ----------------------------------------------------------------
		FUNCTIONS
		-----------------------------------------------------------------*/
		function compareTicketMenus(ntickets, nmenus) {
			if( nmenus.val() > 0 && (nmenus.val() > ntickets.val() || nmenus.val() < ntickets.val()) ){
				$("span.error.arrangement").html('Let op, is het aantal juist?').css({'display':'block','padding-top':'3px'});
				return true;
			} else {
				$("span.error").html('');
				$("span.arrangement").html('');
				return true;
			}
		}
		function validateAmountTickets(ntickets) {
			if(ntickets.val() == 0){
				$("span.error.tickets").html('Selecteer minimaal 1 ticket.').css({'display':'block','padding-top':'3px'});
				return false;
			} else {
				$("span.error").html('');
				claimUnplacedSeats(ntickets.val(), activity);
// 					var newWindowLocation = host + '/winkelwagen';
// 					window.location = newWindowLocation;
			}
		}
		function claimUnplacedSeats(ntickets, activity) {
		
			// get window object
			var key = window.EPS.key;
			var url = window.EPS.url;

			// get cookie
			var sessionIdEnc=$.cookie(COOKIE_NAME+'SessionIdEnc');

			// get from form
			var activity_fk = activity;
			var t_9 = ntickets; /* aantal tickets - normaal tarief */
			var t_10 = '';
			var t_11 = '';
			var t_183 = '';

			// static Posttheater specific
			var extra_cost = 77; /* kosten */
			var rank_name = 7; /* vrije zit */
			var sales_status = 2; /* is altijd 2 = definitief */
		
			$.ajax( {
				url : url,
				type : "post",
				async : false,
				dataType : 'jsonp', /* for crossdomein */
				data : {
					a : 'claimUnplacedSeats',
					key : key,
					sessionId: sessionIdEnc,
					activity_fk: activity,
					extra_cost_fk: extra_cost,
					rank_name_fk: rank_name,
					sales_status_fk: sales_status,
					t_9: t_9,
					t_10: t_10,
					t_11: t_11,
					t_183: t_183
				},
				success : function(e) {
					console.log(e);
				}
			});
			
		}
		function getItemsInBasket() {
			try {
		
				// get window object
				var key = window.EPS.key;
				var url = window.EPS.url;
				
				/* get activityId when users clicked on ordered and was not logged in */
				var activity = $.getUrlVar('activity');

				// get cookie
				var sessionIdEnc=$.cookie(COOKIE_NAME+'SessionIdEnc');
				
				var sales_channel_fk = 0;     /* Het verkoopkanaal */
				var last_selected_by = '';    /* De string met de gebruiker waarvan het mandje wordt opgehaald (combinatie van email-adres en sessionId) */
				var ticket_extra_cost_fk = 0; /* Het Id van de bestelkosten */
				var delivery_method_fk = 0;   /* Het Id van de leveringsmethode */

				$.ajax({
					url: url,
					type: "post",
					async: false,
					dataType:'jsonp', /* for crossdomain */
					data: {
						a: 'getItemsInBasket',
						key: key,
						sessionId: sessionIdEnc,
						sales_channel_fk: sales_channel_fk,
						last_selected_by: last_selected_by,
						ticket_extra_cost_fk: ticket_extra_cost_fk,
						delivery_method_fk: delivery_method_fk,
						format: 'JSON'
					},
					success: function(e) {
						var Code = e.EPSVenue.Result.Code;
						var Message = e.EPSVenue.Result.Message;
						if (Code==0){
							var shoppingData = e.EPSVenue.Data;
							if (shoppingData.count === 1) {
								$('#cart').show();
								shoppingDataJSON=JSON.stringify(shoppingData)
								$.cookie('shoppingData', shoppingDataJSON);
							}
						} else {
							$("span.error").html(Message +'\n(' + Code + ')');
						}
					}
				});	
			} catch(err) {
				alert(err);
			}
		}
	});

})(jQuery)