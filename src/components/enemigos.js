// ========================================================================
export class Enemigo {

    static WIDTH = 800;
    static HEIGHT = 600;

    static tileXY = [64, 64];

    static array_enemigos = [
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [9,9,9,9,9,9,9,9,9,9,9,9],
        [9,9,9,9,9,9,9,9,9,9,9,9],
        [9,9,9,9,9,9,9,9,9,9,9,9],
        [9,9,9,9,9,9,9,9,9,9,9,9],
        [0,0,0,0,0,0,0,0,0,0,0,0]
    ];

    // ------------------------------------------------------------
    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {

        this.formacion = {
            x: 0,
            velX: 1,
            recorrido: 60
        };

        this.enemigos = {
            rojo: this.relatedScene.physics.add.group({
                key: 'enemigos',
                repeat: Enemigo.array_enemigos[0].length * Enemigo.array_enemigos.length - 1
            })
        };

        Object.keys(this.enemigos).forEach(tipoEne => {
            this.enemigos[tipoEne].getChildren().forEach((ene, index) => {
                this.inicializar(ene, index);
            });
        });

        Object.keys(this.enemigos).forEach(tipoEne => {

            this.relatedScene.tweens.add({
                targets: this.enemigos[tipoEne].getChildren(),
                angle: 10,
                yoyo: true,
                duration: 1000,
                repeat: -1
            });

            this.relatedScene.anims.create({
                key: 'enemys-anim',
                frames: this.relatedScene.anims.generateFrameNumbers('enemigos', { frames: [ 0, 1, 2] }),
                frameRate: 5,
                repeat: -1
            });

            this.enemigos[tipoEne].getChildren().forEach(ene => {
                ene.play('enemys-anim')
            });
        });

        console.log(this.enemigos.rojo.getChildren());
    }

    update() {

        this.formacion.x += this.formacion.velX;

        if ((this.formacion.x >= this.formacion.recorrido && this.formacion.velX > 0) || (this.formacion.x <= -this.formacion.recorrido / 2 && this.formacion.velX < 0)) {
            this.formacion.velX = -this.formacion.velX;
        }

        Object.keys(this.enemigos).forEach(tipoEne => {
            Phaser.Actions.IncX(this.enemigos[tipoEne].getChildren(), this.formacion.velX);
        });
    }

    inicializar(ene, index) {
        
        const coorXY = this.get_posicion(index);
        const x = coorXY[0];
        const y = coorXY[1];
        const margenL = Math.floor(Enemigo.tileXY[0] / 2);

        ene.setAngle(350);

        ene.setScale(0.4);
        ene.setX(x * Enemigo.tileXY[0] + margenL);
        ene.setY(y * Enemigo.tileXY[1]);

        if (Enemigo.array_enemigos[y][x] === 0) {
            ene.setActive(false).setVisible(false).setX(7777);
        };
    }

    get_posicion(index) {

        const y = Math.floor(index / Enemigo.array_enemigos[0].length);
        const x = index - (y * Enemigo.array_enemigos[0].length);
        
        return [x, y];
    }

    get() {
        return this.enemigos;
    }
}

// ======================================================================================
export class EnemigoApareciendo extends Enemigo {

    constructor(scene) {
        super();
        this.relatedScene = scene;
    }

    create() {

        this.enemigos = {
            rojo: this.relatedScene.physics.add.group({
                key: 'enemigos',
                repeat: Enemigo.array_enemigos[0].length * Enemigo.array_enemigos.length - 1
            })
        };

        Object.keys(this.enemigos).forEach(tipoEne => {
            this.enemigos[tipoEne].getChildren().forEach((ene, index) => {
                this.inicializar(ene, index);
            });
        });

        Object.keys(this.enemigos).forEach(tipoEne => {

            this.relatedScene.tweens.add({
                targets: this.enemigos[tipoEne].getChildren(),
                alpha: 1,
                duration: 4000,
            });

            this.relatedScene.tweens.add({
                targets: this.enemigos[tipoEne].getChildren(),
                angle: 360,
                duration: 500,
                repeat: 4
            });

            this.relatedScene.anims.create({
                key: 'enemys-anim',
                frames: this.relatedScene.anims.generateFrameNumbers('enemigos', { frames: [ 0, 1, 2] }),
                frameRate: 5,
                repeat: -1
            });

            this.enemigos[tipoEne].getChildren().forEach(ene => {
                ene.play('enemys-anim')
            });
        });

        this.txt_preparado = this.relatedScene.add.text(Math.floor(Enemigo.WIDTH / 2.5), Math.floor(Enemigo.HEIGHT / 1.4), ' Preparado...', {
            fontSize: '30px',
            shadow: {
                offsetX: 1,
                offsetY: 1,
                color: '#2f9',
                blur: 9,
                fill: true
            },
            fill: '#7f1',
            fontFamily: 'verdana, arial, sans-serif'
        });

        this.txt_preparado.setAlpha(0);

        this.relatedScene.tweens.add({
            targets: this.txt_preparado,
            alpha: 1,
            yoyo: true,
            duration: 2000,
        });

        console.log(this.enemigos.rojo.getChildren());
    }

    update() {

    }

    inicializar(ene, index) {
        
        const coorXY = this.get_posicion(index);
        const x = coorXY[0];
        const y = coorXY[1];
        const margenL = Math.floor(Enemigo.tileXY[0] / 2);

        ene.setAngle(0);
        ene.setAlpha(0);

        ene.setScale(0.4);
        ene.setX(x * Enemigo.tileXY[0] + margenL);
        ene.setY(y * Enemigo.tileXY[1]);

        if (Enemigo.array_enemigos[y][x] === 0) {
            ene.setActive(false).setVisible(false).setX(7777);
        };
    }
}

