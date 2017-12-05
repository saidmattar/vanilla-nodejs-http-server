'use strict';

const server = require('../server.js');
const superagent = require('superagent');

describe('Testing the server', function() {
  afterAll((done) => {
    server.close(done);
  });

  describe('POST method to /echo endpoint', () => {

    test('should return a status code of 200', done => {

    });

    test('should respond with  user input', done =>{

    });

    test('send without a value', done => {

    });

    test('undefined endpoint', done => {

    });
  });

  describe('GET method from /time end point', () => {

    test('should return a status code of 200', done =>{

    });

    test('should return with the correct date and time', done => {

    });

    test('undefined endpoint', done => {

    });

  });
});
