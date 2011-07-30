(function($) {


	jQuery.noConflict();
    $("document").ready(function() {
   
   		// Create index to map consecutive order to id
		var productionsAr = new Array();		
		function mapJSON2Array() {
			for (var Record in productions.EPSVenue.getReportData.Record) {
				Id=productions.EPSVenue.getReportData.Record[Record].Id;
				var key='"' + Id +'"';
				productionsAr[Id]=Record;
			}
		}
		mapJSON2Array();
		
		function number_format (number, decimals, dec_point, thousands_sep) {
			// http://kevin.vanzonneveld.net
			// +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
			// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
			// +     bugfix by: Michael White (http://getsprink.com)
			// +     bugfix by: Benjamin Lupton
			// +     bugfix by: Allan Jensen (http://www.winternet.no)
			// +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
			// +     bugfix by: Howard Yeend
			// +    revised by: Luke Smith (http://lucassmith.name)
			// +     bugfix by: Diogo Resende
			// +     bugfix by: Rival
			// +      input by: Kheang Hok Chin (http://www.distantia.ca/)
			// +   improved by: davook
			// +   improved by: Brett Zamir (http://brett-zamir.me)
			// +      input by: Jay Klehr
			// +   improved by: Brett Zamir (http://brett-zamir.me)
			// +      input by: Amir Habibi (http://www.residence-mixte.com/)
			// +     bugfix by: Brett Zamir (http://brett-zamir.me)
			// +   improved by: Theriault
			// +      input by: Amirouche
			// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
			// *     example 1: number_format(1234.56);
			// *     returns 1: '1,235'
			// *     example 2: number_format(1234.56, 2, ',', ' ');
			// *     returns 2: '1 234,56'
			// *     example 3: number_format(1234.5678, 2, '.', '');
			// *     returns 3: '1234.57'
			// *     example 4: number_format(67, 2, ',', '.');
			// *     returns 4: '67,00'
			// *     example 5: number_format(1000);
			// *     returns 5: '1,000'
			// *     example 6: number_format(67.311, 2);
			// *     returns 6: '67.31'
			// *     example 7: number_format(1000.55, 1);
			// *     returns 7: '1,000.6'
			// *     example 8: number_format(67000, 5, ',', '.');
			// *     returns 8: '67.000,00000'
			// *     example 9: number_format(0.9, 0);
			// *     returns 9: '1'
			// *    example 10: number_format('1.20', 2);
			// *    returns 10: '1.20'
			// *    example 11: number_format('1.20', 4);
			// *    returns 11: '1.2000'
			// *    example 12: number_format('1.2000', 3);
			// *    returns 12: '1.200'
			// *    example 13: number_format('1 000,50', 2, '.', ' ');
			// *    returns 13: '100 050.00'
			// Strip all characters but numerical ones.
			number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
			var n = !isFinite(+number) ? 0 : +number,
				prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
				sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
				dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
				s = '',
				toFixedFix = function (n, prec) {
					var k = Math.pow(10, prec);
					return '' + Math.round(n * k) / k;
				};
			// Fix for IE parseFloat(0.55).toFixed(0) = 0;
			s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
			if (s[0].length > 3) {
				s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
			}
			if ((s[1] || '').length < prec) {
				s[1] = s[1] || '';
				s[1] += new Array(prec - s[1].length + 1).join('0');
			}
			return s.join(dec);
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
		// base name
		var base='/' + document.location.pathname.split('/')[1];

		var relationDataJSON=$.cookie('relationData');
		var relationData=JSON.parse(relationDataJSON);
		var authenticated = $.cookie(COOKIE_NAME);

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
		Get Account
		-----------------------------------------------------------------*/
		function getAccount() {
			var key = window.EPS.key;
			var format = 'JSON';
			var sessionIdEnc = $.cookie(COOKIE_NAME+'SessionIdEnc');
			var url = window.EPS.url;
			var relationData = JSON.parse(relationDataJSON);
			var relationId = relationData.relationId;
		
			$('#account').html('<a href="/winkelwagen"><img src="/Websites/pta/Images/loading.gif" alt="ophalen accountgegevens"></a>');
			$.ajax( {
				url : url,
				type : "post",
				async : false,
				dataType : 'jsonp',
				data : {
					a : 'getRelation',
					key : key,
					format : format,
					relationId : relationId
				},
				success : function(e) {
					var Result = e.EPSVenue.Result.Code;
					if (Result == 0) {
						var addressLabel = e.EPSVenue.Data.addressLabel;
						addressLabel = addressLabel.replace(/\n/g, '<br>');
						//alert(addressLabel);
						$('#account').html(addressLabel);
					} else {
						var Message = e.EPSVenue.Result.Message;
						$('#account').html(Message + '<br>(' + Code +')');
					}
				}			
			});
		}
		/* ----------------------------------------------------------------
		Get Basket
		-----------------------------------------------------------------*/
		function getItemsInBasket() {		
			var key = window.EPS.key;
			var format = 'JSON';
			var sessionIdEnc = $.cookie(COOKIE_NAME+'SessionIdEnc');
			var url = window.EPS.url;
			var relationData = JSON.parse(relationDataJSON);
			var sales_channel_fk  = relationData.sessionData.sales_channel_fk ;
			var ticket_extra_cost_fk = relationData.sessionData.ticket_extra_cost_fk;
			var delivery_method_fk = relationData.sessionData.delivery_method_fk;
		
			$.ajax( {
				url : url,
				type : "post",
				async : false,
				dataType : 'jsonp',
				data : {
					a: 'getItemsInBasket',
					key: key,
					format: format,
					sessionId: sessionIdEnc,
					sales_channel_fk: sales_channel_fk,
					ticket_extra_cost_fk: ticket_extra_cost_fk,
					delivery_method_fk: delivery_method_fk
				},
				success : function(e) {
					var Code = e.EPSVenue.Result.Code;
					var HTMLStr = '';
					if(Code == 0) {
						var itemsInBasket = e.EPSVenue.Data.activityAr;
						var amountDue = e.EPSVenue.Data.amountDue;
						for(var lActivity in itemsInBasket) {
							var production = productions.EPSVenue.getReportData.Record[[productionsAr[lActivity]]];
							//
							HTMLStr += "<tr>";
							HTMLStr += "<td><div class=\"sc_articst\"><a href=\"bestellen?activity=" + lActivity + "\"  title=\"ga naar voorstellingstekst\">" + production.Uitvoerenden + production.Titel +"</a></div>";
							HTMLStr += "<div class=\"sc_location\"><span class=\"locatie\">Grote zaal</span>" + production.Locatie + ', <span class=\"datum\">' + production.attributes.LeesbareDatum +"</span></div></td>";
							
							var tickets = 0;
							for(var lRankName in itemsInBasket[lActivity]) {
								for(var lTariff in itemsInBasket[lActivity][lRankName]) {
									tickets = itemsInBasket[lActivity][lRankName][lTariff].tickets;
								}
							}
							HTMLStr += "<td><div class=\"amount\">" + tickets +"</div></td>";
							HTMLStr += '<td><div id="sc_change"><a href="/bestellen?activity=' + lActivity +'" title=\"terug naar bestelscherm om bestelling te wijzigen\">wijzig</a></div></td>';
							HTMLStr += "</tr>";														
						}
					}
					if(HTMLStr != '') {
						amountDueStr = number_format(amountDue, 2, ',', '.');
						HTMLStr = '<table style=\"width:100%;border-collapse:collapse;padding:0px;margin:0px;\"><tr><td>Activiteit</td><td><div class="amount">Tickets</div></td><td>&nbsp;</td></tr>' + HTMLStr;
						HTMLStr += '<tr><td>Administratiekosten</td><td><div id="totalAmount" class="amount">&euro;&nbsp;2,50</div></td><td>&nbsp;</td></tr>';
						HTMLStr += '<tr><td>Totaal te betalen</td><td><div id="totalAmount" class="amount">&euro;&nbsp;' + amountDueStr +'</div></td><td>&nbsp;</td></tr>';
						HTMLStr += '<tr><td>Betaalwijze</td><td><select name="extra_cost_fk" id="extra_cost_fk"><!-- <option value="10">iDeal</option> --><option value="11">Automatische Incasso</option></select></td><td>&nbsp;</td></tr>';
						
						
						HTMLStr += '<tr><td colspan=\"2\"><div id="paymentContainer">Kies een betaalwijze. Alleen Automatische Incasso is nu nog mogelijk</div></td></tr>';
						HTMLStr += '</table>';

						$('#btnBetalen').show();
					} else {
						HTMLStr = 'Er zijn geen voorstellingen in de winkelwagen';
					}
					$('#paymentAr\\[11\\]').val(amountDue);
					$('#mandje').html(HTMLStr);
					changePaymentMethod();
					
					$('#extra_cost_fk').change(function() {
						changePaymentMethod();
					});
				}			
			});
			
		}
		// ----------------------------------------------------------
		function changePaymentMethod() {
			var extra_cost_fk = $('#extra_cost_fk').val();
			
			var msg = 'Kies een betaalmethode';
			if (extra_cost_fk == 10) {
				msg = getPaymentOptionIdeal();
			} else if (extra_cost_fk == 11) {
				msg = '<div><div style="float:right"><input type="text" name="consumeraccountnumber" id="consumeraccountnumber"></div><div style="width:300px">Bankrekeningnummer voor Automatische Incasso</div></div>';
				$('#paymentContainer').html(msg);
			}
			
		}
		// ----------------------------------------------------------
		function getPaymentOptionIdeal() {
		
			var url = window.EPS.url;
			var key = window.EPS.key;
			var format = 'JSON';
			var retVal = '';
			
			var selectStr = '<select name="issuer_id" id="issuer_id">';
			selectStr += '<option value="0">-- Maak een keuze --</option>';
			
			$.ajax( {
				url: url,
				type: "post",
				async: false,
				dataType: 'jsonp',
				data: {
					a: 'doIdealIssuerList',
					key: key,
					format: format			
				},
				success : function(e) {
					var resultCode = e.EPSVenue.Result.Code;
					if(resultCode == 0) {
						var issuerList = e.EPSVenue.IdealHelper.getIssuerList.issuerList;
						var issuerCount = e.EPSVenue.IdealHelper.getIssuerList.issuerCount;
						for(var i = 0; i < issuerCount; i++) {
							selectStr += '<option value="' +issuerList[i].issuer_id + '">' + issuerList[i].name +'</option>';
						}
						selectStr += '</select>';
						
						retVal += '<table class="ideal">';
						retVal += '<tr>';
						retVal += '<td class="idealTD">Kies een bank<br>' + selectStr +'</td>';
						retVal += '<td><a href="http://ideal.nl/consument/incoming/?o=234.60" target="_blank">';
						retVal += '<img src="http://ideal.nl/img/234x60.gif" width="234" height="60" border="0" />';
						retVal += '</a>';
						retVal += '</td>';
						retVal += '</tr>';
						retVal += '</table>';
						$('#paymentContainer').html(retVal);
						
					}
				}
			});	
			
			
		
		
			}
	
	
		/ * ========================================================= */
		getAccount();
		getItemsInBasket();
		
    });

})(jQuery)

