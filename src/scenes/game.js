// =========================================================================================
//  D O N K E Y - J O N  4
// 
// -----------------------------------------------------------------------------------------
import { loader } from './loader.js';
import { Fondo } from './../components/fondo.js';
import { Jugador } from './../components/jugador.js';
import { Marcador } from './../components/marcador.js';

const WIDTH = 800;
const HEIGHT = 550;

// --------------------------------------------------------------
export class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });
  }

  init() {
    this.fondo = new Fondo(this);
    this.jugador = new Jugador(this);
    this.marcador = new Marcador(this);
  }

  preload() {
    loader(this);
  }

  create() {

    this.fondo.create();

    // this.gameoverImage = this.add.image(400, 90, 'gameover');
    // this.gameoverImage.visible = false;

    this.jugador.create(WIDTH, HEIGHT);
    // this.marcador.create();

  }
  
  // ================================================================
  update() {
    
    // const pointer = this.input.activePointer;
    // console.log(pointer.worldX, pointer.worldY);

    this.fondo.update();
    this.jugador.update();
    // this.marcador.update(this.jugador.get().x, this.jugador.get().y);
  }

  // ================================================================
  /* comePuntito(jugador, puntito) {

    puntito.disableBody(true, true);
  } */
}
