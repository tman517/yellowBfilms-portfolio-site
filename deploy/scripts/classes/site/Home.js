

function Home(){
	Global.trace("[Home]");
	
	// ------------------------ 
	// -- PRIVATE PROPERTIES -- 
	// ------------------------ 
	var _this = this;

	var _thumbRotationCounterRandomMax = 5;
	var _thumbRotationCounterRandomMin = 1;
	var _thumbRotationCounterMax;
	var _thumbRotationCounter = 0;
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
		_thumbArray[0] = $("#desktop_wrapper .category_wrapper.cars");
		_thumbArray[1] = $("#desktop_wrapper .category_wrapper.commercial");
		_thumbArray[2] = $("#desktop_wrapper .category_wrapper.fashion");
		_thumbArray[3] = $("#desktop_wrapper .category_wrapper.reality");

		_thumbRotationCounterMax = Global.getRandomNumberBetween(_thumbRotationCounterRandomMin, _thumbRotationCounterRandomMax);

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
		console.log("------showNextThumbs--------");

		var randomCategoryNum = Global.getRandomNumberBetween(0, (_thumbArray.length - 1));

		console.log("randomCategoryNum", randomCategoryNum);

		var nextThumb = _thumbArray[randomCategoryNum].find("img.show").index() + 2;

		console.log("nextThumb", nextThumb);

		 _thumbArray[randomCategoryNum].find("img.show").removeClass("show");

		 if(nextThumb > _thumbArray[randomCategoryNum].find("img").size()){
		 	_thumbArray[randomCategoryNum].find("img:first-child").addClass("show");
		 }
		 else{
		 	_thumbArray[randomCategoryNum].find("img:nth-child(" + nextThumb + ")").addClass("show");
		 }


		// set random timeout for next loop
		_thumbRotationCounterMax = Global.getRandomNumberBetween(_thumbRotationCounterRandomMin, _thumbRotationCounterRandomMax);


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

