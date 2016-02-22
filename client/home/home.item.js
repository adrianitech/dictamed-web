var playing = false;

Template.homeItem.events({
  'click .play': function(event) {
    playing = !playing;

    if(playing) {
      $(event.target)
        .html('<i class="stop icon"></i>Stop');
    } else {
      $(event.target)
        .html('<i class="play icon"></i>Play');
    }
  },
  'click .valid': function(event) {
    //
  }
});

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('lll');
});
