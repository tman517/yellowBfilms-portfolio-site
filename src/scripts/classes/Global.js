
//-----------------------------------------------------------------------------------------------------------------
// GLOBAL VARIABLES AND FUNCTIONS THAT CAN BE CALLED STATICLY FROM ANYWHERE
//-----------------------------------------------------------------------------------------------------------------

(function(window){
	
	// ------------------- //
	// === GLOBAL VARS === //
	// ------------------- //

	this.Global = new Object();
	
	Global.debugTrace = true; // turn console log trace function on or off for debugging

	Global.allowGetVarDebug = true; // turn on/off feature to skip scresns via get vars for quick debugging or review purposes
	
	Global.soundController = null;  // make the sound controller global so it can be accessed easily from anywhere. Site.js will construct the SoundController and assign to this var

	Global.views = new Object(); // will store all the sections / pages
	
	Global.click = "click";
	
	// ------------------------ //
	// === GLOBAL FUNCTIONS === //
	// ------------------------ //
	
	// console log for debugging
	Global.trace = function(msg){
		if ( ! window.console ) console = { log: function(){} };
		
		if(Global.debugTrace){
			console.log(msg);
		}
	}

	// get vars from url, usage: getUrlVars()["id"]);
	Global.getUrlVars = function(){
	    var vars = {};
	    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
	        vars[key] = value;
	    });
	    return vars;
	}

	// center child element inside of parent element
	Global.centerElement = function(child, parent, doHorizontal, doVertical, isCanvas, willReturnCoords){
		//trace("CENTER ELEMENT");

		var newX;
		var newY;

		if(isCanvas){
			newX = ((parent.getBounds().width - child.getBounds().width) / 2) + child.regX;
			newY = ((parent.getBounds().height - child.getBounds().height) / 2) + child.regY;

			if(willReturnCoords){
				return {x:newX, y:newY};
			}
			else{
				if(doHorizontal){
					child.x = newX;
				}
				
				if(doVertical){
					child.y = newY;
				}
			}
		}
		else{
			newX = ( $(parent).width() - $(child).width() )  / 2;
			newY = ( $(parent).height() - $(child).height() )  / 2;

			trace("parent width = " + $(parent).width() + "    parent height = " + $(parent).height());
			trace("child width = " + $(child).width() + "    chilc height = " + $(child).height());

			if(willReturnCoords){
				return {x:newX, y:newY};
			}
			else{
				if(doHorizontal){
					$(child).css({"left":newX});
				}

				if(doVertical){
					$(child).css({"top":newY});
				}				
			}
		}
	}

	// puts the \n back into json or xml parsed strings
	Global.restoreLineBreak = function(string){
		return String(string).replace(/\\n/g,"\n");
	}

	// returns a random number between a range
	Global.getRandomNumberBetween = function (start, end) {
		var rnd = Math.random();
		var range = end - start;
		var ourRnd = Math.round((rnd * range) + start);
  
  		return ourRnd;
	}

	// format numbers with comma
	Global.formatNumber = function(number){
    	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	// adds x amount of leading zeroes until it reaches digitLimit for the total length
	Global.addLeadingZeroes = function(number, digitLimit){
		var result = "" + number;

		while(result.length < digitLimit){
			result = "0" + result;
		}

		return result;
	}
	
	// checks for IE8
	Global.isIE8 = function(){
		if (navigator.appVersion.indexOf("MSIE") != -1){
		if(parseFloat(navigator.appVersion.split("MSIE")[1]) == 8){
			return true;
		   }
		}  
	    
	    return false;
	}
	
	
	// checks for IE9
	Global.isIE9 = function(){
		if (navigator.appVersion.indexOf("MSIE") != -1){
		if(parseFloat(navigator.appVersion.split("MSIE")[1]) == 9){
			return true;
		   }
		}  
	    
	    return false;
	}
	
	
	// checks for IE
	Global.isIE = function(){
		if (navigator.appVersion.indexOf("MSIE") != -1){
			return true;
		}  
	    
	    return false;
	}

	// get IE version
	Global.getIEVersion = function(){
		if (navigator.appVersion.indexOf("MSIE") != -1){
			return parseFloat(navigator.appVersion.split("MSIE")[1]);
		}else{
			return null;
		}
	}

	// checks for mobile (both phones and tablets)
	Global.isMobile = function(){
		var check = false;
		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  		return check;
	}

	// checks for phone
	Global.isPhone = function(){
		var check = false;
		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
		return check;
	}

	// checks for tablet
	Global.isTablet = function(){
		return (Global.isMobile() && !Global.isPhone());
	}

	Global.isLandscape = function(){
		return ( $(window).width() > $(window).height() );
	}

	Global.isiOS = function(){
		return /iPad|iPhone|iPod/.test(navigator.platform);
	}

	Global.isiPad = function(){
    	return (navigator.platform.indexOf("iPad") != -1);
    }

	// update mouse events with tap events if mobile
	if(Global.isMobile()){
		Global.click = "click";
	}

	// ---------------
	// remove hover effect from mobile devices
	if (Global.isMobile()) { // remove all :hover stylesheets
	    try { // prevent exception on browsers not supporting DOM styleSheets properly
	        for (var si in document.styleSheets) {
	            var styleSheet = document.styleSheets[si];
	            if (!styleSheet.rules) continue;

	            for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
	                if (!styleSheet.rules[ri].selectorText) continue;

	                if (styleSheet.rules[ri].selectorText.match(':hover')) {
	                    styleSheet.deleteRule(ri);
	                }
	            }
	        }	
	    } catch (ex) {}
	}
	
}(window));



