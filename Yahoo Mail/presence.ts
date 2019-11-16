var presence = new Presence({
    clientId: "620084360120369172",
    mediaKeys: false
});

var elapsed = Math.floor(Date.now()/1000);

presence.on("UpdateData", async () => {

    let data: presenceData = {
        largeImageKey: "yahoomail-logo"
    };

    var path = document.location.pathname;
    if (path.includes("/folders/") || path.includes("/search/")) {
        if (path.includes("messages")) {
            data.details = "Viewing an Email"
            data.startTimestamp = elapsed
        } else {
            data.details = "Viewing Mail"
        data.startTimestamp = elapsed
        }
    } else if (path.includes("/compose/")) {
        data.details = "Composing a New Email"
        data.startTimestamp = elapsed
    } else if (path.includes("/settings/")) {
        data.details = "Viewing Settings"
        data.startTimestamp = elapsed
    } else if (path.includes("/contacts")) {
        data.details = "Viewing Contacts"
        data.startTimestamp = elapsed
    } else {
        data.details = "Viewing Mail"
        data.startTimestamp = elapsed
    }
    presence.setActivity(data);
});