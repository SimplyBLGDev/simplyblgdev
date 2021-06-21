function rungeKuttaTP6(alpha, h, E = 15) {
    var log = [];
    var ret = {
        50: -1,
        70: -1,
        100: -1
    };

    var t = 0;

    while (E <= 100) {        
        var k1 = alpha * E;
        
        var E_k2 = E + k1*h/2;
        var k2 = alpha * E_k2;

        var E_k3 = E + k2*h/2;
        var k3 = alpha * E_k3;
        
        var k4 = alpha * (E+k3*h);

        var tS = t + h;
        var ES = E + (h/6) * (k1+2*k2+2*k3+k4);

        log.push({
            "t": t,
            "E": E,
            "k1": k1,
            "k2": k2,
            "k3": k3,
            "k4": k4,
            "t+1":tS,
            "E+1":ES
        });

        E = ES;
        t = tS;

        for (var i in ret) {
            if (ret[i] == -1 && E >= i) {
                ret[i] = t*60;
            }
        }
    }

    return { "log": log, "result": ret };
}

function rungeKuttaL(beta, h, L) {
    var log = [];

    var t = 0;

    // eslint-disable-next-line
    while (true) {
        var k1 = -beta * 0.5 * L;
        
        var L_k2 = L + k1*h/2;
        var k2 = -beta * 0.5 * L_k2;

        var L_k3 = L + k2*h/2;
        var k3 = -beta * 0.5 * L_k3;
        
        var k4 = -beta * 0.5 * (L+k3*h);

        var tS = t + h;
        var LS = L + (h/6) * (k1+2*k2+2*k3+k4);

        log.push({
            "t": t,
            "E": L,
            "k1": k1,
            "k2": k2,
            "k3": k3,
            "k4": k4,
            "t+1":tS,
            "E+1":LS
        });

        if (L - LS <= 0.02) {
            return { "log": log, "result": tS };
        }

        L = LS;
        t = tS;
    }
}

export { rungeKuttaTP6, rungeKuttaL }
