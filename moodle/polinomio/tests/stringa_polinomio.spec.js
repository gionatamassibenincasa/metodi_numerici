'use strict';

const assert = require('chai').assert;
const expect = require('chai').expect;
const polinomio = require('../polinomio');

describe('Scrittura di polinomi TeX-compatibile', () => {
    describe('"stringa"', () => {
        it('should export a function', () => {
            expect(polinomio.stringa).to.be.a('function');
        });
        it('stringa([]) should be 0', () => {
            expect(polinomio.stringa([])).to.equal('0');
        });
        it('stringa([1]) should be \'1\'', () => {
            expect(polinomio.stringa([1])).to.equal('1');
        });
        it('stringa([1, 1, 1]) should be \'x^2 + x + 1\'', () => {
            expect(polinomio.stringa([1, 1, 1])).to.equal('x^2 + x + 1');
        });
        it('stringa([1, -1, 2]) should be \'2 x^2 - x + 1\'', () => {
            const cp = [1, -1, 2];
            let p = [].concat(cp);
            expect(polinomio.stringa(p)).to.equal('2 x^2 - x + 1');
            expect(p).to.deep.equal(cp);
        });
        it('stringa([1, -1, -2], \'f(x) = \') should be \'f(x) = -2 x^2 - x + 1\'', () => {
            const cp = [1, -1, -2];
            expect(polinomio.stringa(cp, 'f(x) = ')).to.equal('f(x) = -2 x^2 - x + 1');
        });
        it('stringa([5, 4, 3, 2, 1]) should be \'x^4 + 2 x^3 + 3 x^2 + 4 x + 5\'', () => {
            expect(polinomio.stringa([5, 4, 3, 2, 1], '')).to.equal('x^4 + 2 x^3 + 3 x^2 + 4 x + 5');
        });
        it('stringa([1, 0, 1]) should be \'x^2 + 1\'', () => {
            expect(polinomio.stringa([1, 0, 1])).to.equal('x^2 + 1');
        });
        it('stringa([0, -1]) should be \'-x\'', () => {
            expect(polinomio.stringa([0, -1])).to.equal('-x');
        });
    })
})
