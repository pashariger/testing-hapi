'use strict'

// requires for testing
const Code      = require('code')
const expect    = Code.expect
const Lab       = require('lab')
const lab       = exports.lab = Lab.script()

// use some BDD verbage instead of lab default
const describe  = lab.describe
const it        = lab.it
const before    = lab.before
const after     = lab.after

// test-specific requires
const Promise         = require('promise')

// we require the handlers directly, so we can test the "Lib" functions in isolation
const ProductHandlers = require('../../handlers/products')

describe('unit tests - products', () => {
  it('should return all products', (done) => {
    // test lib function
    ProductHandlers.lib.getProducts().done(function(products) {
      Code.expect(products).to.be.an.array().and.have.length(2)

      done()
    }, function(err) {
      done(err)
    })
  })

  it('should return single product', (done) => {
    ProductHandlers.lib.getProducts(1).done(function(product) {
      Code.expect(product).to.be.an.object()

      done()
    }, function(err) {
      done(err)
    })
  })
})
