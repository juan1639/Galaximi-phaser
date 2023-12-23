// =========================================================================================
//  D O N K E Y - J O N  4
// 
// -----------------------------------------------------------------------------------------
import { loader } from './loader.js';
import { Estrella } from './../components/fondo.js';
import { Jugador } from './../components/jugador.js';
import { Marcador } from './../components/marcador.js';
import { Enemigo } from './../components/enemigos.js';

const WIDTH = 800;
const HEIGHT = 600;

// --------------------------------------------------------------
export class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });
  }

  init() {
    this.estrella = new Estrella(this);
    this.jugador = new Jugador(this);
    this.enemigo = new Enemigo(this);
    this.marcador = new Marcador(this);
  }

  preload() {
    loader(this);
  }

  create() {

    this.add.image(0, 0, 'fondoAzulRojizo').setOrigin(0, 0);
    this.estrella.create();

    // this.gameoverImage = this.add.image(400, 90, 'gameover');
    // this.gameoverImage.visible = false;

    this.jugador.create(WIDTH, HEIGHT);
    this.enemigo.create();
    // this.marcador.create();

  }
  
  // ================================================================
  update() {
    
    // const pointer = this.input.activePointer;
    // console.log(pointer.worldX, pointer.worldY);

    this.estrella.update();
    this.jugador.update();
    this.enemigo.update();

    // this.marcador.update(this.jugador.get().x, this.jugador.get().y);
  }

  // ================================================================
  /* comePuntito(jugador, puntito) {

    puntito.disableBody(true, true);
  } */
}
