'use strict';

const express = require('express');

const user = require('./users/users.js');
const auth = require('./auth-middleware.js');

const router = express.Router();

router.post('/signup' , signUp);
router.post('/signin' , auth, signIn);
router.get('/getall' , getAllUsers);

function signUp(req , res){
  return user.save(req.body)
    .then(data => {
      let generat = user.generatorToken(data);
      return generat;
    })
    .then(data => {
      const resSend = `Done : ${data}`;
      res.status(200).send(resSend);
    });
}

function signIn (req , res){
  let token = req.token;
  res.status(200).send(token);
}

async function getAllUsers (req , res){
  res.status(200).json( await user.showAll() );
}

module.exports= router ;
  