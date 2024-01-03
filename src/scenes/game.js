// =========================================================================================
//  D O N K E Y - J O N  4
// 
// -----------------------------------------------------------------------------------------
import { loader } from './loader.js';
import { Estrella } from './../components/fondo.js';
import { Jugador } from './../components/jugador.js';
import { Disparo } from '../components/disparo.js';
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
    this.disparo = new Disparo(this);
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
    this.disparo.create();
    this.enemigo.create();
    // this.marcador.create();

    console.log(this.jugador.controles);

    /* this.physics.add.collider(this.enemigo.get(), this.jugador.getDisparo(), (enemigo, jugador) => {
      console.log('colision');

    }, null, this); */
  }

  // ================================================================
  update() {
    
    // const pointer = this.input.activePointer;
    // console.log(pointer.worldX, pointer.worldY);

    this.inicia_disparo();

    this.estrella.update();
    this.jugador.update();
    this.disparo.update();
    this.enemigo.update();

    // this.marcador.update(this.jugador.get().x, this.jugador.get().y);
  }

  // ================================================================
  inicia_disparo() {

    if (this.jugador.controles.up.isDown) {

      if (this.time.now > this.disparo.cadencia.bandera) {

        console.log('disparo');
        let buscar = false;

        this.disparo.get().getChildren().forEach(disp => {

          console.log(disp.active, disp.visible);

          if (!disp.active && !disp.visible && !buscar) {
            buscar = true;
            disp.active = true;
            disp.visible = true;
            disp.setAlpha(0.8);
            disp.setX(this.jugador.get().x);
            disp.setY(this.jugador.get().y - Math.floor(this.jugador.get().body.height / 2));
            disp.setVelocityY(Disparo.VEL_Y);
          }
        });

        this.disparo.cadencia.bandera = this.time.now + this.disparo.cadencia.disparo;
      }
    }
  }

  // ================================================================
  /* comePuntito(jugador, puntito) {

    puntito.disableBody(true, true);
  } */
}
