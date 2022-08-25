import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const KEY_STORAGE = 'videoplayer-current-time';

player.on(
  'timeupdate',
  throttle(event => {
    localStorage.setItem(KEY_STORAGE, JSON.stringify(event.seconds));
  }, 1000)
);
const getTimeMemory = localStorage.getItem(KEY_STORAGE);

if (getTimeMemory !== null) {
  player.setCurrentTime(getTimeMemory);
}
