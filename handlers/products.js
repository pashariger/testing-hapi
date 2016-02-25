'use strict';

const Promise = require('promise');
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
Lib.getProducts = function getProducts(id) {

    return new Promise((resolve, reject) => {

        // if id passed, fetch single item
        if (id) {
            return resolve(_.find(ProductDatabase, (p) => {

                return p.id === id;
            }));
        }
        // in other cases fetch all items
        resolve(ProductDatabase);
    });
};

// hapi route handler
// only this function can call reply
Handlers.get = function get(req, reply) {
    //
    // Perform req processing & conversions for input here.
    //
    let id = null;

    if (req.params.id) {
        id = req.params.id;
    }

    // call business function
    Lib.getProducts(id).done((products) => {
        // api success
        reply({ result: products }).code(200);
    }, (err) => {
        // api error
        reply(err).code(400);
    });
};

module.exports = {
    handlers: Handlers,
    // we only export lib for tests
    lib:      (process.env.NODE_ENV === 'test') ? Lib : null
};
