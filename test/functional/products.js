'use strict';

// requires for testing
const Code        = require('code');
const Lab         = require('lab');

const expect      = Code.expect;
const lab         = exports.lab = Lab.script();

// use some BDD verbage instead of lab default
const describe    = lab.describe;
const it          = lab.it;
const after       = lab.after;

// require hapi server
const Server = require('../../app.js');

// tests
describe('functional tests - products', () => {

    it('should get products', async () => {

        // make API call to self to test functionality end-to-end
        const response = await Server.inject({
            method: 'GET',
            url: '/api/products'
        });

        expect(response.statusCode).to.equal(200);
        expect(response.result.result).to.have.length(2);
    });

    it('should get single product', async () => {

        const response = await Server.inject({
            method: 'GET',
            url: '/api/products/1'
        });

        expect(response.statusCode).to.equal(200);
    });

    it('should return error for invalid id', async () => {

        const response = await Server.inject({
            method: 'GET',
            url: '/api/products/5'
        });

        expect(response.statusCode).to.equal(404);
    });

    it('should return error for invalid id format (validation test)', async () => {

        const response = await Server.inject({
            method: 'GET',
            url: '/api/products/INVLAID_ID_FORMAT'
        });

        expect(response.statusCode).to.equal(400);
    });

    after(async () => {
        // placeholder to do something post tests
    });
});

describe('functional tests - get documentation', () => {

    it('should return documentation html', async () => {

        // make API call to self to test functionality end-to-end
        const response = await Server.inject({
            method: 'GET',
            url: '/'
        });

        expect(response.statusCode).to.equal(200);
        expect(response.result).to.be.a.string();
    });

    after(async () => {
        // placeholder to do something post tests
    });
});
