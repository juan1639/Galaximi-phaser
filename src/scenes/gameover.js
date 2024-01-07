import { Estrella } from '../components/fondo.js';
import { BotonNuevaPartida } from "../components/boton-nuevapartida.js";
import { centrar_txt } from "../utils/functions.js";

// ==========================================================================
export class GameOver extends Phaser.Scene {

  constructor() {

    super({ key: 'gameover' });
    this.estrella = new Estrella(this);
    this.botonrejugar = new BotonNuevaPartida(this);
  }
  
  create() {

    this.sonidoGameOver = this.sound.add('sonidoGameOver');

    this.add.image(0, 0, 'fondoAzulRojizo').setOrigin(0, 0);
    this.estrella.create();

    const duracionThisScene = 7000;

    this.x = Math.floor(this.sys.game.config.width / 2);
    this.y = Math.floor(this.sys.game.config.height / 3);

    this.txt_gameover = this.add.text(this.x, this.y, ' Game Over ', {
      fontSize: '90px',
      fontStyle: 'bold',
      shadow: {
          offsetX: 1,
          offsetY: 1,
          color: '#2ef',
          blur: 15,
          fill: true
      },
      fill: '#aff',
      fontFamily: 'verdana, arial, sans-serif'
    });

    this.txt_gameover.setAlpha(0);
    this.txt_gameover.setX(centrar_txt(this.txt_gameover, this.sys.game.config.width));

    this.tweens.add({
      targets: this.txt_gameover,
      alpha: 1,
      duration: Math.floor(duracionThisScene / 2),
      // repeat: 1
    });

    this.timeline = this.add.timeline([
      {
        at: duracionThisScene,
        run: () => {
          this.botonrejugar.create('menuprincipal');
        }
      }
    ]);

    this.timeline.play();
    this.sonidoGameOver.play();
    this.sonidoGameOver.volume = 0.5;
  }

  update() {
    this.estrella.update();
  }
}
