let presence = new Presence({
	clientId: "620204628608417832",
	mediaKeys: false
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
	if (document.getElementById("player-time").textContent == "Welcome back") return;
	let ts = document.getElementById("player-time").textContent.substring(0, 5).split(":").map(n => Number(n));
	let te = document.getElementById("player-time").textContent.substring(8, 13).split(":").map(n => Number(n));
	let presenceData = {
		state: document.getElementById("player-title").textContent,
		details: document.getElementById("player-artist").textContent,
		startTimestamp: Date.now() - ((ts[0] * 60 + ts[1]) * 1000),
		endTimestamp: Date.now() - ((ts[0] * 60 + ts[1]) * 1000) + ((te[0] * 60 + te[1]) * 1000),
		largeImageKey: "icon",
		smallImageKey: ((document.getElementById("player-play").textContent == "Stop") ? "play" : "pause")
	};
	presence.setActivity(presenceData);
}));