const manage = require('express').Router();
// const passport = require('passport');
// const session = require("express-session");
// const passportLocalMongoose = require('passport-local-mongoose');

let admin = require('../models/usermodel');

manage.route("/allusers")
.get(function(req, res){
  admin.find(function(err, foundUsers){
    if (!err) {
      res.send(foundUsers);
    } else {
      res.send(err);
    }
  });
});

manage.route("/allusersDel")
.delete(function(req, res){

    admin.deleteOne(
      {title: req.params.login},
      function(err){
        if (!err){
          res.send("Successfully deleted the corresponding user.");
        } else {
          res.send(err);
        }
      }
    );
  });

module.exports = manage;


