

function VideoGallery(){
	Global.trace("[VideoGallery]");
	
	// ------------------------ 
	// -- PRIVATE PROPERTIES -- 
	// ------------------------ 
	var _this = this;

	var _currentCategoryArray;

	var _carsArray = new Array();
	_carsArray[0] = {"vimeoID": "42704707", "thumb": "cars/thumb1.jpg"};
	_carsArray[1] = {"vimeoID": "33828399", "thumb": "cars/thumb2.jpg"};
	_carsArray[2] = {"vimeoID": "103434099", "thumb": "cars/thumb3.jpg"};
	_carsArray[3] = {"vimeoID": "344872", "thumb": "cars/thumb4.jpg"};
	_carsArray[4] = {"vimeoID": "148332415", "thumb": "cars/thumb5.jpg"};
	_carsArray[5] = {"vimeoID": "143864537", "thumb": "cars/thumb6.jpg"};

	var _commercialArray = new Array();
	_commercialArray[0] = {"vimeoID": "143864537", "thumb": "cars/thumb1.jpg"};
	_commercialArray[1] = {"vimeoID": "143864537", "thumb": "cars/thumb1.jpg"};
	_commercialArray[2] = {"vimeoID": "143864537", "thumb": "cars/thumb1.jpg"};

	var _fashionArray = new Array();
	_fashionArray[0] = {"vimeoID": "143864537", "thumb": "cars/thumb1.jpg"};
	_fashionArray[1] = {"vimeoID": "143864537", "thumb": "cars/thumb1.jpg"};
	_fashionArray[2] = {"vimeoID": "143864537", "thumb": "cars/thumb1.jpg"};
	_fashionArray[3] = {"vimeoID": "143864537", "thumb": "cars/thumb1.jpg"};

	var _realityArray = new Array();
	_realityArray[0] = {"vimeoID": "143864537", "thumb": "cars/thumb1.jpg"};
	
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
	}

	function initThumbListeners(){
		$("#desktop_wrapper .videoGallery_wrapper .thumb").unbind().bind("click", function(){
			$("#desktop_wrapper .videoGallery_wrapper .thumb").removeClass("selected");
			$(this).addClass("selected");

			// play video
			var videoID = $(this).data("video");
			$("#vimeoIframe").attr({"src":"//player.vimeo.com/video/" + videoID + "?autoplay=1"});
		});
	}

	function openOverlay() {
		// if video gallery, setup thumb carousel
		if(_currentCategoryArray.length > 1){
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
		$("#desktop_wrapper .videoGallery_wrapper .thumbs").slick("unslick");
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

