// eslint-disable-next-line
import { generarUniforme, generarNormalBoxMuller, generarNormalConvolucion, generarPoisson, generarExponencialMedia, generarExponencialLambda } from '../../../../public/SIMTP3.js'

class Nube {
    rnd;
    proximaLlegada;
    lastRND;

    getClient() {
        return new Cliente();
    }

    calcularProximaLlegada() {
        this.lastRND = this.rnd();
        this.proximaLlegada = clock + this.lastRND;
    }

    getProximoEvento() {
        return new Evento("llegada_cliente", "llegada", this.proximaLlegada, this);
    }
}

class Cliente {
    tiempoCreacion;
    facturaVencida;
    actualizado;

    constructor() {
        this.tiempoCreacion = clock;
        this.facturaVencida = (generarUniforme(0, 1, 1)[0] <= 0.4);
        this.actualizado = false;
    }

    getOcupacionCobro() {
        return generarNormalConvolucion(55, 10, 1)[0];
    }

    getOcupacionActualizacion() {
        return generarUniforme(40, 600, 1)[0];
    }

    postActualizacionQuierePagar() {
        return (generarUniforme(0, 1, 1)[0] <= 0.8);
    }

    actualizar() {
        this.actualizado = true;
    }

    finAtencion() {
        if (this.facturaVencida) {
            if (this.actualizado) {
                estadisticas.clientesNoPagan += 1;
                estadisticas.tiempoClientesNoPaganTotal += this.getTiempoPermanencia();
            } else {
                estadisticas.clientesFullService += 1;
                estadisticas.tiempoClientesFullServiceTotal += this.getTiempoPermanencia();
            }
        } else {
            estadisticas.clientesNoVencida += 1;
            estadisticas.tiempoClientesNoVencidaTotal += this.getTiempoPermanencia();
        }
        estadisticas.clientes += 1;
        estadisticas.tiempoClientesTotal += this.getTiempoPermanencia();
    }

    getTiempoPermanencia() {
        return clock - this.tiempoCreacion;
    }
}

class Server {
    tipo;
    estado;
    cliente;
    tiempoDesocupacion;

    constructor(tipo) {
        this.tipo = tipo;
        this.estado = "libre";
        this.tiempoDesocupacion = clock;
        this.cliente = null;
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
        this.tiempoDesocupacion = clock + (this.tipo == 'ventanilla' ? cliente.getOcupacionActualizacion() : cliente.getOcupacionCobro());
        return true;
    }

