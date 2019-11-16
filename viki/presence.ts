var genericStyle = "font-weight: 800; padding: 2px 5px; color: white;";

function PMD_info(message) {
  console.log(
    "%cPreMiD%cINFO%c " + message,
    genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;",
    genericStyle + "border-radius: 0 25px 25px 0; background: #5050ff;",
    "color: unset;"
  );
}

function PMD_error(message) {
  console.log(
    "%cPreMiD%cERROR%c " + message,
    genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;",
    genericStyle + "border-radius: 0 25px 25px 0; background: #ff5050;",
    "color: unset;"
  );
}

function PMD_success(message) {
  console.log(
    "%cPreMiD%cSUCCESS%c " + message,
    genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;",
    genericStyle +
      "border-radius: 0 25px 25px 0; background: #50ff50; color: black;",
    "color: unset;"
  );
}

var presence = new Presence({
  clientId: "614387676467953674", // CLIENT ID FOR YOUR PRESENCE
  mediaKeys: true
}),
 
strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused",
  live: "presence.activity.live"
});

var title : any, uploader : any, search : any, livechecker : any, episode : any, episodefinish : any, rating : any;
 
// the video variable is a html video element
var video : HTMLVideoElement, videoDuration : any, videoCurrentTime : any;
 
var browsingStamp = Math.floor(Date.now()/1000);
 
var playback : boolean;

