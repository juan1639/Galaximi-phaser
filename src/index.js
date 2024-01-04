import { MenuPrincipal } from './scenes/menuprincipal.js';
import { Game } from './scenes/game.js';
// import { Congratulations } from './scenes/congratulations.js';
// import { Gameover } from './scenes/gameover.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [MenuPrincipal, Game],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  // audio: {
  //   disableWebAudio: true
  // }
}

var game = new Phaser.Game(config);
