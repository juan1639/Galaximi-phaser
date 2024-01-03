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

    this.sonidoDisparo = this.sound.add('sonidoDisparo');
    this.sonidoExplosion = this.sound.add('sonidoExplosion');
    this.sonidoGameOver = this.sound.add('sonidoGameOver');
    this.sonidoLevelUp = this.sound.add('sonidoLevelUp');
    this.sonidoNaveExplota= this.sound.add('sonidoNaveExplota');
    this.sonidoGalaxian = this.sound.add('sonidoGalaxian');
    this.sonidoIntroRetro = this.sound.add('sonidoIntroRetro');
    this.sonidoMusicaFondo = this.sound.add('sonidoMusicaFondo');

    this.add.image(0, 0, 'fondoAzulRojizo').setOrigin(0, 0);
    this.estrella.create();

    // this.gameoverImage = this.add.image(400, 90, 'gameover');
    // this.gameoverImage.visible = false;

    this.jugador.create(WIDTH, HEIGHT);
    this.disparo.create();
    this.enemigo.create();
    // this.marcador.create();

    console.log(this.jugador.controles);

    this.physics.add.collider(this.enemigo.get().rojo, this.disparo.get(), this.colisionVsEnemigo, null, this);
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

          console.log(disp.active);

          if (!disp.active && !disp.visible && !buscar) {
            buscar = true;
            disp.setActive(true).setVisible(true);
            disp.setX(this.jugador.get().x);
            disp.setY(this.jugador.get().y - Math.floor(this.jugador.get().body.height / 2));
            disp.setVelocityY(Disparo.VEL_Y);
            disp.setAlpha(0.8);
            this.sonidoDisparo.play();
          }
        });

        this.disparo.cadencia.bandera = this.time.now + this.disparo.cadencia.disparo;
      }
    }
  }

  // ================================================================
  colisionVsEnemigo(enemigo, disparo) {

    console.log('colision...disparo-enemigo');
    disparo.setActive(false).setVisible(false).setX(-9999);
    enemigo.setActive(false).setVisible(false).setX(7777);

    if (this.enemigo.get().rojo.countActive() <= 0) console.log('nivel superado!');
  }

  // ================================================================
  /* comePuntito(jugador, puntito) {

    puntito.disableBody(true, true);
  } */
}
