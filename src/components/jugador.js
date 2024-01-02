import { Disparo } from './disparo.js';

// =======================================================================
export class Jugador {

    static VEL_X = 520;
    static ACEL_X = 500;
    static VEL_Y = 0;

    // ------------------------------------------------------------
    constructor(scene) {
        this.relatedScene = scene;
    }

    create(WIDTH, HEIGHT) {

        this.jugador = this.relatedScene.physics.add.sprite(Math.floor(WIDTH / 2), Math.floor(HEIGHT / 1.08), 'jugador');
        this.jugador.setScale(0.5, 0.5);

        this.jugador.setData('vel-x', Jugador.VEL_X);
        this.jugador.setData('acel-x', Jugador.ACEL_X);
        this.jugador.setData('vel-y', Jugador.VEL_Y);
        this.jugador.setCollideWorldBounds(true);
        this.jugador.setBounce(0.2);

        this.disparo = {
            bandera: false,
            cadencia: 200
        };

        this.controles = this.relatedScene.input.keyboard.createCursorKeys();

        this.timeline = this.relatedScene.add.timeline([
            {
                at: this.disparo.cadencia,
                run: () => { this.disparo.bandera = true }
            }
        ]);

        this.timeline.play();

        console.log(this.jugador);
    }

    update() {

        if (this.controles.left.isDown) {

            this.jugador.setVelocityX(-this.jugador.getData('vel-x'));
            // this.jugador.setAccelerationX(-this.jugador.getData('acel-x'));
            
        } else if (this.controles.right.isDown) {

            this.jugador.setVelocityX(this.jugador.getData('vel-x'));
            // this.jugador.setAccelerationX(this.jugador.getData('acel-x'));

        } else {
            this.jugador.setVelocityX(0);
        }

        if (this.controles.up.isDown) {

            console.log(this.disparo.bandera);
            this.inicia_disparo();
        }
    }

    inicia_disparo() {

        if (this.disparo.bandera) {

            this.disparo = new Disparo(this.relatedScene, this.jugador.x, this.jugador.y);
            
            console.log('disparo');
            this.disparo.bandera = false;
            this.timeline.reset();
        }
    }

    get() {
        return this.jugador;
    }
}

