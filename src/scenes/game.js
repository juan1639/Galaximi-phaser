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
import { Explosion } from '../components/explosion.js';
import { Particulas } from '../components/particulas.js';

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
    this.explosion = new Explosion(this);
    this.particulas = new Particulas(this);
    this.marcador = new Marcador(this);
    // var joyStick = scene.plugins.get('rexvirtualjoystickplugin').addPlayer(scene, config);
  }

  preload() {
    loader(this);
  }

  create() {

    this.sonidoDisparo = this.sound.add('sonidoDisparo');
    this.sonidoExplosion = this.sound.add('sonidoExplosion');
    this.sonidoGameOver = this.sound.add('sonidoGameOver');
    this.sonidoLevelUp = this.sound.add('sonidoLevelUp');
    this.sonidoNaveExplota = this.sound.add('sonidoNaveExplota');
    this.sonidoGalaxian = this.sound.add('sonidoGalaxian');
    this.sonidoIntroRetro = this.sound.add('sonidoIntroRetro');

    this.add.image(0, 0, 'fondoAzulRojizo').setOrigin(0, 0);
    this.estrella.create();

    this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
      x: 50,
      y: HEIGHT - 90,
      radius: 100,
      // base: this.add.circle(0, 0, 50, 0x888888),
      base: this.add.image(0, 0, 'base-joystick'),
      thumb: this.add.circle(0, 0, 25, 0xcccccc),
    });

    // this.gameoverImage = this.add.image(400, 90, 'gameover');
    // this.gameoverImage.visible = false;

    this.jugador.create(WIDTH, HEIGHT);
    this.disparo.create();
    this.enemigo.create();
    this.explosion.create();
    this.particulas.create();
    // this.marcador.create();

    console.log(this.jugador.controles, this.jugador.joystickCursors);

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

    if (this.jugador.controles.up.isDown || this.jugador.joystickCursors.up.isDown) {

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
            disp.setAlpha(0.9);
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

    let buscarParticula = 0;

    this.particulas.get().children.iterate(particula => {

      if (!particula.active && !particula.visible && buscarParticula < Particulas.NRO_PARTICULAS) {
        buscarParticula ++;
        particula.setActive(true).setVisible(true);
        particula.setX(enemigo.x);
        particula.setY(enemigo.y);
        particula.setVelocity(Phaser.Math.Between(-180, 180), Phaser.Math.Between(-120, 120));
        particula.setAlpha(1.0);

        setTimeout(() => {
          particula.setActive(false).setVisible(false);
        }, Particulas.DURACION_PARTICULAS);
      }
    });

    let buscar = false;

    this.explosion.get().children.iterate(explo => {

      if (!explo.active && !explo.visible && !buscar) {
        buscar = true;
        explo.setActive(true).setVisible(true);
        explo.setX(enemigo.x);
        explo.setY(enemigo.y);
        explo.setAlpha(1.0);

        setTimeout(() => {
          explo.setActive(false).setVisible(false);
        }, Explosion.DURACION_EXPLO);
      }
    });

    disparo.setActive(false).setVisible(false).setX(-9999);
    enemigo.setActive(false).setVisible(false).setX(7777);

    this.sonidoExplosion.play();

    if (this.enemigo.get().rojo.countActive() <= 0) console.log('nivel superado!');
  }

  // ================================================================
  /* comePuntito(jugador, puntito) {

    puntito.disableBody(true, true);
  } */
}
