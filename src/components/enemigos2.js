import { Settings } from '../scenes/settings.js';

// ========================================================================
export class Enemigo {

    static WIDTH = 800;
    static HEIGHT = 600;

    static tileXY = [64, 64];

    // ------------------------------------------------------------
    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {

        this.formacion = this.formaciones_nivel(Settings.getNivel());
        console.log(Settings.getNivel());

        this.enemigos = this.relatedScene.physics.add.group({
            key: ['enemigos', 'enemigos2'],
            frameQuantity: this.formacion.EnemigoDeCadaTipo[0],
            gridAlign: { 
                width: 12, 
                height: 4, 
                cellWidth: Enemigo.tileXY[0], 
                cellHeight: Enemigo.tileXY[1], 
                x: this.formacion.marginLeft,  
                y: this.formacion.marginTop
            }
        });

        this.enemigos.getChildren().forEach((ene, index) => {
            this.inicializar(ene, index);
        });

        this.relatedScene.tweens.add({
            targets: this.enemigos.getChildren(),
            angle: 10,
            yoyo: true,
            duration: 1000,
            repeat: -1
        });

        this.crea_anims(Settings.getNivel());

        console.log(this.enemigos.getChildren());
    }

    update() {

        this.formacion.x += this.formacion.velX;

        if ((this.formacion.x >= this.formacion.recorrido && this.formacion.velX > 0) || (this.formacion.x <= -this.formacion.recorrido / 2 && this.formacion.velX < 0)) {
            this.formacion.velX = -this.formacion.velX;
        }

        Phaser.Actions.IncX(this.enemigos.getChildren(), this.formacion.velX);
    }

    inicializar(ene, index) {

        ene.setAngle(350);
        ene.setScale(0.4);
    }

    crea_anims(nivel) {

        this.relatedScene.anims.create({
            key: 'enemys-anim',
            frames: this.relatedScene.anims.generateFrameNumbers('enemigos', { frames: [ 0, 1, 2] }),
            frameRate: 5,
            repeat: -1
        });

        this.relatedScene.anims.create({
            key: 'enemys2-anim',
            frames: this.relatedScene.anims.generateFrameNumbers('enemigos2', { frames: [ 0, 1, 2] }),
            frameRate: 5,
            repeat: -1
        });

        if (nivel === 1) {

            this.enemigos.getChildren().forEach((ene, index) => {

                if (index < 24) {
                    ene.play('enemys-anim');
                } else {
                    ene.play('enemys2-anim');
                }
            });

        } else {

        }
    }

    get_posicion(index) {

        const y = Math.floor(index / Enemigo.array_enemigos[0].length);
        const x = index - (y * Enemigo.array_enemigos[0].length);
        
        return [x, y];
    }

    formaciones_nivel(nivel) {

        if (nivel === 1) {

            return {
                x: 0,
                velX: 1,
                recorrido: 60,
                // marginLeft: Math.floor(Enemigo.tileXY[0] / 2),
                marginLeft: 0,
                marginTop: Math.floor(Enemigo.tileXY[1]),
                EnemigoDeCadaTipo: [24, 24]
            };
        } else if (nivel === 2) {

            return {
                x: 0,
                velX: 2,
                recorrido: 40,
                // marginLeft: Math.floor(Enemigo.tileXY[0] / 2),
                marginLeft: 0,
                marginTop: Math.floor(Enemigo.tileXY[1]),
                EnemigoDeCadaTipo: [24, 24]
            };
        } 

        return {
            x: 0,
            velX: 1,
            recorrido: 60,
            // marginLeft: Math.floor(Enemigo.tileXY[0] / 2),
            marginLeft: 0,
            marginTop: Math.floor(Enemigo.tileXY[1]),
            EnemigoDeCadaTipo: [24, 24]
        };
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

        this.formacion = this.formaciones_nivel(Settings.getNivel());
        console.log(Settings.getNivel());

        this.enemigos = this.relatedScene.physics.add.group({
            key: ['enemigos', 'enemigos2'],
            frameQuantity: this.formacion.EnemigoDeCadaTipo[0],
            gridAlign: { 
                width: 12, 
                height: 4, 
                cellWidth: Enemigo.tileXY[0], 
                cellHeight: Enemigo.tileXY[1], 
                x: this.formacion.marginLeft,  
                y: this.formacion.marginTop
            }
        });

        this.enemigos.getChildren().forEach((ene, index) => {
            this.inicializar(ene, index);
        });

        this.relatedScene.tweens.add({
            targets: this.enemigos.getChildren(),
            alpha: 1,
            duration: 4300,
        });

        this.relatedScene.tweens.add({
            targets: this.enemigos.getChildren(),
            angle: 360,
            duration: 500,
            repeat: 4
        });

        this.crea_anims(Settings.getNivel());

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

        console.log(this.enemigos.getChildren());
    }

    update() {

    }

    inicializar(ene, index) {

        ene.setAngle(0);
        ene.setScale(0.4);
        ene.setAlpha(0);
    }
}

