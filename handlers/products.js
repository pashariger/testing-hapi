'use strict'

const Promise = require('promise')
const _       = require('lodash')

let Handlers = {}
let Lib = {}

const ProductDatabase = [
  {
    id: 1,
    name: "Shirt"
  },
  {
    id: 2,
    name: "Pants"
  }
]

Lib.getProducts = function (id) {
  return new Promise(function(resolve, reject) {
    if (id) return resolve(_.find(ProductDatabase, function(p){ return p.id === id }))
    
    resolve(ProductDatabase)
  })
}

Handlers.get = function get(req, reply) {
  //
  // Perform req processing & conversions here.
  //
  var id = null

  if (req.params.id) id = req.params.id

  Lib.getProducts(id).done(function(products) {
    reply({
      result: products
    }).code(200)
  }, function(err) {
    reply(err).code(400)
  })
}

module.exports = {
  handlers: Handlers,
  lib:      (process.env.NODE_ENV === 'test') ? Lib : null
}
