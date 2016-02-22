var playing = false;

Template.homeItem.events({
  'click .play': function(event) {
    var button = $(Template.instance().find('.play'));
    playing = !playing;

    if(playing) {
      button
        .html('<i class="stop icon"></i>Stop');
    } else {
      button
        .html('<i class="play icon"></i>Play');
    }
  },
  'click .valid': function(event) {
    var field = $(Template.instance().find('textarea'));

    Posts.update(
      {_id: this._id},
      {$set: {translation: field.val()}});
  },
  'click .delete': function(event) {
    var button = $(Template.instance().find('.delete'));

    if (button.hasClass('confirm')) {
      Posts.remove({_id: this._id});
    } else {
      button
        .addClass('confirm left labeled')
        .html('<i class="trash icon"></i>Delete');
    }
  }
});

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('lll');
});
