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

// Functional test specific requirements
const Promise     = require('promise')
const request     = require('request-promise')

const API_BASE_PATH = 'http://localhost:' + (process.env.PORT || 3000)

// tests
describe('functional tests - products', () => {
  before((done) => {
    process.env.NODE_ENV = 'test'
    require('../../app')
    setTimeout(function(){
      done()
    },500)
  })

  it('should get products', (done) => {
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
    done()
  })
})
