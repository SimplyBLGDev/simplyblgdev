// eslint-disable-next-line
import { generarUniforme, generarNormalBoxMuller, generarNormalConvolucion, generarPoisson, generarExponencialMedia, generarExponencialLambda } from '../../../../public/SIMTP3.js'

class Nube {
    name;
    rnd;
    proximaLlegada;
    lastRND;

    constructor(name) {
        this.name = name;
    }

    getClient() {
        return new Equipo(this.name);
    }

    calcularProximaLlegada() {
        this.lastRND = this.rnd();
        this.proximaLlegada = clock + this.lastRND;
    }

    getProximoEvento() {
        return new Evento("llegada_" + this.name, "llegada", this.proximaLlegada, this);
    }
}

class Equipo {
    name;
    tiempoCreacion;
    tiempoJuego;

    constructor(name) {
        this.name = name;
        this.tiempoCreacion = clock;
    }

    getOcupacion() {
        switch (this.name) {
            case "futbol":
                return generarNormalConvolucion(90, 10, 1)[0];
            case "handball":
                return generarNormalConvolucion(80, 20, 1)[0];
            case "basket":
                return generarNormalConvolucion(100, 30, 1)[0];
        }
    }

    jugando() {
        switch (this.name) {
            case "futbol":
                estadisticas.tiempoEsperaTotalFutbol += clock - this.tiempoCreacion;
                estadisticas.cantEquFutbol += 1;
                break;
            case "handball":
                estadisticas.tiempoEsperaTotalHandball += clock - this.tiempoCreacion;
                estadisticas.cantEquHandball += 1;
                break;
            case "basket":
                estadisticas.tiempoEsperaTotalBasket += clock - this.tiempoCreacion;
                estadisticas.cantEquBasket += 1;
                break;
        }

        this.tiempoJuego = clock;
    }
}

class Server {
    estado;
    cliente;
    tiempoDesocupacion;
    disciplina;
    subserver;

    constructor(hasSubserver) {
        this.estado = "libre";
        this.disciplina = "basket";
        this.cliente = null;
        this.tiempoDesocupacion = clock;
        if (hasSubserver) {
            this.subserver = new Server(false);
        }
    }

    trulyFree() {
        var trulyFree = this.estado == "libre";
        if (this.subserver != null) {
            trulyFree &&= (this.subserver.estado == "libre");
        }
        return trulyFree;
    }

    arrival(cliente) {
        if (this.estado == "ocupado") {
            if (cliente.name == "basket" && this.cliente.name == "basket" && this.subserver != null) {
                return this.subserver.arrival(cliente);
            }
            return false;
        }

        if (this.subserver?.estado == "ocupado") {
            return false;
        }

        if (this.disciplina != cliente.name) {
            if (this.estado == "acondicionando") {
                return false;
            }
            return this.acondicionar(cliente.name);
        }

        return this.ocupar(cliente);
    }

    ocupar(cliente) {
        this.cliente = cliente;
        this.estado = "ocupado";
        this.tiempoDesocupacion = clock + cliente.getOcupacion();
        this.disciplina = cliente.name;
        this.cliente.jugando();
        return true;
    }

    liberar() {
        server.checkDuoBasket();
        this.cliente = null;
        this.estado = "libre";
        return true;
    }

    checkDuoBasket() {
        if ((this.estado == "ocupado" && this.cliente.name == "basket") && this.subserver.estado == "ocupado") {
            estadisticas.tiempoTotalDuoBasket += clock - Math.max(this.cliente.tiempoJuego, this.subserver.cliente.tiempoJuego);
        }
    }

    acondicionar(nuevaDisciplina) {
        this.estado = "acondicionando";
        this.tiempoDesocupacion = clock + 10;
        this.disciplina = nuevaDisciplina;
        estadisticas.cantReacondicionamientos += 1;
        return false;
    }

    getNextTiempoDesocupacion() {
        if (this.estado == "libre") {
            return Infinity;
        }
        return this.tiempoDesocupacion;
    }

    getProximoEvento() {
        if (this.subserver != null && this.subserver.getProximoEvento().tiempo <= this.getNextTiempoDesocupacion()) {
            return this.subserver.getProximoEvento();
        }

        switch (this.estado) {
            case 'acondicionando': return new Evento("fin_acondicionamiento", "fin", this.getNextTiempoDesocupacion(), this);
            case 'ocupado': return new Evento("fin_" + this.cliente.name, "fin", this.getNextTiempoDesocupacion(), this);
            case 'libre': return new Evento("-", "-", this.getNextTiempoDesocupacion(), this);
        }
    }

