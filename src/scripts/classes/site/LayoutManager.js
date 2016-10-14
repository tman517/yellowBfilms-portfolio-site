


function LayoutManager(){
	Global.trace("[LayoutManager]");
	
	// ------------------------ 
	// -- PRIVATE PROPERTIES -- 
	// ------------------------ 
	var _this = this;

	var _mobileWidthThreshold = 768;

	// ------------------------ 
	// -- PUBLIC PROPERTIES -- 
	// ------------------------ 
	_this.currentMode = "desktop";
	
	// --------------------
	// == PUBLIC METHODS ==
	// --------------------
	_this.resizeDesktop = function(){
		Global.trace("[LayoutManager::resizeDesktop]");


	}

	_this.resizeMobile = function(){
		Global.trace("[LayoutManager::resizeMobile]");

		var availWidth = $(window).width();
		var availHeight = $(window).height();
	}

	// ---------------------
	// == PRIVATE METHODS ==
	// ---------------------
	function init(){

		// resize handler
		$(window).resize(function(){
			resizeHandler();

		});

		// force trigger the first resize to happen
		resizeHandler();
	}

	function resizeHandler(){
		var availWidth = $(window).width();

		if( availWidth > _mobileWidthThreshold){
			
			// if switching from mobile to desktop
			if(_this.currentMode == "mobile"){
				// reset desktop with all pages closed and nav reset
				//Global.navManager.desktopHideAllPages(true);
			}

			// unmark for css reasons
			$('body').removeClass('mobile');

			// show desktop
			$('#desktop_wrapper').css({"display":"block"});
			$('#mobile_wrapper').css({"display":"none"});

			// handle resize
			_this.resizeDesktop();
			

			// update current mode 
			_this.currentMode = "desktop";
		}
		else{
			
			// if switching from desktop to mobile
			if(_this.currentMode == "desktop"){
				if(Global.navManager){
					// reset desktop with all pages closed and nav reset
					//Global.navManager.collapseAllMobileNav(true);
				}
			}

			// mark for css reasons
			$('body').addClass('mobile');

			// show mobile
			$('#desktop_wrapper').css({"display":"none"});
			$('#mobile_wrapper').css({"display":"block"});

			// handle resize
			_this.resizeMobile();
			

			// update current mode 
			_this.currentMode = "mobile";
		}
	}

	init();
	
}

