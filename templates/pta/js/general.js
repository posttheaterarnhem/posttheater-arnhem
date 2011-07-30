(function($) {
	/* ----------------------------------------------------------------
	Globals
	-----------------------------------------------------------------*/
	function setGlobals () {
		/*
			eNpNz0tOAzEMBuCroKzRaJoW5sGGDQsu0G3kJo4SJo9R7BZQ1bvjqlXFzv4_y5Zp1q-bWTnY7SbscRq2oPsex8Hq7XgYh8lZ7XV_Vg1zZTTgXFxTs1oZuvV4SJHCChw6W7N6VuB9TBEYP911phJzQGmbGGaISdJYfH3_R11JogUyCn60uMDTviHSd_xaBAgSkrEBSsFk_FwiQxuJHaZ4wvZrMnKo7gYvAhztgmzwhxsYK2dupKfHLmLgI93j62l5i6RWF_X2B_GkWZ4,
			
			{"remote_addr":"192.168.0.6","affiliateId":"posttheater","email":"posttheater@example.com","name":"John Doe","sales_channel_fk":"1","delivery_method_fk":"5","sales_status_fk":"2","ticket_extra_cost_fk":"29","notes":"keySuggestRemoteAddr"}
			eNpVj81KAzEUhV9FspYhTWvnx42CG13qA4RrcqYTJpmU5FZaxHf3jhXB5fm-A4dTB9PqQXna7Xpo9O2WjNboWme23XvX9t6Z0ehPVZAyw5L3RQ1q05tms-8a3ezVraJxDDEQ49mLO-bKPEFiEYdEIf6nDzhTOkY0LlwnaSyUIIWXPC03TxlCKkVU6yZaFkQ7zuugYI8YPlAuNoGn7K_i7q9fmfhUr9QI5eBmsMWZC1lcJ_O_ql835UuVMOPydjocUPn159_jeu9L3X8D2g9a_Q,,
			
			{"remote_addr":"192.168.0.4","affiliateId":"posttheater","email":"posttheater@example.com","name":"John Doe","sales_channel_fk":"1","delivery_method_fk":"5","sales_status_fk":"2","ticket_extra_cost_fk":"29","notes":"keySuggestRemoteAddr"}
			eNpVj8tOwzAURH8FeY1cItcN5NENSN2UJXyAdbFcJ40VO67iW9QK8e_cUITEcs4ZaTSlN43ulae67qDRNVsyWqNtnNm2723TeWcGoz_VgpQZlrxfVK82nak2j22lq1rdKxqGEAMxDl7cKRfmERIXcUgU4n_6hAulU0TlcpLGTAlSeMnjfLfPEFIoolg30jwj2mFaBwV7xPCB5WoTeMz-Jh7--oWJz-VGjVAObgJbXFx4Ietk_ld166Z8KRImXFzfzscjCr_-_Hte732p3TfYY1r7
			
			
			{"remote_addr":"posttheater.nl","affiliateId":"posttheater","email":"info@posttheater.nl","name":"Erika Vreeswijk","sales_channel_fk":"1","delivery_method_fk ":"5","ticket_extra_cost_fk":"49","sales_status_fk":"2","notes":""}
			eNplj82KAjEQhF9FchYZMyPz48WLB1_Aa-hNKkycTEaSdn9Y9t23RRDEW3d9XV1UGfSuHZSjpulRoW9r0lWFrrW67j66tndWe139qox5YRhyLqtBXZfCPIIYeZOiWivyPsQg-8m9YmGYKURRQ_LL4c2ZaIbAYw4Trc4ZKF_hMgkoFFGMHSklRONcJznaiuwQw1wn8o-ZwePiBKyE7IRwsBPY4JszGSs5D1PTP58VJr6Vh6zv2VKpyKz-1P4fdYNX_A,,
			url:'http://oracle.2question.com/EPSVenue/interfaces/web/export.php'
			http://92.70.205.225/	
		*/
	
		var EPS = { key:'eNplj82KAjEQhF9FchYZMyPz48WLB1_Aa-hNKkycTEaSdn9Y9t23RRDEW3d9XV1UGfSuHZSjpulRoW9r0lWFrrW67j66tndWe139qox5YRhyLqtBXZfCPIIYeZOiWivyPsQg-8m9YmGYKURRQ_LL4c2ZaIbAYw4Trc4ZKF_hMgkoFFGMHSklRONcJznaiuwQw1wn8o-ZwePiBKyE7IRwsBPY4JszGSs5D1PTP58VJr6Vh6zv2VKpyKz-1P4fdYNX_A,,', 
					cookie:'epsvenuepta',
					url:'http://92.70.205.225/EPSVenue/interfaces/web/export.php'
					};
		window.EPS = EPS ;
	}
	setGlobals();
	var protocol = window.location.protocol;
	var hostname = window.location.host; // includes hostname, colon and
											// port (if specified)
	var host = protocol;
	host += '//';
	host += hostname;
	// base name
	var base='/' + document.location.pathname.split('/')[1];
	/* ----------------------------------------------------------------
	General function for getting parameters from url
	-----------------------------------------------------------------*/
	$.extend({
	  getUrlVars: function(){
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++)
		{
		  hash = hashes[i].split('=');
		  vars.push(hash[0]);
		  vars[hash[0]] = hash[1];
		}
		return vars;
	  },
	  getUrlVar: function(name){
		return $.getUrlVars()[name];
	  }
	});
    $("document").ready(function() {
		/* ----------------------------------------------------------------
		Set cookie variable
		-----------------------------------------------------------------*/
		var COOKIE_NAME = window.EPS.cookie;

		/* ----------------------------------------------------------------
		getSession to get a sessionIdEnc (and set in a cookie)
		-----------------------------------------------------------------*/
		var sessionIdEnc = $.cookie(COOKIE_NAME+'SessionIdEnc');
		if (sessionIdEnc == null || sessionIdEnc == 'undefined'){
			getSessionData();
		}
		/* ----------------------------------------------------------------
		Test
		-----------------------------------------------------------------*/
		$('a#cookie').click(function() {
			$.cookie(COOKIE_NAME+'SessionIdEnc', null);
			return false;
		});

		/* ----------------------------------------------------------------
		Mijn Posttheater - Controleer of bezoeker is ingelogd
		-----------------------------------------------------------------*/
		var securepages = $('body.mijnposttheater');
		checkLoggedIn(securepages);
		
		/* ----------------------------------------------------------------
		Show message after registration on the login Page
		-----------------------------------------------------------------*/
		var registered = $.cookie(COOKIE_NAME+'Registered');
		if (registered === sessionIdEnc) {
			var Message = 'U hebt zich succesvol geregistreerd. U kunt u inloggen.';
			$("span.error").html(Message);
		}

		/* ----------------------------------------------------------------
		Mijn Posttheater - mijn eerder bestelde kaartjes
		-----------------------------------------------------------------*/
		$(".toggle_container").hide();
		$("a.showdetails").click(function(){
			$(this).next(".toggle_container").slideToggle("slow,");
			if ($(this).text()==='toon meer gegevens'){
				$(this).text('toon minder gegevens')
			}
			else {
				$(this).text('toon meer gegevens')
			}
		});

		$(".blogList ul li").click(function(){
			$(this).addClass("activeState");
		});

		var goBack = $(".blogBack a, .eventBack a");
		if(goBack.text() != '') {
			goBack.text("< ga terug");
		}

		var goBack = $("p.goBack");
		var activity = $.getUrlVar('activity');
		if (goBack.length > 0 && activity >= 0) {
			goBack.html('<a href="javascript: history.back();">&lt; ga terug</a>');
		}

		function getSessionData() {
			var url = window.EPS.url;
	
			// get cookie	
			var sessionIdEnc=$.cookie(COOKIE_NAME+'SessionIdEnc');

			$.ajax({
				url: url,
				type: "post",
				async: false,
				dataType:'jsonp', /* for crossdomain */
				data: {
					a: 'getSessionData',
					key: window.EPS.key,
					format: 'JSON'
				},
				success: function(e) {
					var Code = e.EPSVenue.Result.Code;
					var Message = e.EPSVenue.Result.Message;
					if(Code === 0) {
						sessionData = e.EPSVenue.Data; /* kan weg */
						sessionIdEnc = e.EPSVenue.Data.sessionIdEnc;
						$.cookie(COOKIE_NAME+'SessionIdEnc', sessionIdEnc);
						$.cookie('sessionData', sessionData);
					} else {
						alert(Message +'\n(' + Code + ')');
					}
				}
			});	
		}
		/* ----------------------------------------------------------------
		Mijn Posttheater - Controleer of bezoeker is ingelogd voor secure pages
		-----------------------------------------------------------------*/
		function checkLoggedIn(securepages){

			var relationDataJSON=$.cookie('relationData');
			var relationData=JSON.parse(relationDataJSON);
			var authenticated = $.cookie(COOKIE_NAME);

			try {
					if (   relationData  == null 
						|| relationData  == 'undefined' 
						|| authenticated == null 
						|| authenticated == 'undefined' ){
						// redirect naar login-pagina
						if (securepages.length > 0){
							$("#subnavigation ul.mainNav li.login a.logout").html('inloggen').attr("href","inloggen").removeClass('logout');
							var newWindowLocation = host + '/inloggen';
							window.location = newWindowLocation;
							return false;
						} else {
							// publieke pagina's
							return true;
						}
					} else {
						// ingelogd : mijn posttheater menu tonen
						$("#subnavigation ul.mainNav li.login a.login").html('uitloggen').addClass('logout');
						$("#subnavigation ul.mainNav li.login a.logout").attr('href', '/inloggen?logout=true');
						$("#subnavigation ul.mainNav").append('<li class="hasChildren"><a class="myPTA" href="/mijn-posttheater">mijn posttheater</a></li>');
						return true;
					}
				} catch(err) {
					alert(err);
				}
			}
        /* hide second addressfield in contact form */
		var hideSecondAddress = $('div.fieldContent p.fieldRow:nth-child(2)');
		if (hideSecondAddress) { hideSecondAddress.hide(); }
    });
})(jQuery);