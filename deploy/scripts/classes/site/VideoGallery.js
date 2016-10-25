

function VideoGallery(){
	Global.trace("[VideoGallery]");
	
	// ------------------------ 
	// -- PRIVATE PROPERTIES -- 
	// ------------------------ 
	var _this = this;

	var _currentCategoryArray;
	
	var _carsArray = new Array();
	_carsArray[0] = {"vimeoID": "185035148", "thumb": "cars/thumb1.jpg"};
	_carsArray[1] = {"vimeoID": "142410811", "thumb": "cars/thumb2.jpg"};
	_carsArray[2] = {"vimeoID": "142410739", "thumb": "cars/thumb3.jpg"};
	_carsArray[3] = {"vimeoID": "123328161", "thumb": "cars/thumb4.jpg"};
	_carsArray[4] = {"vimeoID": "115281232", "thumb": "cars/thumb5.jpg"};

	var _commercialArray = new Array();
	_commercialArray[0] = {"vimeoID": "187031190", "thumb": "commercial/thumb1.jpg"};
	_commercialArray[1] = {"vimeoID": "188199479", "thumb": "commercial/thumb2.jpg"};

	var _fashionArray = new Array();
	_fashionArray[0] = {"vimeoID": "142407611", "thumb": "fashion/thumb1.jpg"};
	_fashionArray[1] = {"vimeoID": "142407779", "thumb": "fashion/thumb2.jpg"};

	var _realityArray = new Array();
	
	/*
	var _carsArray = new Array();
	_carsArray[0] = {"vimeoID": "172433957", "thumb": "cars/thumb1.jpg"};
	_carsArray[1] = {"vimeoID": "172433957", "thumb": "cars/thumb2.jpg"};
	_carsArray[2] = {"vimeoID": "172433957", "thumb": "cars/thumb3.jpg"};
	_carsArray[3] = {"vimeoID": "172433957", "thumb": "cars/thumb4.jpg"};
	_carsArray[4] = {"vimeoID": "172433957", "thumb": "cars/thumb5.jpg"};

	var _commercialArray = new Array();
	_commercialArray[0] = {"vimeoID": "172433957", "thumb": "commercial/thumb1.jpg"};
	_commercialArray[1] = {"vimeoID": "172433957", "thumb": "commercial/thumb2.jpg"};

	var _fashionArray = new Array();
	_fashionArray[0] = {"vimeoID": "172433957", "thumb": "fashion/thumb1.jpg"};
	_fashionArray[1] = {"vimeoID": "172433957", "thumb": "fashion/thumb2.jpg"};

	var _realityArray = new Array();
	_realityArray[0] = {"vimeoID": "172433957", "thumb": "cars/thumb1.jpg"};
	*/
	
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
		$("#desktop_wrapper .category_wrapper").bind("click", function(){

			if($(this).hasClass("cars")){
				_currentCategoryArray = _carsArray;
			}
			else if($(this).hasClass("commercial")){
				_currentCategoryArray = _commercialArray;
			}
			else if($(this).hasClass("fashion")){
				_currentCategoryArray = _fashionArray;
			}
			else if($(this).hasClass("reality")){
				_currentCategoryArray = _realityArray;
			}

			buildCarousel();

			initThumbListeners();

			openOverlay();

			// play first video
			$("#desktop_wrapper .videoGallery_wrapper .thumb:first-child").trigger("click");
		});

		$("#desktop_wrapper .overlay, #desktop_wrapper .closeBtn").bind("click", function(){
			closeOverlay();
		});
	}

	function buildCarousel(){
		// remove all current thumbs
		$("#desktop_wrapper .videoGallery_wrapper .thumb").remove();

		// if only one video, hide thumb carousel
		if(_currentCategoryArray.length < 2){
			$("#desktop_wrapper .videoGallery_wrapper .video_container, #desktop_wrapper .videoGallery_wrapper .thumb_container").addClass("noThumbs");
		}
		else {
			$("#desktop_wrapper .videoGallery_wrapper .video_container, #desktop_wrapper .videoGallery_wrapper .thumb_container").removeClass("noThumbs");
		}

		// add thumbs
		for(var i = 0; i < _currentCategoryArray.length; i++){
			var html = '<div class="thumb" data-video="'+ _currentCategoryArray[i].vimeoID + '"><img src="images/videoGallery/' + _currentCategoryArray[i].thumb + '" border="0" alt="" /></div>';

			$("#desktop_wrapper .thumbs").append(html);
		}

		// if only 2 thumbs, use smaller container
		if(_currentCategoryArray.length > 2){
			$("#desktop_wrapper .thumbs").removeClass("twoThumbs");
		}
		else{
			$("#desktop_wrapper .thumbs").addClass("twoThumbs");
		}
		
	}

	function initThumbListeners(){
		$("#desktop_wrapper .videoGallery_wrapper .thumb").unbind().bind("click", function(){
			$("#desktop_wrapper .videoGallery_wrapper .thumb").removeClass("selected");
			$(this).addClass("selected");

			// play video
			var videoID = $(this).data("video");

			// remove current iframe player
			$("#vimeoIframe").remove();
			var vimeoHTML = '<iframe id="vimeoIframe" src="//player.vimeo.com/video/' + videoID + '?autoplay=1" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';

			$("#desktop_wrapper .video_container").append(vimeoHTML);

			//
			var iframePlayer = new Vimeo.Player('vimeoIframe');

			iframePlayer.on('ended', function(){

				var currentThumb = $("#desktop_wrapper .videoGallery_wrapper .thumb.selected").index("#desktop_wrapper .videoGallery_wrapper .thumb") + 1;
				var thumbCount = $("#desktop_wrapper .videoGallery_wrapper .thumb").size();
				var nextThumb;

				// if last thumb
				if(currentThumb == thumbCount){
					// if more than one thumb, loop back to first thumb if last video
					if(thumbCount > 1){
						$("#desktop_wrapper .videoGallery_wrapper .thumb:nth-child(1)").trigger("click");

						// go to first slide
						$("#desktop_wrapper .videoGallery_wrapper .thumbs").slick("slickGoTo", 0);
					}
					// else close overlay if only one video
					else {
						closeOverlay();
					}
				}
				// play next video
				else {
					$("#desktop_wrapper .videoGallery_wrapper .thumb:nth-child(" + (currentThumb + 1) + ")").trigger("click");

					// go to slide
					$("#desktop_wrapper .videoGallery_wrapper .thumbs").slick("slickGoTo", (currentThumb));

				}
			});

			/*
			iframePlayer.on('ended', function(){
				console.log("ended");

				var currentThumb = $("#desktop_wrapper .videoGallery_wrapper .thumb.selected").index();
				var thumbCount = $("#desktop_wrapper .videoGallery_wrapper .thumb").size();
				var nextThumb;

				console.log("currentThumb", currentThumb);
				console.log("thumbCount", thumbCount);

				if(currentThumb == thumbCount){
					console.log("closeOverlay");
					closeOverlay();
				}
				else {
					console.log("trigger next thumb");
					$("#desktop_wrapper .videoGallery_wrapper .thumb:nth-child(" + (currentThumb + 1) + ")").trigger("click");
				}
			});
			*/
		});
	}

	function openOverlay() {
		// if video gallery, setup thumb carousel
		if(_currentCategoryArray.length > 2){
			$("#desktop_wrapper .videoGallery_wrapper .thumbs").slick({
				dots:true,
				infinite:false,
				speed: 300,
				slidesToShow: 3,
				slidesToScroll: 1,
				responsive: [
		    	{	
		      		breakpoint: 845,
		      		settings: {
			        	slidesToShow: 2,
			        	slidesToScroll: 1
		      		}
		    	}
		 	 	]
			});
		}
		else if(_currentCategoryArray.length == 2){
			$("#desktop_wrapper .videoGallery_wrapper .thumbs").slick({
				dots:true,
				infinite:false,
				speed: 300,
				slidesToShow: 2,
				slidesToScroll: 1,
				responsive: [
		    	{	
		      		breakpoint: 845,
		      		settings: {
			        	slidesToShow: 2,
			        	slidesToScroll: 1
		      		}
		    	}
		 	 	]
			});
		}

		setTimeout(function(){
			$(window).trigger("resize");
			$("#desktop_wrapper .overlay").addClass("show");
			$("#desktop_wrapper .videoGallery_wrapper").css({"display":"block"});

			setTimeout(function(){
				$("#desktop_wrapper .videoGallery_wrapper").addClass("show");
			}, 300);
		}, 100);
	}

	function closeOverlay() {
		if(_currentCategoryArray.length > 1){
			$("#desktop_wrapper .videoGallery_wrapper .thumbs").slick("unslick");
		}
		$("#desktop_wrapper .overlay").removeClass("show");
		$("#desktop_wrapper .videoGallery_wrapper").css({"display":"none"}).removeClass("show");
		$("#vimeoIframe").attr({"src":""});
	}


	// ----------- MOBILE -------------
	function initMobile(){
		$("#mobile_wrapper .category_wrapper").bind("click", function(){

			if($(this).hasClass("cars")){
				_currentCategoryArray = _carsArray;
			}
			else if($(this).hasClass("commercial")){
				_currentCategoryArray = _commercialArray;
			}
			else if($(this).hasClass("fashion")){
				_currentCategoryArray = _fashionArray;
			}
			else if($(this).hasClass("reality")){
				_currentCategoryArray = _realityArray;
			}

			buildMobileOverlay();

			openMobileOverlay();

			window.scrollTo(0, 0);
			
		});

		$("#mobile_wrapper .darkenOverlay, #mobile_wrapper .closeBtn").bind("click", function(){
			closeMobileOverlay();
		});
	}

	function buildMobileOverlay() {
		$("#mobile_wrapper .videos iframe").remove();

		for(var i = 0; i < _currentCategoryArray.length; i++){
			var html = '<iframe src="//player.vimeo.com/video/' + _currentCategoryArray[i].vimeoID + '" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
			$("#mobile_wrapper .videos").append(html);
		}
	}

	function openMobileOverlay(){
		$("#mobile_wrapper .darkenOverlay").addClass("show");
		$("#mobile_wrapper .videoThumb_wrapper").css({"display":"block"});

		setTimeout(function(){
			$("#mobile_wrapper .videoThumb_wrapper").addClass("show");
		}, 200);
	}

	function closeMobileOverlay(){
		$("#mobile_wrapper .videoThumb_wrapper").removeClass("show");

		setTimeout(function(){
			$("#mobile_wrapper .darkenOverlay").removeClass("show");
			$("#mobile_wrapper .videoThumb_wrapper").css({"display":"none"});
			$("#mobile_wrapper .videos iframe").remove();
		}, 200);
	}

	init();
	
}

