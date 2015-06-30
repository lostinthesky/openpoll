/*
 *  EU Cookie Law Script
 *  Created by Kevin Steerment
 *
 *  Cookie Set/Get functions provided by http://www.w3schools.com
 *  
 *  Copyright © 2012
 *
 *  Version 1.3c, last updated 24/05/2012
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 *  MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 *  AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 *  OF THE POSSIBILITY OF SUCH DAMAGE.
*/


(function($){

	function cwsetCookie(c_name,value,exdays) {
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie=c_name + "=" + c_value;
	}

	function cwgetCookie(c_name) {
		var i,x,y,ARRcookies=document.cookie.split(";");
		for (i=0;i<ARRcookies.length;i++) {
			x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			if (x==c_name) {
				return unescape(y);
			}
		}
	}

    $.fn.cwAllowCookies = function(options) {

		//Try and work out if user is in europe or not
		var dateObject = new Date();
		var timeOffset = - dateObject.getTimezoneOffset() / 60;
		var region = "TheWorld";

		switch (timeOffset) {
			case -1:
			case -0: // Put in -0 as javascript thinks this is different to 0
			case 0:
			case 1:
			case 2:
			case 3:
			case 3.5:
			case 4:
			case 4.5:
			region = "Europe"; 	// N.B. This also covers most of Africa and the Middle East
			break;
			case 9:
			region = "Japan"; // N.B. This also includes the Koreas
		}

		$(".cwallowcookies").live('click', function() {	//When agree button is pressed
			cwsetCookie("cwallowcookies",true,365);	//Set cookie to remember permission
			$(".cwcookielaw").slideUp('slow',function() { $(this).remove(); }); //Hide information bar from webpage
			$(".cwcookielawbg").slideUp('slow',function() { $(this).remove(); $(".cwcookielaw").remove();  });
		});

		$(".cwcookiesmoreinfo").live('click',function() { //More information bubble
			$(".cwcookiebubble").fadeIn('slow');
		});

		$(".cwcookiebubble").live('click',function() { //Hide information bubble
			$(".cwcookiebubble").fadeOut('slow');
		});

		//Get cookie information
		var cwallowcookies=cwgetCookie("cwallowcookies");

		//Set Defaults
        var defaults = {
            imgpath:				"/images/cookielawscript/",
            cwmessage:				"Please note this website requires cookies in order to function correctly, they do not store any specific information about you personally.",
            cwbubblemessage:		"On 26th May 2012, new laws came into force in the EU that affect most web sites. If cookies are used in a site, the Privacy and Electronic Communications (EC Directive) (Amendment) Regulations 2011 (UK Regulations) asks that the website user must give consent to the use and placing of the cookies.",
            cwbubbletitle:			"Cookie Laws within the EU",
            cwhref:					"",
            cwreadmore:				"Read More",
            cwagree:				"I Agree",
            cwmoreinfo:				"More Info",
			fixed:					false,
			animate:				true,
			europeonly:				false
        };

		//Merge Options
        var options = $.extend(defaults, options);

		//If europe only option is set and user is not in europe then cancel operation (this function should not be relied upon)
		if (options.europeonly == true) { if (region !== "Europe") { return(false); } }

		//Check if Read More link needs to be added
		if (options.cwhref !== "") { options.cwbubblemessage = options.cwbubblemessage + " <a href=\""+options.cwhref+"\">"+options.cwreadmore+"</a>"; }

		//Create html and insert information
		var html = "<div class=\"cwcookielaw\"><style>" +
					".cwcookielaw	{" +
					"	background-image: url('" + options.imgpath + "bg.png'); " +
					"	background-repeat: repeat-x; " +
					"	height: 53px; " +
					"	font-family: Calibri, Tahoma, Geneva, sans-serif;" +
					"	font-size: 12px; " +	
					"	font-weight: bold; " +
					"	z-index: 1000; " +
					"	width: 100%; " +
					"	position: absolute; " +
					"	display: none; " +
					"	line-height: 14px; ";

		if (options.fixed) { html = html + "	position: fixed; "; }

		html = html + "} " +
					".cwcookielaw p { " +
					"	padding: 15px 0 0 0; " +
					"	margin: 0; " +
					"	float: left; " +
					"	color: #6e6205; " +
					"	line-height: 14px; " +
					"} " +
					".cwcookielaw .cwallowcookies { " +
					"	background-image: url('" + options.imgpath + "agree.png'); " +
					"	background-repeat: no-repeat; " +
					"	width: 57px; " +
					"	height: 25px; " +
					"	float: right; " +
					"	margin-top: 10px; " +
					"	padding: 5px 0 0 21px; " +
					"	color: #584F4D; " +
					"} " +
					".cwcookielaw .cwcookiesmoreinfo { " +
					"	background-image: url('" + options.imgpath + "info.png'); " +
					"	background-repeat: no-repeat; " +
					"	width: 66px; " +
					"	height: 20px; " +
					"	float: right; " +
					"	margin-top: 10px; " +
					"	padding: 5px 0 0 13px; " +
					"	color: #584F4D; " +
					"} " +
					".cwcookielaw .cwcookiesmoreinfo:hover { background-image: url('" + options.imgpath + "info_h.png'); } " +
					".cwcookielaw .cwallowcookies:hover { background-image: url('" + options.imgpath + "agree_h.png'); } " +
					".cwcookielaw .cwallowcookies:hover, .cwcookielaw .cwcookiesmoreinfo:hover { text-decoration: none; color: #a2a2a2; } " +
					".cwcookielaw .cwcookiecontainer { width: 890px; margin: auto; position: relative;} " +
					".cwcookielawbg { height: 47px; display:none; } " +
					".cwcookielaw .cwcookiebubble { " +
					"	background-image: url('" + options.imgpath + "bubble.png'); " +
					"	background-repeat: no-repeat; " +
					"	position: absolute; " +
					"	width: 291px; " +
					"	height: 132px; " +
					"	right: -5px; " +
					"	top: 40px; " +
					"	padding: 31px 24px 0 24px; " +
					"	display: none; " +
					"	cursor: pointer; " +
					"} " +
					".cwcookiebubble .cwcookietitle { " +
					"	font-family: Calibri, Tahoma, Geneva, sans-serif; " +
					"	font-size: 14px; " +
					"	font-weight: bold; " +
					"	margin-bottom: 10px; " +
					"	color: #6e6205; " +
					"} " +
					".cwcookiebubble p { margin: 0; padding: 0; color: #6e6205; line-height: 14px;} " +
					".cwcookiebubble a { text-decoration: underline; color: #6e6205; } " +
					"</style> " +
							"<div class=\"cwcookiecontainer\">" +
								"<p>" + options.cwmessage + "</p>" +
								"<a class=\"cwcookiesmoreinfo\" href=\"#\">" + options.cwmoreinfo + "</a>" +
								"<a class=\"cwallowcookies\" href=\"#\">" + options.cwagree + "</a>" +
								"<div class=\"cwcookiebubble\"><p class=\"cwcookietitle\">" + options.cwbubbletitle + "</p><p>" + options.cwbubblemessage + "</p></div>" +
							"</div>" +
						"</div><!-- cwcookielaw -->" +
						"<div class=\"cwcookielawbg\"></div>";

		//Check if cookie exists
		if (cwallowcookies) {
			cwsetCookie("cwallowcookies",true,365); //Update coookie with new Date / TimeStamp
		} else {
			$(this).prepend(html); //Add html to page
			if (options.animate) { //If animation = true
				$(".cwcookielaw").slideDown('slow'); //Show Information Bar at top of webpage
				$(".cwcookielawbg").slideDown('slow'); //Push Down background at same time
			} else {
				$(".cwcookielaw").show();
				$(".cwcookielawbg").show();
			}
		}

    };
})(jQuery);