import { Estrella } from '../components/fondo.js';
import { centrar_txt } from '../utils/functions.js';
import { Marcador } from '../components/marcador.js';

// ================================================================================
export class PreNivel extends Phaser.Scene {

    // -------------------------------------------------
    constructor() {
        super({ key: 'prenivel' });
    }

    init() {
        this.estrella = new Estrella(this);
        this.marcador = new Marcador(this);
    }

    create() {
        
        this.sonidoGalaxian = this.sound.add('sonidoGalaxian');

        this.add.image(0, 0, 'fondoAzulRojizo').setOrigin(0, 0);
        this.estrella.create();
        this.marcador.create();

        const duracionThisScene = 5000;
        const nivel = 1;

        this.size = 70;
        this.left = Math.floor(this.sys.game.config.width / 3.2);
        this.top = Math.floor(this.sys.game.config.height / 3);
        
        this.txt_titulo = this.add.text(this.left, this.top, ' Nivel ' + nivel, {
            fontSize: this.size + 'px',
            fontStyle: 'bold',
            shadow: {
                offsetX: 1,
                offsetY: 1,
                color: '#ffa',
                blur: 15,
                fill: true
            },
            fill: '#ff9',
            fontFamily: 'verdana, arial, sans-serif'
        });

        this.txt_titulo.setAlpha(0);
        this.txt_titulo.setX(centrar_txt(this.txt_titulo, this.sys.game.config.width));

        this.tweens.add({
            targets: this.txt_titulo,
            alpha: 1,
            yoyo: true,
            duration: Math.floor(duracionThisScene / 2),
            // repeat: 1
        });

        this.timeline = this.add.timeline([
            {
                at: duracionThisScene,
                run: () => {
                    this.sonidoGalaxian.pause(),
                    this.scene.start('aparecenenemigos')
                }
            }
        ]);

        this.timeline.play();
        this.sonidoGalaxian.play();
        this.sonidoGalaxian.volume = 0.5;
    }

    update() {
        this.estrella.update();
    }
}
