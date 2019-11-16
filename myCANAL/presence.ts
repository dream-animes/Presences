var presence = new Presence({
    clientId: "620678620041576478",
    mediaKeys: true
}),

    strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
});

var elapsed = Math.floor(Date.now()/1000);

presence.on("UpdateData", async () => {

    let data: presenceData = {
        largeImageKey: "mycanal-logo"
    };

    var video: HTMLVideoElement = document.querySelector(".aPWk0-TaQEzvggxIT6qvP");
    if (video && !isNaN(video.duration)) {
        var Ad = document.querySelector("._3uUpH58Juk_Qbizq6j5ThG") ? true : false;
        if (!Ad) {
            var path = document.location.pathname;
            if (path.includes("/live/")) {
                var title = document.querySelector("._3tdt8zwgvMCJ6v_sElXneQ").textContent;
                data.smallImageKey = "live";
                data.smallImageText = (await strings).live;
                data.startTimestamp = elapsed;
            } else {
                var title = document.querySelector(".bodyTitle___DZEtt").textContent;
                var timestamps = getTimestamps(Math.floor(video.currentTime),Math.floor(video.duration));
                data.smallImageKey = video.paused ? "pause" : "play";
                data.smallImageText = video.paused ? (await strings).pause : (await strings).play;
                data.startTimestamp = timestamps[0],
                data.endTimestamp = timestamps[1]
            }
            var subtitle = document.querySelector("._39WJKEhrSYo7ftwMlFjZtA  ._3tdt8zwgvMCJ6v_sElXneQ").textContent;
            data.details = title;
            data.state = subtitle;
        
            if (video.paused) {
                delete data.startTimestamp;
                delete data.endTimestamp;
            }
        
            if (title !== null && subtitle !== null) {
                presence.setActivity(data, !video.paused);
            }
        } else {
            data.details = "Watching an Ad",
            presence.setActivity(data);
        }
    } else {
        data.details = "Browsing...",
        presence.setActivity(data);
    }
});

function getTimestamps(videoTime: number, videoDuration: number) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
  }