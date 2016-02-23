const BATCH_SIZE = 10;

Template.home.helpers({
  items: function() {
    return Posts.find({}, {
      sort: {
        validated: 1,
        createdAt: -1
      }
    });
  },
  count: function() {
    return Counts.get('count');
  }
});

Template.home.events({
  'click #load-more': function(event) {
    event.preventDefault();

    $(event.target)
      .addClass('loading')
      .prop('disabled', true);
      
    Session.set('limit', Session.get('limit') + BATCH_SIZE);
  }
});

Template.home.created = function() {
  Session.set('limit', BATCH_SIZE);
};

Deps.autorun(function () {
  Meteor.subscribe('posts', Session.get('limit'), function() {
    $('#load-more')
      .removeClass('loading')
      .prop('disabled', false);

    if(Session.get('limit') >= Counts.get('count')) {
      $('#load-more')
        .text('You have reached the end')
        .prop('disabled', true);
    }
  });
});
