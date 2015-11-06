'use strict';

var _ = require('lodash');
var Translation = require('./translation.model');

// Get list of translations
exports.index = function(req, res) {
  Translation.find({}, {}, { sort: { date: -1 } }, function (err, translations) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(translations);
  });
};

// Get a single translation
exports.show = function(req, res) {
  Translation.findById(req.params.id, function (err, translation) {
    if(err) { return handleError(res, err); }
    if(!translation) { return res.status(404).send('Not Found'); }
    return res.json(translation);
  });
};

// Creates a new translation in the DB.
exports.create = function(req, res) {
  Translation.create(req.body, function(err, translation) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(translation);
  });
};

// Updates an existing translation in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Translation.findById(req.params.id, function (err, translation) {
    if (err) { return handleError(res, err); }
    if(!translation) { return res.status(404).send('Not Found'); }
    var updated = _.merge(translation, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(translation);
    });
  });
};

// Deletes a translation from the DB.
exports.destroy = function(req, res) {
  Translation.findById(req.params.id, function (err, translation) {
    if(err) { return handleError(res, err); }
    if(!translation) { return res.status(404).send('Not Found'); }
    translation.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
