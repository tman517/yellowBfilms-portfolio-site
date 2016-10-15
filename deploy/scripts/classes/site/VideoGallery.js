

function VideoGallery(){
	Global.trace("[VideoGallery]");
	
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
		initDesktop();
		
		initMobile();
	}

	// ----------- DESKTOP -------------
	function initDesktop(){
		$(".category_wrapper").bind("click", function(){
			openOverlay();
		});

		$("#desktop_wrapper .overlay, .closeBtn").bind("click", function(){
			closeOverlay();
		});
	}

	function openOverlay() {
		$("#desktop_wrapper .overlay").addClass("show");
		$("#desktop_wrapper .videoGallery_wrapper").css({"display":"block"});

		setTimeout(function(){
			$("#desktop_wrapper .videoGallery_wrapper").addClass("show");
		}, 300);
	}

	function closeOverlay() {
		$("#desktop_wrapper .overlay").removeClass("show");
		$("#desktop_wrapper .videoGallery_wrapper").css({"display":"none"}).removeClass("show");

	}


	// ----------- MOBILE -------------
	function initMobile(){
	}

	init();
	
}

