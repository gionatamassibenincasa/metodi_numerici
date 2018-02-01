'use strict';

const assert = require('chai').assert;
const expect = require('chai').expect;
const polinomio = require('../polinomio');

describe('Grado di un polinomio', () => {
    describe('"grado"', () => {
        it('should export a function', () => {
            expect(polinomio.grado).to.be.a('function');
        });
        it('grado([]) should be -Infinity', () => {
            expect(polinomio.grado([])).to.equal(-polinomio.INF);
        });
        it('grado([0, 0, 0]) should be []', () => {
            expect(polinomio.grado([0, 0, 0])).to.equal(-polinomio.INF);
        });
        it('grado(new Array(10)) should be []', () => {
            expect(polinomio.grado(new Array(10))).to.equal(-polinomio.INF);
        });
        it('grado([1, 1, 1]) should be 2', () => {
            const a = [1, 1, 1];
            expect(polinomio.grado(a)).to.equal(2);
        });
        it('grado([1, 2, 3, 4, 5, 0, 0, ]) should be 4', () => {
            const a = [1, 2, 3, 4, 5, 0, 0, ];
            expect(polinomio.grado(a)).to.deep.equal(4);
        });
    })
})
