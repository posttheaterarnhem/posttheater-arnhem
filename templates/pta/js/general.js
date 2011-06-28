(function($) {
	/* ----------------------------------------------------------------
	Globals
	-----------------------------------------------------------------*/
	function setGlobals () {
		var EPS = { key:'eNp1jrEOwiAURX_FvNkQeJAU6uJk4hc4Nk94aFOgCTRxMP671N3t5J4z3DYqiyMEMsaxZDdoQinZDh61vdvBBY8R5Rsq53XjiUKoMAIaoTQKNE4opeEIFOOcZtr4GrqOL04bl_Mj05yEX3MveOc_rlDmri6VynK4_XxfGyVuk39SKZymuPRC7XH_0TrDB05fWSQ65Q,,', 
					cookie:'epsvenuepta',
					url:'http://oracle.2question.com/EPSVenue/interfaces/web/export.php'
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
			try {
		
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
						var Code=e.EPSVenue.Result.Code;
						var Message=e.EPSVenue.Result.Message;
						if(Code===0) {
							sessionData=e.EPSVenue.Data; /* kan weg */
							sessionIdEnc=e.EPSVenue.Data.sessionIdEnc;
							$.cookie(COOKIE_NAME+'SessionIdEnc', sessionIdEnc);
						} else {
							alert(Message +'\n(' + Code + ')');
						}
					}
				});	
			} catch(err) {
				alert(err);
			}
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
    });
})(jQuery);