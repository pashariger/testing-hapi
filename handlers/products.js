'use strict';

const Boom = require('boom');
const _ = require('lodash');

// handlers are exported back for use in hapi routes
const Handlers = {};

// Lib contains our business specific logic
const Lib = {};

// our pretend database data
const ProductDatabase = [
    {
        id: 1,
        name: 'Shirt'
    },
    {
        id: 2,
        name: 'Pants'
    }
];

// a unit test-able function
Lib.getProducts = async (id) => {

    if (id) {
        const product = await _.find(ProductDatabase, (p) => {

            return p.id === id;
        });

        if (!product) {
            return null;
        }

        return product;
    }

    return ProductDatabase;
};

// hapi route handler
// only this function can call reply
Handlers.get = async (req, reply) => {
    //
    // Perform req processing & conversions for input here.
    //
    let id = null;

    if (req.params.id) {
        id = req.params.id;
    }

    const products = await Lib.getProducts(id);

    if (!products) {
        return Boom.notFound();
    }

    return { result: products };
};

module.exports = {
    handlers: Handlers,
    lib: Lib
};
