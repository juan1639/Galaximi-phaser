// =========================================================================================
//  D O N K E Y - J O N  4
// 
// -----------------------------------------------------------------------------------------
import { loader } from './loader.js';

import { 
  inicia_disparo,
  inicia_disparo_enemigos,
  colisionVsEnemigo,
  colisionJugadorVsEnemigo
} from '../utils/functions.js';

import { Estrella } from './../components/fondo.js';
import { Jugador } from './../components/jugador.js';
import { Disparo } from '../components/disparo.js';
import { Enemigo } from './../components/enemigos2.js';
import { DisparoEnemigo } from '../components/disparo-ene.js';
import { Explosion } from '../components/explosion.js';
import { Particulas } from '../components/particulas.js';
import { Marcador } from './../components/marcador.js';
import { BotonFire, CrucetaDireccion } from '../components/botonfire.js';

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
    this.disparoenemigo = new DisparoEnemigo(this);
    this.explosion = new Explosion(this);
    this.particulas = new Particulas(this);
    this.marcador = new Marcador(this);
    this.botonfire = new BotonFire(this);
    this.crucetaleft = new CrucetaDireccion(this, { id: 'cruceta-left', x: 70, y: 55 });
    this.crucetaright = new CrucetaDireccion(this, { id: 'cruceta-right', x: 250, y: 55 });
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
    this.crucetaleft.create();
    this.crucetaright.create();

    /* this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
      x: 90,
      y: this.sys.game.config.height - 90,
      radius: 100,
      // base: this.add.circle(0, 0, 50, 0x888888),
      base: this.add.image(0, 0, 'base-joystick').setScale(2),
      // thumb: this.add.circle(0, 0, 25, 0xcccccc),
      thumb: this.add.image(0, 0, 'base-joystick').setScale(1)
    }); */

    this.jugador.create();
    this.disparo.create();
    this.enemigo.create();
    this.disparoenemigo.create();
    this.explosion.create();
    this.particulas.create();
    this.marcador.create();

    this.physics.add.collider(this.enemigo.get(), this.disparo.get(), colisionVsEnemigo, null, this);
    this.physics.add.overlap(this.enemigo.get(), this.jugador.get(), colisionJugadorVsEnemigo, null, this);
  }

  // ================================================================
  update() {
    
    // const pointer = this.input.activePointer;
    // console.log(pointer.worldX, pointer.worldY);

    inicia_disparo(this.jugador, this.scene, this.botonfire, this.time, this.disparo, this.sonidoDisparo);
    // inicia_disparo_enemigos();

    this.estrella.update();
    this.jugador.update();
    this.disparo.update();
    this.enemigo.update();
    this.disparoenemigo.update();
  }
}
