'use strict';
let User = require('../models/UserModel.js');

module.exports = {

  register: function(req, res, next) {
      User.create(req.body, function(err, result) {
        if(err) return res.status(500).send(err);
        let newUser = result.toObject();
        newUser.password = null;
        res.status(200).send(newUser);
      });
    },

    me: function(req, res, next) {
      if (!req.user) return res.status(401).send('current user not defined');
      req.user.adminNotes = null;
      req.user.password = null;
      return res.status(200).send(req.user);
    },

    update: function(req, res, next) {
      User.findByIdAndUpdate(req.params._id, req.body, function(err, result) {
        if (err) next(err);
        res.status(200).send('user updated');
      });
    },

    read: function(req, res, next) {
      User.find({}, function(err, response) {
        if (err) {
          return res.status(500).send(err);
        } else {
          for (var i = 0; i < response.length; i++) {
            response[i].password = null;
          }
        }
        res.status(200).send(response);
      });
    },

    pending: function(req, res, next) {
      User.find({}, function(err, response) {
        if (err) {
          return res.status(500).send(err);
        } else {
          for (let i = response.length-1; i >= 0; i--) {

            response[i].password = null;

            if (response[i].cohortID.length !== 0) {
              response.splice(i, 1);
            }
          }
        }
        res.status(200).send(response);
      });
    },

    setCohortId: (req, res, next) => {
      User.findByIdAndUpdate(req.body._id, req.body, (err, response) => {
        if (err) {
          return res.status(500).send(err);
        } else {
          res.status(200).send(response);
        }
      })
    },

    delete: function(request, response, next) {
        User.findByIdAndRemove(request.params.id, function(error, serverResponse) {
            if (error) {
                return response.status(500).send(error);
            }
            else {
                response.status(200).send(serverResponse);
            }
        });
    },

};
