'use strict';

const server = require('../server.js');
const superagent = require('superagent');

describe('Testing the server', function() {
  afterAll((done) => {
    server.close(done);
  });

  describe('POST method to /echo endpoint', () => {

    test('should return a status code of 200', done => {
      superagent.post('localhost:3000/echo')
      .send({'name' : 'said'})
      .set('Content-Type','application/json')
      // short-hand to the one above // .type('json');
      .end((err, res) => {
        expect(err).toBeNull(); expect(res.status).toBe(200);
        done();
      });
    });

    test('should respond with  user input', done =>{
      superagent.post('localhost:3000/echo')
      .send({'name' : 'said'})
      .set('Conten-Type', 'application/json')
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res.body.name).toEqual('said');
        done();
      });
    });

    test('send without a value', done => {
      superagent.post('localhost:3000/echo')
      .send({'name' : 'said'})
      .set('Conten-Type', 'application/json')
      .end((err, res) => {
        expect(res.body.name).toBe('said');
        done();
      });
    });

    test('undefined endpoint', done => {
      superagent.post('localhost:3000/')
      .send({'name' : 'said'})
      .set('Conten-Type', 'application/json')
      .end((err, res) =>{
        expect(err).not.toBeNull();
        expect(res.status).toBe(404);
        done();
      });
    });
  });

  describe('GET method from /time end point', () => {

    test('should return a status code of 200', done =>{
      superagent.get('localhost:3000/time')
      .set('Conten-Type', 'application/json')
      .end((err, res) =>{
        expect(err).toBeNull();
        expect(res.status).toBe(200);
        done();
      });
    });

    test('should return with the correct date and time', done => {
      superagent.get('localhost:3000/time')
     .set('Conten-Type', 'application/json')
     .end((err, res) => {
       expect(err).toBeNull();
       expect(res.body).toHaveProperty('now');
       expect(res.body).toHaveProperty('date');
       done();
     });
    });

    test('undefined endpoint', done => {
      superagent.get('localhost:3000/')
      .set('Conten-Type', 'application/json')
      .end((err, res) =>{
        expect(err).not.toBeNull();
        expect(res.status).toBe(404);
        done();
      });
    });

  });
  
});
