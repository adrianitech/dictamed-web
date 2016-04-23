Template.edit.events({
  'click .validate': function(event) {
    event.preventDefault();

    let id = this._id;
    let text = $('textarea').val()

    Posts.update({_id: id}, {
      $set: {
        translation: text
      }
    });
  }
});