    liberar() {
        if (this.tipo == "ventanilla") {
            this.cliente.actualizar();
        }
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
            case 'ocupado':
                var evName = "fin_" + (this.tipo == 'ventanilla' ? "actualizacion" : "cobro");
                return new Evento(evName, "fin", this.getNextTiempoDesocupacion(), this);
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

var cajas;
var ventanillas;
var cola;
var colaActualizacion;
var log;

var nube = new Nube();

var estadisticas;

function generarServers(numero, tipo) {
    var s = [];
    for (var i = 0; i < numero; i++) {
        s.push(new Server(tipo));
    }

    return s;
}

function acomodarPaciente(client) {
    var servers = (!client.facturaVencida || client.actualizado) ? cajas : ventanillas;

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

function getLibres(servers) {
    var x = 0;
    for (var i = 0; i < servers.length; i++) {
        if (servers[i].isFree()) {
            x++;
        }
    }

    return x;
}

function serverString(cajas, ventanillas) {
    var r = [];
    for (var i = 0; i < cajas.length; i++) {
        r.push({
            "id": "Caja " + i,
            "estado": cajas[i].estado,
            "tDesocupacion": cajas[i].tiempoDesocupacion
        });
    }

    for (var j = 0; j < ventanillas.length; j++) {
        r.push({
            "id": "Ventanilla " + j,
            "estado": ventanillas[j].estado,
            "tDesocupacion": ventanillas[j].tiempoDesocupacion
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
    var proximoEventoCajas = getProximoEventoServer(cajas);
    var proximoEventoVentanillas = getProximoEventoServer(ventanillas);
    var proximoEventoServer = proximoEventoCajas.tiempo < proximoEventoVentanillas.tiempo ? proximoEventoCajas : proximoEventoVentanillas;

    var proximoEvento = proximoEventoNube.tiempo < proximoEventoServer.tiempo ? proximoEventoNube : proximoEventoServer;
    return proximoEvento;
}

function simulate(n, from, iterations) {
    estadisticas = {
        "tiempoTotal": 0,
        "clientes": 0,
        "clientesNoVencida": 0,
        "clientesNoPagan": 0,
        "clientesFullService": 0, // Pagan y actualizan
        "tiempoClientesTotal": 0,
        "tiempoClientesNoVencidaTotal": 0,
        "tiempoClientesNoPaganTotal": 0,
        "tiempoClientesFullServiceTotal": 0
    };

    clock = 0;

    nube.rnd = function() {
        return generarExponencialMedia(60, 1)[0];
    }

    nube.calcularProximaLlegada();

    cajas = generarServers(9, "caja");
    ventanillas = generarServers(9, "ventanilla");
    cola = [];
    colaActualizacion = [];
    log = [];
    var i = 0;

    while (clock < n) {
        var proximoEvento = getProximoEvento();
        clock = proximoEvento.tiempo;

        switch (proximoEvento.name) {
            case "llegada_cliente":
                var client = proximoEvento.objeto.getClient();
                if (!acomodarPaciente(client)) {
                    if (client.facturaVencida) {
                        colaActualizacion.push(client);
                    } else {
                        cola.push(client);
                    }
                }
                proximoEvento.objeto.calcularProximaLlegada();
                break;
            case "fin_cobro":
                proximoEvento.objeto.cliente.finAtencion();
                proximoEvento.objeto.liberar();
                if (cola.length > 0) {
                    var q = cola[0];
                    if (acomodarPaciente(q)) {
                        cola.splice(0, 1);
                    }
                }
                break;
            case "fin_actualizacion":
                if (proximoEvento.objeto.cliente.postActualizacionQuierePagar()) {
                    if (!acomodarPaciente(proximoEvento.objeto.cliente)) {
                        cola.push(proximoEvento.objeto.cliente);
                    }
                } else {
                    proximoEvento.objeto.cliente.finAtencion();
                }

                proximoEvento.objeto.cliente.actualizar();
                proximoEvento.objeto.liberar();
                if (colaActualizacion.length > 0) {
                    var r = colaActualizacion[0];
                    if (acomodarPaciente(r)) {
                        colaActualizacion.splice(0, 1);
                    }
                }
                break;
        }

        if ((clock >= from && log.length < iterations) || clock >= n) {
            log.push({
                "I": i,
                "clock": clock,
                "proxPaciente": nube.getProximoEvento(),
                "evento": proximoEvento.name,
                "tClientes": estadisticas.tiempoClientesTotal,
                "tClientesNV": estadisticas.tiempoClientesNoVencidaTotal,
                "tClientesNP": estadisticas.tiempoClientesNoPaganTotal,
                "tClientesFS": estadisticas.tiempoClientesFullServiceTotal,
                "clientes": estadisticas.clientes,
                "clientesNV": estadisticas.clientesNoVencida,
                "clientesNP": estadisticas.clientesNoPagan,
                "clientesFS": estadisticas.clientesFullService,
                "cola": colaString(cola),
                "colaActualizacion": colaString(colaActualizacion),
                "ventanillasLibres": getLibres(ventanillas),
                "cajasLibres": getLibres(cajas),
                "servers": serverString(cajas, ventanillas)
            });
        }
        i++;
    }

    estadisticas.tiempoTotal = clock;

    return { "log": log, "estadisticas": estadisticas };
}

export { simulate }
