import { Settings } from "../scenes/settings.js";
import { Disparo } from "../components/disparo.js";
import { DisparoEnemigo } from "../components/disparo-ene.js";
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
function inicia_disparo_enemigos(scene) {

  let buscar = false;

  scene.enemigo.get().children.iterate(ene => {

    if (ene.x < scene.jugador.get().x + scene.jugador.get().width && ene.x + ene.width > scene.jugador.get().x && ene.body.enable) {

      scene.disparoenemigo.get().getChildren().forEach(disp => {

        // console.log(disp.active);

        if (!disp.active && !disp.visible && !buscar && scene.time.now > scene.disparoenemigo.cadencia.bandera) {

          buscar = true;
          settings_disparo_enemigo(disp, ene);
          enemigo_gira(ene, scene);
          scene.disparoenemigo.cadencia.bandera = scene.time.now + scene.disparoenemigo.cadencia.disparo;
          scene.sonidoDieT1.play();
          scene.sonidoDieT2.play();
        }
      });

    } else if (ene.body.enable) {

      scene.disparoenemigo.get().getChildren().forEach(disp => {

        if (Phaser.Math.Between(0, 999) < Settings.getNivel() * 9 && scene.time.now > scene.disparoenemigo.cadencia.bandera) {

          buscar = true;
          settings_disparo_enemigo(disp, ene);
          enemigo_gira(ene, scene);
          scene.disparoenemigo.cadencia.bandera = scene.time.now + scene.disparoenemigo.cadencia.disparo;
          scene.sonidoDieT1.play();
          scene.sonidoDieT2.play();
        }
      });
    }
  });
}

// ==================================================================================
function settings_disparo_enemigo(disp, ene) {
  
  disp.setActive(true).setVisible(true);
  disp.enableBody(true, ene.x, ene.y + Math.floor(ene.body.height / 2), true, true);
  // disp.setX(ene.x);
  // disp.setY(ene.y + Math.floor(ene.body.height / 2));
  disp.setVelocityY(DisparoEnemigo.VEL_Y + Settings.getNivel() * 50);
  // disp.setAngle(90);
  disp.setScale(0.8);
  disp.setAlpha(1);
}

// ==================================================================================
function enemigo_gira(ene, scene) {

  scene.tweens.add({
    targets: ene,
    angle: 360,
    duration: 300,
    yoyo: true,
  });
}

// ==================================================================================
function colisionVsEnemigo(enemigo, disparo) {

    console.log('colision...disparo-enemigo');
    // console.log(enemigo);

    let buscarParticula = 0;

    this.particulas.get().children.iterate(particula => {

      if (!particula.active && !particula.visible && buscarParticula < Particulas.NRO_PARTICULAS) {
        buscarParticula ++;
        settings_particulas(particula, enemigo);

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
        settings_explosion(explo, enemigo);

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

    if (this.enemigo.get().countActive() <= 0) this.nivel_superado = true;
    console.log(this.enemigo.get().countActive());
}

// ===================================================================================
function colisionJugadorVsEnemigo(jugador, enemigo) {

  console.log('colision...disparo-enemigo');
  console.log(enemigo, jugador);
  console.log(jugador.getData('posIni'));

  let buscarParticula = 0;

  this.particulas.get().children.iterate(particula => {

    if (!particula.active && !particula.visible && buscarParticula < Particulas.NRO_PARTICULAS * 2) {
      buscarParticula ++;

      if (buscarParticula < Particulas.NRO_PARTICULAS) {
        settings_particulas(particula, enemigo);
      } else {
        settings_particulas(particula, jugador);
        particula.setVelocity(Phaser.Math.Between(-400, 400), Phaser.Math.Between(-300, 300));
      }
      
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
      settings_explosion(explo, enemigo);

      setTimeout(() => {
        explo.setActive(false).setVisible(false);
      }, Explosion.DURACION_EXPLO);
    }
  });

  // ----------------------------------------------------------
  buscar = false;

  this.explosion.get().children.iterate(explo => {

    if (!explo.active && !explo.visible && !buscar) {
      buscar = true;
      settings_explosion(explo, jugador);
      explo.setScale(4);

      setTimeout(() => {
        explo.setActive(false).setVisible(false);
      }, Jugador.DURACION_EXPLO);
    }
  });

  // ---------------------------------------------------------
  setTimeout(() => {
    jugador.setActive(true).setVisible(true).setAlpha(0.1);
    jugador.enableBody(true, jugador.getData('posIni')[0], jugador.getData('posIni')[1], true, true);
    this.tweens.add({
      targets: jugador,
      alpha: 1,
      duration: 3000
    });
  }, Jugador.REVIVIR_PAUSA);

  jugador.setActive(false).setVisible(false).disableBody(true, true);
  restar_vida();
  
  suma_puntos(enemigo);
  this.marcador.update(0, Settings.getPuntos()); // 0 = actualizar puntos

  enemigo.setActive(false).setVisible(false).disableBody(true, true);
  this.sonidoNaveExplota.play();
  this.sonidoExplosion.play();

  if (this.enemigo.get().countActive() <= 0) this.nivel_superado = true;
  console.log(this.enemigo.get().countActive());
}

// ===================================================================================
function colisionVsDisparoEnemigo(jugador, disparoenemigo) {

  console.log('colision...disparo-enemigo');
  console.log(disparoenemigo, jugador);
  console.log(jugador.getData('posIni'));

  let buscarParticula = 0;

  this.particulas.get().children.iterate(particula => {

    if (!particula.active && !particula.visible && buscarParticula < Particulas.NRO_PARTICULAS * 2) {
      buscarParticula ++;

      if (buscarParticula < Particulas.NRO_PARTICULAS) {
        settings_particulas(particula, disparoenemigo);
      } else {
        settings_particulas(particula, jugador);
        particula.setVelocity(Phaser.Math.Between(-400, 400), Phaser.Math.Between(-300, 300));
      }
      
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
      settings_explosion(explo, jugador);
      explo.setScale(4);

      setTimeout(() => {
        explo.setActive(false).setVisible(false);
      }, Jugador.DURACION_EXPLO);
    }
  });

  // ---------------------------------------------------------
  setTimeout(() => {
    jugador.setActive(true).setVisible(true).setAlpha(0.1);
    jugador.enableBody(true, jugador.getData('posIni')[0], jugador.getData('posIni')[1], true, true);
    this.tweens.add({
      targets: jugador,
      alpha: 1,
      duration: 3000
    });
  }, Jugador.REVIVIR_PAUSA);

  jugador.setActive(false).setVisible(false).disableBody(true, true);
  restar_vida();

  disparoenemigo.setActive(false).setVisible(false).disableBody(true, true);
  this.sonidoNaveExplota.play();
}

// ==================================================================================
function settings_particulas(particula, enemigo) {

  particula.setActive(true).setVisible(true);
  particula.setX(enemigo.x);
  particula.setY(enemigo.y);
  particula.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-180, 180));
  particula.setAlpha(1.0);
}

// ----------------------------------------------------------------------------------
function settings_explosion(explo, enemigo) {

  explo.setActive(true).setVisible(true);
  explo.setX(enemigo.x);
  explo.setY(enemigo.y);
  explo.setAlpha(1.0);
  explo.setScale(2);
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

// =================================================================================
function restar_vida() {

  const actualizar = Settings.getVidas() - 1;
  Settings.setVidas(actualizar);
}

export {
    centrar_txt,
    inicia_disparo,
    inicia_disparo_enemigos,
    colisionVsEnemigo,
    colisionJugadorVsEnemigo,
    colisionVsDisparoEnemigo
};
