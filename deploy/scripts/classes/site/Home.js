

function Home(){
	Global.trace("[Home]");
	
	// ------------------------ 
	// -- PRIVATE PROPERTIES -- 
	// ------------------------ 
	var _this = this;
	var _thumbRotationCounterMax = 5;
	var _thumbRotationCounter = 0;
	var _timer;
	
	// ----------------------- 
	// -- PUBLIC PROPERTIES -- 
	// ----------------------- 
	
	
	// --------------------
	// == PUBLIC METHODS ==
	// --------------------
	_this.startTimer = function(){
		_timer = setInterval(thumbRotationTick, 1000);
	}

	_this.stopTimer = function(){
		clearInterval(_timer);
	}
	
	// ---------------------
	// == PRIVATE METHODS ==
	// ---------------------
	function init(){
		if(!Global.isMobile()){
			initDesktop();
		}
	}

	// ----------- DESKTOP -------------
	function initDesktop(){
		_this.startTimer();
	}

	function thumbRotationTick(){
		_thumbRotationCounter++;

		if(_thumbRotationCounter == _thumbRotationCounterMax){
			showNextThumbs();
			_thumbRotationCounter = 0;
		}
	}

	function showNextThumbs(){
		// cars
		var nextCar = $("#desktop_wrapper .category_wrapper.cars img.show").index() + 2;

		$("#desktop_wrapper .category_wrapper.cars img.show").removeClass("show");

		if(nextCar > $("#desktop_wrapper .category_wrapper.cars img").size() ){
			$("#desktop_wrapper .category_wrapper.cars img:first-child").addClass("show");
		}
		else{
			$("#desktop_wrapper .category_wrapper.cars img:nth-child(" + nextCar+ ")").addClass("show");
		}

		// commercial
		setTimeout(function(){
			var nextCommercial = $("#desktop_wrapper .category_wrapper.commercial img.show").index() + 2;

			$("#desktop_wrapper .category_wrapper.commercial img.show").removeClass("show");

			if(nextCommercial > $("#desktop_wrapper .category_wrapper.commercial img").size() ){
				$("#desktop_wrapper .category_wrapper.commercial img:first-child").addClass("show");
			}
			else{
				$("#desktop_wrapper .category_wrapper.commercial img:nth-child(" + nextCommercial+ ")").addClass("show");
			}
		}, 150);

		// fashion
		setTimeout(function(){
			var nextFashion = $("#desktop_wrapper .category_wrapper.fashion img.show").index() + 2;

			$("#desktop_wrapper .category_wrapper.fashion img.show").removeClass("show");

			if(nextFashion > $("#desktop_wrapper .category_wrapper.fashion img").size() ){
				$("#desktop_wrapper .category_wrapper.fashion img:first-child").addClass("show");
			}
			else{
				$("#desktop_wrapper .category_wrapper.fashion img:nth-child(" + nextFashion+ ")").addClass("show");
			}
		}, 300);

		// reality
		setTimeout(function(){
			var nextReality = $("#desktop_wrapper .category_wrapper.reality img.show").index() + 2;

			$("#desktop_wrapper .category_wrapper.reality img.show").removeClass("show");

			if(nextReality > $("#desktop_wrapper .category_wrapper.reality img").size() ){
				$("#desktop_wrapper .category_wrapper.reality img:first-child").addClass("show");
			}
			else{
				$("#desktop_wrapper .category_wrapper.reality img:nth-child(" + nextReality+ ")").addClass("show");
			}
		}, 450);
	}

	init();
	
}

