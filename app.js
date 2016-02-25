'use strict';

const Hapi        = require('hapi');
const Inert       = require('inert');
const Vision      = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack        = require('./package.json');
const Fs          = require('fs');
const _           = require('lodash');

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: process.env.PORT || 3000
});

// register server components. We use swagger to generate service documentation
server.register([
    Inert,
    Vision,
    {
        'register': HapiSwagger,
        'options': {
            info: {
                title: Pack.name,
                description: Pack.description,
                version: Pack.version
            },
            enableDocumentation: true,
            basePath: '/',
            pathPrefixSize: 2,
            jsonPath: '/docs/swagger.json',
            sortPaths: 'path-method',
            lang: 'en',
            tags: [
                { name: 'api' }
            ],
            documentationPath: '/',
            securityDefinitions: []
        }
    }],
(err) => {

    if (err) {
        throw err;
    }

    // require routes
    Fs.readdirSync('routes').forEach((file) => {

        _.each(require('./routes/' + file), (routes) => {

            server.route(routes);
        });
    });

    server.start((err) => {

        if (err) {
            console.log(err);
        }

        console.log('Server running at:', server.info.uri);
    });
});

module.exports = server;