presence.on("UpdateData", async () => {
 
// Get the video
video = document.querySelector("video.vjs-tech");
playback = video ? true : false;

if (!playback) {
 
  presenceData: presenceData = {
    largeImageKey: "viki"
  }
 
  presenceData.startTimestamp = browsingStamp;

  if (document.location.hostname == "www.viki.com" && document.location.pathname == "/") {
    presenceData.details = "Browsing through";
    presenceData.smallImageKey = "reading";
    presenceData.state = "the main page";
  
    presence.setActivity(presenceData);
  } else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/explore") && document.URL.includes("genre=")) {
    title = document.querySelector("#pjaxify-container > div.container.explore-content > div.row > div > div.clearfix.section > div.explore-page-description > strong");

    presenceData.details = "Browsing through genre:";
    presenceData.smallImageKey = "reading";
    presenceData.state = title.innerText;
 
    presence.setActivity(presenceData);
  } else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/explore") && document.URL.includes("country=")) {
    title = document.querySelector("#pjaxify-container > div.container.explore-content > div.row > div > div.clearfix.section > div.explore-page-description > strong");

    presenceData.details = "Browsing through country:";
    presenceData.smallImageKey = "reading";
    presenceData.state = title.innerText;
 
    presence.setActivity(presenceData);
  } else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/explore") && document.URL.includes("program=")) {
    title = document.querySelector("#pjaxify-container > div.container.explore-content > div.row > div > div.clearfix.section > div.explore-page-description > span:nth-child(3) > strong");

    presenceData.details = "Browsing through";
    presenceData.smallImageKey = "reading";
    presenceData.state = "schedules: " + title.innerText;
 
    presence.setActivity(presenceData);
  } else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/explore")) {
    presenceData.details = "Browsing through";
    presenceData.smallImageKey = "reading";
    presenceData.state = "all shows";
 
    presence.setActivity(presenceData);
  } else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/collections/") &&  document.location.pathname.includes("/fan")) {
    presenceData.details = "Browsing through";
    presenceData.smallImageKey = "reading";
    presenceData.state = "fan-made collections";
 
    presence.setActivity(presenceData);
} else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/collections/") &&  document.location.pathname.includes("/viki")) {
    presenceData.details = "Browsing through";
    presenceData.smallImageKey = "reading";
    presenceData.state = "Viki-made collections";
 
    presence.setActivity(presenceData);
  } else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/collections/")) {
    title = document.querySelector("body > div.page-wrapper > div.main-container > div > div.row > div.col.s12.m12.l8 > div.card.card-highlight > div > h2");
    search = document.querySelector("body > div.page-wrapper > div.main-container > div > div.card.billboard > div > div.col.s12.l4.m4.billboard-meta > h1");

    presenceData.details = "Browsing the collection:";
    presenceData.smallImageKey = "reading";

    if (title !== null) {
        presenceData.state = title.innerText;
    } else {
        presenceData.state = search.innerText;
    }
 
    presence.setActivity(presenceData);
  } else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/partners")) {
    presenceData.details = "Viewing the partner page";
    presenceData.smallImageKey = "reading";
    delete presenceData.state;
 
    presence.setActivity(presenceData);

  } else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/networks")) {
    presenceData.details = "Viewing the networks page";
    presenceData.smallImageKey = "reading";
    delete presenceData.state;
 
    presence.setActivity(presenceData);

  } else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/advertise")) {
    presenceData.details = "Viewing the advertisers page";
    presenceData.smallImageKey = "reading";
    delete presenceData.state;
 
    presence.setActivity(presenceData);

  } else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/press")) {
    presenceData.details = "Viewing the press center";
    presenceData.smallImageKey = "reading";
    delete presenceData.state;
 
    presence.setActivity(presenceData);

  } else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/users/") && document.location.pathname.includes("/overview")) {
    title = document.querySelector("body > div.page-wrapper > header > div > div > div.col.s12.l8.profile-header-main > div > div > div.media-body > a");

    presenceData.details = "Viewing the profile of:";
    presenceData.smallImageKey = "reading";
    presenceData.state = title.innerText;
 
    presence.setActivity(presenceData);

  } else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/users/") && document.location.pathname.includes("/about")) {
    title = document.querySelector("body > div.page-wrapper > header > div > div > div.col.s12.l8.profile-header-main > div > div > div.media-body > a");

    presenceData.details = "Viewing the about of:";
    presenceData.smallImageKey = "reading";
    presenceData.state = title.innerText + "'s profile";
 
    presence.setActivity(presenceData);

  } else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/users/") && document.location.pathname.includes("/badges")) {
    title = document.querySelector("body > div.page-wrapper > header > div > div > div > div > div.media > div.media-body > a");

    presenceData.details = "Viewing the badges of:";
    presenceData.smallImageKey = "reading";
    presenceData.state = title.innerText;
 
    presence.setActivity(presenceData);

  } else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/users/") && document.location.pathname.includes("contributions")) {
    title = document.querySelector("body > div.page-wrapper > header > div > div > div > div > div.media > div.media-body > a");

    presenceData.details = "Viewing the contributions";
    presenceData.smallImageKey = "reading";
    presenceData.state = "of: " + title.innerText;
 
    presence.setActivity(presenceData);

  } else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/users/") && document.location.pathname.includes("/reviews")) {
    title = document.querySelector("body > div.page-wrapper > header > div > div > div > div > div.media > div.media-body > a");

    presenceData.details = "Viewing the reviews by:";
    presenceData.smallImageKey = "reading";
    presenceData.state = title.innerText;
 
    presence.setActivity(presenceData);

  } else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/users/") && document.location.pathname.includes("/collections")) {
    title = document.querySelector("body > div.page-wrapper > header > div > div > div > div > div.media > div.media-body > a");

    presenceData.details = "Viewing the collections by:";
    presenceData.smallImageKey = "reading";
    presenceData.state = title.innerText;
 
    presence.setActivity(presenceData);

  } else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/users/") && document.location.pathname.includes("/connection")) {
    title = document.querySelector("body > div.page-wrapper > header > div > div > div > div > div.media > div.media-body > a");

    presenceData.details = "Viewing the connections";
    presenceData.smallImageKey = "reading";
    presenceData.state = "of: " + title.innerText;
 
    presence.setActivity(presenceData);

  } else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/users/") && document.location.pathname.includes("/following")) {
    title = document.querySelector("body > div.page-wrapper > header > div > div > div > div > div.media > div.media-body > a");

    presenceData.details = "Viewing all the things";
    presenceData.smallImageKey = "reading";
    presenceData.state = title.innerText + " follows";
 
    presence.setActivity(presenceData);

  } else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/about")) {
    presenceData.details = "Viewing the about page";
    presenceData.smallImageKey = "reading";
    delete presenceData.state;
 
    presence.setActivity(presenceData);

  } else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/tv-guide")) {
    presenceData.details = "Viewing the TV Guide";
    presenceData.smallImageKey = "reading";
    delete presenceData.state;
 
    presence.setActivity(presenceData);

  } else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/celebrities/") && document.URL.includes("-works")) {
    title = document.querySelector("body > div.page-wrapper > div.main-container > div > div.card.billboard > div > div.col.s12.l4.m4.billboard-meta > h1");

    presenceData.details = "Viewing the works of:";
    presenceData.smallImageKey = "reading";
    presenceData.state = title.innerText;
 
    presence.setActivity(presenceData);

  } else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/celebrities/") && document.URL.includes("-honor")) {
    title = document.querySelector("body > div.page-wrapper > div.main-container > div > div.card.billboard > div > div.col.s12.l4.m4.billboard-meta > h1");

    presenceData.details = "Viewing the awards of:";
    presenceData.smallImageKey = "reading";
    presenceData.state = title.innerText;
 
    presence.setActivity(presenceData);

  } else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/celebrities/")) {
    title = document.querySelector("body > div.page-wrapper > div.main-container > div > div.card.billboard > div > div.col.s12.l4.m4.billboard-meta > h1");

    presenceData.details = "Viewing the celeb profile";
    presenceData.smallImageKey = "reading";
    presenceData.state = "of: " + title.innerText;
 
    presence.setActivity(presenceData);

  } else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/genres/")) {
    title = document.querySelector("body > div.page-wrapper > header > div.container > div > div.col.s12.m12.l7 > h1");

    presenceData.details = "Browsing through genre:";
    presenceData.smallImageKey = "reading";
    presenceData.state = title.innerText;
 
    presence.setActivity(presenceData);

  } else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/genres")) {

    presenceData.details = "Browsing through genres";
    presenceData.smallImageKey = "reading";
    delete presenceData.state;
 
    presence.setActivity(presenceData);

  } else if (document.location.hostname == "blog.viki.com" && document.location.pathname.includes("/tagged/news")) {

    presenceData.details = "Browsing the Viki blogs";
    presenceData.smallImageKey = "reading";
    presenceData.state = "Reading latest news";
 
    presence.setActivity(presenceData);

  } else if (document.location.hostname == "blog.viki.com" && document.location.pathname.includes("/tagged/product")) {

    presenceData.details = "Browsing the Viki blogs";
    presenceData.smallImageKey = "reading";
    presenceData.state = "Reading latest products";
 
    presence.setActivity(presenceData);

  } else if (document.location.hostname == "blog.viki.com" && document.location.pathname.includes("/tagged/engineering")) {

    presenceData.details = "Browsing the Viki blogs";
    presenceData.smallImageKey = "reading";
    presenceData.state = "Reading latest engineering";
 
    presence.setActivity(presenceData);

  } else if (document.location.hostname == "blog.viki.com" && document.location.pathname.includes("/tagged/qc-rewards")) {

    presenceData.details = "Browsing the Viki blogs";
    presenceData.smallImageKey = "reading";
    presenceData.state = "Reading latest qc-rewards";
 
    presence.setActivity(presenceData);

  } else if (document.location.hostname == "blog.viki.com" && document.location.pathname.includes("/about")) {
    presenceData.details = "Viewing the about page";
    presenceData.smallImageKey = "reading";
    delete presenceData.state;
 
    presence.setActivity(presenceData);

  } else if (document.location.hostname == "blog.viki.com" && document.location.pathname.includes("/@")) {
    title = document.querySelector("div.u-flex1 h1.ui-h2.hero-title");

    presenceData.details = "Viewing the profile page of:";
    presenceData.smallImageKey = "reading";
    presenceData.state = title.innerText;
 
    presence.setActivity(presenceData);

  } else if (document.location.hostname == "blog.viki.com" && document.location.pathname.includes("/") && document.location.pathname.includes("-")) {
    title = document.querySelector("h1 > strong");

    presenceData.details = "Reading blog post:";
    presenceData.smallImageKey = "reading";
    presenceData.state = title.innerText;
 
    presence.setActivity(presenceData);

  } else if (document.location.hostname == "blog.viki.com" && document.location.pathname.includes("/search")) {
    title = document.querySelector("div > div.container.u-maxWidth640.u-marginTop40 > form > input");

    presenceData.details = "Searching for:";
    presenceData.smallImageKey = "search";
    presenceData.state = title.value;
 
    presence.setActivity(presenceData);

  } else if (document.location.hostname == "blog.viki.com" && document.location.pathname.includes("/")) {

    presenceData.details = "Browsing through the";
    presenceData.smallImageKey = "reading";
    presenceData.state = "main blog page";
 
    presence.setActivity(presenceData);

  } else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/apps")) {

    presenceData.details = "Viewing the";
    presenceData.smallImageKey = "reading";
    presenceData.state = "Viki applications";
 
    presence.setActivity(presenceData);

  } else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/search")) {
    title = document.querySelector("body > div.page-wrapper > header > div > h1 > q");

    presenceData.details = "Searching for:";
    presenceData.smallImageKey = "search";
    presenceData.state = title.innerText;
 
    presence.setActivity(presenceData);

  } else if (document.location.hostname == "support.viki.com") {

    presenceData.details = "Viki Support page";
    delete presenceData.smallImageKey;
    delete presenceData.state;
 
    presence.setActivity(presenceData);

  } else if (document.location.hostname == "contribute.viki.com") {

    presenceData.details = "Viki Contribution page";
    delete presenceData.smallImageKey;
    delete presenceData.state;
 
    presence.setActivity(presenceData);

  } else if (document.location.hostname == "www.viki.com" && document.location.pathname.includes("/tv/")) {
    title = document.querySelector("body > div.page-wrapper > div.main-container > div.container > div:nth-child(2) > div > div.card.billboard > div > div.col.s12.l4.m4.billboard-meta > h1");

    presenceData.details = "Browsing for episodes of:";
    presenceData.smallImageKey = "reading";
    presenceData.state = title.innerText;
 
    presence.setActivity(presenceData);

  } else {
    
    presence.setActivity();
    presence.setTrayTitle();

  }
}

