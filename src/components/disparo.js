
// ======================================================================================
export class Disparo {

    static VEL_Y = -500;

    // ------------------------------------------------------
    constructor(scene) {

        this.relatedScene = scene;
    }

    create() {

        this.disparo = this.relatedScene.physics.add.group({
            key: 'jugador',
            setXY: { x: 0, y: 500, stepX: 150 },
            repeat: 4
        });
        
        this.cadencia = {
            disparo: 1200,
            bandera: 0
        };
    }

    update() {

        if (this.disparo.getChildren()[2].y < 200) this.disparo.getChildren()[2].setY(500);

    }
    
    get() {
        return this.disparo;
    }
}
