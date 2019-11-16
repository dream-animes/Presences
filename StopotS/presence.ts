var presence = new Presence({
    clientId: "620723559345684510",
    mediaKeys: false
});

var elapsed = Math.floor(Date.now()/1000);

presence.on("UpdateData", async () => {

    let data: presenceData = {
        largeImageKey: "stopots-logo",
        startTimestamp: elapsed
    };

    var path = document.location.pathname;
    var inGame = document.querySelector(".ctUsers") ? true : false;
    if (inGame) {
        var user = document.querySelector(".you .nick").textContent;
        var points = document.querySelector(".you span").textContent;
        var roundCurrent = document.querySelector(".rounds span").textContent;
        var roundEnd = document.querySelector(".rounds p:nth-child(3)").textContent;

        data.details = user + " - " + points.split("pts")[0].trim() + " points";
        data.state = "Round: " + " " + roundCurrent + roundEnd;
    } else if (path == ("/create")) {
        data.details = "Creating a Room"
    } else if (path == ("/search")) {
        data.details = "Viewing Rooms"
    } else {
        data.details = "Not in-game"
    }
    presence.setActivity(data);
});