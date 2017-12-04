'use strict';

const http = require('http');
const url = require('url');
const queryString = require('querystring');
const PORT = process.env.PORT || 3000;

const bodyParser = function(req, callback) {
  if(req.method === 'POST' || req.method === 'PUT') {
    let reqBody = '';
    req.on('data', buffer => {
      reqBody = buffer.toString();
    });
    req.on('end', () =>  callback(null, reqBody));
    // req.on('error', err => callback(arr)); // long-hand for below
    req.on('error', callback);
  } else {
    callback(null, '{}');
  }
};

const server = module.exports = http.createServer((req, res) => {

  console.log('the url pre parse', req.url);
  req.url = url.parse(req.url);
  console.log('the url post parse', req.url);

  console.log('the url query pre parse', req.url.query);
  req.url.query = queryString.parse(req.url.query);
  console.log('the url query post parse', req.url.query);

  bodyParser(req, (err, reqBody) => {
    if(err) {
      res.writeHead(500);
      res.end();
      return;
    }

    // try{
    //   res.reqBody =JSON.pars(reqBody);
    // } catch(e) {
    //   console.log('you got an error: 400');
    //   res.writeHead(400);
    //   res.end();
    //   return;
    // }

    if(req.method === 'GET' && req.url.pathname === '/time') {
      res.writeHead(200, {
        'Content-Type' : 'application/json',
      });

      res.write(JSON.stringify({
        now: Date.now(),
        date: new Date(),
      }));
      res.end();
      return;
    }

    if(req.method === 'POST' && req.url.pathname === '/echo') {
      res.writeHead(200 , {
        'Content-Type' : 'application/json',
      });
      console.log(req.reqBody);
      res.write(JSON.stringify(req.reqBody));
      res.end();
      return;
    }
  });
  res.writeHead(404);
  res.end();



});

server.listen(PORT, () => console.log(`estinening on port: ${PORT}`));

//server.listen(PORT, () => console.log('estinening on port:' + PORT)); // same as the one above
