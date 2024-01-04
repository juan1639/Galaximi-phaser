import { loader } from './loader.js';
import { BotonNuevaPartida } from "../components/boton-nuevapartida.js";

export class MenuPrincipal extends Phaser.Scene {

    static WIDTH = 800;
    static HEIGHT = 600;

    constructor() {
        super({ key: 'menuprincipal' });
    }

    init() {
        this.botoninicio = new BotonNuevaPartida(this);
    } 

    preload() {
        loader(this);
    }
    
    create() {
        // this.add.image(410, 250, 'background');
        // this.restartButton.create();
        // this.gameoverImage = this.add.image(400, 90, 'gameover');
        
        this.add.image(0, 0, 'fondoAzulRojizo').setOrigin(0, 0);
        this.botoninicio.create();
        
        this.size = 20;
        
        this.left = Math.floor(MenuPrincipal.WIDTH / 2);
        this.top = Math.floor(MenuPrincipal.HEIGHT / 2);
        
        this.marcador = this.add.text(0, 0, ' Puntos: 0', { fontSize: this.size + 'px', fill: '#fff', fontFamily: 'verdana, arial, sans-serif' });
        console.log(this.marcador);
    }
}
