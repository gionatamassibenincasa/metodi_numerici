'use strict';

const assert = require('chai').assert;
const expect = require('chai').expect;
const polinomio = require('../polinomio');

describe('Riduci l\'array che rappresenta un polinomio', () => {
    describe('"riduci"', () => {
        it('should export a function', () => {
            expect(polinomio.riduci).to.be.a('function');
        });
        it('riduci([]) should be []', () => {
            const e = [];
            expect(polinomio.riduci(e)).to.deep.equal(e);
        });
        it('riduci([0, 0, 0]) should be []', () => {
            const e = [];
            expect(polinomio.riduci([0, 0, 0])).to.deep.equal(e);
        });
        it('riduci(new Array(10)) should be []', () => {
            const e = [];
            expect(polinomio.riduci(new Array(10))).to.deep.equal(e);
        });
        it('riduci([1, 1, 1]) should be [1, 1, 1]', () => {
            const a = [1, 1, 1];
            expect(polinomio.riduci(a)).to.deep.equal(a);
        });
        it('riduci([1, 2, 3, 4, 5, 0, 0, ]) should be [1, 2, 3, 4, 5]', () => {
            const a = [1, 2, 3, 4, 5, 0, 0, ];
            const b = [1, 2, 3, 4, 5];
            expect(polinomio.riduci(a)).to.deep.equal(b);
        });
    })
})
