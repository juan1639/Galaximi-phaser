// =======================================================================
export class Fondo {

    static WIDTH = 800;
    static HEIGHT = 550;

    // ------------------------------------------------------
    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {

        this.fondo = this.relatedScene.physics.add.group();

        this.fondo.create(0, 0, 'fondo0').setOrigin(0, 0);
        this.fondo.create(0, -Fondo.HEIGHT, 'fondo1').setOrigin(0, 0);

        console.log(this.fondo.getChildren());
    }

    update() {

        this.fondo.getChildren().forEach(scroll => {

            scroll.body.y ++;
            if (scroll.body.y >= Fondo.HEIGHT) scroll.body.y = -Fondo.HEIGHT;
        });
    }
}
