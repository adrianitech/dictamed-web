Template.home.events({
  'click tr': function(event) {
    event.preventDefault();

    let id = $(event.currentTarget).attr('data-id');
    window.location = '/edit/' + id;
  }
});
