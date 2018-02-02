'use strict';

const handlebars = require('handlebars');
const fs = require('fs');
const polinomio = require('./polinomio');

const grado = 5;
const n_esercizi = 25;

const hash = (a) => {
    let p_0 = a[0];
    let p_1 = a.reduce((somma, a_i) => somma + a_i);
    let p_10 = polinomio.valuta(a)(10);
    return p_0 + 10 * p_1 + p_10;
};

const genera_casuale = (grado) => {
    let generaInteroTra = (m, M) => {
        return Math.floor(Math.random() * (M - m + 1) + m);
    };

    let coeff = new Array(grado + 1);
    for (let i = 0; i <= grado; i++) {
        coeff[i] = generaInteroTra(-5, 5);
    }

    return coeff;
};

const Newton = (esercizio) => {
    const esp_prima_cifra_significativa = (n) => {
        if (n < 0) n = -n;
        if (n === 0) return 0;
        //console.log("Ordine " + n + ": " + Math.floor(Math.log10(n)));
        return Math.floor(Math.log10(n));
    };

    const delta = (n) => {
        return Math.pow(10, esp_prima_cifra_significativa(n) - esercizio.cifre_significative + 1);
    };

    let x = esercizio.x0;
    let f, f1, e;

    esercizio.iterata.push({});
    esercizio.iterata[0].k = 0;
    esercizio.iterata[0].x = x;
    esercizio.iterata[0].delta_x = delta(x);

    for (let k = 1; k < esercizio.iterazioni; k++) {
        e = x; // e = x_{k-1}
        f = esercizio.f(x);
        f1 = esercizio.f1(x);
        x = x - f / f1;
        e = Math.abs(x - e); // e = errore
        esercizio.iterata.push({
            k: k,
            x: x,
            delta_x: delta(x),
            e: e,
            delta_e: delta(e),
        });
    }
    // Elimina errori
    if (isNaN(x) || !isFinite(x) || Math.abs(f) > 1E-5 || Math.abs(f1) < 1 || e > 1E-5) {
        return false;
    }
    // Elimina zeri interi
    if (esercizio.x0 === x) {
        return false;
    }
    return true;
};

const genera_esercizio = (grado) => {
    let p, intervallo_sol_rel = [];
    do {
        p = genera_casuale(grado);
        intervallo_sol_rel = polinomio.intervallo_radici_reali(p);
    } while (intervallo_sol_rel.length === 0);

    let p1 = polinomio.deriva(p);
    let esercizio = {
        nome: "newton_polival_" + p.toString().replace(/,/g, '_'),
        hash: hash(p),
        f_latex: polinomio.stringa(p, "f(x) = "),
        f1_latex: polinomio.stringa(p1, "f(x) = "),
        f: (x) => polinomio.valuta(p)(x),
        f1: (x) => polinomio.valuta(p1)(x),
        x0: Math.round(intervallo_sol_rel[0].destra * 2) / 2,
        cifre_significative: 5,
        iterazioni: 5,
        iterata: []
    };

    return esercizio;
};


let templateCloze = process.argv[2];
fs.readFile(templateCloze, 'utf-8', function (error, source) {
    const template = handlebars.compile(source);
    let j = 0;
    let esercizi = [];
    do {
        let esercizio = genera_esercizio(grado);
        if (Newton(esercizio)) {
            esercizi.push(esercizio);
            j++;
        }
    } while (j < n_esercizi);
    let moodle_xml = template(esercizi);
    moodle_xml = moodle_xml.replace(/\s+}/g, '}')
    console.log(moodle_xml);
});
