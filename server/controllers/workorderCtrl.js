'use strict';
let Workorder = require('../models/WorkorderModel.js');

module.exports = {

  create: function(req, res, next) {
    Workorder.create(req.body, function (err, response) {
      if(err) return res.status(500).send(err);
      res.status(200).send(response);
    });
  },

  read: function(req, res, next) {
    Workorder.find(req.query, function (err, response) {
      if(err) { res.status(500).send(err)
      } else {
        res.status(200).send(response);
      }
    });
  },

  readById: function(req, res, next) {
    Workorder.findById(req.params.id, function (err, response) {
      if(err) { res.status(500).send(err)
      } else {
        res.send(response)
      }
    });
  },

  pending: function(req, res, next) {
    Workorder.find(req.query, function(err, response) {
      if (err) {
        return res.status(500).send(err);
      } else {
        for (let i = response.length-1; i >= 0; i--) {
          if (response[i].status !== 'pending') {
            response.splice(i, 1);
          }
        }
        res.status(200).send(response);
      }
    });
  },

  update: function(req, res, next) {
    Workorder.findByIdAndUpdate(req.params.id, req.body, function(err, response) {
      if(err) {res.status(500).send(err)
      } else {
      res.status(200).send(response);
    }
    });
  },

  delete: function(req, res, next) {
    Workorder.findByIdAndRemove(req.params.id, function (err, response) {
      if(err) {
        res.status(500).send(err)
      } else {
          console.log('Deleted Work Order');
          res.send(response)
      }
    });
  }

};
