
// ==================================================================================
export class BotonNuevaPartida {

  // --------------------------------------------------------
  constructor(scene) {
    this.relatedScene = scene;
  }

  create() {
    const ancho = this.relatedScene.sys.game.config.width;
    const alto = this.relatedScene.sys.game.config.height;
    this.boton = this.relatedScene.add.sprite(Math.floor(ancho / 2), Math.floor(alto / 1.5), 'boton-nueva-partida').setInteractive();
    this.boton.setScale(0.7);
    this.boton.setAngle(1);

    this.boton.on('pointerover', () => {
      // this.boton.setFrame(1);
      this.boton.setScale(1.0);
    });
    this.boton.on('pointerout', () => {
      // this.boton.setFrame(0);
      this.boton.setScale(0.7);
    });
    this.boton.on('pointerdown', () => {
      this.relatedScene.sonidoMusicaFondo.pause();
      this.relatedScene.scene.start('prenivel');
    });

    this.relatedScene.tweens.add({
      targets: this.boton,
      angle: 359,
      ease: 'Elastic',
      yoyo: true,
      hold: 900,
      duration: 2000,
      repeat: -1
    });
  }
}
