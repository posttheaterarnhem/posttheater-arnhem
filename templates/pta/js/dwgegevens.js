(function($) {

	jQuery.noConflict();
	
    $("document").ready(function() {

		/* ----------------------------------------------------------------
		Set cookie variable
		-----------------------------------------------------------------*/
		var COOKIE_NAME = window.EPS.cookie;

		var relationDataJSON=$.cookie('relationData');
		var relationData=JSON.parse(relationDataJSON);
		var authenticated = $.cookie(COOKIE_NAME);

    	var wijzigmijngegevens=$('body.wmg');

    	if ( wijzigmijngegevens.length > 0  && authenticated ==='authenticated'  && ( relationData != null || relationData != 'undefined') ){
// 			$('body.wmg div#background').css('z-index',9999).css('background','#E98300');
// 			$('#div.background p.message').css('display','block');
			$('div#columnright').addClass('loading');
			$('div#loading_container').css('display','block').css('z-index','9999');
 			getRelation();
    	}
		function getRelation() {

			try {
		
				var url = window.EPS.url;

				// get relation data
				var id_pk='';
				var company_fk='';
				var jobtitle='';
				var title_fk='';
				var title='';
				var salutation='';
				var initials='';
				var salutation='';
				var initials='';
				var firstname='';
				var middlename_fk='';
				var middlename='';
				var lastname='';
				var suffix='';
				var homestreet='';
				var homestreet_housenumber='';
				var homestreet_housenumber_suffix='';
				var homepostalcode='';
				var homecity='';
				var homephone='';
				var homephone2='';
				var email3address='';
				var homecountry_fk='';
				var birthdate='';
				var name_nl='';
				var addressLabel='';
            
				$.ajax({
					url: url,
					type: "post",
					dataType:'jsonp',
					data: {
						a: 'getRelation',
						key: window.EPS.key,
						format: 'JSON',
						relationId: relationData.relationId
					},
					success: function(e) {
						var Code=e.EPSVenue.Result.Code;
						var Message=e.EPSVenue.Result.Message;
						if(Code==0) {
							title_fk=e.EPSVenue.Data.title_fk;
							initials=e.EPSVenue.Data.initials;
							middlename_fk=e.EPSVenue.Data.middlename_fk;
							lastname=e.EPSVenue.Data.lastname;
							homepostalcode=e.EPSVenue.Data.homepostalcode;
							homestreet_housenumber=e.EPSVenue.Data.homestreet_housenumber;
							streetnr_suffix=e.EPSVenue.Data.streetnr_suffix;
							homestreet=e.EPSVenue.Data.homestreet;
							homecity=e.EPSVenue.Data.homecity;
							homecountry_fk=e.EPSVenue.Data.homecountry_fk;
							homepostalcode=e.EPSVenue.Data.homepostalcode;
							homephone=e.EPSVenue.Data.homephone;
							homephone2=e.EPSVenue.Data.homephone2;
							email3address=e.EPSVenue.Data.email3address;
							$('#title_fk').val(title_fk);
							$('#initials').val(initials);
							$('#middlename_fk').val(middlename_fk);
							$('#lastname').val(lastname);
							$('#homepostalcode').val(homepostalcode);
							$('#homestreet_housenumber').val(homestreet_housenumber);
							$('#streetnr_suffix').val(streetnr_suffix);
							$('#homestreet').val(homestreet);
							$('#homecity').val(homecity);
							$('#homecountry_fk').val(homecountry_fk);
							$('#homepostalcode').val(homepostalcode);
							$('#phone').val(homephone);
							$('#phone2').val(homephone2);
							$('#email').val(email3address);
							$('div#columnright').removeClass('loading');
							$('div#loading_container').css('display','none');
// 							$('body.wmg div#background').css('z-index',0).css('background','');
						} else {
							alert(Message +'\n(' + Code + ')');
						}
					}
				});	
			} catch(err) {
				alert(err);
			}
		}

    });

})(jQuery)