    hasSpaceForOneMore(client) {
        if (client.name == "basket" && this.cliente.name == "basket" && this.subserver != null) {
            return this.subserver.estado == "libre";
        }

        return false;
    }
}

class Evento {
    name;
    tipo;
    tiempo;
    objeto;

    constructor(name, tipo, tiempo, objeto) {
        this.name = name;
        this.tipo = tipo;
        this.tiempo = tiempo;
        this.objeto = objeto;
    }
}

function getNubeProximaLlegada() {
    if (nubeFutbol.proximaLlegada < nubeHandball.proximaLlegada && nubeFutbol.proximaLlegada < nubeBasket.proximaLlegada) {
        return nubeFutbol;
    } else if (nubeHandball.proximaLlegada < nubeBasket.proximaLlegada) {
        return nubeHandball;
    } else {
        return nubeBasket;
    }
}

var clock = 0;

var server;
var cola;
var log;

var estadisticas = {
    "tiempoEsperaTotalFutbol": 0,
    "tiempoEsperaTotalHandball": 0,
    "tiempoEsperaTotalBasket": 0,
    "cantEquFutbol": 0,
    "cantEquHandball": 0,
    "cantEquBasket": 0,
    "tiempoLibreServidor": 0,
    "tiempoTotalDuoBasket": 0,
    "cantReacondicionamientos": 0,
    "tiempoTotal": 0
};

var nubeFutbol = new Nube("futbol");
var nubeHandball = new Nube("handball");
var nubeBasket = new Nube("basket");

function simulate(n, saveFrom, saveTo) {
    clock = 0;

    nubeFutbol.rnd = function() {
        return generarExponencialMedia(600, 1)[0];
    }
    nubeHandball.rnd = function() {
        return generarNormalConvolucion(720, 120, 1)[0];
    }
    nubeBasket.rnd = function() {
        return generarNormalConvolucion(480, 120, 1)[0];
    }

    nubeFutbol.calcularProximaLlegada();
    nubeHandball.calcularProximaLlegada();
    nubeBasket.calcularProximaLlegada();

    server = new Server(true);
    cola = [];
    log = [];

    for (var i = 0; i < n; i++) {
        var nubeProximoEvento = getNubeProximaLlegada();
        var proximoEventoNube = nubeProximoEvento.getProximoEvento();
        var proximoEventoServer = server.getProximoEvento();

        var proximoEvento = proximoEventoNube.tiempo < proximoEventoServer.tiempo ? proximoEventoNube : proximoEventoServer;
        clock = proximoEvento.tiempo;

        if (server.trulyFree()) {
            estadisticas.tiempoLibreServidor += clock - Math.max(server.tiempoDesocupacion, server.subserver.tiempoDesocupacion);
        }

        switch (proximoEvento.tipo) {
            case "llegada":
                var client = proximoEvento.objeto.getClient();
                if (!server.arrival(client)) {
                    cola.push(client);
                }
                proximoEvento.objeto.calcularProximaLlegada();
                break;
            case "fin":
                proximoEvento.objeto.liberar();
                if (cola.length > 0) {
                    var q = cola[0];
                    if (server.arrival(q)) {
                        cola.splice(0, 1);
                        if (cola.length > 0 && server.hasSpaceForOneMore(cola[0])) {
                            q = cola[0];
                            if (server.arrival(q)) {
                                cola.splice(0, 1);
                            }
                        }
                    }
                }
                break;
        }

        if ((i >= saveFrom && i <= saveTo) || i == n - 1) {
            log.push({
                "I": i,
                "clock": clock,
                "evento": proximoEvento.name,
                "objeto": proximoEvento.objeto,
                "server": server.estado,
                "desocupacion": server.getNextTiempoDesocupacion(),
                "disciplina": server.disciplina,
                "subserver": server.subserver.estado,
                "jugando": server.cliente?.name,
                "jugando2": server.subserver.cliente?.name,
                "cola": cola.length,
                "delayFutbol": nubeFutbol.lastRND,
                "delayHandball": nubeHandball.lastRND,
                "delayBasket": nubeBasket.lastRND,
                "nextFutbol": nubeFutbol.proximaLlegada,
                "nextHandball": nubeHandball.proximaLlegada,
                "nextBasket": nubeBasket.proximaLlegada
            });
        }
    }

    estadisticas.tiempoTotal = clock;

    return { "log": log, "estadisticas": estadisticas };
}

export { simulate }
