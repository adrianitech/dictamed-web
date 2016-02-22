Meteor.methods({
  addTranslation: function(translation, title) {
    Posts.insert({
      title: title,
      translation: translation
    });
  }
});
