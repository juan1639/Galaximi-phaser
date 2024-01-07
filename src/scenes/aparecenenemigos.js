import { Estrella } from '../components/fondo.js';
import { EnemigoApareciendo } from '../components/enemigos2.js';
import { Marcador } from '../components/marcador.js';

// ================================================================================
export class AparecenEnemigos extends Phaser.Scene {
    
    // -------------------------------------------------
    constructor() {
        super({ key: 'aparecenenemigos' });
    }

    init() {
        this.estrella = new Estrella(this);
        this.enemigoapareciendo = new EnemigoApareciendo(this);
        this.marcador = new Marcador(this);
    }

    create() {
        
        this.sonidoIntroRetro = this.sound.add('sonidoIntroRetro');

        this.add.image(0, 0, 'fondoAzulRojizo').setOrigin(0, 0);
        this.estrella.create();
        this.enemigoapareciendo.create();
        this.marcador.create();

        const duracionThisScene = 5000;


        this.timeline = this.add.timeline([
            {
                at: duracionThisScene,
                run: () => { this.scene.start('game') }
            }
        ]);

        this.timeline.play();
        this.sonidoIntroRetro.play();
        this.sonidoIntroRetro.volume = 0.5;
    }

    update() {
        this.estrella.update();
        this.enemigoapareciendo.update();
    }
}
