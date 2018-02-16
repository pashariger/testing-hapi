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

    it('should return all products', async () => {

        // test lib function
        const result = await ProductHandlers.lib.getProducts();

        expect(result).to.be.an.array().and.have.length(2);
    });

    it('should return single product', async () => {

        const result = await ProductHandlers.lib.getProducts(1);

        expect(result).to.be.an.object();
    });
});
