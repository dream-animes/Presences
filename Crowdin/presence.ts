var presence = new Presence({
  clientId: "614200757989670934",
  mediaKeys: false
}),
strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused"
});

var browsingStamp = Math.floor(Date.now()/1000);

var translatePageTitle : any;

var translatingFile : any, translateProject : any, translatingLanguage : any;

var profileName : any, profileNickname : any;

var projectsTab : any;


presence.on("UpdateData", async () => {

  let presenceData: presenceData = {
    details: "In construction",
    state: "-",
    largeImageKey: "lg"
  };

  if(document.location.pathname == "/" || !document.location.pathname || document.location.pathname == "/project/premid"){

    translatePageTitle = document.querySelector("#wrap > div.section > div > h1");

    presenceData.details = "Home";
    presenceData.state = translatePageTitle.innerText;
    presenceData.startTimestamp = browsingStamp;

  } else if(document.location.pathname.includes("/project/")){

    translatePageTitle = document.querySelector("#wrap > div.section > div > h1");

    if(document.location.pathname.includes("activity_stream")){

      presenceData.details = "Viewing activity";
      presenceData.state = translatePageTitle.innerText;
      presenceData.startTimestamp = browsingStamp;

    } else if(document.location.pathname.includes("reports")){

      presenceData.details = "Viewing reports";
      presenceData.state = translatePageTitle.innerText;
      presenceData.startTimestamp = browsingStamp;

    } else if(document.location.pathname.includes("discussions")){

      presenceData.details = "Viewing discussions";
      presenceData.state = translatePageTitle.innerText;
      presenceData.startTimestamp = browsingStamp;

    } else if(document.location.pathname.includes("tasks")){

      presenceData.details = "Viewing tasks";
      presenceData.state = translatePageTitle.innerText;
      presenceData.startTimestamp = browsingStamp;

    } else if(document.location.pathname.includes("translators")){

      presenceData.details = "Viewing translators";
      presenceData.state = translatePageTitle.innerText;
      presenceData.startTimestamp = browsingStamp;

    }
    
    else {

    presenceData.details = "Home";
    presenceData.state = translatePageTitle.innerText;
    presenceData.startTimestamp = browsingStamp;

    }

  } else if(document.location.pathname.includes("/translate")){

    translatingFile = document.querySelector("#file-menu-item > div > span.file-name");
    translatingLanguage = document.querySelector("#file-language-info > a.btn.mdc-button.open-language-menu > span");
    translateProject = document.querySelector("#project-menu-content > ul > li:nth-child(1) > h3");

    presenceData.details = "Translating " + translatingFile.innerHTML;
    presenceData.state = translateProject.innerText + " (" + translatingLanguage.innerHTML + ")";
    presenceData.startTimestamp = browsingStamp;

  } else if(document.location.pathname.includes("/profile")){

    profileName = document.querySelector("#profile-page > div > div > div.profile-left-pane > div > div.profile-page-user.clearfix > div > h3");
    profileNickname = document.querySelector("#profile-page > div > div > div.profile-left-pane > div > div.profile-page-user.clearfix > div > div > span");

    if(document.location.pathname.includes("activity")){

      presenceData.details = "Viewing activity";
      presenceData.state = profileName.innerText + " - " + profileNickname.innerText;
      presenceData.startTimestamp = browsingStamp;

    } else {

      presenceData.details = "Viewing a profile";
      presenceData.state = profileName.innerText + " - " + profileNickname.innerText;
      presenceData.startTimestamp = browsingStamp;

    }

  } else if(document.location.pathname.includes("/projects")){

    projectsTab = document.querySelector("#search_form > div > div > ul > li.active > a");

    presenceData.details = "Exploring projects";

    presenceData.state = projectsTab.innerText;

    presenceData.startTimestamp = browsingStamp;

  }



  presence.setActivity(presenceData);

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