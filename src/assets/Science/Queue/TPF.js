// eslint-disable-next-line
import { generarUniforme, generarNormalBoxMuller, generarNormalConvolucion, generarPoisson, generarExponencialMedia, generarExponencialLambda } from '../../../../public/SIMTP3.js'

class Nube {
    rnd;
    proximaLlegada;
    lastRND;

    getClient() {
        return new Paciente();
    }

    calcularProximaLlegada() {
        this.lastRND = this.rnd();
        this.proximaLlegada = clock + this.lastRND;
    }

    getProximoEvento() {
        return new Evento("llegada_paciente", "llegada", this.proximaLlegada, this);
    }
}

class Paciente {
    tiempoCreacion;

    constructor() {
        this.tiempoCreacion = clock;
        estadisticas.pacientes += 1;
    }

    getOcupacion() {
        return generarUniforme(15, 25, 1)[0];
    }
}

class Ambulance {
    estado;
    cliente;
    tiempoDesocupacion;

    constructor() {
        this.estado = "libre";
        this.cliente = null;
        this.tiempoDesocupacion = clock;
    }

    isFree() {
        return this.estado == "libre";
    }

    arrival(cliente) {
        if (this.estado != "libre") {
            return false;
        }

        return this.ocupar(cliente);
    }

    ocupar(cliente) {
        this.cliente = cliente;
        this.estado = "ocupado";
        this.tiempoDesocupacion = clock + cliente.getOcupacion() + 10;
        return true;
    }

    liberar() {
        this.cliente = null;
        this.estado = "libre";
        return true;
    }

    getNextTiempoDesocupacion() {
        if (this.estado == "libre") {
            return Infinity;
        }
        return this.tiempoDesocupacion;
    }

    getProximoEvento() {
        switch (this.estado) {
            case 'ocupado': return new Evento("fin_atencion", "fin", this.getNextTiempoDesocupacion(), this);
            case 'libre': return new Evento("-", "-", this.getNextTiempoDesocupacion(), this);
        }
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

var clock = 0;

var servers;
var cola;
var log;

var nube = new Nube();

var estadisticas;

function generarServers(servers) {
    var s = [];
    for (var i = 0; i < servers; i++) {
        s.push(new Ambulance());
    }

    return s;
}

function acomodarPaciente(client) {
    for (var i = 0; i < servers.length; i++) {
        if (servers[i].arrival(client)) {
            return true;
        }
    }

    return false;
}

function getProximoEventoServer(servers) {
    var evento = servers[0].getProximoEvento();

    for (var i = 1; i < servers.length; i++) {
        var e = servers[i].getProximoEvento();
        evento = e.tiempo < evento.tiempo ? e : evento;
    }

    return evento;
}

function getServersLibres(servers) {
    var x = 0;
    for (var i = 0; i < servers.length; i++) {
        if (servers[i].isFree()) {
            x++;
        }
    }

    return x;
}

function serverString(servers) {
    var r = [];
    for (var i = 0; i < servers.length; i++) {
        r.push({
            "numero": i,
            "estado": servers[i].estado,
            "tDesocupacion": servers[i].tiempoDesocupacion
        });
    }

    return r;
}

function colaString(cola) {
    var nCola = [];
    for (var i = 0; i < cola.length; i++) {
        nCola.push(cola[i].tiempoCreacion);
    }
    return nCola;
}

function getProximoEvento() {
    var proximoEventoNube = nube.getProximoEvento();
    var proximoEventoServer = getProximoEventoServer(servers);

    var proximoEvento = proximoEventoNube.tiempo < proximoEventoServer.tiempo ? proximoEventoNube : proximoEventoServer;
    return proximoEvento;
}

function simulate(n, nAmbulances, from, iterations) {
    estadisticas = {
        "pacientes": 0,
        "noWait": 0,
        "tiempoTotal": 0
    };

    clock = 0;

    nube.rnd = function() {
        return generarExponencialMedia(30, 1)[0];
    }

    nube.calcularProximaLlegada();

    servers = generarServers(nAmbulances);
    cola = [];
    log = [];
    var i = 0;

    while (clock < n) {
        var proximoEvento = getProximoEvento();
        clock = proximoEvento.tiempo;

        switch (proximoEvento.tipo) {
            case "llegada":
                var client = proximoEvento.objeto.getClient();
                if (acomodarPaciente(client)) {
                    estadisticas.noWait += 1;
                } else {
                    cola.push(client);
                }
                proximoEvento.objeto.calcularProximaLlegada();
                break;
            case "fin":
                proximoEvento.objeto.liberar();
                if (cola.length > 0) {
                    var q = cola[0];
                    if (acomodarPaciente(q)) {
                        cola.splice(0, 1);
                    }
                }
                break;
        }

        var serversLibres = getServersLibres(servers);

        if ((clock >= from && log.length < iterations) || clock >= n) {
            log.push({
                "I": i,
                "tPacientes": estadisticas.pacientes,
                "tNoWait": estadisticas.noWait,
                "clock": clock,
                "proxPaciente": nube.getProximoEvento(),
                "evento": proximoEvento.name,
                "cola": colaString(cola),
                "libre": serversLibres,
                "ocupados": nAmbulances - serversLibres,
                "ambulancias": serverString(servers)
            });
        }
        i++;
    }

    estadisticas.tiempoTotal = clock;

    return { "log": log, "estadisticas": estadisticas };
}

export { simulate }
