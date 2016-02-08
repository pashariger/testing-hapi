'use strict'

// requires for testing
const Code        = require('code')
const Lab         = require('lab')
const lab         = exports.lab = Lab.script()
const describe    = lab.describe
const it          = lab.it
const before      = lab.before
const after       = lab.after
const expect      = Code.expect

// test specific requires
const Promise     = require('promise')
const request     = require('request-promise')

const server = require('../../app.js')

// tests
describe('functional tests - products', () => {
  it('should get products', (done) => {
    // make API call to self to test functionality end-to-end
    server.inject({
      method: "GET",
      url: "/api/products"
    }, (response) => {
      Code.expect(response.statusCode).to.equal(200)
      Code.expect(response.result.result).to.have.length(2)
      done()
    })
  })

  it('should get single product', (done) => {
    server.inject({
      method: "GET",
      url: "/api/products/1"
    }, (response) => {
      Code.expect(response.statusCode).to.equal(200)
      done()
    })
  })

  after((done) => {
    // placeholder to do something post tests
    done()
  })
})

describe('functional tests - get documentation', () => {
  it('should return documentation html', (done) => {
    // make API call to self to test functionality end-to-end
    server.inject({
      method: "GET",
      url: "/"
    }, (response) => {
      Code.expect(response.statusCode).to.equal(200)
      Code.expect(response.result).to.be.a.string()
      done()
    })
  })

  after((done) => {
    // placeholder to do something post tests
    done()
  })
})
