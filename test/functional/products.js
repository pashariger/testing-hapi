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

const API_BASE_PATH = 'http://localhost:' + (process.env.PORT || 3000)

// tests
describe('functional tests - products', () => {

  before((done) => {
    // start the server and set env before running tests.
    require('../../app')

    // wait a bit for server to start
    setTimeout(function(){
      done()
    },500)
  })

  it('should get products', (done) => {
    // make API call to self to test functionality end-to-end
    request({
      method: 'GET',
      uri: API_BASE_PATH + '/api/products',
      json: true,
      timeout: 3000
    }).then(function(body) {
      done()
    }).catch(function(err) {
      done(err)
    })
  })

  it('should get single product', (done) => {
    request({
      method: 'GET',
      uri: API_BASE_PATH + '/api/products/1',
      json: true,
      timeout: 3000
    }).then(function(body) {
      done()
    }).catch(function(err) {
      done(err)
    })
  })

  after((done) => {
    // placeholder to do something post tests
    done()
  })
})
