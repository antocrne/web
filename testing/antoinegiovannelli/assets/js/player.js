
	// ==================================
	// STOP YOUTUBE VIDEO ON CLOSE MODAL
	// ==================================


		var player;


		function onYouTubePlayerAPIReady() {

		player = new YT.Player('video', {
				events: {

						'onReady': onPlayerReady
					}
				});
			}

		function onPlayerReady(event) {



			var stopButton = document.getElementById("stop-btn");
			stopButton.addEventListener("click", function() {
					player.stopVideo();
			});

		}

	// Injection of the YouTube API script
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/player_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
