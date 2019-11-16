var presence = new Presence({
  clientId: "636659890927960064",
  mediaKeys: false
}),
strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused"
});

var browsingStamp = Math.floor(Date.now()/1000);

var user : any;
var title : any;
var replace : any;
var search : any;

presence.on("UpdateData", async () => {


  let presenceData: presenceData = {
    largeImageKey: "rlt"
  };
  
  if (document.location.pathname == "/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the home page";
  } else if (document.location.pathname.includes("/profiles/search")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Searching a profile";
    presenceData.smallImageKey = "search";
  } else if (document.location.pathname.includes("/profiles/")) {
    presenceData.startTimestamp = browsingStamp;
    title = document.querySelector("#rip_col > div.fav_no_category.main_box.main_stats_box > h4");
    presenceData.details = "Viewing stats of:";
    presenceData.state = title.innerText.split("Last update")[0];
  } else if (document.location.pathname.includes("/trades")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing trades";
  } else if (document.location.pathname.includes("live_tracker")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the live tracker";
  } else if (document.location.pathname.includes("/prices")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the price changes";
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