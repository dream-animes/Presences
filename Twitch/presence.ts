var presence = new Presence({
  clientId: '607754656453623843'
});
var strings = presence.getStrings({
  play: 'presence.playback.playing',
  pause: 'presence.playback.paused',
  live: 'presence.activity.live'
});

var title,
  streamer,
  largeImage = 'twitch',
  smallImageKey,
  smallImageText,
  videoTime,
  videoDuration,
  live,
  elapsed,
  oldURL,
  type,
  logging = false;

presence.on('UpdateData', async () => {
  var elements = {
    squad: {
      users: document.querySelector(
        '.tw-align-items-center.tw-flex.tw-mg-l-1:nth-child(2)'
      ),
      user: index => {
        return document.querySelectorAll(
          '.tw-interactive.tw-link.tw-link--hover-underline-none.tw-link--inherit'
        )[index];
      }
    },
    live: {
      label: document.querySelector('.tw-channel-status-text-indicator'),
      title: document.querySelector('.tw-font-size-4.tw-line-height-body'),
      streamer: document.querySelector('.tw-font-size-5.tw-white-space-nowrap'),
      host: document.querySelector('.tw-c-text-overlay.tw-strong')
    },
    video: {
      title: document.querySelector('.tw-font-size-4.tw-strong'),
      streamer: document.querySelector('.tw-font-size-5.tw-white-space-nowrap'),
      time: document.querySelector('.vod-seekbar-time-labels > p:nth-child(1)'),
      duration: document.querySelector(
        '.vod-seekbar-time-labels > p:nth-child(2)'
      )
    },
    clip: {
      title: document.querySelector('.tw-font-size-4.tw-strong'),
      streamer: document.querySelector('.tw-font-size-5.tw-white-space-nowrap')
    }
  };

  if (window.location.href !== oldURL) {
    oldURL = window.location.href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  var video: HTMLVideoElement = document.querySelector('video');

  var squad = document.querySelector('.squad-stream-top-bar__container');

  if (squad) {
    type = 'squad';
  } else if (
    (elements.live.title && elements.live.streamer && elements.live.label) ||
    elements.live.host
  ) {
    type = 'live';
  } else if (
    elements.video.title &&
    elements.video.streamer &&
    elements.video.time &&
    elements.video.duration
  ) {
    type = 'video';
  } else if (elements.clip.title && elements.clip.streamer) {
    type = 'clip';
  } else {
    type = 'browsing';
  }

  if (logging) {
    console.log(`Type: ${type}`);
    console.log(`Video Time: ${video ? video.currentTime : 0}`);
    console.log(`Video Duration: ${video ? video.duration : 0}`);
  }

  try {
    if (type === 'squad') {
      var users = [];
      var user_path = elements.squad.users;

      for (var index = 0; index <= user_path.children.length - 1; index++) {
        users = users.concat(elements.squad.user(index).textContent);
      }

      title = 'Squad Stream';
      streamer = users.join(', ');
      smallImageKey = 'live';
      smallImageText = (await strings).live;
      videoTime = elapsed;
      videoDuration = undefined;
    } else if (type === 'live') {
      title = elements.live.title
        ? elements.live.title.textContent
        : `Hosting ${elements.live.host.textContent}`;
      streamer = elements.live.streamer.textContent;
      smallImageKey = 'live';
      smallImageText = (await strings).live;
      videoTime = elapsed;
      videoDuration = undefined;
    } else if (type === 'video') {
      title = elements.video.title.textContent;
      streamer = elements.video.streamer.textContent;
      smallImageKey = video.paused ? 'pause' : 'play';
      smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play;
      var timestamps = getElementTimestamps(
        elements.video.time.textContent,
        elements.video.duration.textContent
      );
      videoTime = timestamps[0];
      videoDuration = timestamps[1];
    } else if (type === 'clip') {
      title = elements.clip.title.textContent;
      streamer = elements.clip.streamer.textContent;
      smallImageKey = video.paused ? 'pause' : 'play';
      smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play;
      var timestamps = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );
      videoTime = timestamps[0];
      videoDuration = timestamps[1];
    } else if (type === 'browsing') {
      var location = window.location.pathname;

      title = 'Browsing';
      streamer = undefined;
      smallImageKey = undefined;
      smallImageText = undefined;
      videoTime = undefined;
      videoDuration = undefined;

      var user = location.match('/(\\S*)/(\\S*)');
      var user_header = document.querySelector('.tw-bold.tw-font-size-2');

      if (elements.live.streamer && user && user_header) {
        streamer = elements.live.streamer.textContent + "'s " + user[2];
      }

      if (location.match('/directory')) {
        streamer = 'Categories';
      }

      if (location.match('/directory/all')) {
        streamer = 'Live';
      }

      if (location.match('/directory/following')) {
        title = 'Browsing Following';
        streamer = 'Overview';
      }

      if (location.match('/directory/following/live')) {
        streamer = 'Live';
      }

      if (location.match('/directory/following/videos')) {
        streamer = 'Videos';
      }

      if (location.match('/directory/following/hosts')) {
        streamer = 'Hosts';
      }

      if (location.match('/directory/following/games')) {
        streamer = 'Categories';
      }

      if (location.match('/directory/following/channels')) {
        streamer = 'Channels';
      }

      if (location.match('/directory/game')) {
        title = 'Browsing Game';
        streamer = document.querySelector(
          '.tw-c-text-base.tw-font-size-2.tw-strong'
        ).textContent;
      }
    }
  } catch (err) {}

  var data: presenceData = {
    details: title,
    state: streamer,
    largeImageKey: largeImage,
    smallImageKey: smallImageKey,
    smallImageText: smallImageText,
    startTimestamp: videoTime,
    endTimestamp: videoDuration
  };

  if (video && video.paused) {
    delete data.startTimestamp;
    delete data.endTimestamp;
  }

  if (title !== null && streamer !== null) {
    presence.setActivity(data, video ? !video.paused : true);
    presence.setTrayTitle(title);
  }
});

/*presence.on('MediaKeys', (key: string) => {
  switch (key) {
    case 'pause':
      var pause: HTMLButtonElement = document.querySelector(
        'div.player-buttons-left > button'
      );
      if (pause) pause.click();
      break;
  }
});*/

function getTimestamps(videoTime: number, videoDuration: number) {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

function getElementTimestamps(audioTime: string, audioDuration: string) {
  var splitAudioTime = audioTime.split(':').reverse();
  var splitAudioDuration = audioDuration.split(':').reverse();

  var parsedAudioTime = getTime(splitAudioTime);
  var parsedAudioDuration = getTime(splitAudioDuration);

  var startTime = Date.now();
  var endTime =
    Math.floor(startTime / 1000) - parsedAudioTime + parsedAudioDuration;
  return [Math.floor(startTime / 1000), endTime];
}

function getTime(list: string[]) {
  var ret = 0;
  for (let index = list.length - 1; index >= 0; index--) {
    ret += parseInt(list[index]) * 60 ** index;
  }
  return ret;
}
