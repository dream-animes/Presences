var presence = new Presence({
  clientId: "636600375067279370",
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
    largeImageKey: "rldeal"
  };

  
  if (document.URL.includes("#faq")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the FAQ";
  } else if (document.URL.includes("#how-to-trade")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing how to trade";
  } else if (document.URL.includes("#about-us")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Reading about RL.Deals";
    presenceData.smallImageKey = "reading";
  } else if (document.URL.includes("#trading") || document.location.pathname == "/") {
    title = document.querySelector("#root > div > div > div:nth-child(1) > div:nth-child(1) > div > div > h5");
    user = document.querySelector("#root > div > div > div:nth-child(3) > div:nth-child(1) > div > div > h5");
    replace = document.querySelector("#root > div > div > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > ul > li:nth-child(1) > div > div > div > div > span");
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Trading...";
    if (replace !== null) {
      presenceData.state = title.innerText.replace("(","").replace(")","").replace("Items","item\(s\)") + " for " + replace.innerText + " " + user.innerText.replace("Items)","") + " total item\(s\))";
    } else {
      presenceData.state = title.innerText.replace("(","").replace(")","").replace("Items","item\(s\)") + " for " + user.innerText.replace("Items)","") + " total item\(s\))";
    }
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