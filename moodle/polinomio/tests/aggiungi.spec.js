'use strict';

const assert = require('chai').assert;
const expect = require('chai').expect;
const polinomio = require('../polinomio');

describe('Agebra polinomi', () => {
    describe('"aggiungi"', () => {
        it('should export a function', () => {
            expect(polinomio.aggiungi).to.be.a('function');
        });
        it('aggiungi([], []) should be []', () => {
            const e = [];
            expect(polinomio.aggiungi(e, e)).to.deep.equal(e);
        });
        it('aggiungi([1, 1, 1], []) should be [1, 1, 1]', () => {
            const a = [1, 1, 1];
            const empty = [];
            expect(polinomio.aggiungi(a, empty)).to.deep.equal(a);
            expect(polinomio.aggiungi(empty, a)).to.deep.equal(a);
        });
        it('aggiungi([1, 2, 3, 4, 5], [-5, -4, -3, -2, -1]) should be [-4, -2, 0, 2, 4]', () => {
            const a = [1, 2, 3, 4, 5, ];
            const b = [-5, -4, -3, -2, -1];
            const c = [-4, -2, 0, 2, 4];
            expect(polinomio.aggiungi(a, b)).to.deep.equal(c);
            expect(polinomio.aggiungi(b, a)).to.deep.equal(c);
        });
        it('aggiungi([1, 2, 3, 4, 5, 6, 7, 8, 9], [8, 7, 6, 5, 4, 3, 2, 1]) should be [9, 9, 9, ..., 9]', () => {
            const a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            const b = [8, 7, 6, 5, 4, 3, 2, 1];
            const c = [9, 9, 9, 9, 9, 9, 9, 9, 9];
            expect(polinomio.aggiungi(a, b)).to.deep.equal(c);
            expect(polinomio.aggiungi(b, a)).to.deep.equal(c);
        });
    })
})
