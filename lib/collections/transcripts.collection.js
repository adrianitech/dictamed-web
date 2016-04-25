Transcripts = new Mongo.Collection('transcripts');

var Schemas = {};

Schemas.Transcript = new SimpleSchema({
  title: {
    type: String,
    optional: true
  },
  translation: {
    type: String
  },
  audio: {
    type: String,
    optional: true
  },
  validated: {
    type: Boolean,
    autoValue: function() {
      if (this.isInsert) {
        return false;
      }
    }
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();
      }
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  }
});

Transcripts.attachSchema(Schemas.Transcript);
