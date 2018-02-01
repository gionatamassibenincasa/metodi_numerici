'use strict';

const assert = require('chai').assert;
const expect = require('chai').expect;
const polinomio = require('../polinomio');

describe('Agebra polinomi', () => {
    describe('"dividi"', () => {
        it('should export a function', () => {
            expect(polinomio.dividi).to.be.a('function');
        });
        it('dividi([1, 2, 3, 4, 5], [1]) should be [1, 2, 3, 4, 5]', () => {
            const a = [1, 2, 3, 4, 5];
            const b = [1];
            const c = [-1]
            const d = polinomio.nega(a);
            expect(polinomio.dividi(a, b).quoziente).to.deep.equal(a);
            expect(polinomio.dividi(a, b).resto).to.deep.equal([]);
            expect(polinomio.dividi(b, a).quoziente).to.deep.equal([]);
            expect(polinomio.dividi(a, c).quoziente).to.deep.equal(d);
        });
        it('dividi([1, 1], [-1, 1]) should be [-1, 0, 1]', () => {
            const a = [1, 1];
            const b = [-1, 1];
            const c = [-1, 0, 1];
            expect(polinomio.dividi(c, a).quoziente).to.deep.equal(b);
            expect(polinomio.dividi(c, a).resto).to.deep.equal([]);
        });
        it('dividi(q*d+r, d) should be q mod r', () => {
            const q = [5, 3, 1];
            const d = [3, 2, 1, 4];
            const r = [2, 5];
            const n = polinomio.aggiungi(polinomio.moltiplica(q, d), r);
            expect(polinomio.dividi(n, d).quoziente).to.deep.equal(q);
            expect(polinomio.dividi(n, d).resto).to.deep.equal(r);
        });
    });
})
