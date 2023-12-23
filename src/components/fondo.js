// =======================================================================
export class Estrella {

    static WIDTH = 800;
    static HEIGHT = 600;

    static NRO_STAR_AZULADAS = 39;
    static NRO_STAR_ROJIZAS = 49;
    static ESCALA_INICIAL = 0.01;
    static ESCALA_MAX = 0.21;
    static APARECER_ARRIBA = -15;

    // ------------------------------------------------------
    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {

        this.estrellas = {
            azuladas: this.relatedScene.physics.add.group({
                key: 'estrella-azul',
                repeat: Estrella.NRO_STAR_AZULADAS
            }),
            rojizas: this.relatedScene.physics.add.group({
                key: 'estrella-roja',
                repeat: Estrella.NRO_STAR_ROJIZAS
            })
        };

        Object.keys(this.estrellas).forEach(tipoStar => {
            this.estrellas[tipoStar].getChildren().forEach(star => {
                this.inicializar(star);
            });
        });

        Object.keys(this.estrellas).forEach(tipoStar => {

            this.relatedScene.tweens.add({
                targets: this.estrellas[tipoStar].getChildren(),
                scale: Estrella.ESCALA_MAX,
                yoyo: true,
                duration: 99,
                repeat: -1
            });
        });

        console.log(this.estrellas);
    }

    update() {

        Object.keys(this.estrellas).forEach(tipoStar => {

            this.estrellas[tipoStar].getChildren().forEach(star => {
                if (star.y > Estrella.HEIGHT * 1.1) {
                    star.setY(Estrella.APARECER_ARRIBA);
                    star.setX(Phaser.Math.Between(0, Estrella.WIDTH));
                }
            });
        });
    }

    inicializar(star) {

        star.setScale(Estrella.ESCALA_INICIAL + Phaser.Math.FloatBetween(0, 0.12));
        star.setVelocityY(Phaser.Math.FloatBetween(5, 50));
        star.setX(Phaser.Math.Between(0, Estrella.WIDTH));
        star.setY(Phaser.Math.Between(0, Estrella.HEIGHT));
    }

    get() {
        return this.estrellas;
    }
}
