let iframe = new iFrame();

iframe.on("UpdateData", async () => {

	if(document.querySelector("video[id$='_html5_api']") != null || document.querySelector("div.jw-media.jw-reset > video") != null) {
		var video: HTMLVideoElement = document.querySelector("video[id$='_html5_api']") != null
		 ? document.querySelector("video[id$='_html5_api']") : document.querySelector("div.jw-media.jw-reset > video");

		iframe.send({
			duration: video.duration,
			currentTime: video.currentTime,
			paused: video.paused
		})
	}
});