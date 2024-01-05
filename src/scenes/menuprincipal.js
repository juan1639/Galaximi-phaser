import { loader } from './loader.js';
import { Settings } from './settings.js';
import { Estrella } from '../components/fondo.js';
import { BotonNuevaPartida } from "../components/boton-nuevapartida.js";

// =================================================================================
export class MenuPrincipal extends Phaser.Scene {

    static WIDTH = 800;
    static HEIGHT = 600;

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
    } 

    preload() {
        this.add.text(Math.floor(MenuPrincipal.WIDTH / 3), Math.floor(MenuPrincipal.HEIGHT / 2), ' Cargando... ', {
            fontSize: '50px',
            fill: '#ffa',
            fontFamily: 'verdana, arial, sans-serif'
        });

        loader(this);
    }
    
    create() {

        this.sonidoMusicaFondo = this.sound.add('sonidoMusicaFondo');

        this.add.image(0, 0, 'fondoAzulRojizo').setOrigin(0, 0);
        this.estrella.create();
        this.botoninicio.create();
        
        this.size = 90;
        this.left = Math.floor(MenuPrincipal.WIDTH / 5.2);
        this.top = Math.floor(MenuPrincipal.HEIGHT / 3);
        
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

        this.sonidoMusicaFondo.play();
        this.sonidoMusicaFondo.volume = 0.4;

        console.log(this.txt_titulo);
    }

    update() {
        this.estrella.update();
    }
}
