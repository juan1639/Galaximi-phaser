// =========================================================================================
//  D O N K E Y - J O N  4
// 
// -----------------------------------------------------------------------------------------
import { loader } from './loader.js';
import { Estrella } from './../components/fondo.js';
import { Jugador } from './../components/jugador.js';
import { Disparo } from '../components/disparo.js';
import { Enemigo } from './../components/enemigos2.js';
import { Explosion } from '../components/explosion.js';
import { Particulas } from '../components/particulas.js';
import { Marcador } from './../components/marcador.js';
import { BotonFire } from '../components/botonfire.js';
import { Settings } from './settings.js';

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
    this.botonfire = new BotonFire(this);
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

    // this.gameoverImage = this.add.image(400, 90, 'gameover');
    // this.gameoverImage.visible = false;

    this.botonfire.create();

    this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
      x: 90,
      y: this.sys.game.config.height - 90,
      radius: 100,
      // base: this.add.circle(0, 0, 50, 0x888888),
      base: this.add.image(0, 0, 'base-joystick').setScale(2),
      // thumb: this.add.circle(0, 0, 25, 0xcccccc),
      thumb: this.add.image(0, 0, 'base-joystick').setScale(1)
    });

    this.jugador.create();
    this.disparo.create();
    this.enemigo.create();
    this.explosion.create();
    this.particulas.create();
    this.marcador.create();

    console.log(this.jugador.controles, this.jugador.joystickCursors);

    this.physics.add.collider(this.enemigo.get(), this.disparo.get(), this.colisionVsEnemigo, null, this);
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
  }

  // ================================================================
  inicia_disparo() {

    if (this.jugador.controles.shift.isDown) this.scene.start('gameover');

    if (this.jugador.controles.space.isDown || this.botonfire.isDown) {

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

    const bonus = Settings.getPuntos() + enemigo.getData('puntos');
    Settings.setPuntos(bonus);
    console.log(bonus, Settings.getPuntos());
    
    this.sonidoExplosion.play();

    if (this.enemigo.get().countActive() <= 0) console.log('nivel superado!');
  }

  // ================================================================
  /* comePuntito(jugador, puntito) {

    puntito.disableBody(true, true);
  } */
}
