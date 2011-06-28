(function($){
/*******************************************************************************
 * //@Author: Adrian "yEnS" Mato Gondelle & Ivan Guardado Castro //@website:
 * www.yensdesign.com //@email: yensamg@gmail.com //@license: Feel free to use
 * it, but keep this credits please!
 ******************************************************************************/
$(document).ready(function() {
    // global vars
        // change when moving to production
        var protocol = window.location.protocol;
        var hostname = window.location.host; // includes hostname, colon and
                                                // port (if specified)
        var host = protocol;
        host += '//';
        host += hostname;
        // base name
        var base='/' + document.location.pathname.split('/')[1];

		var COOKIE_NAME = window.EPS.cookie;
		var relationDataJSON=$.cookie('relationData');
		var relationData=JSON.parse(relationDataJSON);

        // //////////////////////////////////////////////////////////
        var formRegistration = $("input#aanmaken_account");
        var formChangeRegistration = $("#change_registration_form");
        var formLogin = $("input#inloggen");
        var formWachtwoordvergeten = $("input#wachtwoord_vergeten");
        var formSaveRelation = $("input#wijziging_opslaan");
        var formSaveChangedPassword = $("input#wijziging_wachtwoord_opslaan");
        var title = $("#title_fk");
        var titleInfo = $("#titleInfo");
        var initials = $("#initials");
        var middlename_fk = $("#middlename_fk");
        var initialsInfo = $("#initialsInfo");
        var lastname = $("#lastname");
        var lastnameInfo = $("#lastnameInfo");
        var street = $("#homestreet");
        var streetInfo = $("#homestreetInfo");
        var streetnr = $("#homestreet_housenumber");
        var streetnrInfo = $("#homestreet_housenumberInfo");
        var streetnrsuffix = $("#streetnr_suffix");
        var zipcode = $("#homepostalcode");
        var zipcodeInfo = $("#zipcodeInfo");
        var city = $("#homecity");
        var cityInfo = $("#homecityInfo");
        var country = $("#homecountry_fk");
        var countryInfo = $("#countryInfo");
        var phone = $("#phone");
        var phone2 = $("#phone2");
        var phoneInfo = $("#phoneInfo");
        var phone2Info = $("#phone2Info");
        var approvemc = $("#approvemc");
        var approvemcInfo = $("#approvemcInfo");
        var approvepolicy = $("#approvepolicy");
        var approvepolicyInfo = $("#approvepolicyInfo");
        var email = $("#email");
        var emailInfo = $("#emailInfo");
        var pass1 = $("#pass1");
        var pass1Info = $("#pass1Info");
        var pass2 = $("#pass2");
        var pass2Info = $("#pass2Info");
        var required1 = $("#required1");
        var required1Info = $("#required1Info");
        var required2 = $("#required2");
        var required2Info = $("#required2Info");
        var message = $("#message");
        var morelink = $("#morelink");
        var more = $("#more");
        var teaser = $("#teaser");
        var submitknop = $("#form input.button");
        var betalenknop = $("input#betalen");

        // onAbort - Occurs when the users stops the loading of an image.
        // onBlur - Occurs when an object on the page is no longer the 'focus'.
        // onChange - Occurs when a text field is changed by the user.
        // onClick - Occurs when the users clicks an object.
        // onError - Occurs when a document, or image can't load correctly.
        // onFocus - Occurs when an object takes the 'focus'.
        // onLoad - Occurs when a page is loaded.
        // onMouseOver - Occurs when the mouse cursor moves over an object.
        // onMouseOut - Occurs when the mouse cursor moves off an object.
        // onSelect - Occurs when the user selects text in a text area.
        // onSubmit - Occurs when the user clicks the "submit" button on a form.
        // onUnload - Occurs when the user leaves a document.

        // On blur
        title.blur(validateTitle);
        /*initials.blur(validateInitials);*/
        /*lastname.blur(validateLastname);*/
        street.blur(validateStreet);
        /*streetnr.blur(validateStreetnr);*/
        /*zipcode.blur(validateZipcode);*/
        city.blur(validateCity);
        country.blur(validateCountry);
        phone.blur(validatePhone);
        phone2.blur(validatePhone2);
        email.blur(validateEmail);
        pass1.blur(validatePass1);
        pass2.blur(validatePass2);
        required1.blur(validateRequired1);
        required2.blur(validateRequired2);
        approvemc.blur(validateApprovemc);
        approvepolicy.blur(validateApprovepolicy);
        // on Click
        approvemc.click(validateApprovemc);
        approvepolicy.click(validateApprovepolicyClick);
        morelink.click(showMorelink);
        //submitknop.click(pushsubmitknop);
        betalenknop.click(pushbetalenknop);

        // On Submitting
        //
        // Er wordt bewust niet op straat en woonplaats gecontroleerd. Bij het
        // vinden van de straat
        // en woonplaats (op basis van postcode en huisnummer) wordt dynamisch
        // velden "getekend"
        // in het formulier, welke niet gecontroleerd kunnen worden door
        // formRegistration.submit.
        formRegistration.click(function() {
        	var valTitle = validateTitle();
//         	var valInitials = validateInitials();
//         	var valLastname2 = validateLastname2();
        	var valZipcode = validateZipcode();
        	var valStreetnr = validateStreetnr();
        	var valStreet = validateStreet();
        	var valCity = validateCity();
        	var valPhone = validatePhone();
        	var valEmailaddress = validateEmail2();
        	var valPassword = validatePass1();
        	var valApprovepolicy = validateApprovepolicy();

//             if (valTitle & valInitials & valLastname2 & valStreetnr & valZipcode & valStreet & valCity & valPhone & valEmailaddress & valPassword & valApprovepolicy) {
            if (valTitle & valZipcode & valStreetnr & valStreet & valCity & valPhone & valEmailaddress & valPassword & valApprovepolicy) {
                saveRegistration();
            } 

            return false;

        });
        formSaveRelation.click(function() {
        	var valTitle = validateTitle();
        	//var valInitials = validateInitials();
        	//var valLastname2 = validateLastname2();
        	var valStreetnr = validateStreetnr();
        	var valZipcode = validateZipcode();
        	var valPhone = validatePhone();
        	// valEmail2 is oude Ajax call
        	//var valEmail2 = validateEmail2();

            if (valTitle & valStreetnr & valZipcode & valPhone) {
                saveRelation();
            } 

            return false;
        });
        formSaveChangedPassword.click(function() {
        	var valRequired1 = validateRequired1();
        	var valPass1 = validatePass1();
        	var valPass2 = validatePass2();

            if (valRequired1 & valPass1 & valPass2) {
                var passcode_old = required1.val();
                var passcode_new = pass1.val();
                var passcode_new_confirm = pass2.val();	
                saveChangedPassword(passcode_old, passcode_new, passcode_new_confirm);
            } 

            return false;
        });
        formLogin.click(function() {
			var val1 = validateRequired1();
			var val2 = validateRequired2();
			if (val1 & val2) {
				// Ajax function to validate login and set authenticated cookie
				var email3address = required1.val();
				var passcode = required2.val();
				/* delete registration cookie */
				$.cookie(COOKIE_NAME+'Registered', null)
				getRelationId(email3address, passcode);
			}
				return false;
        });        
        formWachtwoordvergeten.click(function() {
        	var val1 = validateRequired1();
            if (val1) {
				var emailaddress = required1.val();
				$("span.error").html('Moment.... we zoeken uw wachtwoord op...');
				getPassword(emailaddress);
            }
            	return false;
        });
        // validation functions
		function saveRegistration() {

			try {
		
				// get window object
				var key = window.EPS.key;
				var url = window.EPS.url;
				
				var vrelationId = ''; // niet verplicht bij nieuwe registratie
				var vtitle_fk = title.val(); // verplicht
				var vinitials = initials.val(); // verplicht
				var vfirstname = ''; // niet gebruikt
				var vlastname = lastname.val(); // verplicht
				var vmiddlename_fk = middlename_fk.val();
				var vsuffix = ''; // niet gebruikt
				var vhomestreet = street.val(); 
				var vhomestreet_housenumber = streetnr.val(); 
				var vhomestreet_housenumber_suffix = streetnrsuffix.val(); 
				var vhomepostalcode = zipcode.val(); // verplicht
				var vhomecity = city.val(); 
				var vhomephone = phone.val(); // verplicht
				var vhomephone2 = phone2.val(); 
				var vemail3address = email.val(); // verplicht
				var vhomecountry_fk = country.val(); // verplicht
				var vjobtitle = '' ; // niet gebruikt
				var vbirthdate = ''; // niet gebruikt
				var vgender = ''; // niet gebruikt
				var vdepartment = '' ; // niet gebruikt
				var vcompany_fk = '';  // niet gebruikt
				var vpasscode = '';  // wordt gegenereerd (door EPS) indien leeg
				
				// get cookie	
				var sessionIdEnc=$.cookie(COOKIE_NAME+'SessionIdEnc');

				$.ajax({
					url: url,
					type: "post",
					async: false,
					dataType:'jsonp', /* for crossdomain */
					data: {
						a: 'saveRelation',
						key: key,
						format: 'JSON',
						title_fk: vtitle_fk,
						initials: vinitials,
						lastname: vlastname,
						middlename_fk: vmiddlename_fk,
						homestreet: vhomestreet,
						homestreet_housenumber: vhomestreet_housenumber,
						homestreet_housenumber_suffix: vhomestreet_housenumber_suffix,
						homepostalcode: vhomepostalcode,
						homecity: vhomecity,
						homephone: vhomephone,
						homephone2: vhomephone2,
						email3address: vemail3address,
						homecountry_fk: vhomecountry_fk,
						passcode: vpasscode			
					},
					success: function(e) {
						var Code = e.EPSVenue.Result.Code;
						var Message = e.EPSVenue.Result.Message;
						if (Code==0){
							$("span.error").html(Message +'\n(' + Code + ')');
							/* set cookie for showing message on redirected login page */
							$.cookie(COOKIE_NAME+'Registered', sessionIdEnc);
							var newWindowLocation = host + '/inloggen';
							window.location = newWindowLocation;
						}
					}
				});	
			} catch(err) {
				alert(err);
			}
		}
		function getRelationId(email3address, passcode) {
			try {
		
				// get window object
				var key = window.EPS.key;
				var url = window.EPS.url;
				
				/* get activityId when users clicked on ordered and was not logged in */
				var activity = $.getUrlVar('activity');

				// get cookie
				var sessionIdEnc=$.cookie(COOKIE_NAME+'SessionIdEnc');

				$.ajax({
					url: url,
					type: "post",
					async: false,
					dataType:'jsonp', /* for crossdomain */
					data: {
						a: 'getRelationId',
						key: key,
						email3address: email3address,
						passcode: passcode,
						sessionId : sessionIdEnc,
						format: 'JSON'
					},
					success: function(e) {
						var Code = e.EPSVenue.Result.Code;
						var Message = e.EPSVenue.Result.Message;
						if (Code==0){
							var relationData = e.EPSVenue.Data;
							if (relationData.count === 1) {
								relationDataJSON=JSON.stringify(relationData)
								$.cookie('relationData', relationDataJSON);
								$.cookie(COOKIE_NAME, 'authenticated');
								$("#subnavigation ul.mainNav li.login a.login").html('uitloggen').addClass('logout');
								$("#subnavigation ul.mainNav li.login a.logout").attr('href', '#logout');
								$("#subnavigation ul.mainNav").append('<li class="hasChildren"><a class="myPTA" href="/mijn-posttheater">mijn posttheater</a></li>');
								if (activity == null || activity == 'undefined') {
									var newWindowLocation = host + '/mijn-posttheater';
									window.location = newWindowLocation;
									} else {
									var newWindowLocation = host + '/bestellen?activity='+activity;
									window.location = newWindowLocation;
								}
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
		function saveRelation() {

			try {
		
				// get window object
				var key = window.EPS.key;
				var url = window.EPS.url;
				
				var vrelationId = relationData.relationId; // verplicht
				var vtitle_fk = title.val(); // verplicht
				var vinitials = initials.val(); // verplicht
				var vfirstname = ''; // niet gebruikt
				var vlastname = lastname.val(); // verplicht
				var vmiddlename_fk = middlename_fk.val();
				var vsuffix = ''; // niet gebruikt
				var vhomestreet = street.val(); 
				var vhomestreet_housenumber = streetnr.val(); 
				var vhomestreet_housenumber_suffix = streetnrsuffix.val(); 
				var vhomepostalcode = zipcode.val(); // verplicht
				var vhomecity = city.val(); 
				var vhomephone = phone.val(); // verplicht
				var vhomephone2 = phone2.val(); 
				var vemail3address = email.val(); // verplicht
				var vhomecountry_fk = country.val(); // verplicht
				var vjobtitle = '' ; // niet gebruikt
				var vbirthdate = ''; // niet gebruikt
				var vgender = ''; // niet gebruikt
				var vdepartment = '' ; // niet gebruikt
				var vcompany_fk = '';  // niet gebruikt
				var vpasscode = '';  // tijdelijk niet gebruikt

				// get cookie	
				var sessionIdEnc=$.cookie(COOKIE_NAME+'SessionIdEnc');

				$.ajax({
					url: url,
					type: "post",
					async: false,
					dataType:'jsonp', /* for crossdomain */
					data: {
						a: 'saveRelation',
						key: key,
						format: 'JSON',
						relationId: vrelationId,
						title_fk: vtitle_fk,
						initials: vinitials,
						lastname: vlastname,
						middlename_fk: vmiddlename_fk,
						homestreet: vhomestreet,
						homestreet_housenumber: vhomestreet_housenumber,
						homestreet_housenumber_suffix: vhomestreet_housenumber_suffix,
						homepostalcode: vhomepostalcode,
						homecity: vhomecity,
						homephone: vhomephone,
						homephone2: vhomephone2,
						email3address: vemail3address,
						homecountry_fk: vhomecountry_fk,
						passcode: vpasscode			
					},
					success: function(e) {
						var Code = e.EPSVenue.Result.Code;
						var Message = e.EPSVenue.Result.Message;
						if (Code==0){
							$("span.error.changenaw").html(Message +'\n(' + Code + ')');
						}
					}
				});	
			} catch(err) {
				alert(err);
			}
		}
		function saveChangedPassword(passcode_old, passcode_new, passcode_new_confirm) {
			try {

				var vrelationId = relationData.relationId; // verplicht

				// get window object
				var key = window.EPS.key;
				var url = window.EPS.url;
		
				// get cookie
				var sessionIdEnc=$.cookie(COOKIE_NAME+'SessionIdEnc');

				$.ajax({
					url: url,
					type: "post",
					async: false,
					dataType:'jsonp', /* for crossdomain */
					data: {
						a: 'savePassword',
						key: key,
						format: 'JSON',
						relationId: vrelationId,
						passcode0: passcode_old,
						passcode1: passcode_new,
						passcode2: passcode_new_confirm,
						sessionId : sessionIdEnc
					},
					success: function(e) {
						var Code = e.EPSVenue.Result.Code;
						var Message = e.EPSVenue.Result.Message;
						if (Code==0){
							$('input#required1').val('');
							$('span#required1Info').text('');
							$('input#pass1').val('');
							$('span#pass1Info').text('');
							$('input#pass2').val('');
							$('span#pass2Info').text('');
							$("span.error.changepassword").html(Message +'\n(' + Code + ')');
						} else {
							$("span.error.changepassword").html(Message +'\n(' + Code + ')');
						}
					}
				});	
			} catch(err) {
				alert(err);
			}
		}
		function getPassword(email3address) {
			try {

				// get window object
				var key = window.EPS.key;
				var url = window.EPS.url;
		
				// get cookie
				var sessionIdEnc=$.cookie(COOKIE_NAME+'SessionIdEnc');

				$.ajax({
					url: url,
					type: "post",
					async: false,
					dataType:'jsonp', /* for crossdomain */
					data: {
						a: 'getPassword',
						key: key,
						format: 'JSON',
						email3address: email3address,
						sessionId : sessionIdEnc
					},
					success: function(e) {
						var Code = e.EPSVenue.Result.Code;
						var Message = e.EPSVenue.Result.Message;
						var Passcode = e.EPSVenue.Relation.getMyPassword.Passcode;
						console.log(e);
						if (Code==0){
							$("span.error").html(Message +'\n(' + Code + ') ['+ Passcode +']');
						} else {
							$("span.error").html(Message +'\n(' + Code + ')');
						}
					}
				});	
			} catch(err) {
				alert(err);
			}
		}

        function validateEmailHandler() {
            var resObj = parseJSON(http.responseText);
            var Code = resObj.EPSVenue.Result.Code;
            var Message = resObj.EPSVenue.Result.Message;
            // alert(Message +'\n(' + Code + ')');

            // if it's valid email
            if (Code == 0) {
                email.removeClass("error");
                emailInfo.text("");
                emailInfo.removeClass("error");
                return true;
            }
            // if it's NOT valid
            else {
                email.addClass("error");
                emailInfo.text(Message);
                emailInfo.addClass("error");
                return false;
            }
        }
        function validateEmail() {
            // aanroep AJAX call voor controle e-mailadres
            // alert('aanroep ajax');
            var email = $("#email").val();
            var url = host;
            url += base;
            url += '/interfaces/web/services.php';
            url += '?a=emailAddressExist';
            url += '&format=JSON';
            url += '&email=' + email;
            url += '&validateEmail=true';
            getURL(url, '', {
                format : 'JSON',
                handler : validateEmailHandler,
                hideWaitIcon : true,
                isSynchronous : false
            });
        }
        function validateEmail2() {
            // deze functie wordt aangeroepen op submit knop van het formulier
            // ajax call geeft problemen.
            // if it's NOT valid
            if (email.val().length < 1) {
                email.addClass("error");
                emailInfo.text("E-mail is verplicht.");
                emailInfo.addClass("error");
                return false;
            }
            // if it's valid
            else {
                email.removeClass("error");
                emailInfo.text("");
                emailInfo.removeClass("error");
                return true;
            }
        }
        function validateLastnameHandler() {
            var resObj = parseJSON(http.responseText);
            var Code = resObj.EPSVenue.Result.Code;
            var Message = resObj.EPSVenue.Result.Message;
            var Lastname = resObj.EPSVenue.Relation.formatLastname.Lastname;

            // geef juiste formaat aan achternaam
            if (Code == 0) {
                lastname.val(Lastname);
                return true;
            } else {
                alert('validateLastnameHandler');
                return false;
            }
        }
        function validateLastname() {
            // if it's NOT valid
            if (lastname.val().length < 1) {
                lastname.addClass("error");
                lastnameInfo.text("Dit is een verplicht veld.");
                lastnameInfo.addClass("error");
                return false;
            }
            // if it's valid
            else {
                var lastname2 = lastname.val();
                var url = host;
                url += base;
                url += '/interfaces/web/services.php';
                url += '?a=formatLastname';
                url += '&format=JSON';
                url += '&lastname=' + lastname2;
                // asynchroon juiste format geven aan achternaam (begin
                // kapitalen, ongeacht spaties en leestekens)
                getURL(url, '', {
                    format : 'JSON',
                    handler : validateLastnameHandler,
                    hideWaitIcon : true,
                    isSynchronous : false
                });
                //
                lastname.removeClass("error");
                lastnameInfo.text("");
                lastnameInfo.removeClass("error");
                return true;
            }
        }
        function validateLastname2() {
            // deze functie wordt aangeroepen op submit knop van het formulier
            // ajax call geeft problemen.
            // if it's NOT valid
            if (lastname.val().length < 1) {
                lastname.addClass("error");
                lastnameInfo.text("Dit is een verplicht veld.");
                lastnameInfo.addClass("error");
                return false;
            }
            // if it's valid
            else {
                lastname.removeClass("error");
                lastnameInfo.text("");
                lastnameInfo.removeClass("error");
                return true;
            }
        }
        function validateTitle() {
            // if it's NOT valid
            if (title.val() == 0) {
                title.addClass("error");
                titleInfo.text("U moet een keuze maken.");
                titleInfo.addClass("error");
                return false;
            }
            // if it's valid
            else {
                title.removeClass("error");
                titleInfo.text("");
                titleInfo.removeClass("error");
                return true;
            }
        }

//         function validateInitialsHandler() {
//             var resObj = parseJSON(http.responseText);
//             var Code = resObj.EPSVenue.Result.Code;
//             var Message = resObj.EPSVenue.Result.Message;
//             var Lastname = resObj.EPSVenue.Relation.formatInitials.Initials;
// 
//             // geef juiste formaat aan achternaam
//             if (Code == 0) {
//                 initials.val(Lastname);
//                 return true;
//             } else {
//                 alert('validateInitials');
//                 return false;
//             }
//         }

        function validateInitials() {
            // if it's NOT valid
            if (initials.val().length < 1) {
                initials.addClass("error");
                initialsInfo.text("Dit is een verplicht veld.");
                initialsInfo.addClass("error");
                return false;
            }
            // if it's valid
            else {

                var v_initials = initials.val();
                var url = host;
                url += base;
                url += '/interfaces/web/services.php';
                url += '?a=formatInitials';
                url += '&format=JSON';
                url += '&initials=' + v_initials;
                // asynchroon juiste format geven aan achternaam (begin
                // kapitalen, ongeacht spaties en leestekens)
                getURL(url, '', {
                    format : 'JSON',
                    handler : validateInitialsHandler,
                    hideWaitIcon : true,
                    isSynchronous : false
                });
                //

                // op verzoek van Gerard (mail 29-10-2009)
                //initials.val(initials.val().toUpperCase());
                initials.removeClass("error");
                initialsInfo.text("");
                initialsInfo.removeClass("error");
                return true;
            }
        }
        function validateStreet() {
            // if it's NOT valid
            if (street.val().length < 1) {
                street.addClass("error");
                streetInfo.text("Dit is een verplicht veld.");
                streetInfo.addClass("error");
                return false;
            }
            // if it's valid
            else {
                street.val(toInitCap(street.val()));
                street.removeClass("error");
                streetInfo.text("");
                streetInfo.removeClass("error");
                return true;
            }
        }
        function validateStreetnr() {
            // if it's NOT valid
            if (streetnr.val().length < 1) {
                streetnr.addClass("error");
                zipcodeInfo.text("Dit is een verplicht veld.");
                zipcodeInfo.addClass("error");
                return false;
            }
            // if it's valid
            else {
                streetnr.removeClass("error");
                zipcodeInfo.text("");
                zipcodeInfo.removeClass("error");
                return true;
            }
        }
        function validateZipcode() {
            // if it's NOT valid
            if (zipcode.val().length < 1) {
                zipcode.addClass("error");
                zipcodeInfo.text("Dit is een verplicht veld.");
                zipcodeInfo.addClass("error");
                return false;
            }
            // if it's valid
            else {
                zipcode.val(zipcode.val().toUpperCase());
                zipcode.removeClass("error");
                zipcodeInfo.text("");
                zipcodeInfo.removeClass("error");
                return true;
            }
        }
        function validateCity() {
            // if it's NOT valid
            if (city.val().length < 1) {
                city.addClass("error");
                cityInfo.text("Dit is een verplicht veld.");
                cityInfo.addClass("error");
                return false;
            }
            // if it's valid
            else {
                city.val(toInitCap(city.val()));
                city.removeClass("error");
                cityInfo.text("");
                cityInfo.removeClass("error");
                return true;
            }
        }
        function validateCountry() {
            // if it's NOT valid
            if (country.val() == 1) {
                country.addClass("error");
                countryInfo.text("U moet een keuze maken.");
                countryInfo.addClass("error");
                return false;
            }
            // if it's valid
            else {
                country.removeClass("error");
                countryInfo.text("");
                countryInfo.removeClass("error");
                return true;
            }
        }
        function validatePhone() {
            // if it's NOT valid
            var cleanPhoneNumber=phone.val().replace(/\D/g, "");
            phone.val(cleanPhoneNumber);
            if (cleanPhoneNumber.length < 10) {
                phone.addClass("error");
                phoneInfo.text("Telefoon bestaat alleen uit cijfers.");
                phoneInfo.addClass("error");
                return false;
            }
            // if it's valid
            else {
                phone.removeClass("error");
                phoneInfo.text("");
                phoneInfo.removeClass("error");
                return true;
            }
        }
        function validatePhone2() {
            // if it's NOT valid
            var cleanPhoneNumber2=phone2.val().replace(/\D/g, "");
            phone2.val(cleanPhoneNumber2);
        }
        function validateApprovemc() {
            // if it's NOT valid
            if ($("#approvemc:checked").is(":checked")) {
                approvemc.removeClass("error");
                approvemcInfo.text("We zullen u periodiek informeren.");
                approvemcInfo.removeClass("error");
                return true;
            }
            // if it's valid
            else {
                approvemc.addClass("error");
                approvemcInfo.text("");
                approvemcInfo.addClass("error");
                aap.hide();
                return true;
            }
        }
        function validateApprovepolicy() {
            // if it's NOT valid
            if ($("#approvepolicy:checked").is(":checked")) {
                approvepolicy.removeClass("error");
                approvepolicyInfo.text("");
                approvepolicyInfo.removeClass("error");
                return true;
            }
            // if it's valid
            else {
                approvepolicy.addClass("error");
                approvepolicyInfo.text("U dient akkoord te gaan met de voorwaarden.");
                approvepolicyInfo.addClass("error");
                return false;
            }
        }
        function validateApprovepolicyClick() {
            // speciaal voor click event
            //
            // if it's NOT valid
            if ($("#approvepolicy:checked").is(":checked")) {
                approvepolicy.removeClass("error");
                approvepolicyInfo.text("");
                approvepolicyInfo.removeClass("error");
                return true;
            }
            // if it's valid
            else {
                approvepolicy.addClass("error");
                approvepolicyInfo
                        .text("U dient akkoord te gaan met de voorwaarden.");
                approvepolicyInfo.addClass("error");
                return true;
            }
        }
        function validatePass1() {
            // it's NOT valid
            if (pass1.val().length < 8) {
                pass1.addClass("error");
                pass1Info.text("Minstens 8 karakters: letters en cijfers.");
                pass1Info.addClass("error");
                return false;
            }
            // it's valid
            else {
                pass1.removeClass("error");
                pass1Info.text("Wachtwoord voldoet aan criteria.");
                pass1Info.removeClass("error");
                // validatePass2();
                return true;
            }
        }
        function validatePass2() {
            // are NOT valid
            if (pass1.val() != pass2.val()) {
                pass2.addClass("error");
                pass2Info.text("Wachtwoorden komen niet overeen.");
                pass2Info.addClass("error");
                return false;
            }
            // are valid
            // eigenlijk moet onderstaande melding niet geprint worden
            // als het eerste wachtwoord niet is ingevuld.
            else {
                pass2.removeClass("error");
                pass2Info.text("Beide wachtwoorden komen overeen.");
                pass2Info.removeClass("error");
                return true;
            }
        }
        function toInitCap(text) {
            return text.substr(0, 1).toUpperCase()
                    + text.substr(1).toLowerCase();
        }
        function showMorelink() {
            if (morelink.text() == 'lees minder <<') {
                morelink.text("lees meer >>");
                teaser.show();
                more.hide();
            } else {
                morelink.text("lees minder <<");
                teaser.hide();
                more.show();
            }
        }
        function validateRequired1() {
            // if it's NOT valid
            if (required1.val().length < 1) {
                required1.addClass("error");
                required1Info.text("Dit is een verplicht veld.");
                required1Info.addClass("error");
                return false;
            }
            // if it's valid
            else {
                required1.removeClass("error");
                required1Info.text("");
                required1Info.removeClass("error");
                return true;
            }
        }
        function validateRequired2() {
            // if it's NOT valid
            if (required2.val().length < 1) {
                required2.addClass("error");
                required2Info.text("Dit is een verplicht veld.");
                required2Info.addClass("error");
                return false;
            }
            // if it's valid
            else {
                required2.removeClass("error");
                required2Info.text("");
                required2Info.removeClass("error");
                return true;
            }
        }
		/* general temporary functions */
        function pushsubmitknop() {
			$("span.error").html('knop "' +submitknop.val().toUpperCase()+'" werkt nog niet');
        	return false;
        }
        function pushbetalenknop() {
			$("span.error").html('knop "' +betalenknop.val().toUpperCase()+'" werkt nog niet');
        	return false;
        }
    });
})(jQuery);