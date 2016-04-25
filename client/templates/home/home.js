Template.home.events({
  'click a.delete': function(event) {
    event.preventDefault();

    let id = $(event.currentTarget).attr('data-id');
    Transcripts.remove({_id: id});
  }
});
