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
        let i = c.length - 1;
        let b = c[i];
        for (i = i - 1; i >= 0; i--) {
            b = c[i] + b * x;
        }
        return b;
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
    if (c.length === 0) {
        return [];
    }
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
        while (grado(ret.resto) > grado_num) {
            ret.resto.pop();
        }
    }
    return ret;
};

let sequenza_sturm = (p) => {
    let seq = [];
    seq.push(p);
    seq.push(deriva(p));
    for (let j = 1;; j++) {
        let qr = dividi(seq[j - 1], seq[j]);
        let r = qr.resto;
        if (grado(r) < 0) {
            break;
        }
        seq.push(nega(r));
    }

    return seq;
};

let numero_radici_reali = (p, a, b) => {
    let seq = sequenza_sturm(p);
    let n = grado(p);
    if (a === undefined && b === undefined) {
        let rho_2 = rho_1;
        for (let k = 0; k < n; k++) {
            let r = 1 + Math.abs(p[k] / p[n]);
            if (r > rho_2) {
                rho_2 = r;
            }
        }
        a = -rho_2;
        b = rho_2;
    }

    let f_m = seq.map(p => valuta(p)(a));
    let f_p = seq.map(p => valuta(p)(b));
    let variazioni = (s) => {
        let prec = s[0];
        let nvar = 0;
        for (let i = 0; i < s.length; i++) {
            if (s[i] < 3 * Math.EPSILON) {
                continue;
            }
            if (s[i] * prec < 0) {
                nvar++;
            }
            prec = s[i];
        }
        return nvar;
    }
    return variazioni(f_m) - variazioni(f_p);
}

let intervallo_radici_reali = (p) => {
    let seq = sequenza_sturm(p);
    let n = grado(p);
    let rho_1 = Math.pow(Math.abs(p[0] / p[n]), 1 / n);
    if (p[1]) {
        let rho_1a = n * Math.abs(p[0] / p[1]);
        rho_1 = Math.min(rho_1, rho_1a);
    }
    let rho_2 = rho_1;
    for (let k = 0; k < n; k++) {
        let r = 1 + Math.abs(p[k] / p[n]);
        if (r > rho_2) {
            rho_2 = r;
        }
    }
    let f_m = seq.map(p => valuta(p)(-rho_2));
    let f_p = seq.map(p => valuta(p)(rho_2));
    let variazioni = (s) => {
        let prec = s[0];
        let nvar = 0;
        for (let i = 0; i < s.length; i++) {
            if (s[i] < 3 * Math.EPSILON) {
                continue;
            }
            if (s[i] * prec < 0) {
                nvar++;
            }
            prec = s[i];
        }
        return nvar;
    }
    let n_radici = variazioni(f_m) - variazioni(f_p);
    let intervalli = [];
    if (n_radici === 0) {
        return intervalli;
    }
    let sinistra = -rho_2;
    let destra = sinistra + rho_2 / n_radici;
    let incertezza = destra - sinistra;
    let fine = false;
    for (let restanti = n_radici; restanti >= 0 && !fine;) {
        let nr = numero_radici_reali(p, sinistra, destra);
        if (nr > 1) {
            incertezza /= 2;
            destra -= incertezza;
        } else if (nr === 0) {
            destra = Math.min(destra + incertezza, rho_2);
            if (destra >= rho_2 - 1E-5) {
                fine = true;
            }
            if (incertezza > 1E5) {
                fine = true;
            }
        } else if (nr === 1) {
            let ab = {
                destra: destra,
                sinistra: sinistra,
                incertezza: destra - sinistra
            };
            intervalli.push(ab);
            restanti--;
            sinistra = destra;
            destra = sinistra + rho_2 / n_radici;
            incertezza = destra - sinistra;
        }
    }
    return intervalli;
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
exports.numero_radici_reali = numero_radici_reali;
exports.intervallo_radici_reali = intervallo_radici_reali;
exports.INF = INF;
