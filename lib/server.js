'use strict' ;

const routers = require('../routers.js');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const server = express();
server.use(morgan('dev'));
server.use(cors());
server.use(routers);
server.use(errorHandler);


const timeStamp = (req, res, next) => {
  req.requestTime = new Date();
  if (Date.now) { 
    Date.now = function() { 
      return new Date().getTime(); },
    console.log('The Time:' , req.requestTime.toString());
    next();
  }};

server.use(express.json());
server.use(timeStamp);


function notFoundHandler(req, res, next) {
  res.status(404);
  res.statusMessage = 'Not Found!';
  res.json({ error: 'Not Found'});
}

server.get('/crash-error', (req, res) => {
  throw new Error('Error');
});

function errorHandler(err, req, res, next) {
  res.status(500);
  res.statusMessage = 'Generic Server Error!';
  res.json({ error: err });
}

server.get('/test-error' , (req , res , next) => {
  throw errorHandler();
});

server.get('*' , notFoundHandler);

module.exports = {
  server: server,
  start: port => {
    let PORT = port || process.env.PORT || 3000;
    server.listen(PORT, () => console.log(`listening on ${PORT}`));
  },

};