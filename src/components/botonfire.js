
// ==================================================================================
export class BotonFire {

    static WIDTH = 800;
    static HEIGHT = 600;

    // --------------------------------------------------------
    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {
        const ancho = BotonFire.WIDTH;
        const alto = BotonFire.HEIGHT;
        this.boton = this.relatedScene.add.image(ancho - 90, alto - 90, 'boton-fire-joystick').setInteractive();
        this.boton.setScale(2);
        this.isDown = false;
    
        this.boton.on('pointerover', () => {
          this.boton.setScale(2.07);
        });

        this.boton.on('pointerout', () => {
          this.boton.setScale(2);
        });

        this.boton.on('pointerdown', () => {
            this.isDown = true;
            
        });

        this.boton.on('pointerup', () => {
            this.isDown = false;
        });
    }
}
