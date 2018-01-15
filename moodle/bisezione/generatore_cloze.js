'use strict';

let handlebars = require('handlebars');
let fs = require('fs');

let esercizi = [
    {
        nome: "bisezione_cos_e_x",
        f_latex: "f(x) = \\cos (\\mathrm{e}^x)",
        f: (x) => {
            return Math.cos(Math.exp(x));
        },
        cifre_significative: 5,
        iterazioni: 5,
        a: 0,
        b: 1,
        iterata: []
    },
    {
        nome: "bisezione_e_x__plus_x",
        f_latex: "f(x) = \\mathrm{e}^x + x",
        f: (x) => {
            return Math.exp(x) + x;
        },
        cifre_significative: 5,
        iterazioni: 5,
        a: -1,
        b: 0,
        iterata: []
    },
    {
        nome: "bisezione_x8_minus_2",
        f_latex: "f(x) = x^{8} - 2",
        f: (x) => {
            return Math.pow(x, 8) - 2;
        },
        cifre_significative: 5,
        iterazioni: 5,
        a: 0,
        b: 2,
        iterata: []
    },
    {
        nome: "bisezione_ex_minus_5__cube",
        f_latex: "f(x) = \\left(\\mathrm{e}^x - 5\right)^3",
        f: (x) => {
            return Math.pow(Math.exp(x) - 5, 5);
        },
        cifre_significative: 5,
        iterazioni: 5,
        a: 1,
        b: 2,
        iterata: []
    },
    {
        nome: "bisezione_eminusx_minus_x",
        f_latex: "f(x) = \\mathrm{e}^{-x} - x",
        f: (x) => {
            return Math.exp(-x) - x;
        },
        cifre_significative: 5,
        iterazioni: 5,
        a: 0,
        b: 1,
        iterata: []
    }];

let bisezione = (data) => {
    let k = 0,
        max_iter = data.iterazioni,
        f = data.f,
        a = data.a,
        b = data.b,
        x = (a + b) / 2,
        f_a = f(a),
        f_b = f(b),
        f_x = f(x),
        e = b - a;

    let esp_prima_cifra_significativa = (n) => {
        if (n < 0) n = -n;
        if (n === 0) return 0;
        //console.log("Ordine " + n + ": " + Math.floor(Math.log10(n)));
        return Math.floor(Math.log10(n));
    };

    let delta = (n) => {
        return Math.pow(10, esp_prima_cifra_significativa(n) - data.cifre_significative + 1);
    };
    let strPostfisso = ['neg', 'nul', 'pos'];

    /* passo 0 */
    data.iterata.push({});
    data.iterata[0].k = 0;
    data.iterata[0].a = a;
    data.iterata[0].delta_a = delta(a);
    data.iterata[0].b = b;
    data.iterata[0].delta_b = delta(b);
    data.iterata[0].x = x;
    data.iterata[0].delta_x = delta(x);
    [['a', 'sgn_fa', f_a, ], ['b', 'sgn_fb', f_b], ['x', 'sgn_fx', f_x]].forEach((terna) => {
        let segno = Math.sign(terna[2]);
        data.iterata[0][terna[1]] = segno;
        let proprieta = 'f' + terna[0] + '_' + strPostfisso[segno + 1];
        data.iterata[0][proprieta] = "=";
    });
    data.iterata[0].e = e;
    data.iterata[0].delta_e = delta(e);


    if (f_a * f_b > 0)
        return;
    for (k = 1; k < max_iter; k++) {
        if (Math.sign(f_a) == Math.sign(f_x)) {
            a = x;
            f_a = f_x;
        } else {
            b = x;
            f_b = f_x;
        }
        x = (a + b) / 2;
        f_x = f(x);
        data.iterata.push({
            k: k,
            a: a,
            delta_a: delta(a),
            b: b,
            delta_b: delta(b),
            x: x,
            delta_x: delta(x),
            e: b - a,
            delta_e: delta(e),
        });
        [['a', 'sgn_fa', f_a, ], ['b', 'sgn_fb', f_b], ['x', 'sgn_fx', f_x]].forEach((terna) => {
            let segno = Math.sign(terna[2]);
            data.iterata[k][terna[1]] = segno;
            let proprieta = 'f' + terna[0] + '_' + strPostfisso[segno + 1];
            data.iterata[k][proprieta] = "=";
        });
    }
    // console.log(data);
};

let main = () => {
    esercizi.forEach((esercizio) => {
        bisezione(esercizio);
        let templateCloze = process.argv[2];
        fs.readFile(templateCloze, 'utf-8', function (error, source) {
            var template = handlebars.compile(source);
            var html = template(esercizio);
            html = html.replace(/\s+}/g, '}');
            html = html.replace(/<[\//]*script.*>/g, '');
            // console.log(html)
            let file_name = esercizio.nome + '.txt';
            fs.writeFile(file_name, html, (err) => {
                if (err) throw err;
                console.log('The file ' + file_name + 'has been saved!');
            });
        });
    });
};

main();
