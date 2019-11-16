var presence = new Presence({
    clientId: "640150336547454976",
    mediaKeys: false
 }),

  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

  var browsingStamp = Math.floor(Date.now()/1000);

  var title : any, views : any, air : any, air2 : any;
  var iFrameVideo : boolean, currentTime : any, duration : any, paused : any;

  var video : HTMLVideoElement, videoDuration : any, videoCurrentTime : any;

  var lastPlaybackState = null;
  var playback;
  var browsingStamp = Math.floor(Date.now()/1000);

  var user : any;
  var search : any;
  
  if(lastPlaybackState != playback) {
  
      lastPlaybackState = playback
      browsingStamp = Math.floor(Date.now()/1000)
        
  }

  

 
  presence.on("iFrameData", data => {

    playback = 
    data.iframe_video.duration !== null
      ? true : false

  if(playback) {

    iFrameVideo = data.iframe_video.iFrameVideo;
    currentTime = data.iframe_video.currTime;
    duration    = data.iframe_video.dur;
    paused      = data.iframe_video.paused;

  }
  
  });


presence.on("UpdateData", async () => {
var a =
        '',
        timestamps = getTimestamps(
          Math.floor(currentTime),
          Math.floor(duration)
        ),
        presenceData: presenceData = {
          largeImageKey: "vrv"
      };
    
      

if (document.location.pathname.includes("/watch/")) {
  if (iFrameVideo == true && !isNaN(duration)) {
    presenceData.smallImageKey = paused ? "pause" : "play";
    presenceData.smallImageText = paused ? (await strings).pause : (await strings).play;
    presenceData.startTimestamp = timestamps[0];
    presenceData.endTimestamp = timestamps[1];

    presenceData.details = document.querySelector("#content > div > div.app-body-wrapper > div > div.video-content > div.content > div.media-metadata > div > a > span.series").textContent + " " + document.querySelector("#content > div > div.app-body-wrapper > div > div.video-content > div.content > div.media-metadata > div > a > span.season").textContent; 
    presenceData.state = document.querySelector("#content > div > div.app-body-wrapper > div > div.video-content > div.content > div.media-metadata > div > h2").textContent; 
    
    if (paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

  } else if (iFrameVideo == null && isNaN(duration)) {

     presenceData.startTimestamp = browsingStamp;
     //presenceData.details = "Looking at: ";
     presenceData.details = "Looking at: ";
     presenceData.state = document.querySelector("#content > div > div.app-body-wrapper > div > div.video-content > div.content > div.media-metadata > div > a > span.series").textContent + " " + document.querySelector("#content > div > div.app-body-wrapper > div > div.video-content > div.content > div.media-metadata > div > a > span.season").textContent + " " + document.querySelector("#content > div > div.app-body-wrapper > div > div.video-content > div.content > div.media-metadata > div > h2").textContent;
     presenceData.smallImageKey = "reading";

  }
  
} else if (document.location.pathname.includes("/serie")) {
  presenceData.details = "Viewing serie:";
  presenceData.state = document.querySelector("#content > div > div.app-body-wrapper > div > div.content > div.series-metadata > div.text-wrapper > div.erc-series-info > div.series-title").textContent;
  presenceData.startTimestamp = browsingStamp;
} else if (document.querySelector("#content > div > div.erc-header > div.header-content > div.header-left > div > div.wrapper > div.item-info > p").textContent == "Channel") {
  presenceData.details = "Viewing channel:";
  presenceData.state = document.querySelector("#content > div > div.erc-header > div.header-content > div.header-left > div > div.wrapper > div.item-info > h1").textContent;
  presenceData.startTimestamp = browsingStamp;
} else if (document.location.pathname.includes("/watchlist")) {
  //presenceData.details = "Browsing through";
  //presenceData.state = "ongoing animes";
  presenceData.details = "Viewing their watchlist";
  presenceData.smallImageKey = "reading";
  presenceData.startTimestamp = browsingStamp;
}

if (presenceData.details == null) {
  presence.setTrayTitle();
  presence.setActivity()
} else {
  presence.setActivity(presenceData);
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