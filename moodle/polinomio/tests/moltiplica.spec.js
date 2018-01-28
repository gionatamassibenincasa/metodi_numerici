'use strict';

const assert = require('chai').assert;
const expect = require('chai').expect;
const polinomio = require('../polinomio');

describe('Agebra polinomi', () => {
    describe('"moltiplica"', () => {
        it('should export a function', () => {
            expect(polinomio.moltiplica).to.be.a('function');
        });
        it('moltiplica([], []) should be []', () => {
            const e = [];
            expect(polinomio.moltiplica(e, e)).to.deep.equal(e);
        });
        it('moltiplica([1, 1, 1], []) should be []', () => {
            const a = [1, 1, 1];
            const empty = [];
            expect(polinomio.moltiplica(a, empty)).to.deep.equal(empty);
            expect(polinomio.moltiplica(empty, a)).to.deep.equal(empty);
        });
        it('moltiplica([1, 2, 3, 4, 5], [1]) should be [1, 2, 3, 4, 5]', () => {
            const a = [1, 2, 3, 4, 5, ];
            const b = [1];
            const c = [-1]
            const d = polinomio.nega(a);
            expect(polinomio.moltiplica(a, b)).to.deep.equal(a);
            expect(polinomio.moltiplica(b, a)).to.deep.equal(a);
            expect(polinomio.moltiplica(a, c)).to.deep.equal(d);
            expect(polinomio.moltiplica(c, a)).to.deep.equal(d);
        });
        it('moltiplica([1, 1], [-1, 1]) should be [-1, 0, 1]', () => {
            const a = [1, 1];
            const b = [-1, 1];
            const c = [-1, 0, 1];
            expect(polinomio.moltiplica(a, b)).to.deep.equal(c);
        });
    })
})
