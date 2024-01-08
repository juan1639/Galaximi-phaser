
// =======================================================================
export class Jugador {

    static VEL_X = 520;
    static ACEL_X = 500;
    static VEL_Y = 0;
    static REVIVIR_PAUSA = 4000;

    // ------------------------------------------------------------
    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {

        const posIniX = Math.floor(this.relatedScene.sys.game.config.width / 2);
        const posIniY = Math.floor(this.relatedScene.sys.game.config.height / 1.08);

        this.jugador = this.relatedScene.physics.add.sprite(posIniX, posIniY, 'jugador');
        this.jugador.setScale(0.5, 0.5);

        this.jugador.setData('posIni', [posIniX, posIniY]);
        this.jugador.setData('vel-x', Jugador.VEL_X);
        this.jugador.setData('acel-x', Jugador.ACEL_X);
        this.jugador.setData('vel-y', Jugador.VEL_Y);
        this.jugador.setCollideWorldBounds(true);
        this.jugador.setBounce(0.2);

        this.controles = this.relatedScene.input.keyboard.createCursorKeys();
        // this.joystickCursors = this.relatedScene.joyStick.createCursorKeys();

        console.log(this.controles);
        console.log(this.jugador, this.jugador.x, this.jugador.body.width, this.jugador.width);
    }

    update() {

        if (this.controles.left.isDown || this.relatedScene.crucetaleft.isDown) {

            this.jugador.setVelocityX(-this.jugador.getData('vel-x'));
            
        } else if (this.controles.right.isDown  || this.relatedScene.crucetaright.isDown) {

            this.jugador.setVelocityX(this.jugador.getData('vel-x'));
        
        } else {
            this.jugador.setVelocityX(0);
        }
    }
    
    get() {
        return this.jugador;
    }
}
