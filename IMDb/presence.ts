let  presence : Presence = new Presence({
    clientId: "631379801826918400",
    mediaKeys: true
}),
strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused"
}),
startTimestamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    let presenceData: presenceData = {
        largeImageKey: "large_img",
        startTimestamp
    };
    const url = document.URL;
  if (url.includes("/videoplayer/"))
  {
    let video: HTMLVideoElement = document.getElementsByTagName("video")[0],
    timestamps = getTimestamps(
      Math.floor(video.currentTime),
      Math.floor(video.duration)),
    title = document.querySelectorAll("h1.title")[0].textContent,
    authorElement = <HTMLElement> document.getElementsByClassName("primary-relation-name")[0],
    author = authorElement.innerText;
    presenceData = {
      details: title,
      state: author,
      largeImageKey: "large_img",
      smallImageKey: video.paused ? "paused" : "playing",
      smallImageText: video.paused
        ? (await strings).pause
        : (await strings).play,
      startTimestamp: timestamps[0],
      endTimestamp: timestamps[1]
    };
    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
}
  }
  else if (url.includes("/find?"))
  {
    presenceData.details = "Searching...";
    presenceData.smallImageKey = "search";
  }
  else if (url.includes("/title/"))
  {
    let tokens = document.title.split(" - ");
    tokens = [ ...new Set(tokens)];
    const title = tokens[0];
    presenceData.details = title;
    if (tokens[1].trim() == "IMDb")
    {
      presenceData.state = "Browsing...";
    }
    else {
      presenceData.state = tokens[1].trim();
    }
  }
  else if (url.includes("/user/") || url.includes("/poll/"))
  {
    presenceData.details = document.title.split(" - ")[0];
  }
  else if (url.includes("/list/"))
  {
    presenceData.details = document.title.split(" - ")[0];
    presenceData.state = "Viewing a list";
  }
  else if (url.includes("/search/"))
  {
    presenceData.details = document.title.split(" - ")[0];
    presenceData.state = "Searching...";
  }
  else if (url.includes("/name/"))
  {
    presenceData.details = document.title.split(" - ")[0];
    if (document.title.split(" - ")[1].trim() == "IMDb")
    {
      presenceData.state = "Filmography";
    }
    else {
      presenceData.state = document.title.split(" - ")[1].trim();
    }
  }
  else
  {
    if (!url.includes("/ap/") && !url.includes("/registration/") && url != "https://www.imdb.com/")
    {
    presenceData.details = document.title.split(" - ")[0];
  }
    presenceData.state = "Browsing";
  }
    presence.setActivity(presenceData, true);
});

function getTimestamps(videoTime: number, videoDuration: number) {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}
