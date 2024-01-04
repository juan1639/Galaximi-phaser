
// ======================================================================================
export class Explosion {

    static NRO_EXPLOSIONES = 9;
    static DURACION_EXPLO = 1200;

    // ------------------------------------------------------
    constructor(scene) {

        this.relatedScene = scene;
    }

    create() {

        this.explosion = this.relatedScene.physics.add.group({
            key: 'explosion',
            setXY: { x: -5555, y: -5555, stepX: 100 },
            repeat: Explosion.NRO_EXPLOSIONES
        });

        this.relatedScene.anims.create({
            key: 'explosion-anim',
            frames: this.relatedScene.anims.generateFrameNumbers('explosion', { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8] }),
            frameRate: 15,
            repeat: -1
        });

        this.explosion.children.iterate(explo => {
            explo.setScale(0.15, 0.15);
            explo.setActive(false).setVisible(false);
            explo.play('explosion-anim');
            // console.log(disp.body.width, disp.body.height);
        });

        console.log(this.explosion);
    }

    update() {

    }
    
    get() {
        return this.explosion;
    }
}
