const iframe = new iFrame();

iframe.on("UpdateData", async () => {
    const { hostname } = window.location;
    if (hostname === `animeproxy.info` || hostname === `rapidvid.to` || hostname === `openload.co`) {
        const video = document.querySelector(`video`);
        if (video != null) {
            const played = video.duration != 0;
            iframe.send({
                current: video.currentTime,
                duration: video.duration,
                paused: video.paused,
                played
            });
        }
    }
});
