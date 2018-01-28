'use strict';

const assert = require('chai').assert;
const expect = require('chai').expect;
const polinomio = require('../polinomio');

describe('Derivata polinomio', () => {
    describe('"deriva"', () => {
        it('should export a function', () => {
            expect(polinomio.deriva).to.be.a('function');
        });
        it('p\' = ...', () => {
            let c = [0, 1, 2, 3, 4, 5];
            expect(polinomio.deriva(c)).to.deep.equal([1, 4, 9, 16, 25]);
        });
    })
})
