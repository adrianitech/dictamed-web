Template.home.helpers({
  'isEmpty': function(items) {
    return items.count() == 0;
  },
  'icon': function(title) {
    if (title == 'Sent from Watch') { return 'mdi mdi-watch'; }
    return 'mdi mdi-cellphone-iphone';
  }
});

Template.home.events({
  'click a.delete': function(event) {
    event.preventDefault();

    let id = $(event.currentTarget).attr('data-id');
    Transcripts.remove({_id: id});
  }
});
