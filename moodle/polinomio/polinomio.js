'use strict';

const INF = 9999;

let stringa = (coeff, testo_iniziale = '') => {
    if (coeff.length === 0) {
        return testo_iniziale + '0';
    }

    return coeff.reduceRight(function (str, c, k, arr) {
        if (c === 0) {
            return str;
        }
        // Se coefficiente non di grado massimo allora usa simbolo di somma (+ o -)
        if (k !== arr.length - 1) {
            if (c > 0) {
                str += ' + ';
            } else {
                str += ' - ';
                c = -c;
            }
        } else {
            if (c == -1) {
                if (k > 1) {
                    return str += '-x^' + k;
                } else if (k === 1) {
                    return str += '-x';
                } else if (k === 0) {
                    return str + c;
                }
            }
        }
        if (k > 1) {
            if (c !== 1) {
                str += c + ' ';
            }
            str += 'x^' + k;
        } else if (k == 1) {
            if (c !== 1) {
                str += c + ' ';
            }
            str += 'x';
        } else {
            str += c;
        }
        return str;
    }, testo_iniziale);
};


let grado = (c) => {
    for (let j = c.length - 1; j >= 0; j--) {
        if (c[j] !== undefined && c[j] !== 0) {
            return j;
        }
    }
    return -INF;
};

let valuta = (c) => {
    return function (x) {
        let ret = 0;
        let p = 1;
        for (let i = 0; i < c.length; i++) {
            ret += c[i] * p;
            p *= x;
        }
        return ret;
    };
};

let riduci = (c) => {
    for (let j = c.length - 1; j >= 0; j--) {
        if (c[j] === undefined || c[j] === 0) {
            c.pop();
        } else {
            break;
        }
    }
    return c;
};

let deriva = (c) => {
    let c1 = new Array(c.length - 1);
    for (let i = 1; i < c.length; i++) {
        c1[i - 1] = c[i] * i;
    }
    return c1;
};

let aggiungi = (a, b) => {
    let aa, bb;
    if (grado(a) >= grado(b)) {
        aa = a;
        bb = b;
    } else {
        aa = b;
        bb = a;
    }
    if (bb.length === 0) {
        return aa;
    }
    let c = new Array(grado(aa) + 1);
    for (let i = 0; i <= grado(bb); i++) {
        c[i] = (aa[i] + bb[i]);
    }
    for (let i = grado(bb) + 1; i <= grado(aa); i++) {
        c[i] = aa[i];
    }
    return riduci(c);
};

let nega = (c) => {
    return c.map(e => -e);
};

let sottrai = (a, b) => {
    return aggiungi(a, nega(b));
};

let moltiplica = (a, b) => {
    let grado_a = grado(a),
        grado_b = grado(b);
    if (grado_a < 0 || grado_b < 0) {
        return [];
    }
    let nuovo_grado = grado_a + grado_b + 1;
    let c = new Array(nuovo_grado).fill(0);
    for (let i = 0; i <= grado_a; i++) {
        for (let j = 0; j <= grado_b; j++) {
            c[i + j] += a[i] * b[j];
        }
    }
    return riduci(c);
};

let dividi = (num, den) => {
    let grado_den = grado(den),
        grado_num = grado(num),
        coeff_grado_max_den = den[grado_den];
    if (grado_num < grado_den) {
        return {
            quoziente: [],
            resto: num
        };
    }
    let ret = {
        quoziente: new Array(grado_num - grado_den + 1).fill(0),
        resto: num
    };
    for (let i = grado_num - grado_den; i >= 0; i--) {
        ret.quoziente[i] = ret.resto[grado_num] / coeff_grado_max_den;
        ret.resto = sottrai(num, moltiplica(ret.quoziente, den));
        grado_num--;
    }
    return ret;
};

let genera_casuale = (grado) => {
    let generaInteroTra = (m, M) => {
        return Math.floor(Math.random() * (M - m + 1) + m);
    };
    let coeff = new Array(grado + 1);
    for (let i = 0; i <= grado; i++) {
        coeff[i] = generaInteroTra(1, 5);
    }

    return coeff;
};


let genera_esercizio = (coeff) => {
    let esercizio = {
        nome: "newton_polival_" + coeff.toString().replace(/,/g, '_'),
        f_latex: stringa(coeff, "f(x) = "),
        f1_latex: stringa(deriva(coeff), "f(x) = "),
        f: (x) => valuta(coeff),
        f1: (x) => valuta(deriva(coeff))
    };
    return esercizio;
};


exports.grado = grado;
exports.riduci = riduci;
exports.stringa = stringa;
exports.valuta = valuta;
exports.deriva = deriva;
exports.aggiungi = aggiungi;
exports.sottrai = sottrai;
exports.nega = nega;
exports.moltiplica = moltiplica;
exports.dividi = dividi;
exports.INF = INF;
