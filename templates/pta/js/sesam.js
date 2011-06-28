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

$(document).ready(function(){
	$("#form").submit(function(){
		login();
		return false;
	});

	var COOKIE_NAME = 'xtreme';
	var options = { path: '/', expires: 1 };
	alert(COOKIE_NAME);
	$.cookie(COOKIE_NAME, 'authenticated');

	$('a#cookie').click(function() {
	alert('set cookie');
		$.cookie(COOKIE_NAME, 'authenticated', options);
		return false;
	});
	$('#reset').click(function() {
		alert('logout');
		$.cookie(COOKIE_NAME, null, options);
	});
	$('#username').blur(function() {
		var showmd5 = $.getUrlVar('md5');
		if (showmd5 == 'yes') {
			$("#md5").text($.md5($('#username').val()));
		}
	});
});

function login()
{
	var user = $.md5($("#username").val());
	var pass = $.md5($("#password").val());

	if (user == "")
	{
		$("#msg").text(" Please enter your login user name  ");
		$("#user").focus();
		return false;
	}
	if(pass == "")
	{
		$("#msg").text(" Please enter the login password  ");
		$("#password").focus();
		return false;
	}
	
	if( (user == '8cf2f7e701f8c7348903615c8c68076e' && pass == 'ba954023e9ee590ab082b65b81b6b93d') || 
	    (user == '084e0343a0486ff05530df6c705c8bb4' && pass == 'fcf41657f02f88137a1bcf068a32c0a3') )
	{

		var COOKIE_NAME = 'xtreme';
		var options = { path: '/', expires: 1 };
		$.cookie(COOKIE_NAME, 'authenticated', options);
		$("#msg").text(" The login is successful, welcome  " + $("#username").val() + " Back! is entering your space  ......");
		newWindowLocation = 'http://www.xtreme-technologies.nl/proto/home.html';
		window.location = newWindowLocation;
	}
	else {
		$("#msg").text("There is no such user or password is incorrect!");
	}
}
