'use strict'

const Hapi        = require('hapi')
const Inert       = require('inert')
const Vision      = require('vision')
const HapiSwagger = require('hapi-swagger')
const Pack        = require('./Package')
const Joi         = require('joi')
const fs          = require('fs')
const _           = require('lodash')

const server = new Hapi.Server()
server.connection({
  host: 'localhost',
  port: process.env.PORT || 3000
})

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
        { name: 'api' },
        { name: 'health' },
        { name: 'lsq' }
      ],
      documentationPath: '/',
      securityDefinitions: []
    }
  }],
(err) => {
  if (err) throw err

  // require routes
  fs.readdirSync('routes').forEach(function(file){
    _.each(require('./routes/' + file),function(routes){
      server.route(routes)
    })
  })

  if (process.env.NODE_ENV === 'unit-test') return
  
  server.start((err) => {
    if (err) console.log(err)
    console.log('Server running at:', server.info.uri)
  })
})
