var presence = new Presence({
  clientId: "622436057866043434",
  mediaKeys: false
}),
presenceData: presenceData = {
  largeImageKey: "logo"
};

presence.on("UpdateData", async () => {

var audio: HTMLAudioElement = document.querySelector("#jp_audio_0");
if (audio !== null) {

  var title:HTMLElement = document.querySelector(".brg-player-title");
      
  presenceData.details = (title as HTMLElement).innerText
  presenceData.largeImageKey = "logo"

  presence.setTrayTitle(audio.paused ? "" : title.innerText);

  if (audio && title !== null) {
    presence.setActivity(presenceData, !audio.paused);
  }
} else {

  var pageData: presenceData = {
    details: "Browsing..",
    largeImageKey: "logo"
  };
  presence.setActivity(pageData);
  }
});


/**
* Get Timestamps
* @param {Number} videoTime Current video time seconds
* @param {Number} videoDuration Video duration seconds
*/
function getTimestamps(videoTime: number, videoDuration: number) {
var startTime = Date.now();
var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
return [Math.floor(startTime / 1000), endTime];
}