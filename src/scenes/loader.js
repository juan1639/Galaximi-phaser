export function loader(scene) {

  scene.load.image('fondo0', './src/img/fondo-espacial2112uno.jpg');
  scene.load.image('fondo1', './src/img/fondo-espacial2112dos.jpg');
  
  scene.load.image('tile', './src/img/tile_pacmanMarron.png');

  scene.load.image('jugador', './src/img/nave-galaxian.png');
  scene.load.image('enemigos', './src/img/ssheet-enemigosGalaximi.png');
  scene.load.image('explo-nave', './src/img/explo-naveGalaxian.png');
  scene.load.image('explo-enemigos', './src/img/explo-enemigosGalaximi.png');

  // scene.load.image('gameover', './src/img/gameover.png');
}
