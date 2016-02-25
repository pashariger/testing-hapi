'use strict';

// requires for testing
const Code      = require('code');
const expect    = Code.expect;
const Lab       = require('lab');
const lab       = exports.lab = Lab.script();

// use some BDD verbage instead of lab default
const describe  = lab.describe;
const it        = lab.it;

// we require the handlers directly, so we can test the "Lib" functions in isolation
const ProductHandlers = require('../../handlers/products');

describe('unit tests - products', () => {

    it('should return all products', (done) => {

        // test lib function
        ProductHandlers.lib.getProducts().done((products) => {

            expect(products).to.be.an.array().and.have.length(2);

            done();
        }, (err) => {

            done(err);
        });
    });

    it('should return single product', (done) => {

        ProductHandlers.lib.getProducts(1).done((product) => {

            expect(product).to.be.an.object();

            done();
        }, (err) => {

            done(err);
        });
    });
});
