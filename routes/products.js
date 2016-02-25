'use strict';

const Joi           = require('joi');
const Handlers      = require('../handlers/products');
const SCHEMAS       = require('../lib/schemas');

const API_BASE_PATH = '/api/products';

const routes = [];

// GET /api/products
routes.push({
    method: 'GET',
    path: API_BASE_PATH,
    config: {
        auth: false,
        handler: Handlers.handlers.get,
        description: 'get products',
        notes: 'This endpoint allows for the retrieval of products.',
        plugins: {
            'hapi-swagger': {
                responses: {
                    '200': { description: 'Success', schema: Joi.object({
                        result: Joi.array().items(SCHEMAS.Product)
                    }).label('Response') },
                    '400': { description: 'Bad Request', schema: SCHEMAS.Error }
                },
                security: {}
            }
        },
        tags: ['api'],
        validate: {
            query: {
            }
        },
        response: {
            schema: Joi.object({
                result: Joi.array().items(SCHEMAS.Product)
            }).label('Response')
        }
    }
});

// GET /api/products/{id}
routes.push({
    method: 'GET',
    path: API_BASE_PATH + '/{id}',
    config: {
        auth: false,
        handler: Handlers.handlers.get,
        description: 'get product by id',
        notes: 'This endpoint allows for the retrieval of products.',
        plugins: {
            'hapi-swagger': {
                responses: {
                    '200': { description: 'Success', schema: Joi.object({
                        result: SCHEMAS.Product
                    }).label('Response') },
                    '400': { description: 'Bad Request', schema: SCHEMAS.Error }
                },
                security: {}
            }
        },
        tags: ['api'],
        validate: {
            params: {
                id: Joi.number().required()
            }
        },
        response: {
            schema: Joi.object({
                result: SCHEMAS.Product
            }).label('Response')
        }
    }
});

module.exports = routes;
