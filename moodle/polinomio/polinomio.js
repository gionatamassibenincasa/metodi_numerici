'use strict';

let grado = (c) => {
    if (c.length == 0) {
        return -Infinity;
    }
    return c.length - 1;
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
    if (a.length === 0 || b.length === 0) {
        return [];
    }
    let c = new Array(grado_a + grado_b + 1).fill(0);
    for (let i = 0; i <= grado_a; i++) {
        for (let j = 0; j <= grado_b; j++) {
            c[i + j] += a[i] * b[j];
        }
    }
    return riduci(c);
};

let dividi = (num, den) => {
    // q quoziente
    // r resto
    if (grado(den) > grado(num)) {
        return {
            q: [],
            r: c2
        };
    }
    let q = new Array(grado(num) - grado(den) + 1);
    while (grado(num) >= grado(den)) {
        let g_num = grado(num),
            g_den = grado(den),
            i = g_num - g_den;
        q[i] = num[g_num] / den[g_den];
    }
};

let stringa = (coeff, testo_iniziale = '') => {
    if (coeff.length === 0) {
        return testo_iniziale + '0';
    }

    return coeff.reduceRight(function (str, c, k, arr) {
        // Se coefficiente non di grado massimo allora usa simbolo di somma (+ o -)
        if (k !== arr.length - 1) {
            if (c > 0) {
                str += ' + ';
            } else {
                str += ' - ';
                c = -c;
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


exports.riduci = riduci;
exports.stringa = stringa;
exports.valuta = valuta;
exports.deriva = deriva;
exports.aggiungi = aggiungi;
exports.sottrai = sottrai;
exports.nega = nega;
exports.moltiplica = moltiplica;

// console.log(genera_esercizio(genera_casuale(4)));
