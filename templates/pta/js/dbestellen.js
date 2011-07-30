(function($) {

	jQuery.noConflict();
	
    $("document").ready(function() {

		var itemsInBasket = new Array();
    	var itemsinshoppingcard = shoppingcard.EPSVenue.Data.activityAr.length;
    	if (itemsinshoppingcard > 0) {
    		$('#cart').show();
    	}
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
 			var day = datum.getDay();
 			var date = datum.getDate();
 			var month = datum.getMonth();
 			var year = datum.getYear();
 			var hour = datum.getHours();
 			var minutes = datum.getMinutes();
		}
		/* ----------------------------------------------------------------
		General function for generating LOV with option numbers
		-----------------------------------------------------------------*/
		function buildlov(quantity){
			var optionvalue = '';
			// get items selected in this session
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
			if(false && ntickets.val() == 0){
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
			if(false && ntickets.val() == 0){
				$("span.error.tickets").html('Selecteer minimaal 1 ticket.').css({'display':'block','padding-top':'3px'});
				return false;
			} else {
				$("span.error").html('');
				claimUnplacedSeats(ntickets.val(), activity);
// 					var newWindowLocation = host + '/winkelwagen';
// 					window.location = newWindowLocation;
			}
		}
		/* ----------------------------------------------------------
		 * claimUnplacedSeats
		 * ------------------------------------------------------- */
		function claimUnplacedSeats(ntickets, activity) {
			// get window object
			var key = window.EPS.key;
			var url = window.EPS.url;

			// get cookie
			var sessionIdEnc=$.cookie(COOKIE_NAME+'SessionIdEnc');

			// get from form
			var activity_fk = activity;
			var t_9 = ntickets; /* aantal tickets - normaal tarief */

			// static Posttheater specific
			var extra_cost_fk = 29; /* hard coded: 29 = administratiekosten Posttheater */
			var rank_name = 7; /* hard coded: 7 = vrije zit */
			var sales_status = 2; /* hard coded: 2 = definitief */
			
			$.ajax( {
				url : url,
				type : "post",
				async : false,
				dataType : 'jsonp', /* for crossdomein */
				data : {
					a : 'claimUnplacedSeats',
					key : key,
					sessionIdEnc: sessionIdEnc,
					activity_fk: activity,
					extra_cost_fk: extra_cost_fk,
					rank_name_fk: rank_name,
					sales_status_fk: sales_status,
					t_9: t_9
				},
				success : function(e) {
					$('#buttonwinkelwagen').val('Bewaard');
					var msg = '<a href="/voorstellingen">&lt; verder met bestellen</a>';
					if(e.EPSVenue.Sale.claimUnplacedSeats.totalAmount != 0) {
						msg += ' | <a href="/winkelwagen">verder met betalen &gt;</a>';
					}
					if($('#new').length != 0) {
						var HTMLStr = msg;
						$('#new').html(HTMLStr);
					} else {
						var divOpen = '<div id="new" style="float:right">';
						var divClose = '</div>';
						var HTMLStr = divOpen + msg + divClose;
						$('.bestellen').append(HTMLStr);

					}
				}
			});
			
		}
		/* ----------------------------------------------------------
		 * getItemsInBasket
		 * ------------------------------------------------------- */
		function getItemsInBasket() {
			// get window object
			var key = window.EPS.key;
			var url = window.EPS.url;
			
			/* get activityId when users clicked on ordered and was not logged in */
			var activity = $.getUrlVar('activity');

			// get cookie
			var COOKIE_NAME = window.EPS.cookie;
			var sessionIdEnc = $.cookie(COOKIE_NAME+'SessionIdEnc');
			var relationDataJSON=$.cookie('relationData');
			if(relationDataJSON == null) {
				return;
			}
			var relationData = JSON.parse(relationDataJSON);
			var sales_channel_fk  = relationData.sessionData.sales_channel_fk ;
			var ticket_extra_cost_fk = relationData.sessionData.ticket_extra_cost_fk;
			var delivery_method_fk = relationData.sessionData.delivery_method_fk;
			
			
			// toont ophalen, kan soms even duren...
							var divOpen = '<div id="new" style="float:right">';
							var divClose = '</div>';
							var msg = '<table><tbody><tr><td><img alt="ophalen voorstellingen in mandje gegevens" src="/Websites/pta/Images/loading.gif" /></td><td style="vertical-align: middle;"> Ophalen gegevens</td></tr></tbody></table>';
							var HTMLStr = divOpen + msg + divClose;
							$('.bestellen').append(HTMLStr);			
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
					ticket_extra_cost_fk: ticket_extra_cost_fk,
					delivery_method_fk: delivery_method_fk,
					format: 'JSON'
				},
				success: function(e) {				
					var Code = e.EPSVenue.Result.Code;
					var Message = e.EPSVenue.Result.Message;
					if (Code==0){			
						var msg = '<a href="/voorstellingen">&lt; verder met bestellen</a>';
						var amountDue = e.EPSVenue.Data.amountDue;
						if(amountDue > 0) {
							$('#cart').show();
							msg += ' | <a href="/winkelwagen">verder met betalen &gt;</a>';
						}
						var itemsInBasket = e.EPSVenue.Data.activityAr;
						for(var lActivity in itemsInBasket) {
							if(activity == lActivity) {
								for(var lRankName in itemsInBasket[lActivity]) {
									for(var lTariff in itemsInBasket[lActivity][lRankName]) {
										var tickets = itemsInBasket[lActivity][lRankName][lTariff].tickets;
										$('#ntickets').val(tickets);
										$('#buttonwinkelwagen').val('Bewaar');
									}
								}
							}							
						}
						// toont knop met verdergaan met bestellen / betalen
						if($('#new').length != 0) {
							var HTMLStr = msg;
							$('#new').html(HTMLStr);
						} else {
							var divOpen = '<div id="new" style="float:right">';
							var divClose = '</div>';
							var HTMLStr = divOpen + msg + divClose;
							$('.bestellen').append(HTMLStr);
						}
						
					} else {
						$("span.error").html(Message +'\n(' + Code + ')');
					}
				}
			});	
		}
		
		
		// ==========================================================
		getItemsInBasket();

		
	});

})(jQuery)