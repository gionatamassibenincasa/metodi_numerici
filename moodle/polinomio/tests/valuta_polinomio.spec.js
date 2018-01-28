'use strict'

const assert = require('chai').assert;
const expect = require('chai').expect;
const polinomio = require('../polinomio');

describe('Valuta polinomio', () => {
    describe('"valuta"', () => {
        it('should export a function', () => {
            expect(polinomio.valuta).to.be.a('function');
        });
        it('p(0) = c[0]', () => {
            let c = [0, 1, 2, 3, 4, 5];
            expect(polinomio.valuta(c)(0)).to.equal(0);
        });
        it('p(1) = \sum_i=0^n c[i]', () => {
            let c = [0, 1, 2, 3, 4, 5];
            expect(polinomio.valuta(c)(1)).to.equal(c.reduce((sum, x) => sum + x));
        });
    })
})
