const manage = require('express').Router();
// const passport = require('passport');
// const session = require("express-session");
// const passportLocalMongoose = require('passport-local-mongoose');

let admin = require('../models/usermodel');

manage.route("/allusers")
.get(function(req, res){
  admin.find(function(err, foundUsers){
    if (!err) {
        // res.setHeader('Content-Type', 'application/json');
        // res.send(JSON.stringify( foundUsers , null, 3));
        res.json(foundUsers);
    } else {
      res.send(err);
    }
  });
});

manage.route("/allusersDel")
.post(function(req, res){
  const login = req.body.login;
    admin.findOneAndDelete(
      {login: login},
      function(err, user){
        if (!err){
          // res.send("Successfully deleted the corresponding user.");
          console.log("deleted user: ", user);
          res.redirect('back');
        } else {
          res.send(err);
        }
      }
    );
  });

  manage.route("/userPosition")
  .post(function(req,res){
    const login = req.body.login;
    const position = req.body.position;
    admin.findOneAndUpdate({login: login}, {position: position}, function(err, posit){
      if(!err){
          console.log("position changed for: ", login, ", from: ", position, " to: ", posit);
          res.redirect('back');
      } else {
          res.send(err);
      }
  });
  });

module.exports = manage;


