import { loader } from './loader.js';
import { centrar_txt } from '../utils/functions.js';
import { Settings } from './settings.js';
import { Estrella } from '../components/fondo.js';
import { BotonNuevaPartida, BotonSettings } from "../components/boton-nuevapartida.js";

// =================================================================================
export class MenuPrincipal extends Phaser.Scene {

    // -------------------------------------------------
    constructor() {
        super({ key: 'menuprincipal' });
    }

    init() {

        Settings.setPuntos(0);
        Settings.setNivel(1);
        Settings.setVidas(3);

        this.estrella = new Estrella(this);
        this.botoninicio = new BotonNuevaPartida(this);
        this.botonsettings = new BotonSettings(this);
    } 

    preload() {
        const txt = this.add.text(Math.floor(this.sys.game.config.width / 2), Math.floor(this.sys.game.config.height / 2), ' Cargando...', {
            fontSize: '50px',
            fill: '#ffa',
            fontFamily: 'verdana, arial, sans-serif'
        });

        txt.setX(centrar_txt(txt, this.sys.game.config.width));

        loader(this);
    }
    
    create() {

        const aparecerBoton = 3200;

        this.sonidoMusicaFondo = this.sound.add('sonidoMusicaFondo');

        this.add.image(0, 0, 'fondoAzulRojizo').setOrigin(0, 0);
        this.estrella.create();

        this.size = 90;
        this.left = Math.floor(this.sys.game.config.width / 5.2);
        this.top = Math.floor(this.sys.game.config.height / 3);
        
        this.txt_titulo = this.add.text(this.left, this.top, ' GalaxIMI ', {
            fontSize: this.size + 'px',
            fontStyle: 'bold',
            shadow: {
                offsetX: 1,
                offsetY: 1,
                color: '#ffa',
                blur: 15,
                fill: true
            },
            fill: '#aff',
            fontFamily: 'verdana, arial, sans-serif'
        });

        this.txt_titulo.setX(centrar_txt(this.txt_titulo, this.sys.game.config.width));

        this.timeline = this.add.timeline([
            {
              at: aparecerBoton,
              run: () => {
                this.botoninicio.create('prenivel');
                this.botonsettings.create('prenivel');
              }
            }
        ]);
        
        this.timeline.play();

        this.sonidoMusicaFondo.play();
        this.sonidoMusicaFondo.volume = 0.4;

        console.log(this.txt_titulo);
    }

    update() {
        this.estrella.update();
    }
}