// Check if it can find the video
if (video !== null && !isNaN(video.duration)) {
 
 
var timestamps = getTimestamps(
  Math.floor(video.currentTime),
  Math.floor(video.duration)
),
 
presenceData: presenceData = {
  details: "",
  state: "",
  largeImageKey: "viki",
  smallImageKey: video.paused ? "pause" : "play", // if the video is paused, show the pause icon else the play button
  smallImageText: video.paused
    ? (await strings).pause // paused text when you hover the pause icon on discord
    : (await strings).play,
  startTimestamp: timestamps[0],
  endTimestamp: timestamps[1]
};
 
// Get the video duration
videoDuration = video.duration;
 
// Get the video current time
videoCurrentTime = video.currentTime;
 
// Get title, can get the document.querySelector thing with the tips i sent you
title = document.querySelector("body > div.page-wrapper > div.main-container > div > div:nth-child(2) > div:nth-child(1) > div > div > div:nth-child(4) > div.container-meta.col.s6.m8.l8 > h2 > a");
episode = document.querySelector("body > div.page-wrapper > div.main-container > div > div:nth-child(2) > div:nth-child(1) > div > div > div:nth-child(1) > div.video-meta.col.s8.m8.l8 > h1 > a"); 
episodefinish = episode.innerText.replace(": " + title.innerText, "");
// Get the views number
rating = document.querySelector("body > div.page-wrapper > div.main-container > div > div:nth-child(2) > div:nth-child(1) > div > div > div:nth-child(5) > span.strong");
 
// Set presence details to the title (innerText - gets the text from the <strong> tag in this case)
presenceData.details = title.innerText;
 
 
// Set presence state to views value
presenceData.state = episodefinish + " \(Rating: " + rating.innerText + "\/10\)";
 
 
//* Remove timestamps if paused
if (video.paused) {
 
  delete presenceData.startTimestamp;
  delete presenceData.endTimestamp;
 
}
 
//* If tags are not "null"
if (title !== null && uploader !== null) {
  presence.setActivity(presenceData, !video.paused);
}
 
}

});
 
presence.on("MediaKeys", (key: string) => {
switch (key) {
  case "pause":
    var video = document.querySelector(".jw-video video") as HTMLVideoElement;
    video.paused ? video.play() : video.pause();
    break;
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