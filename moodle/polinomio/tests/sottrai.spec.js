'use strict';

const assert = require('chai').assert;
const expect = require('chai').expect;
const polinomio = require('../polinomio');

describe('Agebra polinomi', () => {
    describe('"sottrai"', () => {
        it('should export a function', () => {
            expect(polinomio.sottrai).to.be.a('function');
        });
        it('sottrai([], []) should be []', () => {
            const e = [];
            expect(polinomio.sottrai(e, e)).to.deep.equal(e);
        });
        it('sottrai([1, 1, 1], []) should be [1, 1, 1]', () => {
            const a = [1, 1, 1];
            const empty = [];
            expect(polinomio.sottrai(a, empty)).to.deep.equal(a);
            expect(polinomio.sottrai(empty, a)).to.deep.equal(polinomio.nega(a));
        });
        it('sottrai([1, 2, 3, 4, 5], [-5, -4, -3, -2, -1]) should be [6, 6, 6, 6, 6]', () => {
            const a = [1, 2, 3, 4, 5, ];
            const b = [-5, -4, -3, -2, -1];
            const c = [6, 6, 6, 6, 6];
            const d = [-6, -6, -6, -6, -6];
            expect(polinomio.sottrai(a, b)).to.deep.equal(c);
            expect(polinomio.sottrai(b, a)).to.deep.equal(d);
        });
    })
})
