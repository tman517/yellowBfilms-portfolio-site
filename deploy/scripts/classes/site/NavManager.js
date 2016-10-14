


function NavManager(){
	Global.trace("[NavManager]");
	
	// ------------------------ 
	// -- PRIVATE PROPERTIES -- 
	// ------------------------ 
	var _this = this;
	
	// ----------------------- 
	// -- PUBLIC PROPERTIES -- 
	// ----------------------- 
	
	
	// --------------------
	// == PUBLIC METHODS ==
	// --------------------
	
	// ---------------------
	// == PRIVATE METHODS ==
	// ---------------------
	function init(){
		// desktop
		initNavMenu();
		initPageListeners();

		// mobile
		initMobileMenu();

		// tracking on social buttons
		$(".social_wrapper .fa-facebook").bind(Global.click, function(){
			sCode.trackOutboundClick('https://www.facebook.com/SmurfsMovie/','facebook_like');
		});

		$(".social_wrapper .fa-twitter").bind(Global.click, function(){
			sCode.trackOutboundClick('https://twitter.com/SmurfsMovie/','followtwitter_button');
		});

		$(".social_wrapper .fa-instagram").bind(Global.click, function(){
			sCode.trackOutboundClick('https://www.instagram.com/SmurfsMovie/','followinstagram_button');
		});

		$(".social_wrapper .fa-tumblr").bind(Global.click, function(){
			sCode.trackOutboundClick('https://SmurfsProductionBlog.com/','followtumblr_button');
		});

		$(".register").bind(Global.click, function(){
			sCode.trackOutboundClick('https://secure.sonypictures.com/registration/?property=smurfsthelostvillage','register_button');
		});

	}

	function initNavMenu(){
		$("#desktop_wrapper nav .navOption").bind(Global.click, navOption_clickHandler);
	}

	function initPageListeners(){
		$("#desktop_wrapper .site_wrapper .closeBtn, #desktop_wrapper .content_overlay").bind(Global.click, showHome);
	}

	function navOption_clickHandler(e){
		var clickedNav = e.currentTarget;
		var navTarget = $(clickedNav).data("nav");

		console.log("navTarget", navTarget);

		// if not already selected (showing)
		if( !$(clickedNav).hasClass("selected") ){

			// remove selected
			$("#desktop_wrapper nav .selected").removeClass("selected");

			// determine proceess based on nav chosen
			switch(navTarget){
				case "story":
					Global.views.about.scrollToTop();
					showPage("story");
					$(clickedNav).addClass("selected");
					sCode.trackPageView("about.html");
					break;
				case "meetTheCharacters":
					Global.views.meetTheCharacters.reset();
					showPage("meetTheCharacters");
					$(clickedNav).addClass("selected");
					sCode.trackPageView("meetthecharacters.html");
					break;
				case "cast":
					Global.views.cast.scrollToTop();
					showPage("cast");
					$(clickedNav).addClass("selected");
					sCode.trackPageView("cast.html");
					break;
				/*
				case "gallery":
					showGallery();
					$(clickedNav).addClass("selected");
					break;
				*/
				case "video":
					Global.videoOverlay.open(__trailerId);
					sCode.trackPageView("trailer.html");
					break;
				default:
					break;
			}

			//closeMenu();
		}
	}

	function showPage(sectionId){
		// hide all sections
		$("#desktop_wrapper .site_wrapper .content").css({"display":"none"});

		// close gallery incase its open
		//closeGallery();

		// show selected section
		$("#desktop_wrapper .site_wrapper").css({"display":"block"});
		$("#desktop_wrapper .site_wrapper .content_overlay").addClass("open");
		$("#desktop_wrapper ." + sectionId).css({"display":"block"});
		$("#desktop_wrapper .site_wrapper .content_wrapper").css({"display":"block", "opacity":0}).stop(true, false).animate({"opacity":1}, 1000);
		
	}

	function closePage(){
		$("#desktop_wrapper .site_wrapper").css({"display":"none"});
		/*
		$("#site_wrapper .content").css({"display":"none"});
		$("#site_wrapper .content_overlay").stop(true, false).animate({"opacity":0}, function(){
			$("#site_wrapper .content_overlay").css({"display":"none"});
			$("#site_wrapper .content_overlay").removeClass("open");
		});
		*/
	}

	/*
	function showGallery(){
		// close other pages if incase they are showing
		closePage();

		// show gallery
		$("#gallery_wrapper").css({"display":"block", "opacity":0}).stop(true, false).animate({"opacity":1}, function(){

		});
	}

	function closeGallery(){
		$("#gallery_wrapper").stop(true, false).animate({"opacity":0}, function(){
			$("#gallery_wrapper").css({"display":"none"});
		});
	}
	*/

	function showHome(){
		//closeGallery();
		closePage();

		$("#desktop_wrapper nav .selected").removeClass("selected");
	}

	/*
	function openMenu(){
		// show menu sldie in
		$("#desktop_wrapper nav").stop(true, false).animate({"left":0});

		// fade in darkener
		$("#desktop_wrapper .nav_darkener").css({"display":"block", "opacity":0}).stop(true, false).animate({"opacity":.9});
	}

	function closeMenu(){
		// slide out menu
		$("#desktop_wrapper nav").stop(true, false).animate({"left": - ($("#desktop_wrapper nav").width())});

		// fade out and hide darkener
		$("#desktop_wrapper .nav_darkener").animate({"opacity":0}, function(){
			$("#desktop_wrapper .nav_darkener").css({"display":"none"});
		});
	}
	*/

	function initMobileMenu(){
		$("#mobile_wrapper .menuBtn").bind(Global.click, showMobileMenu);
		$("#mobile_wrapper .closeBtn, #mobile_wrapper .menu_wrapper .home").bind(Global.click, hideAllPages);

		$("#mobile_wrapper nav .navOption").bind(Global.click, mobileNavOption_clickHandler);
	}

	function showMobileMenu(){
		$("#mobile_wrapper .menu_wrapper").addClass('show');
	}

	function hideAllPages(){
		$("#mobile_wrapper .show").removeClass('show');
		$("#mobile_wrapper nav .selected").removeClass("selected");
	}

	function mobileNavOption_clickHandler(e){
		//hide all
		hideAllPages();

		var clickedNav = e.currentTarget;
		var navTarget = $(clickedNav).data("nav");

		// if not already selected (showing)
		if( !$(clickedNav).hasClass("selected") ){

			// remove selected
			$("#mobile_wrapper nav .selected").removeClass("selected");

			// determine proceess based on nav chosen
			switch(navTarget){
				case "story":
					Global.views.about.scrollToTop();
					$("#mobile_wrapper .story_wrapper").addClass("show");
					$(clickedNav).addClass("selected");
					sCode.trackPageView("about.html");
					break;
				case "meetTheCharacters":
					Global.views.meetTheCharacters.reset();
					$("#mobile_wrapper .meetTheCharacters_wrapper").addClass("show");
					$(clickedNav).addClass("selected");
					sCode.trackPageView("meetthecharacters.html");
					break;
				case "cast":
					Global.views.cast.scrollToTop();
					$("#mobile_wrapper .cast_wrapper").addClass("show");
					$(clickedNav).addClass("selected");
					sCode.trackPageView("cast.html");
					break;
				/*
				case "gallery":
					showGallery();
					$(clickedNav).addClass("selected");
					break;
				*/
				case "video":
					Global.videoOverlay.open(__trailerId);
					sCode.trackPageView("trailer.html");
					break;
				default:
					break;
			}

			//closeMenu();
		}
	}


	init();
	
}

