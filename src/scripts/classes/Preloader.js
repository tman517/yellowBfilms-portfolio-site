
//-----------------------------------------------------------------------------------------------------------------
// PRELOADER (using createjs)
//-----------------------------------------------------------------------------------------------------------------


/* 

Will automatically sift thru the html and css for image files and add them to the manifest to load.

Constructor can take in an optional array of objects to load explicit files that are not found in the html or css markup.

Ex: 

var loadManifest = [
	{id: "test", src:"images/acceptBtn.png"}
];

- Will trigger "preloaderProgress" for the progress event.
- Will trigger "preloaderComplete" for the load completed event.


*/

// static constants
Preloader.PROGRESS = "preloaderProgress";
Preloader.COMPLETE = "preloaderComplete";


function Preloader(loadManifest){
	Global.trace("[Preloader]");
	
	// ------------------------ 
	// -- PRIVATE PROPERTIES -- 
	// ------------------------
	var _this = this;
	
	var _loadManifest = loadManifest;
	
	
	// ----------------------- 
	// -- PUBLIC PROPERTIES -- 
	// -----------------------
	_this.assetQueue;
	
	_this.loadProgress = 0;
	
	
	
	// --------------------
	// == PUBLIC METHODS ==
	// --------------------
	_this.init = function(doScrape){
		Global.trace("[Preloader::init]");	

		// scrape for html/css image sources
		if(doScrape){			
			buildManifestFromElements();
		}		
		
		// look for alternate sound file extensions
		createjs.Sound.alternateExtensions = ["mp3"];

		// create the load queue
		_this.assetQueue = new createjs.LoadQueue(false);

		// set max connections
		if(Global.isIE8() || Global.isIE9()){
            _this.assetQueue.setMaxConnections(1);
        }else{
            _this.assetQueue.setMaxConnections(5);
        }
		
		// install the sound pluggin
		_this.assetQueue.installPlugin(createjs.Sound);
	
		// setup listeners
		_this.assetQueue.addEventListener("complete", loaderComplete);
		_this.assetQueue.on("progress", loaderProgress, this);
		
		// start the load
		_this.assetQueue.loadManifest(_loadManifest);
	}
	
	// ---------------------
	// == PRIVATE METHODS ==
	// ---------------------
	
	function loaderProgress(e){
		var progress = Math.floor(e.progress * 100);
		
		if(_this.loadProgress != progress){
			_this.loadProgress = progress;
			//Global.trace("loadProgress = " + _this.loadProgress);
			
			$(_this).trigger(Preloader.PROGRESS);
		}
	}
	
	function loaderComplete(){
		$(_this).trigger(Preloader.COMPLETE);
	}
	
	function buildManifestFromElements(){
		$("*").each(function() {
			findImageInElement(this);
		});
	}
	
	function findImageInElement(element) { 
	   var url = "";
	
		if ($(element).css("background-image") != "none") {
			var url = $(element).css("background-image");
		} else if (typeof($(element).attr("src")) != "undefined" && element.nodeName.toLowerCase() == "img") {
			var url = $(element).attr("src");

			// determine to use desktop or mobile image src
			if(Global.isMobile()){
		  		if($(element).data("mobile") != "undefined"){
		  			$(element).attr("src", $(element).data("mobile"));
		  		}
			}
			else{
		  		if($(element).data("desktop") != "undefined"){
		  	 		$(element).attr("src", $(element).data("desktop"));
		  		}
			}
		}
		else{
			// determine if element has background image data attr
		    if(Global.isMobile()){
				 if($(element).data("mobile") != "undefined" && $(element).data("mobile") != null){
				 	$(element).css("background-image", 'url("' + $(element).data("mobile") + '")');
				 }
			}
			else{
				if($(element).data("desktop") != "undefined" && $(element).data("desktop") != null){
				 	$(element).css("background-image", 'url("' + $(element).data("desktop") + '")');
				 }
			}
		}

		if(url.indexOf("data:image") == -1){
			if (url.indexOf("gradient") == -1 && url.length != "") {
				url = url.replace(/url\(\"/g, "");
				url = url.replace(/url\(/g, "");
				url = url.replace(/\"\)/g, "");
				url = url.replace(/\)/g, "");

				var urls = url.split(", ");

				for (var i = 0; i < urls.length; i++) {
			 		if (urls[i].length > 0) {
						var extra = "";
						if ($.browser.msie && $.browser.version < 9) {
						    extra = "?" + Math.floor(Math.random() * 3000);
						}
						var obj = {id: urls[i], src:urls[i] + extra};
						_loadManifest.push(obj);
					}	
				}
			}
	    }
	   
	}
}

