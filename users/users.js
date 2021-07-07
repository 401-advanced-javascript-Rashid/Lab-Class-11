'use strict';

const Model = require('./user-model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let users = {} ;
users.save = async function (data){
  let search;
  if(await Model.read(data.name)){
    search =await Model.read(data.name)[0].name ;
  }
  if(!( search === data.name)){
    data.password = await bcrypt.hash(data.password , 10);
    await Model.create(data);
    return data ;
  } else {
    return data;
  }
};

users.generatorToken = async function(data){
  return await jwt.sign(data.name , 'SECRET') ;
};

users.basicAuth = async function(user , pass){
  if( await bcrypt.compare(pass , await Model.read(user)[0].password)) {
    return await Model.read(user)[0];
  } else {
    return Promise.reject ;
  }
};

users.showAll = async function(){
  return Model.read();
};

module.exports = users ;