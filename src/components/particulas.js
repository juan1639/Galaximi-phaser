
// ======================================================================================
export class Particulas {

    static NRO_PARTICULAS = 9;
    static NRO_PARTICULAS_TOTAL = 15 * Particulas.NRO_PARTICULAS;
    static DURACION_PARTICULAS = 1400;

    // ------------------------------------------------------
    constructor(scene) {

        this.relatedScene = scene;
    }

    create() {

        this.particulas = this.relatedScene.physics.add.group({
            key: 'explosion',
            frame: 0,
            setXY: { x: -5555, y: -5555, stepX: 100 },
            repeat: Particulas.NRO_PARTICULAS_TOTAL
        });

        this.particulas.children.iterate(particula => {
            particula.setScale(0.02, 0.02);
            particula.setScale(Phaser.Math.FloatBetween(0.01, 0.03), Phaser.Math.FloatBetween(0.01, 0.03));
            particula.setActive(false).setVisible(false);
            // console.log(particula.body.width, particula.body.height);
        });

        console.log(this.particulas);
    }

    update() {

    }
    
    get() {
        return this.particulas;
    }
}
