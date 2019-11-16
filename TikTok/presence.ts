var presence = new Presence({
    clientId: "621881103380381716",
    mediaKeys: false
});

var elapsed = Math.floor(Date.now()/1000);

presence.on("UpdateData", async () => {

    let data: presenceData = {
        largeImageKey: "tiktok-logo"
    };

    var path = document.location.pathname;
    if (path.includes("/trending")) {
        data.details = "Viewing Trending"
        data.startTimestamp = elapsed
    } else if (path.includes("/tag")) {
        var tag = document.querySelector("._challenge_header_title").textContent;
        data.details = "Viewing a tag"
        data.state = tag
        data.startTimestamp = elapsed
    } else if (path.startsWith("/@")) {
        if (path.includes("/video/")) {
            var user = document.querySelector("._video_card_big_user_info_handle").textContent;
            data.details = "Viewing a TikTok"
            data.state = user
            data.startTimestamp = elapsed
        } else {
            var user = document.querySelector("._user_header_uniqueId").textContent;
            data.details = "Viewing a Profile"
            data.state = user
            data.startTimestamp = elapsed
        }
    } else {
        data.details = "Viewing the Homepage"
        data.startTimestamp = elapsed
    }
    presence.setActivity(data);
});