export function loader(scene) {

  scene.load.image('fondoAzulRojizo', './src/img/fondo-espacial-azulRojizo.png');
  scene.load.image('estrella-azul', './src/img/estrella-azulada.png');
  scene.load.image('estrella-roja', './src/img/estrella-rojiza.png');

  scene.load.image('jugador', './src/img/nave-galaxian200x200.png');
  scene.load.spritesheet('enemigos', './src/img/anima-enemigosGalaxian.png', {frameWidth: 135, frameHeight: 95});
  scene.load.spritesheet('disparos', './src/img/laserss.png', {frameWidth: 32, frameHeight: 65});
  scene.load.image('explo-nave', './src/img/explo-naveGalaxian.png');
  scene.load.image('explo-enemigos', './src/img/explo-enemigosGalaximi.png');

  // scene.load.image('gameover', './src/img/gameover.png');
}
