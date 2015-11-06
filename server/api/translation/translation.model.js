'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TranslationSchema = new Schema({
  file: String,
  translation: String,
  validated: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Translation', TranslationSchema);
