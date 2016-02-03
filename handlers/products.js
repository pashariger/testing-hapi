'use strict'

const Promise = require('promise')
const _       = require('lodash')

const Handlers = {}
const Lib = {}

const ProductDatabase = [
  {
    id: 1,
    name: 'Shirt'
  },
  {
    id: 2,
    name: 'Pants'
  }
]

Lib.getProducts = function(id) {
  return new Promise((resolve, reject) => {
    if (id) {
      resolve(_.find(ProductDatabase, (p) => {
        return p.id === id
      }))

      return
    }
    resolve(ProductDatabase)
  })
}

Handlers.get = function get(req, reply) {
  //
  // Perform req processing & conversions here.
  //
  let id = null

  if (req.params.id) id = req.params.id

  Lib.getProducts(id).done((products) => {
    reply({
      result: products
    }).code(200)
  }, (err) => {
    reply(err).code(400)
  })
}

module.exports = {
  handlers: Handlers,
  lib:      (process.env.NODE_ENV === 'test') ? Lib : null
}
