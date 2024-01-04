
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
        this.boton = this.relatedScene.add.sprite(Math.floor(ancho / 2), Math.floor(alto / 2), 'boton-nueva-partida').setInteractive();
    
        this.boton.on('pointerover', () => {
          this.boton.setFrame(1);
        });
        this.boton.on('pointerout', () => {
          this.boton.setFrame(0);
        });
        this.boton.on('pointerdown', () => {
          this.relatedScene.scene.start('game');
        });
    }
}
