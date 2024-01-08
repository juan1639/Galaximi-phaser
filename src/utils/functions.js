import { Settings } from "../scenes/settings.js";
import { Disparo } from "../components/disparo.js";
import { Particulas } from "../components/particulas.js";
import { Explosion } from "../components/explosion.js";
import { Jugador } from "../components/jugador.js";

// ===============================================================================
function inicia_disparo(jugador, scene, botonfire, time, disparo, sonidoDisparo) {

  if (jugador.controles.shift.isDown) scene.start('gameover');

  if (jugador.controles.space.isDown || botonfire.isDown) {

    if (time.now > disparo.cadencia.bandera) {

      console.log('disparo');
      let buscar = false;

      disparo.get().getChildren().forEach(disp => {

        console.log(disp.active);

        if (!disp.active && !disp.visible && !buscar) {
          buscar = true;
          disp.setActive(true).setVisible(true);
          disp.enableBody(true, jugador.get().x, jugador.get().y - Math.floor(jugador.get().body.height / 2), true, true);
          disp.setVelocityY(Disparo.VEL_Y);
          disp.setAlpha(0.9);
          sonidoDisparo.play();
        }
      });

      disparo.cadencia.bandera = time.now + disparo.cadencia.disparo;
    }
  }
}

// ==============================================================================
function inicia_disparo_enemigos() {

    let buscar = false;

    this.enemigo.get().children.iterate(ene => {

      if (ene.x < this.jugador.get().x + this.jugador.get().width && ene.x + ene.width > this.jugador.get().x) {

        this.disparoenemigo.get().getChildren().forEach(disp => {

          // console.log(disp.active);

          if (!disp.active && !disp.visible && !buscar && this.time.now > this.disparoenemigo.cadencia.bandera) {

            buscar = true;
            this.settings_disparo_enemigo(disp, ene);
            this.disparoenemigo.cadencia.bandera = this.time.now + this.disparoenemigo.cadencia.disparo;
          }
        });

      } else {

        this.disparoenemigo.get().getChildren().forEach(disp => {

          if (Phaser.Math.Between(0, 999) < Settings.getNivel() * 9 && this.time.now > this.disparoenemigo.cadencia.bandera) {

            buscar = true;
            this.settings_disparo_enemigo(disp, ene);
            this.disparoenemigo.cadencia.bandera = this.time.now + this.disparoenemigo.cadencia.disparo;
          }
        });
      }
    });
}

// ==================================================================================
function settings_disparo_enemigo(disp, ene) {

    disp.setActive(true).setVisible(true);
    disp.setX(ene.x);
    disp.setY(ene.y + Math.floor(ene.body.height / 2));
    disp.setVelocityY(DisparoEnemigo.VEL_Y + Settings.getNivel() * 50);
    disp.setAngle(90);
    disp.setScale(2.2);
    disp.setAlpha(1);
}

// ==================================================================================
function colisionVsEnemigo(enemigo, disparo) {

    console.log('colision...disparo-enemigo');
    // console.log(enemigo);

    let buscarParticula = 0;

    this.particulas.get().children.iterate(particula => {

      if (!particula.active && !particula.visible && buscarParticula < Particulas.NRO_PARTICULAS) {
        buscarParticula ++;
        particula.setActive(true).setVisible(true);
        particula.setX(enemigo.x);
        particula.setY(enemigo.y);
        particula.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-180, 180));
        particula.setAlpha(1.0);

        setTimeout(() => {
          particula.setActive(false).setVisible(false);
        }, Particulas.DURACION_PARTICULAS);
      }
    });

    // ----------------------------------------------------------
    let buscar = false;

    this.explosion.get().children.iterate(explo => {

      if (!explo.active && !explo.visible && !buscar) {
        buscar = true;
        explo.setActive(true).setVisible(true);
        explo.setX(enemigo.x);
        explo.setY(enemigo.y);
        explo.setAlpha(1.0);

        setTimeout(() => {
          explo.setActive(false).setVisible(false);
        }, Explosion.DURACION_EXPLO);
      }
    });

    // ---------------------------------------------------------
    disparo.setActive(false).setVisible(false).disableBody(true, true);
    enemigo.setActive(false).setVisible(false).disableBody(true, true);

    suma_puntos(enemigo);
    this.marcador.update(0, Settings.getPuntos()); // 0 = actualizar puntos
    
    this.sonidoExplosion.play();

    if (this.enemigo.get().countActive() <= 0) console.log('nivel superado!');
    console.log(this.enemigo.get().countActive());
}

// ===================================================================================
function colisionJugadorVsEnemigo(jugador, enemigo) {

  console.log('colision...disparo-enemigo');
  console.log(enemigo, jugador);
  console.log(jugador.getData('posIni'));

  setTimeout(() => {
    jugador.setActive(true).setVisible(true).enableBody(true, jugador.getData('posIni')[0], jugador.getData('posIni')[1], true, true);
  }, Jugador.REVIVIR_PAUSA);

  jugador.setActive(false).setVisible(false).disableBody(true, true);

  suma_puntos(enemigo);
  this.marcador.update(0, Settings.getPuntos()); // 0 = actualizar puntos

  enemigo.setActive(false).setVisible(false).disableBody(true, true);
  this.sonidoExplosion.play();

  if (this.enemigo.get().countActive() <= 0) console.log('nivel superado!');
  console.log(this.enemigo.get().countActive());
}

// =================================================================================
function centrar_txt(texto, anchoScreen) {
  
  console.log(texto.width);
  return Math.floor(anchoScreen / 2 - texto.width / 2);
}

// =================================================================================
function suma_puntos(puntos) {

  const bonus = Settings.getPuntos() + puntos.getData('puntos');
  Settings.setPuntos(bonus);
  console.log(bonus, Settings.getPuntos());
}

export {
    centrar_txt,
    inicia_disparo,
    inicia_disparo_enemigos,
    colisionVsEnemigo,
    colisionJugadorVsEnemigo
};
