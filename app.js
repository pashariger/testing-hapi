'use strict';

const Hapi        = require('hapi');
const Inert       = require('inert');
const Vision      = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack        = require('./package.json');
const Fs          = require('fs');
const _           = require('lodash');

const server = new Hapi.Server({
    host: 'localhost',
    port: process.env.PORT
});

(async () => {

    const HapiSwaggerConfig = {
        plugin: HapiSwagger,
        options: {
            info: {
                title: Pack.name,
                description: Pack.description,
                version: Pack.version
            },
            swaggerUI: true,
            basePath: '/',
            pathPrefixSize: 2,
            jsonPath: '/docs/swagger.json',
            sortPaths: 'path-method',
            lang: 'en',
            tags: [
                { name: 'api' }
            ],
            documentationPath: '/',
            securityDefinitions: {}
        }
    };

    /* register plugins */
    await server.register([
        Inert,
        Vision,
        HapiSwaggerConfig
    ]);

    // require routes
    Fs.readdirSync('routes').forEach((file) => {

        _.each(require('./routes/' + file), (routes) => {

            server.route(routes);
        });
    });

    await server.start();

    console.log('Server running at:', server.info.uri);
})();

module.exports = server;
