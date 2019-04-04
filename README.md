# testing-hapi

[![Build Status](https://travis-ci.org/pashariger/testing-hapi.svg?branch=master)](https://travis-ci.org/pashariger/testing-hapi) [![Code Climate](https://codeclimate.com/github/pashariger/testing-hapi/badges/gpa.svg)](https://codeclimate.com/github/pashariger/testing-hapi)

Example Hapi-backed API Server with testing, CI, and Swagger documentation generator.

Updated and tested with latest hapi packages as of 1/16/2018.

## How to run
Requires Node v8.12.0+
```sh
  yarn install #install dependencies
  yarn start # start server
  yarn test # run tests
```

## Details

- Notable npms
  - [hapi](https://github.com/hapijs/hapi), [joi](https://github.com/hapijs/joi)
    - `hapi` is a popular web/services nodejs framework. It is strict about routing and validation out of the box and has a mature plugin/extension system. I've used `express` for a long time, but since trying `hapi`, I haven't really looked back. On the surface the two frameworks look similar. In my experience though, I found that `hapi` managed to scale much better with increasing complexity and made it easier to test, debug, and write better code.
    - `joi` is an awesome schema/object definition and validation library. This project uses it to enforce API input/output validation and generate documentation.
  - [hapi-swagger](https://github.com/glennjones/hapi-swagger)
    - [Swagger](http://swagger.io/) is an API framework and standard. `hapi-swagger` is a hapi plugin that generates awesome interactive API documentation & UI right from our code API definitions. I gotta say... it's really nice to keep everything in one place.
  - [lab](https://github.com/hapijs/lab)
    - `lab` is hapi's version of mocha. It's a test runner, nicely packaged with a linter and code-coverage reporter. Nothing you wouldn't expect here. (Unless you've never written tests)
- Testing
  - Unit Tests (`/test/unit/*`)
    - Functions containing business logic are defined in isolation from the framework making them testable without a running server
  - Functional Tests (`test/functional/*`)
    - These tests are meant to target the API endpoints, covering functionality end-to-end.
    - We should try to write these tests in a way that they become easily exportable to run automatically via tools like [New Relic Synthetics](http://newrelic.com/sp/synthetics)
  - ESLint
    - `lab` also includes a linter (eslint by default), which is executed when tests run. The default configuration can be customized via the `.eslintrc.json` file.
  - Code Coverage
    - `lab` analyzes the code and returns the code coverage ratio when running the test. It also points out which lines of code are missing coverage. A nice reminder to write tests for any newly added functionality.
- Documentation
  - `hapi-swagger` is configured in `app.js` and generates a very nice html page with an interactive Swagger compatible API.
  - Once your server is running locally, visit [http://localhost:3000](http://localhost:3000) to check out the docs.
  - My typical workflow is to write the documentation first (by setting up the hapi routing #2BirdsWith1Stone), then to write the functional tests, then a combination of code and unit tests ala [TDD](http://www.jamesshore.com/Blog/Red-Green-Refactor.html) until I'm satisfied with the results.

- CI
  - This repo also integrates [TravisCI](https://travis-ci.org/), which runs the tests defined above on every pull request, blocking a merge if the test does not pass. Not very useful for a one person project, but crucial when a team of developers is involved.

## TODO
  * add stubbing framework to imitate external service calls.
  * Figure out an easy way to test multiple hapi services together, in a microservice environment.
