var presence = new Presence({
  clientId: '612793327510749210',
  mediaKeys: false
});

var oldUrl, elapsed, state, gameName, gameScore, gamePlace, gameQuestions;

presence.on('UpdateData', async () => {
  var title, info;

  const href = window.location.href;
  const path = window.location.pathname;

  if (oldUrl !== href) {
    oldUrl = href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  href.match('https://kahoot.it') ? (state = 'player') : (state = 'host');

  switch (state) {
    case 'player':
      title = 'Playing';
      info = 'Idling';

      const playerName = stripText(
        document.querySelector('.question-top-bar__Username-sc-1pwisow-1'),
        'Player Name',
        false
      );

      const playerScore = stripText(
        document.querySelector('.question-top-bar__Score-sc-1pwisow-4'),
        'Player Score',
        false
      );

      const playerPlace = stripText(
        document.querySelector('.rank-text__Rank-sc-1smelag-0 > span'),
        'Player Place',
        false
      );

      if (playerName) {
        gameName = playerName;
      }

      if (playerScore) {
        gameScore = playerScore;
      }

      if (playerPlace) {
        gamePlace = playerPlace.slice(10);
      }

      const join = path.match('/join');
      if (join) {
        info = 'Joining Game';
      }

      const instructions = path.match('/instructions');
      if (instructions) {
        info = 'In Lobby';
      } else {
        if (gameName && gamePlace && gameScore) {
          title = `Playing | ${gameName} - ${gameScore} - ${gamePlace}`;
        }
      }

      const playerStart = path.match('/start');
      if (playerStart) {
        info = 'Game Starting';
      }

      const playerGetReady = path.match('/getready');
      if (playerGetReady) {
        info = 'Waiting For Question';
      }

      const playerGameBlock = path.match('/gameblock');
      if (playerGameBlock) {
        info = 'Viewing Question';
      }

      const answerSent = path.match('/answer/sent');
      if (answerSent) {
        info = 'Waiting For Results';
      }

      const answerResult = path.match('/answer/result');
      if (answerResult) {
        info = 'Viewing Results';
      }

      const ranking = path.match('ranking');
      if (ranking) {
        info = 'Viewing Rankings';
      }

      const playerFeedback = path.match('/feedback');
      if (playerFeedback) {
        info = 'Giving Feedback';
      }
      break;
    case 'host':
      title = 'Hosting';
      info = 'Idling';

      const hostQuestions = stripText(
        document.querySelector('.status-bar__TopBar-ivth8h-1 > header > span'),
        'Host Questions',
        false
      );

      if (hostQuestions && hostQuestions.match('Question')) {
        gameQuestions = hostQuestions.slice(9);
      }

      const intro = path.match('/intro');
      if (intro) {
        info = 'Loading Game';
      }

      const lobby = path.match('/lobby');
      if (lobby) {
        info = 'In Lobby';
      } else {
        if (gameQuestions) {
          title = `Hosting | ${gameQuestions}`;
        }
      }

      const hostStart = path.match('/start');
      if (hostStart) {
        info = 'Game Starting';
      }

      const hostGetReady = path.match('/getready');
      if (hostGetReady) {
        info = 'Preparing Question';
      }

      const hostGameBlock = path.match('/gameblock');
      if (hostGameBlock) {
        info = 'Showing Question';
      }

      const scoreboard = path.match('/scoreboard');
      if (scoreboard) {
        info = 'Viewing Scoreboard';
      }

      const gameover = path.match('/gameover');
      if (gameover) {
        info = 'Game Over';
      }

      const hostFeedback = path.match('/feedback');
      if (hostFeedback) {
        info = 'Giving Feedback';
      }
      break;
    default:
      break;
  }

  var data: presenceData = {
    details: title,
    state: info,
    largeImageKey: 'kahoot',
    startTimestamp: elapsed
  };

  presence.setActivity(data, true);
});

var genericStyle = 'font-weight: 800; padding: 2px 5px; color: white;';

function logInfo(name: string, message: string) {
  console.log(
    `%c${name}%cINFO%c ${message}`,
    genericStyle + 'border-radius: 25px 0 0 25px; background: #596cae;',
    genericStyle + 'border-radius: 0 25px 25px 0; background: #5050ff;',
    'color: unset;'
  );
}

function logError(name: string, message: string) {
  console.log(
    `%c${name}%cINFO%c ${message}`,
    genericStyle + 'border-radius: 25px 0 0 25px; background: #596cae;',
    genericStyle + 'border-radius: 0 25px 25px 0; background: #ff5050;',
    'color: unset;'
  );
}

function logSuccess(name: string, message: string) {
  console.log(
    `%c${name}%cINFO%c ${message}`,
    genericStyle + 'border-radius: 25px 0 0 25px; background: #596cae;',
    genericStyle +
      'border-radius: 0 25px 25px 0; background: #50ff50; color: black;',
    'color: unset;'
  );
}

function stripText(
  element: HTMLElement,
  id: string = 'None',
  log: boolean = true
) {
  if (element && element.firstChild) {
    return element.firstChild.textContent;
  } else {
    if (log) {
      logError(
        'Kahoot',
        'An error occurred while stripping data off the page. Please contact Alanexei on the PreMiD Discord server, and send him a screenshot of this error. ID: ' +
          id
      );
    }
    return null;
  }
}
