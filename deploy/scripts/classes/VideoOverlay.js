

VideoOverlay.OPEN = "videoOverlay_open";
VideoOverlay.COMPLETE = "videoOverlay_complete";

function VideoOverlay(callback){	
	Global.trace("[VideoOverlay]");

	// ------------------------ 
	// -- PRIVATE PROPERTIES -- 
	// ------------------------ 
	var _this = this;

	var _callback = callback;

	var _YTPlayer;

	var _isOpen = false;

	var _autoPlay = true;

	var _thisWindow = window;
	
	// ----------------------- 
	// -- PUBLIC PROPERTIES -- 
	// ----------------------- 
	
	// --------------------
	// == PUBLIC METHODS ==
	// --------------------
	this.open = function(videoId){
		Global.trace("[VideoOverlay::open]");

		// determine if bottom margin needs more space between of ticket tout
		var bottomMargin = 40;

		$.fancybox.open([{href:"#videoOverlay_wrapper"}],{
			openEffect  : 'fade',
			closeEffect : 'fade',
			width : "100%",
			height : "100%",
			autoSize : false,
			margin : [40, 0, bottomMargin, 0],
			padding : 0,
			scrolling : 'no',
			beforeShow: function(){
							
				_YTPlayer = new YT.Player('videoOverlay_player', {
					width: "100%",
					height:"100%",
					videoId: videoId,
					playerVars: { 'autoplay': 1},
					events : {
						'onReady' : function(){

						},
						'onStateChange': onPlayerStateChange	
					}	
				});

				$(_this).trigger(VideoOverlay.OPEN);
				_isOpen = true;
			},
			afterShow: function(){
				$('iframe').each(function(){
					var url = $(this).attr("src"), char = url.indexOf("?") != -1 ? '&' : '?';
					
					if(url.indexOf("youtube") != -1){ 
						$(this).attr("src",url+char+"wmode=transparent");
						$(this).attr("wmode","Opaque");
					}
				});
			},
			beforeClose: function(){
				_YTPlayer.destroy();
				_isOpen = false;
			},
			afterClose: function(){
				$(_this).trigger(VideoOverlay.COMPLETE);

				// auto close only first time it is played
				_autoPlay = false;
			}
		});
	}

	this.openPlaylist = function(videoId, playListId){
		Global.trace("[VideoOverlay::open]");

		$.fancybox.open([{href:"#videoOverlay_wrapper"}],{
			openEffect  : 'fade',
			closeEffect : 'fade',
			width : "100%",
			height : "97%",
			autoSize : false,
			margin : [50, 0, 40, 0],
			padding : 0,
			scrolling : 'no',
			beforeShow: function(){
							
				_YTPlayer = new YT.Player('videoOverlay_player', {
					width: "100%",
					height:"100%",
					videoId: videoId,
					playerVars: { 'autoplay': 1,
			        	listType:'playlist',
			        	list: playListId,
			    },
					events : {
						'onReady' : function(){
							// overlay get tickets button
							$(".fancybox-getTickets").unbind();
                            $(".fancybox-getTickets").bind("click", function(){
                                $.fancybox.close(true);
                                if(Global.layoutManager.getCurrentMode() == "desktop"){
                                	$("#site_wrapper .navItem.tickets_nav").trigger(Global.click);
                                }else{
                                	setTimeout(function(){
                                		$("#mobile_tickets_wrapper .label").trigger(Global.click);
                                	}, 100);
                                }
                            });
						},
						'onStateChange': onPlayerStateChange	
					}	
				});

				$(_this).trigger(VideoOverlay.OPEN);
				_isOpen = true;
			},
			beforeClose: function(){
				_YTPlayer.destroy();
				_isOpen = false;
			},
			afterClose: function(){
				$(_this).trigger(VideoOverlay.COMPLETE);

				// auto close only first time it is played
				_autoPlay = false;
			}
		});
	}
	
	// ---------------------
	// == PRIVATE METHODS ==
	// ---------------------

	function init(){
		// create the html for overlay
		$("body").append('<div id="videoOverlay_wrapper"><div id="videoOverlay_player"></div></div>');

		// kick off the youtube api
		var tag = document.createElement('script');
	
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}

	function initPageBlurListener(){
		// pause video on page blur
		$(_thisWindow).unbind("blur", pageBlur_handler);

		_thisWindow.focus();
		
		$(_thisWindow).bind("blur", pageBlur_handler);
	}

	function pageBlur_handler(){
		$(_thisWindow).unbind("blur", pageBlur_handler);
		
		if(_isOpen){
			_YTPlayer.pauseVideo();
		}
	}

	window.onYouTubeIframeAPIReady = function(){
		// run the call back
		if(_callback){
			_callback();
		}
	}

	function onPlayerStateChange(e){
		if(e.data == 0){
			// auto close only on first auto play video that is launched after preloader
			if(_autoPlay){
				$.fancybox.close(true);
				_autoPlay = false;
			}
		}
		else if(e.data == 1){
			//initPageBlurListener();
		}
	}

	init();
}


