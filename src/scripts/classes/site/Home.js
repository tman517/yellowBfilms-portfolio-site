

function Home(){
	Global.trace("[Home]");
	
	// ------------------------ 
	// -- PRIVATE PROPERTIES -- 
	// ------------------------ 
	var _this = this;

	var _thumbRotationCounterRandomMax = 5;
	var _thumbRotationCounterRandomMin = 2;
	var _timer;

	var _thumbArray = new Array();
	
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
		_thumbArray[0] = {"e":$("#desktop_wrapper .category_wrapper.cars"), "max":Global.getRandomNumberBetween(_thumbRotationCounterRandomMin, _thumbRotationCounterRandomMax), "current":0};
		_thumbArray[1] = {"e":$("#desktop_wrapper .category_wrapper.commercial"), "max":Global.getRandomNumberBetween(_thumbRotationCounterRandomMin, _thumbRotationCounterRandomMax), "current":0};
		_thumbArray[2] = {"e":$("#desktop_wrapper .category_wrapper.fashion"), "max":Global.getRandomNumberBetween(_thumbRotationCounterRandomMin, _thumbRotationCounterRandomMax), "current":0};
		_thumbArray[3] = {"e":$("#desktop_wrapper .category_wrapper.reality"), "max":Global.getRandomNumberBetween(_thumbRotationCounterRandomMin, _thumbRotationCounterRandomMax), "current":0};

		_this.startTimer();
	}

	function thumbRotationTick(){
		console.log("tick");
		for(var i = 0; i < _thumbArray.length; i++){
			var current = _thumbArray[i].current;
			var max = _thumbArray[i].max;

			if(current == max){
				showNextThumbs(_thumbArray[i].e);

				// reset for next loop
				_thumbArray[i].current = 0;
				_thumbArray[i].max = Global.getRandomNumberBetween(_thumbRotationCounterRandomMin, _thumbRotationCounterRandomMax);
			}
			else{
				_thumbArray[i].current = current + 1;
			}
		}
	}

	function showNextThumbs(e){
		var nextThumb = e.find("img.show").index() + 2;

		e.find("img.show").removeClass("show");

		if(nextThumb > e.find("img").size()){
			e.find("img:first-child").addClass("show");
		}
		else{
			e.find("img:nth-child(" + nextThumb + ")").addClass("show");
		}


		/*
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
		*/
	}

	init();
	
}

