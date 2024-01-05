// ====================================================================================
export class Settings {

    static puntos = 0;
    static nivel = 1;
    static vidas = 3;

    static getPuntos() {
        return Settings.puntos;
    }

    static getNivel() {
        return Settings.nivel;
    }

    static getVidas() {
        return Settings.vidas;
    }
    
    static setPuntos(ptos) {
        Settings.puntos = ptos;
    }

    static setNivel(level) {
        Settings.nivel = level;
    }

    static setVidas(lifes) {
        Settings.vidas = lifes;
    }
}
