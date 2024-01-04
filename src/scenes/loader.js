export function loader(scene) {

  scene.load.image('fondoAzulRojizo', './src/img/fondo-espacial-azulRojizo.png');
  scene.load.image('estrella-azul', './src/img/estrella-azulada.png');
  scene.load.image('estrella-roja', './src/img/estrella-rojiza.png');

  scene.load.image('jugador', './src/img/nave-galaxian200x200.png');
  scene.load.spritesheet('disparos', './src/img/laserss.png', {frameWidth: 32, frameHeight: 65});

  scene.load.spritesheet('enemigos', './src/img/anima-enemigosGalaxian.png', {frameWidth: 135, frameHeight: 95});
  scene.load.spritesheet('explosion', './src/img/explosionSsheet.png', {frameWidth: 559, frameHeight: 636});

  // scene.load.image('explo-nave', './src/img/explo-naveGalaxian.png');
  // scene.load.image('explo-enemigos', './src/img/explo-enemigosGalaximi.png');

  // scene.load.image('gameover', './src/img/gameover.png');
  scene.load.spritesheet('boton-nueva-partida', './src/img/playbutton.png', {frameWidth: 190, frameHeight: 49});

  // ---------------------------------------------------------------------------------
  //  Pluggin Control Joystick-tactil
  // ---------------------------------------------------------------------------------
  let url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
  scene.load.plugin('rexvirtualjoystickplugin', url, true);

  // ---------------------------------------------------------------------------------
  //  Audio
  // ---------------------------------------------------------------------------------
  scene.load.audio('sonidoDisparo', './src/audio/disparo_corto.mp3');
  scene.load.audio('sonidoExplosion', './src/audio/explosion.wav');
  scene.load.audio('sonidoFireWorks', './src/audio/fireworks.mp3');
  scene.load.audio('sonidoGameOver', './src/audio/gameoveretro.ogg');
  scene.load.audio('sonidoLevelUp', './src/audio/level-passed.mp3');
  scene.load.audio('sonidoMusicaFondo', './src/audio/music.ogg');
  scene.load.audio('sonidoNaveExplota', './src/audio/navexplota.mp3');
  scene.load.audio('sonidoGalaxian', './src/audio/playing-galaxian.mp3');
  scene.load.audio('sonidoIntroRetro', './src/audio/retro-game-intro.mp3');
}
