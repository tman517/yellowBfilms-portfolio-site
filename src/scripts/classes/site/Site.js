


function Site(){
	Global.trace("[Site]");
	
	// ------------------------ 
	// -- PRIVATE PROPERTIES -- 
	// ------------------------ 
	var _this = this;
	
	var _preloader;

	var _atPreloader = true;

	var _prePreloadManifest = [
		{id:"preloader_bg", src:"images/preloader_bg.jpg"}
	];

	var _preloadManifest = [
		{id:"testImage", src:"images/test.png"}
	];
	
	
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

		// hide all top level wrappers
		$("#desktop_wrapper, #mobile_wrapper, #preload_wrapper").css({"display":"none"});

		// init youtube api player
		Global.videoOverlay = new VideoOverlay(function(){
			// preload site
			initPrePreloader();
		});		

	}

	function initPrePreloader(){
		var prePreloader = new Preloader(_prePreloadManifest);

		$(prePreloader).bind(Preloader.COMPLETE, function(){
			$(this).unbind();

			showPreloader();
		});

		prePreloader.init(false);
	}

	function showPreloader(){
		$("#preloader_wrapper").css({"display":"block", "opacity":0}).animate({"opacity":1}, 150);
		initPreloader();
	}

	function initPreloader(){
		Global.trace("[Site::initPreloader]");

		// setup preloader
		_preloader = new Preloader(_preloadManifest);
		
		// preload complete listener
		$(_preloader).bind(Preloader.COMPLETE, function(){
			$(this).unbind();

			// init site
			setTimeout(function(){
				preloaderCompleteHandler();
			}, 500);
		});
		
		// preload progress listener
		$(_preloader).bind(Preloader.PROGRESS, function(){
			var progress = _preloader.loadProgress;
			Global.trace("progress = " + progress);

			$("#preloader_wrapper .percentage").html(progress + "%");
			$("#preloader_wrapper .loaderBar").css({"width":(progress + "%")});
		});
		
		// start preloading
		_preloader.init(true);
	}

	function preloaderCompleteHandler(){		
		initHome();
		initLayoutManager();

		$("#preloader_wrapper .percentage").stop(true, false).animate({"opacity":0}, function(){
			// shrink loader bar
			$("#preloader_wrapper .loaderBar").addClass("shrink");

			$("#preloader_wrapper .bg").addClass("hide");

			setTimeout(function(){
				$("#desktop_wrapper .logo_wrapper .logoCenter").addClass("show");

				setTimeout(function(){
					$("#desktop_wrapper .logo_wrapper .logoLeft").addClass("show");
					$("#desktop_wrapper .logo_wrapper .logoRight").addClass("show");
					$("#desktop_wrapper .bg").addClass("show");

					$("#preloader_wrapper").remove();

					setTimeout(function(){
						$("#desktop_wrapper .category_wrapper.cars .thumb").addClass("show");
					}, 600);

					setTimeout(function(){
						$("#desktop_wrapper .category_wrapper.commercial .thumb").addClass("show");
					}, 800);

					setTimeout(function(){
						$("#desktop_wrapper .category_wrapper.fashion .thumb").addClass("show");
					}, 1000);

					setTimeout(function(){
						$("#desktop_wrapper .category_wrapper.reality .thumb").addClass("show");
					}, 1200);

				}, 200);
				
			}, 200);
		});
		
	}

	function checkDeepLinks(){
		var hash = window.location.hash;
		var hashFirstPart = (hash.split("_"))[0];
		var hashSecondPart = (hash.split("_"))[1];

		// validate is a gallery image hash
		if(hashFirstPart == "#galleryImage"){
			// go directly to photo gallery
			Global.views.photoGallery.setCurrentIndex(hashSecondPart);

			// handle depending on if desktop layout or mobile layout
			if(Global.layoutManager.getCurrentMode() == "desktop"){
				//$("#site_wrapper .nav_wrapper ul li:nth-child(4)").trigger("click");
				$("#site_wrapper .navItem[data-section = '#gallery_wrapper']").trigger("click");
			}
			else if(Global.layoutManager.getCurrentMode() == "mobile"){
				$("#mobile_gallery_wrapper .label").trigger("click");
			}
		}
		else{
			// launch auto trailer only for desktop
			if(!Global.isMobile() || true){
				// auto launch trailer
				Global.videoOverlay.open(__trailerId);
			}
		}
	}


	function initLayoutManager(){
		Global.layoutManager = new LayoutManager();
	}

	function initHome(){
		Global.views.home = new Home();
	}


	init();
	
}

