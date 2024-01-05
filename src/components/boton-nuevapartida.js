
// ==================================================================================
export class BotonNuevaPartida {

    static WIDTH = 800;
    static HEIGHT = 600;

    // --------------------------------------------------------
    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {
        const ancho = BotonNuevaPartida.WIDTH;
        const alto = BotonNuevaPartida.HEIGHT;
        this.boton = this.relatedScene.add.sprite(Math.floor(ancho / 2), Math.floor(alto / 1.5), 'boton-nueva-partida').setInteractive();
        this.boton.setScale(0.7);
        this.boton.setAngle(7);
    
        this.boton.on('pointerover', () => {
          // this.boton.setFrame(1);
          this.boton.setScale(1.1);
        });
        this.boton.on('pointerout', () => {
          // this.boton.setFrame(0);
          this.boton.setScale(0.7);
        });
        this.boton.on('pointerdown', () => {
          this.relatedScene.scene.start('game');
        });

        this.relatedScene.tweens.add({
          targets: this.boton,
          angle: -7,
          yoyo: true,
          duration: 2000,
          repeat: -1
        });
    }
}
