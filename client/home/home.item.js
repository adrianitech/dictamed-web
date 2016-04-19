var playing = false;

Template.homeItem.helpers({
  'progress': function() {
    return Session.get('progress');
  },
  'validated': function() {
    return this.validated ? 'valid' : ''
  }
})

function repeat() {
  let value = Session.get('progress');
  Session.set('progress', value + 1);
  setTimeout(repeat, 500);
}

Template.homeItem.created = function() {
  Session.set('progress', 0);
  setTimeout(repeat, 500);
};

Template.homeItem.events({
  'click .play': function(event) {
    var button = $(event.currentTarget);
    playing = !playing;

    if(playing) {
      button
        .html('<i class="mdi mdi-stop"></i>');
    } else {
      button
        .html('<i class="mdi mdi-play"></i>');
    }
  },
  'click .validate': function(event) {
    var field = $(Template.instance().find('textarea'));

    Posts.update(
      {_id: this._id},
      {$set: {translation: field.val()}});
  },
  'click .delete': function(event) {
    Posts.remove({_id: this._id});
  }
});
