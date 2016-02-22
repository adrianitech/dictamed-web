Posts = new Mongo.Collection('posts');

var Schemas = {};

Schemas.Post = new SimpleSchema({
  title: {
    type: String,
    optional: true
  },
  translation: {
    type: String
  },
  validated: {
    type: Boolean,
    autoValue: function() {
      if (this.isInsert) {
        return false;
      } else {
        return true;
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

Posts.attachSchema(Schemas.Post);
