let presence : Presence = new Presence({
    clientId: "612415911877672971"
}),
startedBrowsing : number = Math.floor(Date.now() / 1000),
presenceData : presenceData = {
    largeImageKey: "webtoon_lg",
    startTimestamp: startedBrowsing
},
strings = presence.getStrings({
    "browsing": "presence.activity.browsing"
}),
webtoon : string,
chapter : string,
seriesPage : string,
path : string = window.location.pathname;

presence.on("UpdateData", async () => {
    if (path.includes('list')) {
        webtoon = document.querySelector('.subj').textContent;
        presenceData.details = 'Looking a webtoon';
        presenceData.state = webtoon;
        delete presenceData.smallImageKey;
    } else if (path.includes('viewer')) {
        webtoon = document.querySelector('div.subj_info > a.subj').textContent;
        chapter = document.querySelector('div.subj_info > .subj_episode').textContent + " - " + document.querySelector('.tx').textContent;
        presenceData.details = 'Reading ' + webtoon;
        presenceData.state = chapter;
        delete presenceData.smallImageKey;
    } else if (path.includes('dailySchedule')) {
        seriesPage = document.querySelector('ul > li.completed').getAttribute('class').includes('on') ? "completed" : "ongoing";
        presenceData.details = "Looking through the " + seriesPage + " series";
        delete presenceData.smallImageKey;
    } else if (path.includes('top')) {
        presenceData.details = "Looking through popular series";
    } else if (path.includes('genre')) {
        presenceData.details = "Looking through genres";
        delete presenceData.smallImageKey;
    } else if (path.includes('search')) {
        presenceData.details = 'Searching...';
        presenceData.smallImageKey = 'search';
    } else if (path.includes('about')) {
        presenceData.details = "Reading the about page";
        delete presenceData.smallImageKey;
    } else {
        presenceData.details = (await strings).browsing;
        delete presenceData.smallImageKey;
    }
    presence.setActivity(presenceData, true);
})