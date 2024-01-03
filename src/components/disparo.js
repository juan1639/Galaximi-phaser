
// ======================================================================================
export class Disparo {

    static VEL_Y = -500;

    // ------------------------------------------------------
    constructor(scene) {

        this.relatedScene = scene;
    }

    create() {

        this.disparo = this.relatedScene.physics.add.group({
            key: 'disparos',
            setXY: { x: 0, y: -999, stepX: 150 },
            repeat: 4
        });

        this.relatedScene.anims.create({
            key: 'disparos-anim',
            frames: this.relatedScene.anims.generateFrameNumbers('disparos', { frames: [0, 1] }),
            frameRate: 15,
            repeat: -1
        });

        this.disparo.getChildren().forEach(disp => {
            disp.setVisible(false);
            disp.setActive(false);
            disp.play('disparos-anim');
            // console.log(disp.body.width, disp.body.height);
        });

        this.cadencia = {
            disparo: 200,
            bandera: 0
        };

        console.log(this.disparo);
    }

    update() {

        this.disparo.children.iterate(disp => {
            if (disp.y < 0) {

                disp.active = false;
                disp.visible = false;
            }
        });
    }
    
    get() {
        return this.disparo;
    }
}
