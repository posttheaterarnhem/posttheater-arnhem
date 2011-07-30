(function($) {

	jQuery.noConflict();
	
    $("document").ready(function() {
		var COOKIE_NAME = window.EPS.cookie;
		var relationDataJSON=$.cookie('relationData');
		var relationData=JSON.parse(relationDataJSON);
		var url = window.EPS.url;
		
		
		/* ----------------------------------------------------------------
		PURE function for displaying one activity
		-----------------------------------------------------------------*/		
		var directives = {
			'li.voorstelling': {
				'obj<-getPublicHistory': { // "for obj in items"
					'div.column1 div.sales_fk': '#{obj.sales_fk}' + '<br>' + '#{obj.ordered}' +' tickets',
					'div.column2 div.activiteit': '#{obj.performers}' +', ' + '#{obj.title}'  + '<br>' + '#{obj.start_date}',
					'div.column3 div.eticket a.download': '#{obj.eTicket.description}',
					'div.column3 div.eticket a.download@href': url + '?a=getETicket&id=#{obj.eTicket.url}',
					'div.column3 div.eticket a.download@title': 'Klik om het ETicket af te drukken'
				}
			}
		};
	
	
		/* ----------------------------------------------------------
		 * helper
		 * ------------------------------------------------------- */
		function pleaseWaitHelper(status) {
			if(status == 'show') {
				$('div#columnright').addClass('loading');
				$('div#loading_container').css('display','block').css('z-index','9999');
			} else {
				$('div#columnright').removeClass('loading');
				$('div#loading_container').css('display','none');			
			}
		}
	
		/* ----------------------------------------------------------
		 * getHistory
		 * ------------------------------------------------------- */
        function getHistory() {
			var key = window.EPS.key;
			var url = window.EPS.url;
			var relation_fk = relationData.sessionData.custId;
			
			pleaseWaitHelper('show');
			
			$.ajax( {
				url : url,
				type : "post",
				async : false,
				dataType : 'jsonp',
				data : {
					a: 'getHistory',
					key: key,
					relation_fk:  relation_fk /*1000332*/
				},
				success : function(e) {
					pleaseWaitHelper('hide');
					var Code = e.EPSVenue.Result.Code;
					if(Code == 0) {
						var Orders = e.EPSVenue.Sale;
						$('#geschiedenis').render(Orders, directives);
						if($('#geschiedenis li').children().length == 0) {
							$('#geschiedenis').hide();
							$('#bericht').show();
						}
					}
				}
			});      
       }
       
       // ===========================================================
       getHistory();

    });

})(jQuery);